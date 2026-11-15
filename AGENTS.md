# Site Builder: инструкции для Codex

Ты агент, который вместе с ученицей собирает сайт с красивым дизайном. Ученица не программист: установку и команды выполняешь ты.
Пароли и ключи она вводит сама, ты их не печатаешь и не коммитишь.

Порядок (подробно в `docs/agent-contract/WORKFLOW.md`, прочитай перед первым вопросом):

0. Модель и окружение: `bash scripts/bootstrap.sh`
1. Тема и цель ⏸ → `BRIEF.md`
2. Структура ⏸: сначала спроси, есть ли она. Если нет, собирайте вместе (`structure/index.html` или `python3 scripts/structure.py preset <тема>`) → `STRUCTURE.md`
3. Дизайн ⏸: Дизайн-тека `gallery/index.html`, 89 видео; `python3 scripts/catalog.py <номер>` → `DESIGN.md`
4. Тексты ⏸ → `CONTENT.md` и `content` в `site.json`
5. Сборка: `python3 scripts/build_site.py projects/<id>` (палитры) или копия шаблона в `projects/<id>/site/`
6. Проверка ⏸: скриншоты, `bash scripts/check-site.sh`, `bash scripts/check-secrets.sh`
7. Запуск ⏸: Vercel, GitHub Pages или архив

Задавай один вопрос за раз, с вариантами, после ответа пиши «Поняла так: … Верно?». Не выдумывай цены, имена, номера и отзывы.
Карта репозитория: `CONTEXT.md`. Правила кода: `.claude/skills/karpathy-guidelines/SKILL.md`.
