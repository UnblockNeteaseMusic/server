# Change files

Every pull request that changes what a user sees adds one file here, named after the change
(`fix-kuwo-search.md`). The release pull request turns the files into the next section of
`CHANGELOG.md` and the notes of the release, then deletes them.

```markdown
---
default: patch
---

# Fix the Kuwo search API

One or two sentences for the reader. A breaking change says what to do instead.
```

- `default` is the kind of change. `major` is a breaking change, `minor` a feature and `patch` a
  fix. Before 1.0.0, `major` and `minor` both raise the minor version.
- The heading is the title of the change: it is the line in the TL; DR; and the link text. The link
  goes to the commit that added the file.
- The text under the heading is shown only for a breaking change.
- A pull request that changes no behavior (docs, CI, tests) takes the label `no changeset`.
