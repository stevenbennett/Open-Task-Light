// One-time migration: turn "<!-- callouts -->" comment blocks into nested <ol class="callouts"> lists inside their <figure>.
import { readFileSync, writeFileSync } from 'node:fs';
const pages = JSON.parse(readFileSync('pages.json', 'utf8'));
const FIG = /<figure><img src="([^"]+)" alt="([^"]*)"><figcaption>([^<]*)<\/figcaption><\/figure>/g;
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
function parse(lines) {
  const out = { alt: null, image: 1, items: [] };
  for (const raw of lines) {
    const line = raw.trim(); if (!line) continue; let m;
    if ((m = line.match(/^alt:\s*(.+)$/i))) { out.alt = m[1]; continue; }
    if ((m = line.match(/^image:\s*(\d+)$/i))) { out.image = +m[1]; continue; }
    m = line.match(/^(.+?)\s*@\s*([\d.]+)\s*,\s*([\d.]+)\s*>\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:\|(.*))?$/);
    if (!m) { console.warn('skipped unparsed line:', line); continue; }
    const it = { label: m[1].trim(), dot: `${m[2]},${m[3]}`, pos: `${m[4]},${m[5]}`, links: [] };
    for (const f of (m[6] || '').split('|').map(s => s.trim()).filter(Boolean)) {
      let k;
      if ((k = f.match(/^qty=(.+)$/))) it.qty = k[1].trim();
      else if ((k = f.match(/^match=(.+)$/))) it.match = k[1].trim();
      else if ((k = f.match(/^link=([^:]+):\s*(.+)$/))) it.links.push(`${k[1].trim()}: ${k[2].trim()}`);
      else it.note = (it.note ? it.note + ' ' : '') + f;
    }
    out.items.push(it);
  }
  return out;
}
function figureHtml(src, alt, cap, items) {
  const li = items.map(it => {
    const a = [`dot="${it.dot}"`, `label="${it.pos}"`];
    if (it.qty) a.push(`qty="${esc(it.qty)}"`);
    if (it.match && it.match.toLowerCase() !== it.label.toLowerCase()) a.push(`match="${esc(it.match)}"`);
    if (it.links.length) a.push(`link="${esc(it.links.join('; '))}"`);
    return `<li ${a.join(' ')}>${it.label}${it.note ? ` <note>${it.note}</note>` : ''}</li>`;
  });
  const capHtml = cap ? `\n<figcaption>${cap}</figcaption>` : '';
  if (!li.length) return `<figure><img src="${src}" alt="${esc(alt)}">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
  return `<figure>\n<img src="${src}" alt="${esc(alt)}">${capHtml}\n<ol class="callouts">\n${li.join('\n')}\n</ol>\n</figure>`;
}
let converted = 0, figures = 0;
for (const p of pages) {
  const path = `content/${p}.md`, lines = readFileSync(path, 'utf8').split('\n'), out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('<figure>')) { out.push(line); continue; }
    const blocks = []; let j = i + 1;
    while (true) {
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && lines[j].trim().startsWith('<!-- callouts')) { const body = []; let k = j + 1; while (k < lines.length && !lines[k].includes('-->')) body.push(lines[k++]); blocks.push(parse(body)); j = k + 1; } else break;
    }
    const srcs = [...line.matchAll(FIG)];
    const figs = srcs.map((m, n) => { const mine = blocks.filter(b => b.image === n + 1); const items = mine.flatMap(b => b.items); const alt = (mine.find(b => b.alt) || {}).alt || m[2]; if (items.length) converted++; figures++; return figureHtml(m[1], alt, m[3], items); });
    if (line.startsWith('<div>')) out.push('<div>', ...figs, '</div>'); else out.push(...figs);
    if (blocks.length) i = j - 1;
  }
  writeFileSync(path, out.join('\n'));
}
console.log(`converted ${converted} annotated figures of ${figures}`);
