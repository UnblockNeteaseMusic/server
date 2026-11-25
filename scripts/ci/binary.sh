#!/usr/bin/env bash
# Build the standalone executable for one target with @yao-pkg/pkg in SEA mode: the official,
# unpatched Node.js 26 with the application inside.
# It writes dist/unblockneteasemusic-<target>[.exe], the name the releases always had, and next to
# it a compressed copy: <name>.tar.xz, or <name>.zip for Windows, with the executable inside named
# unblockneteasemusic[.exe].
# pkg comes from the Nix dev shell (nix/pkg), pinned by its own lock file; nothing is fetched with
# npx, and the only download is the Node.js archive of the target.
set -euo pipefail
cd "$(dirname "$0")/../.."

target="${1:?usage: binary.sh <linux-x64|linux-arm64|win-x64|win-arm64|macos-arm64>}"
# The exact version of the dev shell: a partial one such as node26 makes pkg ask nodejs.org for the
# newest release. pkg checks the downloaded archive against nodejs.org's SHASUMS256.txt.
node_version="$(node -p 'process.versions.node')"

yarn build
pkg . \
	--sea \
	--compress Brotli \
	--targets "node${node_version}-${target}" \
	--output "dist/unblockneteasemusic-${target}"

name="unblockneteasemusic-${target}"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
if [[ "$target" == win-* ]]; then
	cp "dist/${name}.exe" "$work/unblockneteasemusic.exe"
	(cd "$work" && zip -q -9 "$OLDPWD/dist/${name}.zip" unblockneteasemusic.exe)
else
	cp -p "dist/${name}" "$work/unblockneteasemusic"
	tar -C "$work" -cf - unblockneteasemusic | xz -9e >"dist/${name}.tar.xz"
fi
ls -l dist
