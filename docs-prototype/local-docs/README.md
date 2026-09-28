# Local mirror of the Open Task Light GitBook, with photo callouts

    npm install
    npm run fetch     # mirror pages + photos from the live GitBook (skips what's already here)
    npm run build     # content/**.md -> .build/site ; nested callout lists -> dots, leaders and cards
    npm run serve     # http://127.0.0.1:8790/

Authoring callouts: see CALLOUTS.md. Review tools: tools/sheet.py, tools/grid.py, tools/preview.py (they write to .build/previews).

Generated, not committed: .build/ (site, manifest.json, part-colors.generated.json, unpaired.txt, previews),
public/images (the photo mirror, ~100 MB, refetched by npm run fetch) and node_modules.

Colours: part-colors.json pins parts to named colours and aliases spellings; the build assigns the rest so
parts sharing a photo never share a colour and writes the result to .build/part-colors.generated.json.
