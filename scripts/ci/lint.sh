#!/usr/bin/env bash
# Run the lint checks. CI and `nix develop -c scripts/ci/lint.sh` run the same commands.
# Usage: lint.sh [workflows|format|all]
set -euo pipefail
cd "$(dirname "$0")/../.."

workflows() {
	jactionlint
}

format() {
	yarn prettier --check .
	nixfmt --check flake.nix
	shellcheck scripts/ci/*.sh
}

case "${1:-all}" in
workflows) workflows ;;
format) format ;;
all)
	workflows
	format
	;;
*)
	echo "usage: lint.sh [workflows|format|all]" >&2
	exit 2
	;;
esac
