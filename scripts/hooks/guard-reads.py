#!/usr/bin/env python3
"""PreToolUse-хук: не даёт агенту читать целиком большие файлы шаблона (экономия подписки).

Блокирует (exit 2, текст в stderr уходит агенту):
  - Read/cat целиком по большим файлам: gallery/data.js, structure/presets.js, package-lock.json, gallery/live/*.
    Вместо этого: grep по запросу или чтение куском (offset/limit, sed -n 'A,Bp' на 120 строк).
Обход на один вызов: ALLOW_BIG_READ=1 в окружении команды. Отказ всегда объясняет, что делать.
"""
import json
import os
import re
import sys

BIG = [
    r"gallery/data\.js$",
    r"structure/presets\.js$",
    r"package-lock\.json$",
    r"gallery/live/\d+/index\.html$",
]


def deny(msg: str) -> None:
    sys.stderr.write(msg + "\n")
    sys.exit(2)


def main() -> None:
    try:
        d = json.load(sys.stdin)
    except Exception:  # noqa: BLE001
        sys.exit(0)
    if os.environ.get("ALLOW_BIG_READ") == "1":
        sys.exit(0)
    tool = d.get("tool_name", "")
    inp = d.get("tool_input") or {}
    if tool == "Read":
        p = str(inp.get("file_path", ""))
        has_range = inp.get("limit") is not None
        if not has_range and any(re.search(b, p) for b in BIG):
            deny(f"Файл {os.path.basename(p)} большой: читай куском (offset и limit) или grep по запросу. Обход: ALLOW_BIG_READ=1.")
    elif tool == "Bash":
        c = str(inp.get("command", ""))
        if "ALLOW_BIG_READ=1" in c:
            sys.exit(0)
        big_any = "|".join(BIG)
        if re.search(r"\b(cat|less|more)\b[^|;&]*(" + big_any + ")", c):
            deny("Большой файл целиком не читаем: grep -n по запросу или sed -n 'A,Bp' на 120 строк. Обход: ALLOW_BIG_READ=1.")
    sys.exit(0)


if __name__ == "__main__":
    main()
