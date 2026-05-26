#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
API_DIR="${API_DIR:-$ROOT_DIR/admin-backend}"
ZIP_PATH="$ROOT_DIR/api-publish.zip"

cd "$API_DIR"

if [ ! -f "server.js" ]; then
  echo "Error: no se encontro admin-backend/server.js"
  exit 1
fi

if [ ! -f "package.json" ]; then
  echo "Error: no se encontro admin-backend/package.json"
  exit 1
fi

find "$API_DIR" -name ".DS_Store" -delete
rm -f "$ZIP_PATH"

zip -qr "$ZIP_PATH" . \
  -x "node_modules/*" ".git/*" ".env" ".env.local" ".env.production" "logs/*" "*.log" "*.tmp" "*.zip" "*.DS_Store"

echo "ZIP de la API creado: $ZIP_PATH"
echo "Subir y extraer este ZIP en la raiz del dominio/subdominio de la API."
