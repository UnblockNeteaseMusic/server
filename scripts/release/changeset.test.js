const assert = require('node:assert/strict');
const { describe, test } = require('node:test');
const { parseChange, nextVersion, render } = require('./changeset.cjs');

describe('parseChange', () => {
	test('reads the type, the title and the body', () => {
		assert.deepEqual(
			parseChange(
				'---\ndefault: minor\n---\n\n# Add a provider\n\nSome text.\n',
				'a.md'
			),
			{ type: 'minor', title: 'Add a provider', body: 'Some text.' }
		);
	});

	test('reads the package name form of the header', () => {
		const text =
			'---\n"@unblockneteasemusic/server": patch\n---\n# Fix it\n';
		assert.partialDeepStrictEqual(parseChange(text, 'a.md'), {
			type: 'patch',
			body: '',
		});
	});

	for (const [name, text] of [
		['no header', '# Title\n'],
		['bad type', '---\ndefault: huge\n---\n# Title\n'],
		['no title', '---\ndefault: patch\n---\nText\n'],
	]) {
		test(`rejects ${name}`, () => {
			assert.throws(() => parseChange(text, 'a.md'), /a\.md/);
		});
	}
});

describe('nextVersion', () => {
	for (const [current, types, expected] of [
		['0.27.10', ['patch'], '0.27.11'],
		['0.27.10', ['patch', 'minor'], '0.28.0'],
		['0.27.10', ['major', 'patch'], '0.28.0'],
		['1.4.2', ['minor'], '1.5.0'],
		['1.4.2', ['major'], '2.0.0'],
	]) {
		test(`${current} with ${types} gives ${expected}`, () => {
			assert.strictEqual(nextVersion(current, types), expected);
		});
	}
});

describe('render', () => {
	const entries = [
		{ type: 'minor', title: 'Add bodian', body: '', url: 'https://x/3' },
		{ type: 'patch', title: 'Fix search', body: '', url: 'https://x/2' },
		{
			type: 'major',
			title: 'Shorter certificate',
			body: 'Why.\n\nWhat to do.',
			url: 'https://x/1',
		},
	];

	test('lists breaking changes, fixes and features after the TL; DR;', () => {
		assert.strictEqual(
			render(entries, '##'),
			[
				'## TL; DR;',
				'- Shorter certificate',
				'- Add bodian',
				'- Fix search',
				'',
				'## Breaking changes',
				'- [Shorter certificate](https://x/1)',
				'   Why.',
				'',
				'   What to do.',
				'',
				'## Fixes',
				'- [Fix search](https://x/2)',
				'',
				'## Features',
				'- [Add bodian](https://x/3)',
				'',
			].join('\n')
		);
	});
});
