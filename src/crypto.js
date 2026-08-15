'use strict';

const crypto = require('crypto');
const parse = require('url').parse;
const bodyify = require('querystring').stringify;

const eapiKey = 'e82ckenh8dichen8';
const linuxapiKey = 'rFgB&h#%2?^eDg:Q';
const xeapiStaticKey = Buffer.from(
	'ab1d5a430f6bb04a3f01e81ddd72bd916d5ce591248ac128714806d7f8fb1b84',
	'hex'
);
const xeapiSignKey =
	'mUHCwVNWJbunMqAHf5MImuirT6plvs6VSFW62MGHstFQxhBGdEoIhLItH3djc4+FB/OKty3+lL2rGeoFBpVe5g==';
const x25519SpkiPrefix = Buffer.from('302a300506032b656e032100', 'hex');

const decrypt = (buffer, key) => {
	const decipher = crypto.createDecipheriv(
		`aes-${key.length * 8}-ecb`,
		key,
		null
	);
	return Buffer.concat([decipher.update(buffer), decipher.final()]);
};

const encrypt = (buffer, key) => {
	const cipher = crypto.createCipheriv(
		`aes-${key.length * 8}-ecb`,
		key,
		null
	);
	return Buffer.concat([cipher.update(buffer), cipher.final()]);
};

const createX25519PublicKey = (raw) => {
	if (!Buffer.isBuffer(raw) || raw.length !== 32)
		throw new Error('xeapi public key must contain 32 bytes.');
	return crypto.createPublicKey({
		key: Buffer.concat([x25519SpkiPrefix, raw]),
		format: 'der',
		type: 'spki',
	});
};

const deriveX25519AesKey = (sharedSecret, ephemeralPublicKey) => {
	const prk = crypto
		.createHmac('sha256', Buffer.alloc(32))
		.update(sharedSecret.length ? sharedSecret : Buffer.alloc(32))
		.digest();
	return crypto
		.createHmac('sha256', prk)
		.update(Buffer.concat([ephemeralPublicKey, Buffer.from([1])]))
		.digest()
		.subarray(0, 16);
};

const xeapiMidTransform = (ciphertext) => {
	const random = crypto.randomBytes(16);
	const xored = Buffer.alloc(ciphertext.length);
	for (let i = 0; i < ciphertext.length; i++)
		xored[i] = ciphertext[i] ^ random[i & 0x0f];
	const encoded = Buffer.from(xored.toString('base64'));
	const rotation = encoded.length ? (random[0] & 0x0f) % encoded.length : 0;
	return Buffer.concat([
		random,
		encoded.subarray(rotation),
		encoded.subarray(0, rotation),
	]);
};

const xeapiEncryptSessionKey = (dynamicKey, publicKeyState, os) => {
	const peerKey = createX25519PublicKey(
		Buffer.from(publicKeyState.publicKey, 'base64')
	);
	const { publicKey, privateKey } = crypto.generateKeyPairSync('x25519');
	const ephemeralPublicKey = Buffer.from(
		publicKey.export({ format: 'der', type: 'spki' })
	).subarray(-32);
	const sharedSecret = crypto.diffieHellman({
		privateKey,
		publicKey: peerKey,
	});
	const aesKey = deriveX25519AesKey(sharedSecret, ephemeralPublicKey);
	const iv = crypto.randomBytes(12);
	const cipher = crypto.createCipheriv('aes-128-gcm', aesKey, iv);
	const plaintext = Buffer.from(
		`${dynamicKey.toString('base64')}|${os}|${publicKeyState.sk || ''}`
	);
	const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
	return Buffer.concat([
		ephemeralPublicKey,
		iv,
		encrypted,
		cipher.getAuthTag(),
	]);
};

const buildXeapiPlaintext = (uri, data, options = {}) => {
	const fields = {};
	const contentType =
		options.contentType ||
		'application/x-www-form-urlencoded;charset=utf-8';
	if (
		contentType.split(';', 1)[0].toLowerCase() !==
		'application/x-www-form-urlencoded'
	)
		fields.contentType = contentType;
	const method = (options.method || 'POST').toUpperCase();
	if (method !== 'POST') fields.method = method;
	const url = new URL(uri, 'https://interface.music.163.com');
	if (url.search) fields.queryString = url.search.slice(1);
	if (data !== undefined && data !== null) {
		const bodyData = { ...data };
		delete bodyData.e_r;
		fields.body = Buffer.from(
			new URLSearchParams(bodyData).toString()
		).toString('base64');
	}
	fields.queryString = fields.queryString
		? `${fields.queryString}&e_r=true`
		: 'e_r=true';
	return JSON.stringify(fields);
};

module.exports = {
	eapi: {
		encrypt: (buffer) => encrypt(buffer, eapiKey),
		decrypt: (buffer) => decrypt(buffer, eapiKey),
		encryptRequest: (url, object) => {
			url = parse(url);
			const text = JSON.stringify(object);
			const message = `nobody${url.path}use${text}md5forencrypt`;
			const digest = crypto
				.createHash('md5')
				.update(message)
				.digest('hex');
			const data = `${url.path}-36cd479b6b5-${text}-36cd479b6b5-${digest}`;
			return {
				url: url.href.replace(/\w*api/, 'eapi'),
				body: bodyify({
					params: module.exports.eapi
						.encrypt(Buffer.from(data))
						.toString('hex')
						.toUpperCase(),
				}),
			};
		},
	},
	api: {
		encryptRequest: (url, object) => {
			url = parse(url);
			return {
				url: url.href.replace(/\w*api/, 'api'),
				body: bodyify(object),
			};
		},
	},
	linuxapi: {
		encrypt: (buffer) => encrypt(buffer, linuxapiKey),
		decrypt: (buffer) => decrypt(buffer, linuxapiKey),
		encryptRequest: (url, object) => {
			url = parse(url);
			const text = JSON.stringify({
				method: 'POST',
				url: url.href,
				params: object,
			});
			return {
				url: url.resolve('/api/linux/forward'),
				body: bodyify({
					eparams: module.exports.linuxapi
						.encrypt(Buffer.from(text))
						.toString('hex')
						.toUpperCase(),
				}),
			};
		},
	},
	xeapi: {
		sign: (timestamp, nonce) =>
			crypto
				.createHmac('sha256', xeapiSignKey)
				.update(String(timestamp) + nonce)
				.digest('base64'),
		decrypt: (buffer) => {
			const plaintext = decrypt(buffer, eapiKey);
			return plaintext[0] === 0x1f && plaintext[1] === 0x8b
				? require('zlib').gunzipSync(plaintext)
				: plaintext;
		},
		decryptPublicKey: (encryptedData) =>
			JSON.parse(
				decrypt(
					Buffer.from(encryptedData, 'base64'),
					xeapiStaticKey
				).toString()
			),
		encryptRequest: (url, object, options = {}) => {
			if (!options.publicKeyState)
				throw new Error('xeapi publicKeyState is required.');
			const parsed = parse(url);
			const uri = parsed.path;
			const dynamicKey = options.sessionKey
				? Buffer.from(String(options.sessionKey))
				: crypto.randomBytes(16);
			const plaintext = Buffer.from(
				buildXeapiPlaintext(uri, object, options)
			);
			const encryptedBody = encrypt(
				xeapiMidTransform(encrypt(plaintext, xeapiStaticKey)),
				dynamicKey
			);
			const encryptedSessionKey = xeapiEncryptSessionKey(
				dynamicKey,
				options.publicKeyState,
				options.os || 'android'
			);
			const encryptedVersion = encrypt(
				Buffer.from(
					`${options.publicKeyState.version}|${
						options.sessionKey ? options.sessionId || '' : ''
					}`
				),
				xeapiStaticKey
			);
			return {
				url: parsed.href.replace(/\/(?:api|eapi|weapi)\//, '/xeapi/'),
				body: bodyify({
					B: encryptedBody.toString('base64'),
					S: encryptedSessionKey.toString('base64'),
					R: encryptedVersion.toString('base64'),
				}),
			};
		},
	},
	miguapi: {
		encryptBody: (object) => {
			const text = JSON.stringify(object);
			const derive = (password, salt, keyLength, ivSize) => {
				// EVP_BytesToKey
				salt = salt || Buffer.alloc(0);
				const keySize = keyLength / 8;
				const repeat = Math.ceil((keySize + ivSize * 8) / 32);
				const buffer = Buffer.concat(
					Array(repeat)
						.fill(null)
						.reduce(
							(result) =>
								result.concat(
									crypto
										.createHash('md5')
										.update(
											Buffer.concat([
												result.slice(-1)[0],
												password,
												salt,
											])
										)
										.digest()
								),
							[Buffer.alloc(0)]
						)
				);
				return {
					key: buffer.slice(0, keySize),
					iv: buffer.slice(keySize, keySize + ivSize),
				};
			};
			const password = Buffer.from(
					crypto.randomBytes(32).toString('hex')
				),
				salt = crypto.randomBytes(8);
			const key =
				'-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8asrfSaoOb4je+DSmKdriQJKWVJ2oDZrs3wi5W67m3LwTB9QVR+cE3XWU21Nx+YBxS0yun8wDcjgQvYt625ZCcgin2ro/eOkNyUOTBIbuj9CvMnhUYiR61lC1f1IGbrSYYimqBVSjpifVufxtx/I3exReZosTByYp4Xwpb1+WAQIDAQAB\n-----END PUBLIC KEY-----';
			const secret = derive(password, salt, 256, 16);
			const cipher = crypto.createCipheriv(
				'aes-256-cbc',
				secret.key,
				secret.iv
			);
			return bodyify({
				data: Buffer.concat([
					Buffer.from('Salted__'),
					salt,
					cipher.update(Buffer.from(text)),
					cipher.final(),
				]).toString('base64'),
				secKey: crypto
					.publicEncrypt(
						{ key, padding: crypto.constants.RSA_PKCS1_PADDING },
						password
					)
					.toString('base64'),
			});
		},
	},
	base64: {
		encode: (text, charset) =>
			Buffer.from(text, charset)
				.toString('base64')
				.replace(/\+/g, '-')
				.replace(/\//g, '_'),
		decode: (text, charset) =>
			Buffer.from(
				text.replace(/-/g, '+').replace(/_/g, '/'),
				'base64'
			).toString(charset),
	},
	uri: {
		retrieve: (id) => {
			id = id.toString().trim();
			const key = '3go8&$8*3*3h0k(2)2';
			const string = Array.from(Array(id.length).keys())
				.map((index) =>
					String.fromCharCode(
						id.charCodeAt(index) ^
							key.charCodeAt(index % key.length)
					)
				)
				.join('');
			const result = crypto
				.createHash('md5')
				.update(string)
				.digest('base64')
				.replace(/\//g, '_')
				.replace(/\+/g, '-');
			return `http://p1.music.126.net/${result}/${id}`;
		},
	},
	md5: {
		digest: (value) => crypto.createHash('md5').update(value).digest('hex'),
		pipe: (source) =>
			new Promise((resolve, reject) => {
				const digest = crypto.createHash('md5').setEncoding('hex');
				source
					.pipe(digest)
					.on('error', (error) => reject(error))
					.once('finish', () => resolve(digest.read()));
			}),
	},
	sha1: {
		digest: (value) =>
			crypto.createHash('sha1').update(value).digest('hex'),
	},
	random: {
		hex: (length) =>
			crypto
				.randomBytes(Math.ceil(length / 2))
				.toString('hex')
				.slice(0, length),
		uuid: () => crypto.randomUUID(),
	},
};

try {
	module.exports.kuwoapi = require('./kwDES');
} catch (e) {}
