---
default: patch
---

# Releases are built in a Nix dev shell, signed and published without tokens

The executables and the Docker image are signed with cosign, and the npm package is published with npm trusted publishing and provenance. Build and test run on Node.js 26; the standalone executables still embed Node.js 18.
