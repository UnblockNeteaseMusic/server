const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const windows = process.platform === 'win32';
const platform = windows ? 'win' : process.platform;
const executable = `unblockneteasemusic-${platform}-${process.arch}${windows ? '.exe' : ''}`;
const output = path.resolve('dist');

fs.mkdirSync(output, { recursive: true });
const work = fs.mkdtempSync(path.join(output, '.sea-'));
const config = path.join(work, 'sea-config.json');
const blob = path.join(work, 'sea.blob');
const binary = path.join(work, executable);

try {
	fs.writeFileSync(
		config,
		JSON.stringify({
			main: 'precompiled/app.js',
			output: blob,
			disableExperimentalSEAWarning: true,
			useSnapshot: false,
			useCodeCache: false,
			assets: {
				'server.crt': 'server.crt',
				'server.key': 'server.key',
			},
		})
	);
	execFileSync(process.execPath, ['--experimental-sea-config', config], {
		stdio: 'inherit',
	});

	fs.copyFileSync(process.execPath, binary);
	execFileSync(
		process.execPath,
		[
			require.resolve('postject/dist/cli.js'),
			binary,
			'NODE_SEA_BLOB',
			blob,
			'--sentinel-fuse',
			'NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2',
		],
		{ stdio: 'inherit' }
	);
	fs.renameSync(binary, path.join(output, executable));
} finally {
	// Yarn 3's PnP filesystem can break Node 22's recursive rmSync.
	for (const file of [config, blob, binary]) {
		fs.rmSync(file, { force: true });
	}
	fs.rmdirSync(work);
}
