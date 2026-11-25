#!/usr/bin/env bash
# Build the standalone executable for one pkg target, such as linux-x64, into dist/.
# The file is named unblockneteasemusic-<target>[.exe].
set -euo pipefail
cd "$(dirname "$0")/../.."

target="${1:?usage: binary.sh <linux-arm64|linux-x64|win-arm64|win-x64>}"

yarn build
yarn pkg --compress Brotli -t "node18-${target}"

for file in dist/server*; do
	mv "$file" "${file/server/unblockneteasemusic-${target}}"
done
ls -l dist
