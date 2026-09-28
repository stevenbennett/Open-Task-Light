# Writing callouts

Callouts are written as a numbered list nested inside the photo's `<figure>`. The build turns each
item into a dot on the part, a thin leader to a label, and a hover card, and colours the phrase in the
nearby text that names the part. Without the script the list simply reads as a legend under the photo.

    <figure>
    <img src="/images/d37054a9f628.png" alt="CAD view of the electronics housing showing the three button positions">
    <ol class="callouts">
    <li dot="32,50" label="16,26" qty="Insert 1st" link="Part page: self-sourcing-guide/additional-printed-parts/capacitive-power-button">Power button <note>The large round capacitive button. Goes in first.</note></li>
    <li dot="50,41" label="42,14" qty="Insert 2nd" match="minus button" link="Part page: self-sourcing-guide/additional-printed-parts/decrease-brightness-button">Minus button (dim) <note>The square button nearest the power button.</note></li>
    </ol>
    </figure>

One `<li>` per callout. The item's text is the part name; it is also the hover card's title and the
key that gives the part its colour everywhere in the guide, so use the BOM's wording and keep
quantities out of it.

- `dot="x,y"` is where the dot sits, on the part, in percent of the image (0–100, left/top origin).
- `label="x,y"` is where the label pill sits. Put it on clear background near the part, not on top of
  another part or label. The leader line is drawn for you.
- `qty="…"` a count or an ordinal such as `4` or `Insert 1st`. Optional.
- `match="…"` the phrase in the surrounding text to colour. Defaults to the part name. The phrase is
  matched whole-word, case-insensitive, in the paragraphs and list items between the previous
  photo/heading and this photo, then in the ones after it up to the next photo/heading.
- `link="Text: path"` a link on the card; repeat with `;` for several (`link="Part page: printing-guide/electronics-housing/shade; BOM: self-sourcing-guide/bill-of-materials"`).
  `path` is a site path from pages.json, or a full URL. Optional.
- `<note>…</note>` inside the item is the card's one- or two-sentence detail. Optional.
- Put the photo's description in the `<img alt="…">`.

Keep no blank lines inside a `<figure>` or between the figures of a `<div>` row, or the markdown
parser will split the block.

What deserves callouts: photos where a reader has to identify a part, a bag, a screw size, an
orientation, or a position. Skip progress shots of hands where the text already says everything.
Two to six callouts per image. A part gets a callout the first time it appears in a section and again
only when a later photo shows a new placement, orientation or hardware detail the text relies on.
Dots never sit on a symbol, a mounting hole or a screw head the reader needs to see; move them to the
part's edge.

Placement workflow: `python3 tools/grid.py public/images/<name>.jpg` and view the gridded preview to
read percentages, edit the list, then `python3 tools/preview.py content/<page>.md` and view
`.build/previews/<page>-<n>.jpg` to confirm dots land on the parts and labels don't collide.

Colours: `part-colors.json` pins parts to named colours; everything else is assigned by the build so
parts sharing a photo never share a colour. `.build/part-colors.generated.json` shows the result.
