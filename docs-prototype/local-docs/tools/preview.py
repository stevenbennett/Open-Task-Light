#!/usr/bin/env python3
"""Bake the callouts of one content page onto its images so a reviewer can check placement.
Usage: tools/preview.py content/assembly-guide/foo.md [figure-index]  ->  .build/previews/<slug>-<n>.jpg"""
import sys, os, re
from PIL import Image, ImageDraw, ImageFont
# after `npm run build`, colours match the site (.build/label-colors.json); before it, placeholders by position
PLACEHOLDER = ["#f0524f", "#f76b15", "#e6b800", "#3bb273", "#4ea8ff", "#a276d6"]
try:
    import json; COLORS = json.load(open('.build/label-colors.json'))
except Exception: COLORS = {}
path = sys.argv[1]; want = int(sys.argv[2]) if len(sys.argv) > 2 else None
page = re.sub(r'^content/|\.md$', '', path); slug = page.replace('/', '__')
text = open(path).read(); os.makedirs('.build/previews', exist_ok=True)
font = ImageFont.load_default(size=22)
made = []
for idx, fig in enumerate(re.finditer(r'<figure>([\s\S]*?)</figure>', text), 1):
    inner = fig.group(1)
    src = re.search(r'<img[^>]*src="([^"]+)"', inner)
    if not src or (want and idx != want): continue
    items = re.findall(r'<li\b([^>]*)>([\s\S]*?)</li>', inner)
    spots = []
    for a, body in items:
        d = re.search(r'\bdot="([\d.]+),([\d.]+)"', a); l = re.search(r'\blabel="([\d.]+),([\d.]+)"', a)
        label = re.sub(r'<note>[\s\S]*?</note>', '', body); label = re.sub(r'<[^>]+>', '', label).strip()
        if d and l and label: spots.append((label, float(d.group(1)), float(d.group(2)), float(l.group(1)), float(l.group(2))))
    if not spots: continue
    im = Image.open('public' + src.group(1)).convert('RGB'); s = 1200 / im.width; im = im.resize((1200, int(im.height * s)))
    dr = ImageDraw.Draw(im); W, H = im.size
    for c, (label, ax, ay, lx, ly) in enumerate(spots):
        col = COLORS.get(label, PLACEHOLDER[c % 6]); ax, ay, lx, ly = ax / 100 * W, ay / 100 * H, lx / 100 * W, ly / 100 * H
        dr.line([(lx, ly), (ax, ay)], fill="white", width=5); dr.line([(lx, ly), (ax, ay)], fill=col, width=2)
        dr.ellipse([ax - 9, ay - 9, ax + 9, ay + 9], fill="white"); dr.ellipse([ax - 6, ay - 6, ax + 6, ay + 6], fill=col)
        bb = dr.textbbox((0, 0), label, font=font); tw, th = bb[2] - bb[0], bb[3] - bb[1]
        dr.rounded_rectangle([lx - tw / 2 - 12, ly - th / 2 - 7, lx + tw / 2 + 12, ly + th / 2 + 7], radius=14, fill="white", outline=col, width=2)
        dr.text((lx - tw / 2 - bb[0], ly - th / 2 - bb[1]), label, fill="#1d1d1d", font=font)
    out = f".build/previews/{slug}-{idx}.jpg"; im.save(out, quality=82); made.append(out)
print('\n'.join(made) if made else 'no callouts found')
