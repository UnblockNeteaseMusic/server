const { parseChange, nextVersion, render } = require('./changeset.cjs');

describe('parseChange', () => {
	test('reads the type, the title and the body', () => {
		expect(
			parseChange(
				'---\ndefault: minor\n---\n\n# Add a provider\n\nSome text.\n',
				'a.md'
			)
		).toEqual({
			type: 'minor',
			title: 'Add a provider',
			body: 'Some text.',
		});
	});

	test('reads the package name form of the header', () => {
		const text =
			'---\n"@unblockneteasemusic/server": patch\n---\n# Fix it\n';
		expect(parseChange(text, 'a.md')).toMatchObject({
			type: 'patch',
			body: '',
		});
	});

	test.each([
		['no header', '# Title\n'],
		['bad type', '---\ndefault: huge\n---\n# Title\n'],
		['no title', '---\ndefault: patch\n---\nText\n'],
	])('rejects %s', (_, text) => {
		expect(() => parseChange(text, 'a.md')).toThrow('a.md');
	});
});

describe('nextVersion', () => {
	test.each([
		['0.27.10', ['patch'], '0.27.11'],
		['0.27.10', ['patch', 'minor'], '0.28.0'],
		['0.27.10', ['major', 'patch'], '0.28.0'],
		['1.4.2', ['minor'], '1.5.0'],
		['1.4.2', ['major'], '2.0.0'],
	])('%s with %j gives %s', (current, types, expected) => {
		expect(nextVersion(current, types)).toBe(expected);
	});
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
		expect(render(entries, '##')).toBe(
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
