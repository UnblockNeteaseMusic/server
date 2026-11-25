#!/usr/bin/env node
// Change files in .changeset/ -> the next section of CHANGELOG.md and the notes of the release.
//
//   changeset.cjs check <base-ref>        a pull request adds a valid change file, or is exempt
//   changeset.cjs prepare [<version>]     write CHANGELOG.md and package.json, delete the files,
//                                         print the tag
//   changeset.cjs notes <version>         print the notes of a version from CHANGELOG.md
//   changeset.cjs version                 print the version of the newest section of CHANGELOG.md
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..', '..');
const CHANGE_DIR = path.join(ROOT, '.changeset');
const CHANGELOG = path.join(ROOT, 'CHANGELOG.md');
const PACKAGE = path.join(ROOT, 'package.json');
const REPOSITORY =
	process.env.GITHUB_REPOSITORY || 'UnblockNeteaseMusic/server';

const KINDS = { major: 'Breaking changes', patch: 'Fixes', minor: 'Features' };
const RANK = { patch: 0, minor: 1, major: 2 };

/**
 * Read one change file.
 * @param {string} text
 * @param {string} file Name used in error messages.
 * @return {{type: 'major'|'minor'|'patch', title: string, body: string}}
 */
function parseChange(text, file) {
	const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
	if (!match)
		throw new Error(`${file}: the file must start with a --- header`);

	let type;
	for (const line of match[1].split('\n')) {
		const pair = /^\s*"?([^":]+)"?\s*:\s*"?(\w+)"?\s*$/.exec(line);
		if (!pair)
			throw new Error(`${file}: cannot read the header line "${line}"`);
		if (pair[1] === 'default' || pair[1].startsWith('@')) type = pair[2];
	}
	if (!(type in RANK))
		throw new Error(`${file}: "default" must be major, minor or patch`);

	const [, title, ...rest] =
		/^\s*#\s+(.+?)\s*(?:\n([\s\S]*))?$/.exec(match[2]) || [];
	if (!title)
		throw new Error(
			`${file}: the text must start with a "# Title" heading`
		);
	return { type, title, body: (rest[0] || '').trim() };
}

/**
 * The next version. Before 1.0.0 a breaking change and a feature both raise the minor version.
 * @param {string} current
 * @param {Array<'major'|'minor'|'patch'>} types
 * @return {string}
 */
function nextVersion(current, types) {
	const [major, minor, patch] = current.split('.').map(Number);
	const top = types.reduce((a, b) => (RANK[b] > RANK[a] ? b : a), 'patch');
	if (top === 'major' && major > 0) return `${major + 1}.0.0`;
	if (top !== 'patch') return `${major}.${minor + 1}.0`;
	return `${major}.${minor}.${patch + 1}`;
}

/**
 * The notes: TL; DR; and one list per kind of change.
 * @param {Array<{type: string, title: string, body: string, url: string}>} entries
 * @param {string} heading The heading of each list, such as "##".
 * @return {string}
 */
function render(entries, heading) {
	const order = ['major', 'minor', 'patch'];
	const sorted = order.flatMap((type) =>
		entries.filter((e) => e.type === type)
	);
	const out = [
		`${heading} TL; DR;`,
		...sorted.map((e) => `- ${e.title}`),
		'',
	];

	for (const type of ['major', 'patch', 'minor']) {
		const list = entries.filter((e) => e.type === type);
		if (!list.length) continue;
		out.push(`${heading} ${KINDS[type]}`);
		for (const e of list) {
			out.push(`- [${e.title}](${e.url})`);
			if (type === 'major' && e.body)
				out.push(...e.body.split('\n').map((l) => (l ? `   ${l}` : l)));
		}
		out.push('');
	}
	return out.join('\n');
}

const git = (...args) =>
	execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();

const changeFiles = () =>
	fs
		.readdirSync(CHANGE_DIR)
		.filter((f) => f.endsWith('.md') && f !== 'README.md')
		.sort();

const readVersion = () =>
	/"version":\s*"([^"]+)"/.exec(fs.readFileSync(PACKAGE, 'utf8'))[1];

function prepare(override) {
	const files = changeFiles();
	if (!files.length) throw new Error('.changeset/ has no change files');

	const entries = files.map((f) => {
		const entry = parseChange(
			fs.readFileSync(path.join(CHANGE_DIR, f), 'utf8'),
			f
		);
		const sha = git(
			'log',
			'--diff-filter=A',
			'--format=%H',
			'-n1',
			'--',
			`.changeset/${f}`
		);
		if (!sha) throw new Error(`${f}: no commit added this file`);
		return {
			...entry,
			url: `https://github.com/${REPOSITORY}/commit/${sha}`,
		};
	});

	const version =
		override ||
		nextVersion(
			readVersion(),
			entries.map((e) => e.type)
		);
	if (!/^\d+\.\d+\.\d+$/.test(version))
		throw new Error(`bad version: ${version}`);

	const date = new Date().toISOString().slice(0, 10);
	const section = `## ${version} (${date})\n\n${render(entries, '###')}`;
	const old = fs.existsSync(CHANGELOG)
		? fs.readFileSync(CHANGELOG, 'utf8').replace(/^# Changelog\n+/, '')
		: '';
	fs.writeFileSync(CHANGELOG, `# Changelog\n\n${section}\n${old}`);
	fs.writeFileSync(
		PACKAGE,
		fs
			.readFileSync(PACKAGE, 'utf8')
			.replace(/"version":\s*"[^"]+"/, `"version": "${version}"`)
	);
	for (const f of files) fs.rmSync(path.join(CHANGE_DIR, f));
	return `v${version}`;
}

function sections() {
	const text = fs.readFileSync(CHANGELOG, 'utf8');
	return [
		...text.matchAll(
			/^## (\d+\.\d+\.\d+) \(.*\)\n([\s\S]*?)(?=^## \d|$(?![\s\S]))/gm
		),
	];
}

function notes(version) {
	const found = sections().find((m) => m[1] === version.replace(/^v/, ''));
	if (!found) throw new Error(`CHANGELOG.md has no section for ${version}`);
	return found[2].replace(/^###/gm, '##').trim() + '\n';
}

function check(base) {
	const added = git(
		'diff',
		'--name-only',
		'--diff-filter=AM',
		`${base}...HEAD`,
		'--',
		'.changeset'
	)
		.split('\n')
		.filter((f) => f.endsWith('.md') && !f.endsWith('README.md'));
	for (const f of added)
		parseChange(fs.readFileSync(path.join(ROOT, f), 'utf8'), f);
	if (!added.length && process.env.SKIP_CHANGESET !== 'true')
		throw new Error(
			'Add a change file to .changeset/ (see .changeset/README.md), or label the pull request "no changeset".'
		);
	console.log(
		added.length
			? `Change files: ${added.join(', ')}`
			: 'No change file needed.'
	);
}

if (require.main === module) {
	const [command, arg] = process.argv.slice(2);
	try {
		if (command === 'check') check(arg);
		else if (command === 'prepare')
			console.log(prepare(arg && arg.replace(/^v/, '')));
		else if (command === 'notes') process.stdout.write(notes(arg));
		else if (command === 'version') console.log(sections()[0][1]);
		else
			throw new Error('usage: changeset.cjs check|prepare|notes|version');
	} catch (error) {
		console.error(`error: ${error.message}`);
		process.exit(1);
	}
}

module.exports = { parseChange, nextVersion, render };
