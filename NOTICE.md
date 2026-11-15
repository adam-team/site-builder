# Происхождение и атрибуция

**Site Builder**: обучалка и агентский контракт для сборки сайтов с красивым дизайном. Автор репозитория, конструктора, галереи,
шаблона сайта и дизайнов в `designs/own/` и палитр в `catalog/designs.json` (номера 1-50): Куралай.

## Заимствованная структура

Формат агентского репозитория (точки входа `CLAUDE.md` и `AGENTS.md`, пошаговый контракт с остановками, файлы-замки этапов, сторож секретов)
повторяет Platform Builder Куралай. Тот, в свою очередь, адаптирован из **Reels Pipeline Automontaj** (@saint4ai, onAI Academy),
https://github.com/saint4ai/reels-pipline-automotaj, лицензия MIT. Скрипты `scripts/check-secrets.sh`, `scripts/hooks/*` и
`.github/workflows/secret-scan.yml` взяты оттуда с минимальными правками. Текст лицензии лежит в `THIRD_PARTY_NOTICES.md`.

## Шаблоны с GitHub (`designs/external/`)

Каждый шаблон лежит в своей папке вместе с файлом лицензии автора. Условия авторов остаются в силе. Перечень приведён в `THIRD_PARTY_NOTICES.md`.

## Шрифты

Шрифты подключаются с Google Fonts и распространяются под лицензией SIL Open Font License.
