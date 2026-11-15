#!/usr/bin/env python3
"""Каталог дизайнов для агента.

  python3 scripts/catalog.py                 # все дизайны коротко
  python3 scripts/catalog.py <номер>         # подробно: что это, где код, как применять
  python3 scripts/catalog.py find <слово>    # поиск: тёмный, кафе, премиум…
  python3 scripts/catalog.py md              # пересобрать catalog/CATALOG.md
"""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = json.load(open(os.path.join(ROOT, "catalog", "designs.json"), encoding="utf-8"))
G = {"own": "Мои дизайны (Куралай)", "platform": "Дизайны платформ (палитры)", "trend": "Тренды 2026 (палитры)", "github": "GitHub-шаблоны"}
HOW = {"tokens": "палитра → python3 scripts/build_site.py projects/<id> (design: номер в site.json)",
       "own": "готовый HTML/React → скопировать в projects/<id>/site/ и заменить тексты, цвета, блоки",
       "external": "готовый шаблон с GitHub → скопировать в projects/<id>/site/ и адаптировать (лицензию сохранить)",
       "fetch": "код не храним → bash scripts/fetch-template.sh <номер> projects/<id>/site"}

def line(d): return f"{d['n']:>3}  {d['name']:<42} {('тёмный' if d.get('dark') else 'светлый'):<8} {d.get('niche', '')}"

a = sys.argv[1:]
if not a:
    for g in G:
        print(f"\n== {G[g]}")
        for d in D:
            if d["group"] == g: print(line(d))
elif a[0] == "find":
    w = " ".join(a[1:]).lower()
    for d in D:
        if w in (d["name"] + d.get("mood", "") + d.get("niche", "") + ("тёмный" if d.get("dark") else "светлый")).lower(): print(line(d))
elif a[0] == "md":
    out = ["# Каталог дизайнов", "", "Собирается командой `python3 scripts/catalog.py md` из `catalog/designs.json`. Видео и выбор: `gallery/index.html`.", ""]
    for g in G:
        out += [f"## {G[g]}", "", "| № | Название | Тема | Подходит | Тип | Где |", "|---|---|---|---|---|---|"]
        for d in D:
            if d["group"] != g: continue
            where = d.get("path") or d.get("url") or ""
            if d["kind"] == "tokens": where = f"`gallery/live/{d['n']}/`"
            elif where: where = f"`{where}`" if not where.startswith("http") else where
            out.append(f"| {d['n']} | {d['name']} | {'тёмная' if d.get('dark') else 'светлая'} | {d.get('niche', '')} | {d['kind']} | {where} |")
        out.append("")
    out += ["## Как применять", ""] + [f"- **{k}**: {v}" for k, v in HOW.items()]
    open(os.path.join(ROOT, "catalog", "CATALOG.md"), "w", encoding="utf-8").write("\n".join(out) + "\n")
    print("catalog/CATALOG.md обновлён")
else:
    d = next((x for x in D if str(x["n"]) == a[0] or x["id"] == a[0]), None)
    if not d: sys.exit("нет такого номера")
    print(json.dumps(d, ensure_ascii=False, indent=1))
    print("\nКак применять:", HOW[d["kind"]])
