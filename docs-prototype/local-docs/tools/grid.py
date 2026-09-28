#!/usr/bin/env python3
"""Write a 1000px-wide copy of an image with a labelled 10% grid, for reading callout positions.
Usage: tools/grid.py public/images/NAME.jpg  ->  .build/previews/grid-NAME.jpg"""
import sys, os
from PIL import Image, ImageDraw
src = sys.argv[1]; os.makedirs('.build/previews', exist_ok=True)
im = Image.open(src).convert('RGB'); w, h = im.size; s = 1000 / w; im = im.resize((1000, int(h * s)))
d = ImageDraw.Draw(im); W, H = im.size
for i in range(1, 10):
    x, y = int(W * i / 10), int(H * i / 10)
    d.line([(x, 0), (x, H)], fill=(255, 0, 255)); d.line([(0, y), (W, y)], fill=(255, 0, 255))
    d.text((x + 2, 2), str(i * 10), fill=(255, 0, 255)); d.text((2, y + 2), str(i * 10), fill=(255, 0, 255))
out = f".build/previews/grid-{os.path.basename(src)}"; im.save(out, quality=80); print(out)
