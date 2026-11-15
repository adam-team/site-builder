#!/usr/bin/env python3
"""Презентация урока «Дизайн сайта» в стиле брендбука Kuralay v2: квадратные слайды 1080×1080 → PDF.

  python3 docs/presentation/build.py      → docs/lesson-presentation.pdf (+ .html рядом)

Картинки: docs/presentation/img/ и обложки gallery/media/<номер>.jpg. Стиль: docs/presentation/style.css
(тот же, что у презентаций «Брендбук» и «Дизайн: как выбрать стиль»). Нужен Google Chrome.
"""
import os
import shutil
import subprocess
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
CHROME = os.environ.get("CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
REPO = "github.com/adam-team/site-builder"
TAG = "урок 6.4 · дизайн сайта"
OUT = os.path.join(ROOT, "docs", "lesson-presentation.pdf")

IMG = lambda name: "file://" + os.path.join(HERE, "img", name)
TH = lambda n: "file://" + os.path.join(ROOT, "gallery", "media", f"{n}.jpg")


def pic(src, h=None, st=""):
    hh = f"height:{h}px;" if h else ""
    return f'<div class="img" style="{hh}{st}"><img src="{src}" style="width:100%;object-fit:cover;object-position:top"></div>'


def thumbs(nums, cols=4, label=True):
    cells = "".join(
        f'<div><div class="img"><img src="{TH(n)}"></div>' + (f'<p class="mono sm" style="margin-top:6px">№{n}</p>' if label else "") + "</div>"
        for n in nums)
    return f'<div class="grid" style="grid-template-columns:repeat({cols},1fr);gap:14px">{cells}</div>'


SLIDES = [
    {"theme": "dark", "center": True, "html": f'''
      <div class="sub">модуль 6 · сайты и лендинги</div>
      <h1>Дизайн сайта: <span class="hl">89 дизайнов</span> в видео и сайт вместе с агентом</h1>
      <p class="mut">Тема → структура → дизайн из видео-галереи → тексты → готовый сайт в интернете. Без программиста и без дизайнера.</p>
      <p class="mono" style="font-size:24px"><span class="ac">></span> {REPO}</p>'''},
    {"html": '''
      <h2>Что получите <span class="hl">за урок</span></h2>
      <ul class="steps">
        <li><i>01</i><div><b>Структуру сайта</b><p>свою или собранную вместе в конструкторе: какие блоки и в каком порядке</p></div></li>
        <li><i>02</i><div><b>Дизайн из 89 вариантов</b><p>смотрите видео как на YouTube и выбираете номер</p></div></li>
        <li><i>03</i><div><b>Тексты по блокам</b><p>агент спрашивает, вы отвечаете, цены и отзывы только ваши</p></div></li>
        <li><i>04</i><div><b>Готовый сайт по ссылке</b><p>с анимациями, на телефоне и компьютере, на Vercel</p></div></li>
      </ul>'''},
    {"theme": "cream", "html": '''
      <h2>Что внутри <span class="hl">кода на GitHub</span></h2>
      <div class="grid g3">
        <div class="card"><div class="big" style="font-size:110px">89</div><b>дизайнов</b><span>у каждого видео-превью и живой сайт</span></div>
        <div class="card"><div class="big" style="font-size:110px">10</div><b>тем сайтов</b><span>эксперт, школа, услуги, кафе, IT…</span></div>
        <div class="card"><div class="big" style="font-size:110px">15</div><b>блоков</b><span>от первого экрана до контактов</span></div>
        <div class="card"><div class="big" style="font-size:110px">38</div><b>шрифтов</b><span>с проверкой казахских букв</span></div>
        <div class="card"><div class="big" style="font-size:110px">6</div><b>видов карточек</b><span>стекло, глина, брутализм, контур…</span></div>
        <div class="card"><div class="big" style="font-size:110px">4</div><b>анимации</b><span>подъём, проявление, приближение, 3D</span></div>
      </div>'''},
    {"theme": "dark", "html": '''
      <h2>7 этапов <span class="hl">с агентом</span></h2>
      <table style="background:var(--graph);color:var(--cream)"><tr><th>этап</th><th>что происходит</th></tr>
      <tr><td>1 тема</td><td>чем занимаетесь, кто посетитель, одно главное действие</td></tr>
      <tr><td>2 структура</td><td>есть своя — раскладываем по блокам, нет — собираем в конструкторе</td></tr>
      <tr><td>3 дизайн</td><td>Дизайн-тека: 89 видео, выбираете до трёх номеров</td></tr>
      <tr><td>4 тексты</td><td>по блокам сверху вниз, черновики агента только с вашим «да»</td></tr>
      <tr><td>5 сборка</td><td>агент собирает сайт по трём файлам: структура, дизайн, тексты</td></tr>
      <tr><td>6 проверка</td><td>скриншоты компьютера и телефона, поиск заглушек</td></tr>
      <tr><td>7 запуск</td><td>Vercel, GitHub Pages или архив</td></tr></table>
      <p class="sm mut">На каждом этапе агент задаёт один вопрос с вариантами и ждёт ответа.</p>'''},
    {"theme": "red", "center": True, "html": '<div class="num">01</div><h1>Структура</h1><p>сначала каркас, потом красота</p>'},
    {"html": '''
      <h2>Первый вопрос: <span class="hl">есть структура?</span></h2>
      <div class="grid g2">
        <div class="card"><div class="k">да, есть план</div><b>Присылаете текст, файл или ссылку</b>
          <span>Агент раскладывает его по 15 блокам, показывает список «Так?» и записывает STRUCTURE.md.</span></div>
        <div class="card"><div class="k">нет плана</div><b>Собираем вместе в конструкторе</b>
          <span>Выбираете тему, размер и блоки галочками. Справа сразу видно сайт на телефоне.</span></div>
      </div>
      <div class="win"><div class="bar"><i></i><i></i><i></i><span>чат с агентом</span></div>
        <p style="padding:22px 26px" class="sm">«У тебя уже есть структура сайта: план блоков, документ или пример? 1) да, пришлю 2) нет, соберём в конструкторе 3) предложи сама»</p></div>'''},
    {"theme": "cream", "html": f'''
      <h2>Конструктор <span class="hl">структуры</span></h2>
      {pic(IMG("structure.jpg"), 600)}
      <p class="sm mut">structure/index.html · 10 тем, 3 размера (мини, полный, визитка), стрелки меняют порядок, кнопка «Скопировать для агента».</p>'''},
    {"html": '''
      <h2>Порядок <span class="hl">продающей</span> страницы</h2>
      <ul class="steps">
        <li><i>01</i><div><b>Внимание</b><p>первый экран: что это, для кого, какая кнопка — за 3 секунды</p></div></li>
        <li><i>02</i><div><b>Доверие</b><p>обо мне, логотипы, цифры</p></div></li>
        <li><i>03</i><div><b>Ценность</b><p>услуги, программа, преимущества</p></div></li>
        <li><i>04</i><div><b>Доказательства → решение</b><p>отзывы перед ценами, вопросы после цен</p></div></li>
        <li><i>05</i><div><b>Действие</b><p>призыв и контакты, одна кнопка во всей странице</p></div></li>
      </ul>'''},
    {"theme": "red", "center": True, "html": '<div class="num">02</div><h1>Дизайн-тека</h1><p>89 дизайнов в видео, как на YouTube</p>'},
    {"theme": "dark", "html": f'''
      <h2>Выбор <span class="hl">глазами</span>, а не по описанию</h2>
      {pic(IMG("gallery.jpg"), 590)}
      <p class="sm mut">Наведите на обложку — играет превью. Вкладки: Мои дизайны · Платформы · Тренды 2026 · GitHub · Тёмные · Светлые.</p>'''},
    {"html": f'''
      <h2>Видео, живой сайт и <span class="hl">«Выбрать»</span></h2>
      {pic(IMG("watch.jpg"), 590)}
      <p class="sm mut">До трёх номеров → «Скопировать для агента» → вставить в чат. Агент соберёт образцы на вашей структуре.</p>'''},
    {"theme": "cream", "html": f'''
      <h2>4 группы <span class="hl">дизайнов</span></h2>
      <div class="grid g2">
        <div class="card">{pic(TH(1))}<div class="k">1–8 · мои дизайны</div><span>BOSS VISION, PERSONA, лендинг интенсива, тест телесного терапевта</span></div>
        <div class="card">{pic(TH(20))}<div class="k">9–40 · дизайны платформ</div><span>32 палитры: финансы, брендбук Куралай, подбор персонала</span></div>
        <div class="card">{pic(TH(42))}<div class="k">41–50 · тренды 2026</div><span>Bento, Liquid Glass, брутализм, люкс, нуар, степь</span></div>
        <div class="card">{pic(TH(60))}<div class="k">51–89 · GitHub</div><span>39 готовых шаблонов с открытой лицензией</span></div>
      </div>'''},
    {"theme": "dark", "html": f'''
      <h2>1–8 · <span class="hl">мои дизайны</span></h2>
      {thumbs(range(1, 9), 4)}
      <p class="sm mut">Готовый код лежит в designs/own/: агент копирует его и меняет тексты, цвета и блоки под вас.</p>'''},
    {"html": f'''
      <h2>41–50 · <span class="hl">тренды 2026</span></h2>
      {thumbs(range(41, 51), 5)}
      <p class="sm mut">Bento · Liquid Glass · Необрутализм · Люкс · Аврора · Швейцарский · Глина · Нуар · Степь · Мята</p>'''},
    {"theme": "cream", "html": f'''
      <h2>51–89 · <span class="hl">шаблоны с GitHub</span></h2>
      {pic(IMG("github.jpg"))}
      <p>21 лендинг awesome-landing-pages, Start Bootstrap, Creative Tim, Landwind, shadcn, Next SaaS, Tailblocks, Cruip.</p>
      <p class="sm mut">Код лежит внутри репозитория вместе с лицензиями MIT. Cruip скачивается отдельной командой: его лицензия запрещает хранить копии.</p>'''},
    {"theme": "dark", "html": '''
      <h2>Что смотреть <span class="hl">под нишу</span></h2>
      <table style="background:var(--graph);color:var(--cream)"><tr><th>ваша ниша</th><th>номера</th></tr>
      <tr><td>психолог, коуч</td><td>45 Аврора · 37 Мягкий коралл · 39 Спокойная природа</td></tr>
      <tr><td>онлайн-школа</td><td>43 Необрутализм · 47 Глина · 6 Лендинг интенсива</td></tr>
      <tr><td>IT, ИИ-сервис</td><td>41 Bento · 42 Liquid Glass · 38 Тёмный техно</td></tr>
      <tr><td>премиум, недвижимость</td><td>44 Люкс · 20 Obsidian Gold · 19 Ivory &amp; Bronze</td></tr>
      <tr><td>клиника, здоровье</td><td>50 Чистая мята · 36 Деловой синий</td></tr>
      <tr><td>кафе, казахский бренд</td><td>49 Степь-орнамент · 24 Dala / Steppe</td></tr>
      <tr><td>мероприятие, фото</td><td>48 Кино-нуар · 46 Швейцарский журнал</td></tr></table>
      <p class="sm mut">Или скажите агенту настроение: «тёмный», «нежный», «как у Apple» — он предложит 3 номера.</p>'''},
    {"html": '''
      <h2>Палитра или <span class="hl">готовый шаблон</span></h2>
      <div class="grid g2">
        <div class="card"><div class="k">9–50 · палитра</div><b>Сайт по вашей структуре</b>
          <span>Агент берёт цвета, шрифты и анимации дизайна и собирает сайт одной командой. Быстрее всего, блоки любые.</span></div>
        <div class="card"><div class="k">1–8, 51–89 · шаблон</div><b>Готовый сайт целиком</b>
          <span>Агент копирует код и переделывает под вас. Хорошо, когда структура шаблона почти совпадает с вашей.</span></div>
      </div>
      <div class="chips"><span class="f">первый экран: 4 вида</span><span>карточки: 6 видов</span><span>анимации: 4</span><span>шрифты: любые из 38</span></div>
      <p class="sm mut">Можно смешать: «цвета от 45, первый экран от 41».</p>'''},
    {"theme": "cream", "html": f'''
      <h2>Одна структура — <span class="hl">разный</span> дизайн</h2>
      <div class="row">{pic(IMG("demo41.jpg"), 640)}{pic(IMG("demo43.jpg"), 640)}</div>
      <p class="sm mut">№41 Bento-сетка и №43 Необрутализм: тот же шаблон, другие цвета, шрифты, карточки и анимации.</p>'''},
    {"theme": "red", "center": True, "html": '<div class="num">03</div><h1>Тексты и запуск</h1><p>от слов к ссылке на сайт</p>'},
    {"html": '''
      <h2>Тексты, которые <span class="hl">продают</span></h2>
      <ul class="steps">
        <li><i>01</i><div><b>Заголовок = результат клиента</b><p>«Вернёте спокойствие без долгих лет терапии», а не «Консультации психолога»</p></div></li>
        <li><i>02</i><div><b>Кнопка называет действие</b><p>«Записаться на консультацию», а не «Отправить»</p></div></li>
        <li><i>03</i><div><b>Цифры и отзывы только настоящие</b><p>агент их не выдумывает и ставит пометку ЗАПОЛНИТЬ</p></div></li>
        <li><i>04</i><div><b>Вопросы из переписки</b><p>что клиенты спрашивают перед покупкой</p></div></li>
      </ul>'''},
    {"theme": "dark", "html": '''
      <h2>Установка <span class="hl">одним сообщением</span></h2>
      <div class="win term" style="background:var(--black);color:var(--cream)"><div class="bar"><i></i><i></i><i></i><span>Claude Code · пустая папка</span></div>
      <pre>Склонируй репозиторий <u>https://github.com/adam-team/site-builder</u>
в папку site-builder, подготовь окружение по SETUP.md
и сразу начни опрос по docs/agent-contract/WORKFLOW.md.
Я хочу сайт с красивым дизайном. Спрашивай по одному
вопросу, с вариантами ответа.</pre></div>
      <p class="sm mut">Репозиторий приватный: сначала получите доступ у Куралай. Python, Node и Chrome агент проверит и поставит сам.</p>'''},
    {"theme": "cream", "html": '''
      <h2>Команды, если <span class="hl">агент сбился</span></h2>
      <div class="win term" style="background:var(--black);color:var(--cream)"><div class="bar"><i></i><i></i><i></i><span>шпаргалка</span></div>
      <pre><u>/site</u>                                  начать или продолжить
open structure/index.html              конструктор структуры
open gallery/index.html                Дизайн-тека
python3 scripts/catalog.py find тёмный  подобрать номера
python3 scripts/build_site.py projects/имя   собрать сайт
bash scripts/check-site.sh projects/имя/site проверить</pre></div>
      <p class="sm mut">Или просто: «Остановись. Прочитай CLAUDE.md и WORKFLOW.md, скажи, на каком мы этапе, и продолжай по одному вопросу».</p>'''},
    {"html": '''
      <h2>Задание <span class="hl">урока</span></h2>
      <ul class="steps">
        <li><i>01</i><div><b>Установить site-builder</b><p>сообщением со слайда 21</p></div></li>
        <li><i>02</i><div><b>Пройти этапы 1–2</b><p>BRIEF.md и STRUCTURE.md готовы</p></div></li>
        <li><i>03</i><div><b>Выбрать 3 дизайна в Дизайн-теке</b><p>и сравнить образцы на своей структуре</p></div></li>
        <li><i>04</i><div><b>Собрать и опубликовать</b><p>прислать ссылку на сайт в чат курса</p></div></li>
      </ul>'''},
    {"theme": "red", "center": True, "html": f'''
      <h2>Всё для урока — <span class="hl">в материалах</span></h2>
      <div class="grid g3">
        <div class="card" style="color:var(--black)"><div class="k">pdf</div><b>Эта презентация</b><span>кнопка «Презентация» вверху урока</span></div>
        <div class="card" style="color:var(--black)"><div class="k">github</div><b>Код site-builder</b><span>{REPO}</span></div>
        <div class="card" style="color:var(--black)"><div class="k">видео</div><b>Дизайн-тека онлайн</b><span>89 дизайнов сайтов в видео</span></div>
      </div>
      <p>Следующий урок модуля: такая же обучалка для <b>презентаций</b> с 3D-переходами.</p>'''},
]


def slide(s, i, n):
    th = {"light": "", "cream": "cr", "dark": "dk", "red": "rd"}[s.get("theme", "light")]
    return (f'<section class="s {th}"><div class="top"><b>{TAG}</b><span>{i:02d} / {n:02d}</span></div>'
            f'<div class="in {"c" if s.get("center") else ""}">{s["html"]}</div>'
            f'<div class="bot"><span>@kuraylife</span><span>{REPO}</span></div></section>')


def main():
    css = open(os.path.join(HERE, "style.css"), encoding="utf-8").read()
    body = "".join(slide(s, i + 1, len(SLIDES)) for i, s in enumerate(SLIDES))
    page = f'<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Дизайн сайта</title><style>{css}</style></head><body>{body}</body></html>'
    tmp = tempfile.mkdtemp()
    src = os.path.join(tmp, "deck.html")
    open(src, "w", encoding="utf-8").write(page)
    pdf = os.path.join(tmp, "deck.pdf")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--allow-file-access-from-files", f"--user-data-dir={tmp}/ud",
                    "--no-pdf-header-footer", "--virtual-time-budget=20000", f"--print-to-pdf={pdf}", "file://" + src],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=600)
    shutil.copy(pdf, OUT)
    shutil.copy(src, os.path.join(HERE, "deck.html"))
    print(len(SLIDES), "слайдов →", OUT)


if __name__ == "__main__":
    main()
