#!/usr/bin/env python3
"""Contact sheets for one content page: every figure as a numbered thumbnail, 12 per sheet, for cheap triage.
Usage: tools/sheet.py content/assembly-guide/foo.md  ->  .build/previews/sheet-<slug>-<k>.jpg (+ prints figure index, image path, nearest heading)"""
import sys, os, re
from PIL import Image, ImageDraw, ImageFont
path = sys.argv[1]; slug = re.sub(r'^content/|\.md$', '', path).replace('/', '__')
os.makedirs('.build/previews', exist_ok=True)
font = ImageFont.load_default(size=26)
figs, heading = [], ''
for line in open(path):
    m = re.match(r'^#+\s+(.*)', line)
    if m: heading = m.group(1).strip()
    for src in re.findall(r'<img[^>]*src="([^"]+)"', line): figs.append((src, heading))
TW, TH, COLS = 300, 200, 4
for k in range(0, len(figs), 12):
    chunk = figs[k:k + 12]; rows = (len(chunk) + COLS - 1) // COLS
    sheet = Image.new('RGB', (COLS * TW, rows * (TH + 30)), 'white'); d = ImageDraw.Draw(sheet)
    for j, (src, h) in enumerate(chunk):
        im = Image.open('public' + src).convert('RGB'); im.thumbnail((TW - 10, TH - 10))
        x, y = (j % COLS) * TW, (j // COLS) * (TH + 30)
        sheet.paste(im, (x + 5, y + 5)); d.text((x + 8, y + TH), f"#{k + j + 1}", fill='black', font=font)
    out = f".build/previews/sheet-{slug}-{k // 12 + 1}.jpg"; sheet.save(out, quality=80); print(out)
for i, (src, h) in enumerate(figs, 1): print(f"#{i}  {src}  under: {h}")
