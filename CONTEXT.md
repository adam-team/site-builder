# Контекст: что здесь и как работать

## Порядок

0. Окружение → 1. Тема ⏸ → 2. Структура ⏸ → 3. Дизайн ⏸ → 4. Тексты ⏸ → 5. Сборка → 6. Проверка ⏸ → 7. Запуск ⏸.
Полный контракт: `docs/agent-contract/WORKFLOW.md`.

## Команды

| Команда | Что делает |
|---|---|
| `/site` | начинает или продолжает опрос |
| `bash scripts/bootstrap.sh` | проверяет Python, Node, Chrome, ffmpeg и собирает данные галереи и конструктора |
| `bash scripts/new-project.sh <id>` | создаёт `projects/<id>/` с заготовками |
| `python3 scripts/structure.py list` | темы и блоки |
| `python3 scripts/structure.py preset <тема>` | готовый порядок блоков для темы |
| `python3 scripts/structure.py write projects/<id> <structure.json или тема>` | записывает `STRUCTURE.md` и `blocks` в `site.json` |
| `python3 scripts/catalog.py [номер \| find слово \| md]` | каталог дизайнов |
| `python3 scripts/build_site.py projects/<id>` | собирает сайт из палитры + структуры + текстов |
| `python3 scripts/build_site.py --demo <номер> --preset <тема> --out <папка>` | образец дизайна на любой теме |
| `bash scripts/fetch-template.sh <номер> <папка>` | скачивает шаблон, который не хранится (Cruip) |
| `bash scripts/check-site.sh projects/<id>/site` | заглушки, «ЗАПОЛНИТЬ», тестовые номера |
| `bash scripts/check-secrets.sh` | ключи и запрещённые файлы в git |
| `cd tools && node record-previews.mjs [номера]` | записывает видео-превью новых дизайнов |
| `python3 scripts/build_gallery.py` | пересобирает `gallery/data.js` |

## Где что лежит

| Что | Где |
|---|---|
| Ответы ученицы | `projects/<id>/BRIEF.md`, `STRUCTURE.md`, `DESIGN.md`, `CONTENT.md`, `DECISIONS.md`, `site.json` |
| Готовый сайт ученицы | `projects/<id>/site/` |
| Темы и блоки | `structure/presets.json` (после правки: `python3 scripts/structure.py sync`) |
| Все дизайны | `catalog/designs.json` (после правки: `python3 scripts/catalog.py md` и `python3 scripts/build_gallery.py`) |
| Видео и обложки | `gallery/media/<номер>.mp4`, `.jpg` |
| Живые образцы палитр | `gallery/live/<номер>/index.html` |
| Код дизайнов Куралай | `designs/own/` |
| Код шаблонов с GitHub | `designs/external/<автор>--<репо>/` |
| Шаблон для палитр | `template/site.css`, блоки в `scripts/build_site.py` |
| Шрифты | `catalog/fonts.json` (38 шрифтов, проверка казахских букв) |

## Типы дизайнов

| Тип | Номера | Как применять |
|---|---|---|
| `own` | 1-8 | копия из `designs/own/` → `projects/<id>/site/`, замена текстов, цветов, блоков |
| `tokens` | 9-50 | `design: <номер>` в `site.json` → `build_site.py`. Можно переопределить `tokens` и `layout` |
| `external` | 51-87 | копия из `designs/external/` с `LICENSE` → адаптация; React/Next: `npm install && npm run build` |
| `fetch` | 88-89 | `scripts/fetch-template.sh`, код не коммитить в общий репозиторий |

## Правила

- Без `BRIEF.md`, `STRUCTURE.md`, `DESIGN.md` код не трогаешь.
- `designs/` и `template/` не правишь под ученицу: работаешь только в `projects/<id>/site/`.
- Секретов в git нет. Персональные данные клиентов ученицы в репозиторий не коммитишь.
- Не выдумываешь цены, номера, имена, отзывы и цифры.
- Правки хирургические: работающее не ломаешь и «заодно» ничего не улучшаешь.

## Экономия подписки

| Делай | Не делай |
|---|---|
| Один этап за раз | «Сделай всё сразу» |
| Ищи по `catalog/designs.json` через `scripts/catalog.py` | Не читай целиком `gallery/data.js`, `structure/presets.js` и шаблоны из `designs/external/` |
| Тексты правь пакетом | Не правь одну фразу отдельным запросом |
