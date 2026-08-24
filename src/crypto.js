'use strict';

const crypto = require('crypto');
const zlib = require('zlib');
const parse = require('url').parse;
const bodyify = require('querystring').stringify;

const eapiKey = 'e82ckenh8dichen8';
const linuxapiKey = 'rFgB&h#%2?^eDg:Q';
// The fixed key the client uses for the outer layer of every xeapi payload.
const xeapiKey = Buffer.from(
	'ab1d5a430f6bb04a3f01e81ddd72bd916d5ce591248ac128714806d7f8fb1b84',
	'hex'
);

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

const compressed = (buffer) =>
	buffer.length > 1 && buffer[0] === 0x1f && buffer[1] === 0x8b;

/**
 * The obfuscation the client wraps around the inner xeapi ciphertext: the
 * payload is XOR-ed with a random pad, base64-ed, then rotated by an offset
 * derived from that pad. The pad is prepended, so it is fully reversible.
 */
const transform = (buffer) => {
	const pad = crypto.randomBytes(16);
	const masked = Buffer.alloc(buffer.length);
	for (let index = 0; index < buffer.length; index++)
		masked[index] = buffer[index] ^ pad[index & 0x0f];
	const encoded = Buffer.from(masked.toString('base64'));
	const rotation = encoded.length ? (pad[0] & 0x0f) % encoded.length : 0;
	return Buffer.concat([
		pad,
		encoded.subarray(rotation),
		encoded.subarray(0, rotation),
	]);
};

const untransform = (buffer) => {
	const pad = buffer.subarray(0, 16);
	const rotated = buffer.subarray(16);
	const rotation = rotated.length ? (pad[0] & 0x0f) % rotated.length : 0;
	const encoded = Buffer.concat([
		rotated.subarray(rotated.length - rotation),
		rotated.subarray(0, rotated.length - rotation),
	]);
	const masked = Buffer.from(encoded.toString(), 'base64');
	const result = Buffer.alloc(masked.length);
	for (let index = 0; index < masked.length; index++)
		result[index] = masked[index] ^ pad[index & 0x0f];
	return result;
};

module.exports = {
	eapi: {
		encrypt: (buffer) => encrypt(buffer, eapiKey),
		decrypt: (buffer) => decrypt(buffer, eapiKey),
		/**
		 * Encrypted response bodies (eapi with `e_r`, and every xeapi
		 * response) share one codec: the ciphertext may wrap a gzip stream,
		 * which is what the client asks for with the `x-aeapi` header.
		 *
		 * @param {Buffer} buffer
		 * @return {{ body: Buffer, compressed: boolean }}
		 */
		decryptResponse: (buffer) => {
			const body = decrypt(buffer, eapiKey);
			return compressed(body)
				? { body: zlib.gunzipSync(body), compressed: true }
				: { body, compressed: false };
		},
		/**
		 * @param {Buffer} buffer
		 * @param {boolean} compress Re-compress, to answer in the same shape
		 *                           the upstream response arrived in.
		 */
		encryptResponse: (buffer, compress) =>
			encrypt(compress ? zlib.gzipSync(buffer) : buffer, eapiKey),
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
	/**
	 * The encryption newer clients use, posted to `/xeapi/<path>`. A request
	 * carries three base64 fields:
	 *
	 * - `B`: `AES-ECB(dynamicKey, transform(AES-ECB(xeapiKey, plaintext)))`,
	 *   where the plaintext is `{ body, queryString, ... }` with the form
	 *   parameters base64-ed into `body`.
	 * - `S`: the `dynamicKey` sealed against the server's X25519 key, so it is
	 *   readable by the server only.
	 * - `R`: `AES-ECB(xeapiKey, "<keyVersion>|<sessionId>")`.
	 *
	 * The first request of a session uses a random `dynamicKey` we cannot
	 * recover, but the server answers with the session key in plaintext
	 * (`x-encr-sskey`) and the client reuses it from then on — which is how
	 * the proxy gets to read the following requests. Responses are always
	 * encrypted with the well-known eapi key, so they need no session at all.
	 */
	xeapi: {
		/** @return {[version: string, sessionId: string]} */
		decryptSession: (buffer) =>
			decrypt(buffer, xeapiKey).toString().split('|'),
		decryptRequest: (buffer, key) =>
			decrypt(untransform(decrypt(buffer, key)), xeapiKey),
		encryptRequest: (buffer, key) =>
			encrypt(transform(encrypt(buffer, xeapiKey)), key),
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
