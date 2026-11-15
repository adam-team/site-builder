---
name: site-workflow
description: Use at the start of every new website project in this repository ("сделай сайт", "лендинг", "сайт-визитка", "новый проект", "хочу сайт", "выбрать дизайн сайта"). Runs the staged questionnaire one question at a time (topic, structure — existing or co-created in structure/index.html, design picker in the YouTube-style gallery/index.html, content), writes BRIEF/STRUCTURE/DESIGN/CONTENT and site.json, then builds the site with scripts/build_site.py or by adapting a ready template.
---

# Этапы сборки сайта

Полный порядок: `docs/agent-contract/WORKFLOW.md`. Вопросы с вариантами: `docs/agent-contract/QUESTIONS.md`.

1. **Окружение:** `bash scripts/bootstrap.sh`, затем `bash scripts/new-project.sh <id>`.
2. **Тема ⏸:** кто, что продаёт, кто посетитель, одно главное действие, язык → `BRIEF.md`.
3. **Структура ⏸:** «Есть ли у тебя структура?» Если есть, разложи по блокам `structure/presets.json`. Если нет, конструктор `structure/index.html`
   или `scripts/structure.py preset <тема>`. Затем `scripts/structure.py write`.
4. **Дизайн ⏸:** Дизайн-тека `gallery/index.html` (89 видео). `scripts/catalog.py <номер>` покажет тип: tokens, own, external или fetch → `DESIGN.md`.
5. **Тексты ⏸:** по блокам → `CONTENT.md`, `content` в `site.json`.
6. **Сборка:** tokens через `scripts/build_site.py projects/<id>`, остальные через копию шаблона в `projects/<id>/site/` и адаптацию.
7. **Проверка и запуск ⏸.**

Задавай один вопрос за раз, с вариантами, после ответа пиши «Поняла так: … Верно?». Без трёх файлов (`BRIEF`, `STRUCTURE`, `DESIGN`) код не трогаешь.
