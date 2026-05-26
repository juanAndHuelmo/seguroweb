#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
FRONTEND_DIR="${FRONTEND_DIR:-$ROOT_DIR}"
BUILD_DIR="$FRONTEND_DIR/build"

if [ -z "${PLESK_FRONT_REPO_URL:-}" ]; then
  echo "Falta PLESK_FRONT_REPO_URL."
  echo "Ejemplo:"
  echo 'PLESK_FRONT_REPO_URL="https://usuario@dominio/plesk-git/musing-hopper.git" bash deploy/scripts/deploy-front-git.sh'
  exit 1
fi

"$SCRIPT_DIR/build-front.sh"

cd "$BUILD_DIR"
find . -name ".DS_Store" -delete

if [ ! -d ".git" ]; then
  git init
fi

git checkout -B main

if git remote get-url plesk >/dev/null 2>&1; then
  git remote set-url plesk "$PLESK_FRONT_REPO_URL"
else
  git remote add plesk "$PLESK_FRONT_REPO_URL"
fi

git add .

if git diff --cached --quiet; then
  echo "No hay cambios nuevos en build para publicar."
else
  git commit -m "Deploy frontend $(date '+%Y-%m-%d %H:%M:%S')"
fi

git push -u plesk main
