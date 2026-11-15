#!/usr/bin/env bash
# Создаёт папку проекта ученицы с заготовками файлов этапов.
#   bash scripts/new-project.sh <id>      # id: латиница, цифры, дефис (anna-psy)
set -euo pipefail
cd "$(dirname "$0")/.."
id="${1:-}"
[[ "$id" =~ ^[a-z0-9][a-z0-9-]{1,40}$ ]] || { echo "id: латиница, цифры, дефис, например anna-psy"; exit 1; }
[[ -e "projects/$id" ]] && { echo "projects/$id уже есть: продолжаем по его файлам"; exit 0; }
mkdir -p "projects/$id/assets"
cp projects/_template/*.md "projects/$id/"
echo '{"design": null, "preset": null, "blocks": [], "lang": "ru", "content": {}}' > "projects/$id/site.json"
echo "создано: projects/$id (BRIEF, STRUCTURE, DESIGN, CONTENT, DECISIONS, site.json, assets/)"
