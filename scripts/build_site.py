#!/usr/bin/env python3
"""Собирает сайт из трёх решений ученицы: структура + дизайн + контент.

  python3 scripts/build_site.py projects/<id>                 # настоящий сайт → projects/<id>/site/index.html
  python3 scripts/build_site.py --demo <номер> [--preset expert] --out <папка>   # образец дизайна (для превью)

projects/<id>/site.json:
  {"design": 45, "preset": "expert", "blocks": ["hero", ...], "content": {...}}
Чего нет в content, берётся из образца темы (structure/presets.json) и попадает в список «ЗАПОЛНИТЬ» в конце вывода.
Работает только для дизайнов kind=tokens. Готовые шаблоны (own, external) агент адаптирует руками по docs/agent-contract/WORKFLOW.md.
Без внешних зависимостей: только Python 3.
"""
import html
import re
import json
import os
import shutil
import sys
import urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESIGNS = json.load(open(os.path.join(ROOT, "catalog", "designs.json"), encoding="utf-8"))
FONTS = {f["name"]: f for f in json.load(open(os.path.join(ROOT, "catalog", "fonts.json"), encoding="utf-8"))}
PRESETS = json.load(open(os.path.join(ROOT, "structure", "presets.json"), encoding="utf-8"))
E = html.escape

ICONS = [  # простые линейные иконки, свои
    '<path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
    '<path d="M4 19V5m0 14h16M8 15l4-4 3 3 5-6"/>',
    '<path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z"/>',
    '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M8 2v4m8-4v4"/>',
    '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
]
CHECK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12l5 5 9-11"/></svg>'


def icon(i):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{ICONS[i % len(ICONS)]}</svg>'


def design_by(n):
    for d in DESIGNS:
        if str(d["n"]) == str(n) or d["id"] == str(n):
            return d
    sys.exit(f"нет дизайна {n}. Список: python3 scripts/catalog.py")


def font_url(t, kk=False):
    fams = {}
    for key, w in (("fh", t.get("fh_w", 700)), ("fb", 400)):
        name = t[key]
        if kk and not FONTS.get(name, {}).get("kk", True):
            name = FONTS[name].get("kk_alt", name)
            t[key] = name
        ws = set(FONTS.get(name, {}).get("weights", [400, 700]))
        want = {w, 400, 600, 700} & ws or ws
        fams.setdefault(name, set()).update(want)
    q = "&".join("family=" + urllib.parse.quote(n).replace("%20", "+") + ":wght@" + ";".join(map(str, sorted(ws))) for n, ws in fams.items())
    return "https://fonts.googleapis.com/css2?" + q + "&display=swap"


def fstack(name):
    t = FONTS.get(name, {}).get("type", "sans")
    return f"'{name}'," + ("Georgia,serif" if t == "serif" else "system-ui,sans-serif")


def root_vars(t):
    return (":root{" + f"--bg:{t['bg']};--surface:{t['surface']};--text:{t['text']};--muted:{t['muted']};--brand:{t['brand']};"
            f"--brand-dark:{t['brand_dark']};--brand-soft:{t['brand_soft']};--accent:{t['accent']};--on-brand:{t['on_brand']};"
            f"--r:{t['radius']}px;--fh:{fstack(t['fh'])};--fb:{fstack(t['fb'])};--fh-w:{t.get('fh_w', 700)};"
            f"color-scheme:{'dark' if t.get('dark') else 'light'}" + "}")


# ---------- контент: образец + то, что дала ученица ----------
def fill(preset_id, content):
    p = PRESETS["presets"][preset_id]
    d = dict(p["demo"])
    items = d["items"]
    demo = {
        "brand": d["brand"], "kicker": d["kicker"], "title": d["title"], "sub": d["sub"], "cta": d["cta"], "cta2": d["cta2"],
        "cta_link": "#contacts",
        "trust": ["Forbes KZ", "Tengri", "Astana Hub", "Kaspi", "BI Group"],
        "about_title": "Почему мне доверяют",
        "about": f"{d['brand']}: здесь коротко история, опыт и подход. Два-три предложения о том, чем вы отличаетесь и почему клиенту с вами спокойно.",
        "about_points": ["Опыт и образование", "Личный подход к каждому", "Понятный результат и сроки"],
        "items": [{"title": t, "text": "Одно-два предложения: что получит клиент и чем это полезно."} for t in items],
        "benefits": [{"title": t, "text": "Короткое объяснение выгоды простыми словами."} for t in ["Быстро", "Бережно", "С гарантией", "Онлайн и офлайн"]],
        "steps": [{"title": t, "text": "Что происходит на этом шаге."} for t in ["Заявка", "Знакомство", "План", "Результат"]],
        "stats": [{"value": v, "label": l} for v, l in [("9 лет", "опыт"), ("1 200+", "клиентов"), ("4.9", "средняя оценка"), ("24/7", "на связи")]],
        "program": [{"title": t, "text": "Что разбираем и какое задание выполняем."} for t in items],
        "testimonials": [{"name": n, "text": t, "demo": True} for n, t in [("Алия", "Пришла с одной задачей, ушла с тремя решениями. Очень понятно и спокойно."),
                                                            ("Дана", "Всё по делу, без воды. Результат увидела уже на первой неделе."),
                                                            ("Ержан", "Рекомендую друзьям: внимательно, вовремя и с душой.")]],
        "prices": [{"name": "Старт", "price": "15 000 ₸", "points": ["Одна встреча", "Материалы", "Чат 3 дня"]},
                   {"name": "Оптимальный", "price": "45 000 ₸", "points": ["4 встречи", "Материалы", "Чат месяц", "Разбор итогов"], "hot": True},
                   {"name": "VIP", "price": "120 000 ₸", "points": ["Всё из «Оптимального»", "Личный план", "Связь в любое время"]}],
        "team": [{"name": n, "role": r} for n, r in [("Имя Фамилия", "Основатель"), ("Имя Фамилия", "Специалист"), ("Имя Фамилия", "Менеджер")]],
        "faq": [{"q": q, "a": "Короткий честный ответ, который снимает сомнение."} for q in
                ["Сколько это стоит?", "Как проходит работа?", "Что если не подойдёт?", "Можно ли онлайн?", "Как записаться?"]],
        "cta_title": "Готовы начать?",
        "cta_text": "Оставьте заявку, и мы ответим в течение часа.",
        "contacts": {"whatsapp": "77000000000", "telegram": "username", "instagram": "username", "email": "hello@example.com", "address": "Город, улица, дом"},
        "gallery": ["Работа 1", "Работа 2", "Работа 3", "Работа 4", "Работа 5"],
    }
    missing = [k for k in demo if k not in content]
    out = dict(demo, **content)
    return out, missing


# ---------- блоки ----------
def head(title, sub, center=False, kicker=""):
    k = f'<span class="kicker">{E(kicker)}</span>' if kicker else ""
    s = f'<p class="lead">{E(sub)}</p>' if sub else ""
    return f'<div class="sec-head rv{" center" if center else ""}">{k}<h2>{E(title)}</h2>{s}</div>'


def art(label="", orbs=True):
    o = '<span class="orb" style="width:120px;height:120px;left:12%;top:14%"></span><span class="orb" style="width:70px;height:70px;right:16%;top:52%;animation-delay:-3s"></span>' if orbs else ""
    return f'<div class="art rv" data-label="{E(label)}">{o}</div>'


def b_hero(c, lay):
    btns = f'<div class="btns"><a class="btn btn-main" href="{E(c["cta_link"])}">{E(c["cta"])}</a><a class="btn btn-ghost" href="#more">{E(c["cta2"])}</a></div>'
    text = f'<span class="kicker rv">{E(c["kicker"])}</span><h1 class="rv">{E(c["title"])}</h1><p class="lead rv">{E(c["sub"])}</p>{btns}'
    if lay == "bento":
        st = c["stats"][:2]
        tiles = "".join(f'<div class="tile rv"><b>{E(s["value"])}</b><span class="muted">{E(s["label"])}</span></div>' for s in st)
        return (f'<section class="hero"><div class="wrap grid"><div class="main">{text}</div>'
                f'<div class="tile big rv">{art(c["brand"])}</div>{tiles}'
                f'<div class="tile rv" style="grid-column:span 2"><b style="font-size:22px">{E(c["items"][0]["title"])}</b><span class="muted">{E(c["items"][0]["text"])}</span></div></div></section>')
    if lay == "split":
        return f'<section class="hero"><div class="wrap grid"><div>{text}</div>{art("Ваше фото")}</div></section>'
    return f'<section class="hero"><div class="wrap"><div class="grid" style="display:block">{text}</div>{art("Ваше фото или видео")}</div></section>'


def b_trust(c, _):
    return '<section class="trust"><div class="wrap row">' + "".join(f'<span>{E(t)}</span>' for t in c["trust"]) + "</div></section>"


def b_about(c, _):
    pts = "".join(f"<li>{CHECK}<span>{E(p)}</span></li>" for p in c["about_points"])
    return (f'<section class="about" id="more"><div class="wrap grid">{art("Фото эксперта")}<div class="rv"><span class="kicker">О нас</span>'
            f'<h2>{E(c["about_title"])}</h2><p class="lead">{E(c["about"])}</p><ul>{pts}</ul></div></div></section>')


def cards(items, numbered=False):
    out = []
    for i, it in enumerate(items):
        top = f'<span class="num">0{i + 1}</span>' if numbered else f'<div class="ico">{icon(i)}</div>'
        out.append(f'<div class="card rv">{top}<h3>{E(it["title"])}</h3><p>{E(it["text"])}</p></div>')
    return '<div class="cards">' + "".join(out) + "</div>"


def b_benefits(c, _):
    return f'<section class="alt"><div class="wrap">{head("Почему выбирают нас", "Коротко о главном: за что клиенты возвращаются и советуют друзьям.", True)}{cards(c["benefits"])}</div></section>'


def b_services(c, _):
    return f'<section id="services"><div class="wrap">{head("Услуги", "Выберите то, что нужно именно вам.", kicker="Что мы делаем")}{cards(c["items"], True)}</div></section>'


def b_process(c, _):
    st = "".join(f'<div class="step rv"><h3>{E(s["title"])}</h3><p class="muted">{E(s["text"])}</p></div>' for s in c["steps"])
    return f'<section class="alt"><div class="wrap">{head("Как мы работаем", "Прозрачно, по шагам, без сюрпризов.", True)}<div class="steps">{st}</div></div></section>'


def b_stats(c, _):
    s = "".join(f'<div class="rv"><b>{E(x["value"])}</b><span>{E(x["label"])}</span></div>' for x in c["stats"])
    return f'<section class="stats"><div class="wrap row">{s}</div></section>'


def b_gallery(c, _):
    g = "".join(art(t, False) for t in c["gallery"])
    return f'<section><div class="wrap">{head("Работы", "Несколько примеров. Полное портфолио пришлём в мессенджер.")}<div class="gal">{g}</div></div></section>'


def b_program(c, _):
    p = "".join(f'<details class="rv"{" open" if i == 0 else ""}><summary><i>0{i + 1}</i>{E(x["title"])}</summary><p>{E(x["text"])}</p></details>'
                for i, x in enumerate(c["program"]))
    return f'<section id="program"><div class="wrap">{head("Программа", "Шаг за шагом от первого дня до результата.", kicker="Что внутри")}<div class="prog">{p}</div></div></section>'


def b_testimonials(c, _):
    q = "".join(f'<div class="q rv"><p>«{E(t["text"])}»</p><div class="who"><i>{E(t["name"][:1])}</i><div><b>{E(t["name"])}</b>'
                f'{"<div class=demo>пример отзыва</div>" if t.get("demo") else ""}</div></div></div>' for t in c["testimonials"])
    return f'<section class="alt"><div class="wrap">{head("Отзывы", "", True)}<div class="quotes">{q}</div></div></section>'


def b_pricing(c, _):
    out = []
    for p in c["prices"]:
        pts = "".join(f"<li>{E(x)}</li>" for x in p["points"])
        hot = p.get("hot")
        tag = '<span class="tag">Выбирают чаще</span>' if hot else ""
        out.append(f'<div class="price rv{" hot" if hot else ""}">{tag}<h3>{E(p["name"])}</h3><b>{E(p["price"])}</b><ul>{pts}</ul>'
                   f'<a class="btn {"btn-main" if hot else "btn-ghost"}" href="{E(c["cta_link"])}">Выбрать</a></div>')
    return f'<section id="prices"><div class="wrap">{head("Тарифы", "Цены указаны за весь формат, без доплат.", True)}<div class="prices">{"".join(out)}</div></div></section>'


def b_team(c, _):
    t = "".join(f'<div class="rv">{art("", False)}<h3>{E(m["name"])}</h3><p class="muted">{E(m["role"])}</p></div>' for m in c["team"])
    return f'<section><div class="wrap">{head("Команда", "Люди, которые будут работать с вами.", True)}<div class="team">{t}</div></div></section>'


def b_faq(c, _):
    f = "".join(f'<details class="rv"><summary>{E(x["q"])}</summary><p>{E(x["a"])}</p></details>' for x in c["faq"])
    return f'<section class="alt"><div class="wrap">{head("Вопросы и ответы", "", True)}<div class="faq">{f}</div></div></section>'


def b_cta(c, _):
    return (f'<section><div class="wrap"><div class="cta-box rv"><h2>{E(c["cta_title"])}</h2><p class="lead">{E(c["cta_text"])}</p>'
            f'<div class="btns" style="justify-content:center"><a class="btn btn-main" href="{E(c["cta_link"])}">{E(c["cta"])}</a></div></div></div></section>')


def b_contacts(c, _):
    k = c["contacts"]
    links = []
    if k.get("whatsapp"): links.append(f'<a href="https://wa.me/{E(k["whatsapp"])}">{icon(1)} WhatsApp</a>')
    if k.get("telegram"): links.append(f'<a href="https://t.me/{E(k["telegram"])}">{icon(5)} Telegram</a>')
    if k.get("instagram"): links.append(f'<a href="https://instagram.com/{E(k["instagram"])}">{icon(3)} Instagram</a>')
    if k.get("email"): links.append(f'<a href="mailto:{E(k["email"])}">{icon(4)} {E(k["email"])}</a>')
    if k.get("address"): links.append(f'<a href="#">{icon(0)} {E(k["address"])}</a>')
    wa = E(k.get("whatsapp", ""))
    form = (f'<form class="rv" onsubmit="event.preventDefault();var t=encodeURIComponent(this.n.value+\': \'+this.m.value);'
            f'window.open(\'https://wa.me/{wa}?text=\'+t)"><h3>Оставить заявку</h3><input name="n" placeholder="Имя" required>'
            f'<input name="p" placeholder="Телефон" type="tel"><textarea name="m" rows="3" placeholder="Что вас интересует?"></textarea>'
            f'<button class="btn btn-main" type="submit">Отправить в WhatsApp</button></form>')
    return (f'<section class="contacts" id="contacts"><div class="wrap">{head("Контакты", "Ответим в течение часа в рабочее время.")}'
            f'<div class="grid"><div class="list rv">{"".join(links)}</div>{form}</div></div></section>')


BLOCKS = {k[2:]: v for k, v in globals().items() if k.startswith("b_")}

JS = """<script>
document.documentElement.classList.add('js');document.body.classList.add('js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*80+'ms';io.observe(el)});
setTimeout(function(){document.querySelectorAll('.rv:not(.on)').forEach(function(el){var r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add('on')})},1200);
if(document.body.classList.contains('anim-tilt')&&matchMedia('(hover:hover)').matches){document.querySelectorAll('.card,.price,.q').forEach(function(c){
c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
c.style.transform='perspective(700px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) translateY(-4px)'});
c.addEventListener('mouseleave',function(){c.style.transform=''})})}
</script>"""


def render(design, preset_id, blocks, content, kk=False):
    t = dict(design["tokens"])
    lay = design.get("layout", {})
    furl = font_url(t, kk)
    c, missing = fill(preset_id, content)
    labels = {"about": "О нас", "services": "Услуги", "program": "Программа", "benefits": "Преимущества", "gallery": "Работы",
              "process": "Как работаем", "pricing": "Цены", "team": "Команда", "faq": "Вопросы", "contacts": "Контакты"}
    menu = "".join(f'<a href="#{b}">{labels[b]}</a>' for b in [b for b in blocks if b in labels][-5:])
    parts = []
    for b in blocks:
        if b not in BLOCKS:
            continue
        h = BLOCKS[b](c, lay.get("hero", "split"))
        i = h.index(">")  # у каждого блока id = его код, чтобы работали меню и якоря
        head_tag = re.sub(r'\sid="[^"]*"', "", h[:i])
        parts.append(f'{head_tag} id="{b}"{h[i:]}')
    body = "".join(parts)
    nxt = next((b for b in blocks[1:] if b in BLOCKS), "contacts")
    body = body.replace('href="#more"', f'href="#{nxt}"')
    cls = f'hero-{lay.get("hero", "split")} cards-{lay.get("cards", "soft")} anim-{lay.get("anim", "rise")}'
    css = open(os.path.join(ROOT, "template", "site.css"), encoding="utf-8").read()
    page = f"""<!doctype html>
<html lang="{'kk' if kk else 'ru'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{E(c['brand'])}</title><meta name="description" content="{E(c['sub'])}">
<!-- дизайн №{design['n']} «{E(design['name'])}», собрано scripts/build_site.py -->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{furl}" rel="stylesheet" media="print" onload="this.media='all'"><noscript><link href="{furl}" rel="stylesheet"></noscript>
<style>{root_vars(t)}
{css}</style></head>
<body class="{cls}">
<header class="nav"><div class="wrap"><a class="logo" href="#"><i>{E(c['brand'][:1])}</i>{E(c['brand'])}</a><nav class="menu">{menu}</nav>
<a class="btn btn-main" href="{E(c['cta_link'])}">{E(c['cta'].split()[0])}</a></div></header>
<main>{body}</main>
<footer><div class="wrap"><span>© {E(c['brand'])}</span><span>Сайт собран в Site Builder</span></div></footer>
{JS}
</body></html>"""
    return page, missing


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__); return
    if argv[0] == "--demo":
        n = argv[1]
        preset = argv[argv.index("--preset") + 1] if "--preset" in argv else None
        out = argv[argv.index("--out") + 1] if "--out" in argv else os.path.join(ROOT, "gallery", "live", n)
        d = design_by(n)
        if d["kind"] != "tokens":
            sys.exit(f"№{d['n']} это готовый шаблон, а не палитра: смотри {d.get('path') or d.get('url')}")
        preset = preset or guess_preset(d)
        blocks = PRESETS["presets"][preset]["blocks"]
        page, _ = render(d, preset, blocks, {})
        os.makedirs(out, exist_ok=True)
        open(os.path.join(out, "index.html"), "w", encoding="utf-8").write(page)
        print(os.path.join(out, "index.html")); return
    proj = argv[0].rstrip("/")
    cfg = json.load(open(os.path.join(proj, "site.json"), encoding="utf-8"))
    d = design_by(cfg["design"])
    if d["kind"] != "tokens":
        sys.exit(f"№{d['n']} «{d['name']}» это готовый шаблон. Его не собирают скриптом: агент копирует его в {proj}/site/ и меняет по WORKFLOW.md, этап 5.")
    if "tokens" in cfg:  # свои правки цветов и шрифтов поверх выбранного дизайна
        d = dict(d, tokens=dict(d["tokens"], **cfg["tokens"]))
    if "layout" in cfg:
        d = dict(d, layout=dict(d.get("layout", {}), **cfg["layout"]))
    preset = cfg.get("preset", "expert")
    blocks = cfg.get("blocks") or PRESETS["presets"][preset]["blocks"]
    page, missing = render(d, preset, blocks, cfg.get("content", {}), cfg.get("lang") == "kk")
    site = os.path.join(proj, "site")
    os.makedirs(site, exist_ok=True)
    open(os.path.join(site, "index.html"), "w", encoding="utf-8").write(page)
    if not os.path.exists(os.path.join(site, "vercel.json")):
        shutil.copy(os.path.join(ROOT, "template", "vercel.json"), site)
    print("готово:", os.path.join(site, "index.html"))
    used = [m for m in missing if m in needed_fields(blocks)]
    if used:
        print("ЗАПОЛНИТЬ (сейчас стоит текст-образец):", ", ".join(used))


def needed_fields(blocks):
    need = {"brand", "kicker", "title", "sub", "cta", "cta2", "cta_link"}
    m = {"trust": ["trust"], "about": ["about_title", "about", "about_points"], "benefits": ["benefits"], "services": ["items"],
         "process": ["steps"], "stats": ["stats"], "gallery": ["gallery"], "program": ["program"], "testimonials": ["testimonials"],
         "pricing": ["prices"], "team": ["team"], "faq": ["faq"], "cta": ["cta_title", "cta_text"], "contacts": ["contacts"], "hero": ["stats", "items"]}
    for b in blocks:
        need.update(m.get(b, []))
    return need


def guess_preset(d):
    n = (d.get("niche", "") + " " + d.get("mood", "")).lower()
    for key, words in (("saas", ["it", "ии", "saas", "технолог", "приложен"]), ("school", ["школ", "обучен", "курс", "образован"]),
                       ("realestate", ["недвиж", "ипотек", "строит"]), ("services", ["клиник", "здоров", "салон", "стомат"]),
                       ("restaurant", ["кафе", "ресторан", "еда"]), ("event", ["мероприят", "ретрит"]), ("portfolio", ["фото", "портфолио", "агентств"]),
                       ("product", ["товар", "ювелир", "каталог", "магазин"]), ("personal", ["личный бренд", "блог", "спикер"])):
        if any(w in n for w in words):
            return key
    return "expert"


if __name__ == "__main__":
    main(sys.argv[1:])
