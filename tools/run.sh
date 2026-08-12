#!/usr/bin/env bash
# Bundles the render harness with esbuild and executes it. Bundling first
# sidesteps loader-level ESM/TS interop differences and keeps the build
# deterministic.
set -euo pipefail
cd "$(dirname "$0")/.."

ESBUILD=./node_modules/@esbuild/linux-x64/bin/esbuild

"$ESBUILD" tools/build.mts \
  --bundle \
  --platform=node \
  --format=esm \
  --target=node22 \
  --jsx=automatic \
  --outfile=.build/build.mjs \
  --alias:@=./src \
  --external:react \
  --external:react-dom \
  --external:esbuild \
  --log-level=warning

node .build/build.mjs
