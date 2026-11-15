#!/usr/bin/env bash
# Проверка и подготовка окружения. Запускает агент.
set -uo pipefail
cd "$(dirname "$0")/.."
ok(){ printf "  ✓ %s\n" "$1"; }; no(){ printf "  ✗ %s\n" "$1"; }
echo "Окружение Site Builder:"
command -v python3 >/dev/null && ok "Python $(python3 -c 'import sys;print(sys.version.split()[0])')" || { no "Python 3 не найден: Mac → xcode-select --install, Windows → winget install Python.Python.3.12"; exit 1; }
if [[ -d "/Applications/Google Chrome.app" ]] || command -v google-chrome >/dev/null || command -v chrome >/dev/null; then ok "Google Chrome"; else no "Chrome не найден (нужен для просмотра и скриншотов)"; fi
if command -v node >/dev/null; then v=$(node -v); ok "Node $v"; else no "Node не найден: нужен только для React/Next-шаблонов и выкладки (brew install node)"; fi
command -v ffmpeg >/dev/null && ok "ffmpeg" || echo "  · ffmpeg нет: нужен только для записи новых видео-превью"
python3 scripts/structure.py sync >/dev/null && ok "конструктор структуры: structure/presets.js"
python3 scripts/build_gallery.py | sed 's/^/  ✓ /'
for n in $(python3 -c "import json;print(' '.join(str(d['n']) for d in json.load(open('catalog/designs.json')) if d['kind']=='tokens'))"); do
  [[ -f gallery/live/$n/index.html ]] || python3 scripts/build_site.py --demo "$n" >/dev/null
done
ok "живые образцы палитр: gallery/live/"
if git rev-parse --git-dir >/dev/null 2>&1; then bash scripts/hooks/install.sh >/dev/null && ok "сторож секретов перед коммитом"; fi
echo "Готово. Дальше: docs/agent-contract/WORKFLOW.md, этап 1."
