#!/usr/bin/env bash
# Sign the executables in a directory with cosign (keyless, the OIDC token of the workflow) and
# write SHA256SUMS. Each file gets a <file>.sigstore.json bundle that holds the signature, the
# certificate and the transparency log entry.
set -euo pipefail

dir="${1:?usage: sign.sh <dir>}"
cd "$dir"

sha256sum unblockneteasemusic-* >SHA256SUMS
for file in unblockneteasemusic-* SHA256SUMS; do
	cosign sign-blob --yes --bundle "${file}.sigstore.json" "$file"
done
