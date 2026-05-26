#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="${FRONTEND_DIR:-$ROOT_DIR}"

cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
  npm install
fi

rm -rf build
npm run build

if [ ! -f "build/index.html" ]; then
  echo "Error: no se encontro build/index.html"
  exit 1
fi

echo "Frontend compilado correctamente en $FRONTEND_DIR/build"
