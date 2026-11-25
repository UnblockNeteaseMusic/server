#!/usr/bin/env bash
# Run the unit tests and build the bundle.
set -euo pipefail
cd "$(dirname "$0")/../.."

yarn test
yarn build
