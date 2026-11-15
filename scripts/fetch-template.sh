#!/usr/bin/env bash
# Скачивает шаблон, код которого мы не храним в репозитории (лицензия запрещает распространять копии).
#   bash scripts/fetch-template.sh <номер> projects/<id>/site
set -euo pipefail
cd "$(dirname "$0")/.."
n="$1"; dest="$2"
repo=$(python3 -c "import json,sys;d=[x for x in json.load(open('catalog/designs.json')) if str(x['n'])=='$n'];print(d[0].get('repo','') if d else '')")
[[ -z "$repo" ]] && { echo "у дизайна $n нет репозитория"; exit 1; }
[[ -e "$dest" ]] && { echo "$dest уже существует, выбери другую папку"; exit 1; }
git clone --depth 1 "$repo.git" "$dest"
rm -rf "$dest/.git"
echo "скачано в $dest. Условия автора: $repo (README, раздел License). Не выкладывай шаблон как свой шаблон, только как свой сайт."
