#!/usr/bin/env python3
"""Собирает данные галереи из каталога: gallery/data.js (галерея открывается двойным щелчком, без сервера).

  python3 scripts/build_gallery.py

Источник: catalog/designs.json + gallery/media/<номер>.mp4|.jpg (их пишет tools/record-previews.mjs).
"""
import json
import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
designs = json.load(open(os.path.join(ROOT, "catalog", "designs.json"), encoding="utf-8"))
media = os.path.join(ROOT, "gallery", "media")


def seconds(f):
    try:
        out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f], capture_output=True, text=True).stdout
        return round(float(out.strip()))
    except (OSError, ValueError):
        return 0


GROUPS = {"own": "Мои дизайны", "platform": "Дизайны платформ", "trend": "Тренды 2026", "github": "GitHub-шаблоны"}
out, no_video = [], []
for d in designs:
    n = d["n"]
    has = os.path.exists(os.path.join(media, f"{n}.mp4"))
    if not has:
        no_video.append(n)
    live = None
    if d["kind"] == "tokens":
        live = f"live/{n}/index.html"
    elif d.get("path", "").endswith(".html"):
        live = "../" + d["path"]
    elif d.get("url"):
        live = d["url"]
    out.append({
        "n": n, "name": d["name"], "group": d["group"], "groupName": GROUPS[d["group"]], "kind": d["kind"],
        "mood": d.get("mood", ""), "niche": d.get("niche", ""), "dark": bool(d.get("dark")),
        "author": d.get("author", ""), "repo": d.get("repo", ""), "license": d.get("license", ""),
        "video": f"media/{n}.mp4" if has else None, "thumb": f"media/{n}.jpg" if has else None,
        "dur": seconds(os.path.join(media, f"{n}.mp4")) if has else 0, "live": live,
        "colors": [d["tokens"][k] for k in ("brand", "accent", "bg", "text")] if "tokens" in d else [],
        "fonts": [d["tokens"]["fh"], d["tokens"]["fb"]] if "tokens" in d else [],
    })

js = "// собрано scripts/build_gallery.py из catalog/designs.json, руками не править\nwindow.DESIGNS = " + json.dumps(out, ensure_ascii=False, indent=0) + ";\n"
open(os.path.join(ROOT, "gallery", "data.js"), "w", encoding="utf-8").write(js)
print(f"галерея: {len(out)} дизайнов, с видео {len(out) - len(no_video)}")
if no_video:
    print("без видео (запусти tools/record-previews.mjs):", ", ".join(map(str, no_video)))
