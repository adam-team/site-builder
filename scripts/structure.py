#!/usr/bin/env python3
"""Этап «Структура».

  python3 scripts/structure.py sync                          # structure/presets.json → structure/presets.js (для конструктора)
  python3 scripts/structure.py list                          # темы и блоки
  python3 scripts/structure.py preset <тема> [--mini]        # предложить структуру по теме (текстом, для чата)
  python3 scripts/structure.py write projects/<id> <файл structure.json | тема>   # записать STRUCTURE.md и blocks в site.json
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "structure", "presets.json")
P = json.load(open(SRC, encoding="utf-8"))


def sync():
    js = "// собрано scripts/structure.py sync из structure/presets.json, руками не править\nwindow.PRESETS = " + json.dumps(P, ensure_ascii=False) + ";\n"
    open(os.path.join(ROOT, "structure", "presets.js"), "w", encoding="utf-8").write(js)
    print("structure/presets.js обновлён")


def text(preset, blocks):
    p = P["presets"][preset]
    out = [f"Тема: {p['name']} ({preset})", "Блоки по порядку:"]
    out += [f"  {i + 1}. {P['blocks'][b]['name']} [{b}]: {P['blocks'][b]['why']}" for i, b in enumerate(blocks)]
    return "\n".join(out)


def write(proj, src):
    if os.path.exists(src):
        s = json.load(open(src, encoding="utf-8"))
    else:
        s = {"preset": src, "size": "full", "blocks": P["presets"][src]["blocks"], "pages": ["Главная"]}
    bad = [b for b in s["blocks"] if b not in P["blocks"]]
    if bad:
        sys.exit("неизвестные блоки: " + ", ".join(bad) + ". Список: python3 scripts/structure.py list")
    os.makedirs(proj, exist_ok=True)
    md = ["# Структура сайта", "", f"Тема: **{P['presets'][s['preset']]['name']}** (`{s['preset']}`)",
          f"Размер: {P['sizes'].get(s.get('size', 'full'), {}).get('name', s.get('size'))}",
          f"Страницы: {', '.join(s.get('pages') or ['Главная'])}"]
    if s.get("name"): md.append(f"Название: {s['name']}")
    if s.get("goal"): md.append(f"Главное действие: {s['goal']}")
    md += ["", "| № | Блок | Код | Зачем |", "|---|---|---|---|"]
    md += [f"| {i + 1} | {P['blocks'][b]['name']} | `{b}` | {P['blocks'][b]['why']} |" for i, b in enumerate(s["blocks"])]
    if s.get("own_plan"): md += ["", "## План ученицы дословно", "", s["own_plan"]]
    open(os.path.join(proj, "STRUCTURE.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    sj = os.path.join(proj, "site.json")
    cfg = json.load(open(sj, encoding="utf-8")) if os.path.exists(sj) else {}
    cfg.update(preset=s["preset"], blocks=s["blocks"])
    json.dump(cfg, open(sj, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print(f"записано: {proj}/STRUCTURE.md и blocks в {proj}/site.json")


a = sys.argv[1:]
if not a or a[0] in ("-h", "--help"): print(__doc__)
elif a[0] == "sync": sync()
elif a[0] == "list":
    for k, p in P["presets"].items(): print(f"{k:12} {p['name']}")
    print()
    for k, b in P["blocks"].items(): print(f"{k:13} {b['name']}: {b['why']}")
elif a[0] == "preset":
    bl = P["presets"][a[1]]["blocks"]
    if "--mini" in a: bl = [b for b in bl if b in ("hero", "about", "services", "program", "testimonials", "contacts")][:6]
    print(text(a[1], bl))
elif a[0] == "write": write(a[1].rstrip("/"), a[2])
else: print(__doc__)
