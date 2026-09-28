# Local mirror of the Open Task Light GitBook, with photo callouts

Needs Node 18 or newer, Python 3 (for `npm run serve` and the tools) and Pillow 10.1 or newer (`pip install "pillow>=10.1"`) for the tools.

    npm install
    npm run fetch     # mirror pages + photos from the live GitBook (skips what's already here)
    npm run build     # content/**.md -> .build/site ; nested callout lists -> dots, leaders and cards
    npm run serve     # http://127.0.0.1:8790/

Handy URL parameters on any page: `?mode=dots` (or `leaders`, `off`), `?pin=Power%20track` opens that part's card,
`?figure=7` scrolls to a photo, `?expand=27` enlarges a photo in a row. Every photo has an `id="figure-<n>"`.

Authoring callouts: see CALLOUTS.md. Review tools: tools/sheet.py, tools/grid.py, tools/preview.py (they write to .build/previews).
The build exits non-zero when a callout is malformed or links to an unknown page. `npm test` checks the part-name normalizer.

Generated, not committed: .build/ (site, manifest.json, part-colors.generated.json, label-colors.json, unpaired.txt, previews),
public/images (the photo mirror, ~100 MB, refetched by npm run fetch) and node_modules.

Colours: part-colors.json pins parts to named colours and aliases spellings; the build assigns the rest so
parts sharing a photo never share a colour and writes the result to .build/part-colors.generated.json.
