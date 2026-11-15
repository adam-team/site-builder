#!/usr/bin/env bash
# Проверка готового сайта перед показом и выкладкой.
#   bash scripts/check-site.sh projects/<id>/site
set -uo pipefail
dir="${1:?папка сайта}"; fail=0
hit(){ local what="$1" pat="$2"; local r; r=$(grep -rnIE "$pat" "$dir" --include='*.html' --include='*.js' --include='*.jsx' --include='*.ts' --include='*.tsx' --include='*.json' --exclude-dir=node_modules --exclude-dir=dist 2>/dev/null | head -8)
  if [[ -n "$r" ]]; then echo "✗ $what:"; sed 's/^/    /' <<<"$r" | cut -c1-180; fail=1; else echo "✓ нет: $what"; fi; }
hit "пометки ЗАПОЛНИТЬ и ЧЕРНОВИК" 'ЗАПОЛНИТЬ|ЧЕРНОВИК'
hit "тестовый номер WhatsApp" '77000000000|7XXXXXXXXXX'
hit "образцы из шаблона (пример отзыва, hello@example.com, username)" 'пример отзыва|hello@example\.com|t\.me/username|instagram\.com/username|Имя Фамилия'
hit "латинский текст-рыба" 'Lorem ipsum'
hit "имена из образцов" 'Анна Светлова|Studio Lumi|Nexa AI|Школа Ритм'
[[ -f "$dir/index.html" ]] && echo "✓ есть index.html" || { echo "✗ нет index.html"; fail=1; }
[[ $fail -eq 0 ]] && echo "Сайт чистый." || echo "Исправь отмеченное или подтверди с ученицей, что так и нужно."
exit $fail
