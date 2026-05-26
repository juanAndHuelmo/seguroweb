#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="${FRONTEND_DIR:-$ROOT_DIR}"
ZIP_PATH="$ROOT_DIR/frontend-build.zip"

"$SCRIPT_DIR/build-front.sh"

find "$FRONTEND_DIR/build" -name ".DS_Store" -delete
rm -f "$ZIP_PATH"

cd "$FRONTEND_DIR/build"
zip -qr "$ZIP_PATH" . \
  -x ".git/*" "node_modules/*" ".env" ".env.local" ".env.production" "*.DS_Store"

echo "ZIP del frontend creado: $ZIP_PATH"
echo "El ZIP contiene el contenido de build directo, sin carpeta build envolviendo."
