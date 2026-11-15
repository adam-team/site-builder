#!/usr/bin/env python3
"""Одноразовая сборка catalog/designs.json из дизайнов platform-builder + новых трендовых + своих + GitHub.
После первого запуска правим уже сам catalog/designs.json; скрипт оставлен для истории."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
pb = json.load(open(sys.argv[1], encoding="utf-8"))  # ~/Projects/platform-builder/patterns/designs.json

out = []
def add(**k):
    k["n"] = len(out) + 1
    out.append(k)

# --- 1. Мои дизайны (готовые HTML) ---
own = [
  ("bv-10", "BOSS VISION: 10 вариантов", "own/boss-vision-variants/10-variants.html", "Десять концепций приложения подбора персонала на одной странице", "HR, приложение, бизнес", True),
  ("bv-v2", "BOSS VISION: дизайн v2", "own/boss-vision-variants/v2-variants.html", "Вторая версия: синий и золото, экраны приложения и письма", "HR, приложение", False),
  ("bv-v1", "BOSS VISION: первые варианты", "own/boss-vision-variants/variants.html", "Первые наброски бренда и интерфейса", "HR, приложение", False),
  ("bv-app", "BOSS VISION: экраны приложения", "own/boss-vision-app/index.html", "Готовое приложение: вход, кандидат, предприниматель, ночной режим, резюме, тест", "приложение, кабинет", False),
  ("glavnaya", "Главная страница эксперта", "own/glavnaya-site/index.html", "Сайт-визитка эксперта с анимациями", "эксперт, личный бренд", False),
  ("intensiv", "Лендинг интенсива", "own/intensiv-landing/index.html", "Продающий лендинг онлайн-интенсива: программа, тарифы, оплата", "курс, интенсив, школа", True),
  ("telesny", "Тест для телесного терапевта: варианты", "own/telesny-variants/index.html", "Варианты дизайна теста с интерактивной телесной картой", "психология, тест, здоровье", False),
  ("persona", "PERSONA: платформа подбора ассистентов", "own/persona-app/dist/index.html", "Платформа с ролями: ассистент и работодатель, тесты, тарифы", "платформа, HR, кабинет", False),
]
for id_, name, path, mood, niche, dark in own:
    add(id=id_, name=name, kind="own", group="own", path="designs/" + path, mood=mood, niche=niche, dark=dark,
        author="Куралай", license="свой")

# --- 2. Дизайны платформ (палитры platform-builder, рисуются шаблоном template/) ---
heroes = ["split", "center", "bold", "bento"]
cards = ["soft", "outline", "glass", "flat"]
anims = ["rise", "fade", "zoom", "tilt"]
for i, d in enumerate(pb):
    t = {k: d[k] for k in ("bg", "surface", "text", "muted", "brand", "brand_dark", "brand_soft", "accent", "on_brand", "fh", "fb", "radius", "dark") if k in d}
    t["fh_w"] = d.get("fh_w", 700)
    add(id="pb-%02d" % d["n"], name=d["name"], kind="tokens", group="platform", mood=d.get("mood", ""), niche=d.get("niche", ""),
        dark=d.get("dark", False), author="Куралай", license="свой", source=d.get("source", ""),
        tokens=t, layout={"hero": heroes[i % 4], "cards": "glass" if d.get("dark") else cards[(i // 4) % 4], "anim": anims[i % 4]})

# --- 3. Новые трендовые стили ---
trend = [
  ("bento", "Bento-сетка", "Плитки разного размера как у Apple, много воздуха", "IT, продукт, приложение", False,
   dict(bg="#F5F5F7", surface="#FFFFFF", text="#1D1D1F", muted="#6E6E73", brand="#0071E3", brand_dark="#0058B0", brand_soft="#E8F1FC", accent="#FF9F0A", on_brand="#FFFFFF", fh="Inter", fb="Inter", radius=24), "bento", "soft", "zoom"),
  ("glass", "Liquid Glass", "Стекло, размытие, переливы на тёмном фоне", "ИИ, технологии, премиум", True,
   dict(bg="#070B1A", surface="#121A33", text="#EEF2FF", muted="#9AA6C8", brand="#7C5CFF", brand_dark="#5A3FE0", brand_soft="#1E1A4A", accent="#22D3EE", on_brand="#FFFFFF", fh="Unbounded", fb="Manrope", radius=22), "center", "glass", "tilt"),
  ("brutal", "Необрутализм", "Толстые чёрные рамки, яркие плашки, тени без размытия", "креатив, молодёжь, школа", False,
   dict(bg="#FFF8E7", surface="#FFFFFF", text="#111111", muted="#444444", brand="#FF5C39", brand_dark="#D9431F", brand_soft="#FFE1D6", accent="#4ADE80", on_brand="#111111", fh="Unbounded", fb="Manrope", radius=6), "split", "brutal", "rise"),
  ("luxe", "Люкс с засечками", "Кремовый фон, крупные заголовки с засечками, золото", "ювелирка, недвижимость, премиум", False,
   dict(bg="#F7F2EA", surface="#FFFDF8", text="#1F1A14", muted="#7A6E60", brand="#8C6A3F", brand_dark="#6B4F2C", brand_soft="#EEE3D2", accent="#B8925A", on_brand="#FFFFFF", fh="Cormorant Garamond", fb="Manrope", radius=2), "center", "outline", "fade"),
  ("aurora", "Аврора-градиент", "Мягкие цветные пятна-градиенты, светлый фон", "коучинг, wellness, женские проекты", False,
   dict(bg="#FBF8FF", surface="#FFFFFF", text="#1E1633", muted="#6B6283", brand="#A855F7", brand_dark="#7E22CE", brand_soft="#F3E8FF", accent="#F472B6", on_brand="#FFFFFF", fh="Montserrat", fb="Montserrat", radius=20), "split", "soft", "rise"),
  ("swiss", "Швейцарский журнал", "Строгая сетка, крупная типографика, один акцент", "агентства, архитектура, медиа", False,
   dict(bg="#FFFFFF", surface="#F4F4F4", text="#0A0A0A", muted="#5C5C5C", brand="#E30613", brand_dark="#B00010", brand_soft="#FDE7E8", accent="#0A0A0A", on_brand="#FFFFFF", fh="Inter", fb="Inter", radius=0), "bold", "flat", "fade"),
  ("clay", "Мягкая глина", "Пастель, объёмные кнопки, дружелюбно", "дети, образование, сервисы", False,
   dict(bg="#EEF3F8", surface="#F7FAFD", text="#22303F", muted="#62748A", brand="#3B82F6", brand_dark="#1D4ED8", brand_soft="#DBEAFE", accent="#F59E0B", on_brand="#FFFFFF", fh="Nunito", fb="Nunito", radius=28), "bento", "clay", "zoom"),
  ("noir", "Кино-нуар", "Чёрный экран, крупный текст, золотые акценты, кинематографично", "мероприятия, фото, личный бренд", True,
   dict(bg="#0A0A0A", surface="#161616", text="#F5F1E8", muted="#A39E93", brand="#D4AF37", brand_dark="#A8862A", brand_soft="#2A2414", accent="#F5F1E8", on_brand="#0A0A0A", fh="Playfair Display", fb="Manrope", radius=4), "bold", "outline", "tilt"),
  ("steppe", "Степь-орнамент", "Тёплые терракотовые тона и казахский орнамент", "казахские бренды, кафе, туризм", False,
   dict(bg="#FBF4EC", surface="#FFFFFF", text="#2B1B12", muted="#7B6152", brand="#B5502B", brand_dark="#8A3A1D", brand_soft="#F6E2D6", accent="#1F6F78", on_brand="#FFFFFF", fh="Unbounded", fb="Manrope", radius=14), "split", "soft", "rise"),
  ("mint", "Чистая мята", "Белый, мятный, медицинская аккуратность", "клиники, стоматология, здоровье", False,
   dict(bg="#F6FBFA", surface="#FFFFFF", text="#0F2A2A", muted="#557070", brand="#0F9D8A", brand_dark="#0B7466", brand_soft="#DDF4EF", accent="#FFB84D", on_brand="#FFFFFF", fh="Manrope", fb="Manrope", radius=16), "split", "outline", "fade"),
]
for id_, name, mood, niche, dark, t, hero, card, anim in trend:
    t = dict(t, dark=dark, fh_w=700)
    add(id=id_, name=name, kind="tokens", group="trend", mood=mood, niche=niche, dark=dark, author="Куралай", license="свой",
        tokens=t, layout={"hero": hero, "cards": card, "anim": anim})

# --- 4. GitHub: готовые шаблоны (код лежит в designs/external/) ---
ext = "designs/external/"
pd = ext + "PaulleDemon--awesome-landing-pages/src/"
paulle = [
 ("apps/chatorigin", "ChatOrigin", "чат, приложение"), ("apps/navigator", "Navigator", "приложение"), ("apps/traveler", "Traveler", "туризм, приложение"),
 ("apps/AISales", "AI Sales", "ИИ, продажи"), ("saas/SaaSyDark", "SaaSy Dark", "SaaS"), ("saas/pixaai", "Pixa AI", "ИИ, генерация"),
 ("saas/SaaS-AI", "SaaS AI", "ИИ-сервис"), ("saas/finance", "Finance", "финансы"), ("saas/CelestialSaaS", "Celestial", "SaaS, космос"),
 ("restaurant/bistro", "Bistro", "ресторан"), ("restaurant/nutrio", "Nutrio", "еда, здоровье"), ("others/carwash", "Carwash", "автомойка, услуги"),
 ("realestate/brickproperty", "Brick Property", "недвижимость"), ("products/scooter", "Scooter", "товар"), ("law/lawgroup", "Law Group", "юристы"),
 ("law/lawfire", "Law Fire", "юристы"), ("portfolio/Jamie-portfolio", "Jamie", "портфолио"), ("ngo/project-africa", "Project Africa", "НКО, фонд"),
 ("portfolio/bella", "Bella", "портфолио"), ("portfolio/notion", "Notion-style", "портфолио, минимализм"), ("portfolio/jrdev", "Jr Dev", "портфолио разработчика"),
]
for p, name, niche in paulle:
    add(id="pd-" + p.split("/")[1].lower(), name=name, kind="external", group="github", path=pd + p + "/index.html", niche=niche,
        mood="Готовый лендинг на Tailwind из коллекции awesome-landing-pages", dark=False,
        author="PaulleDemon", repo="https://github.com/PaulleDemon/awesome-landing-pages", license="MIT")
gh = [
 ("tw-toolbox", "Tailwind Toolbox Landing", ext + "tailwindtoolbox--Landing-Page/index.html", None, "tailwindtoolbox/Landing-Page", "MIT", "стартап, продукт", "Градиентная шапка с волной, простая структура"),
 ("landwind", "Landwind", ext + "themesberg--landwind/index.html", None, "themesberg/landwind", "MIT", "SaaS, агентство", "Чистый Tailwind + Flowbite, светлая и тёмная тема"),
 ("ct-landing", "Creative Tim: Landing", ext + "creativetimofficial--awesome-landing-page/index.html", None, "creativetimofficial/awesome-landing-page", "MIT", "продукт, стартап", "Bootstrap-лендинг с яркой шапкой"),
 ("ct-phone", "Creative Tim: Phone App", ext + "creativetimofficial--awesome-landing-page/phone_app.html", None, "creativetimofficial/awesome-landing-page", "MIT", "мобильное приложение", "Лендинг мобильного приложения с макетом телефона"),
 ("ct-web", "Creative Tim: Web App", ext + "creativetimofficial--awesome-landing-page/web_app.html", None, "creativetimofficial/awesome-landing-page", "MIT", "веб-сервис", "Лендинг веб-приложения"),
 ("sb-landing", "Start Bootstrap: Landing Page", ext + "StartBootstrap--startbootstrap-landing-page/dist/index.html", None, "StartBootstrap/startbootstrap-landing-page", "MIT", "универсальный", "Классика Bootstrap: фото-шапка, иконки, отзывы"),
 ("sb-agency", "Start Bootstrap: Agency", ext + "StartBootstrap--startbootstrap-agency/dist/index.html", None, "StartBootstrap/startbootstrap-agency", "MIT", "агентство, студия", "Одностраничник агентства: услуги, портфолио, команда"),
 ("sb-creative", "Start Bootstrap: Creative", ext + "StartBootstrap--startbootstrap-creative/dist/index.html", None, "StartBootstrap/startbootstrap-creative", "MIT", "креатив, портфолио", "Яркая шапка на фото и портфолио-сетка"),
 ("sb-grayscale", "Start Bootstrap: Grayscale", ext + "StartBootstrap--startbootstrap-grayscale/dist/index.html", None, "StartBootstrap/startbootstrap-grayscale", "MIT", "мероприятие, проект", "Тёмный одностраничник с большим фото"),
 ("sb-freelancer", "Start Bootstrap: Freelancer", ext + "StartBootstrap--startbootstrap-freelancer/dist/index.html", None, "StartBootstrap/startbootstrap-freelancer", "MIT", "фрилансер, портфолио", "Бирюзовое портфолио фрилансера"),
 ("sb-resume", "Start Bootstrap: Resume", ext + "StartBootstrap--startbootstrap-resume/dist/index.html", None, "StartBootstrap/startbootstrap-resume", "MIT", "резюме, личный сайт", "Сайт-резюме с боковым меню"),
 ("shadcn", "shadcn Landing", ext + "leoMirandaa--shadcn-landing-page", "https://shadcn-landing-page.vercel.app", "leoMirandaa/shadcn-landing-page", "MIT", "SaaS, IT", "Современный React + shadcn, тёмная и светлая тема"),
 ("next-saas", "Next SaaS Starter", ext + "Blazity--next-saas-starter", "https://next-saas-starter-ashy.vercel.app/", "Blazity/next-saas-starter", "MIT", "SaaS", "Next.js-лендинг SaaS с блогом и ценами"),
 ("react-landing", "React Landing", ext + "issaafalkattan--React-Landing-Page-Template", "https://react-landing-page-template-93ne.vercel.app/", "issaafalkattan/React-Landing-Page-Template", "MIT", "агентство, бизнес", "Классический одностраничник на React"),
 ("ixartz", "Next.js Landing Starter", ext + "ixartz--Next-JS-Landing-Page-Starter-Template", "https://creativedesignsguru.com/demo/nextjs-landing-page/", "ixartz/Next-JS-Landing-Page-Starter-Template", "MIT", "стартап", "Минималистичный Next.js + Tailwind"),
 ("tailblocks", "Tailblocks: 60+ блоков", ext + "mertJF--tailblocks", "https://tailblocks.cc", "mertJF/tailblocks", "MIT", "конструктор блоков", "Библиотека готовых блоков: берём по одному в свой сайт"),
 ("cruip-open", "Cruip Open (тёмный)", None, "https://cruip.com/demos/open/", "cruip/open-react-template", "GPL-3.0, без распространения", "SaaS, open source", "Тёмный лендинг продукта. Код не храним: скачивается командой по требованию"),
 ("cruip-simple", "Cruip Simple Light", None, "https://cruip.com/demos/simple/", "cruip/tailwind-landing-page-template", "GPL-3.0, без распространения", "SaaS, стартап", "Светлый минимализм. Код не храним: скачивается командой по требованию"),
]
for id_, name, path, url, repo, lic, niche, mood in gh:
    e = dict(id=id_, name=name, kind="external" if path else "fetch", group="github", niche=niche, mood=mood, dark=id_ in ("cruip-open", "sb-grayscale"),
             author=repo.split("/")[0], repo="https://github.com/" + repo, license=lic)
    if path: e["path"] = path
    if url: e["url"] = url
    add(**e)

json.dump(out, open(os.path.join(ROOT, "catalog", "designs.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(out), "дизайнов")
