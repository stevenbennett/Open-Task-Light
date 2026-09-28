// Renders content/**.md into .build/site as a static site that looks like the GitBook.
// Each figure's nested <ol class="callouts"> list becomes the data the page script draws,
// with one colour per part name across the whole site.
import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import { decodeHTML } from 'entities';
import { readFileSync, writeFileSync, mkdirSync, existsSync, lstatSync, symlinkSync, cpSync, openSync, readSync, closeSync } from 'node:fs';
import { partKey as normalizeKey } from './lib/partkey.mjs';

const pages = JSON.parse(readFileSync('pages.json', 'utf8'));
const md = new MarkdownIt({ html: true, linkify: false, typographer: false }).use(footnote);
const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
md.renderer.rules.heading_open = (tokens, i, opts, env, self) => {
  const text = tokens[i + 1].children.filter(t => t.type === 'text' || t.type === 'code_inline').map(t => t.content).join('');
  const id = slug(text); tokens[i].attrSet('id', id);
  if (tokens[i].tag === 'h2' || tokens[i].tag === 'h3') (env.toc ||= []).push({ level: tokens[i].tag, text, id });
  return self.renderToken(tokens, i, opts);
};
const defaultLink = md.renderer.rules.link_open || ((t, i, o, e, s) => s.renderToken(t, i, o));
md.renderer.rules.link_open = (tokens, i, opts, env, self) => {
  const href = tokens[i].attrGet('href') || '';
  if (href.startsWith('/open-task-light/')) tokens[i].attrSet('href', localHref(href));
  return defaultLink(tokens, i, opts, env, self);
};
const escA = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function localHref(h) { return h.replace(/^\/open-task-light\//, '/').replace(/\.md(#|$)/, '/$1'); }

// ---- part colours ------------------------------------------------------------------------------
// A part keeps one colour everywhere. The key is the normalized label; pins live in part-colors.json
// by colour name; the rest are assigned so parts that share a photo never share a colour.
const PALETTE = { red: '#f0524f', orange: '#f76b15', amber: '#e6b800', lime: '#9acd32', green: '#3bb273', teal: '#2bb5a6', cyan: '#3cc7e8', blue: '#4ea8ff', indigo: '#7b7bff', violet: '#a276d6', magenta: '#d64fb8', rose: '#ff7aa2' };
const NAMES = Object.keys(PALETTE);
const cfg = existsSync('part-colors.json') ? JSON.parse(readFileSync('part-colors.json', 'utf8')) : {};
const aliases = cfg.aliases || {};
const partKey = label => normalizeKey(label, aliases);
const pinned = {}; const clashes = [];
for (const [k, v] of Object.entries(cfg.pins || {})) { if (PALETTE[v]) pinned[partKey(k)] = v; else clashes.push(`${k} is pinned to "${v}", which is not a palette colour (${NAMES.join(', ')})`); }

// ---- callouts: a nested list inside each <figure> --------------------------------------------------
const FIGBLOCK = /<figure>([\s\S]*?)<\/figure>/g;
const attr = (s, name) => { const m = s.match(new RegExp(`\\b${name}="([^"]*)"`)); return m ? decodeHTML(m[1]) : null; };
// text as the page script sees it: no comments, tags or liquid, and no link text (phrases inside links are never highlighted)
const plain = s => s.replace(/```[\s\S]*?```/g, ' ').replace(/<!--[\s\S]*?-->/g, '').replace(/<a\b[^>]*>[\s\S]*?<\/a>/g, ' ').replace(/\[[^\]]*\]\([^)]*\)/g, ' ').replace(/<[^>]+>/g, ' ').replace(/\{%[^%]*%\}/g, ' ').replace(/[*_`]+/g, ' ').replace(/[#>]/g, '').toLowerCase();
const wordRx = needle => new RegExp(`(^|[^a-z0-9])${needle.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-z0-9])`, 'g');
function parseFigure(inner) {
  const img = inner.match(/<img\b[^>]*>/); if (!img) return null;
  const src = attr(img[0], 'src'), alt = attr(img[0], 'alt') || '';
  const cap = (inner.match(/<figcaption>([\s\S]*?)<\/figcaption>/) || [, ''])[1].trim();
  const list = inner.match(/<ol class="callouts">([\s\S]*?)<\/ol>/);
  const hotspots = [], errors = [];
  if (list) for (const li of list[1].matchAll(/<li\b([^>]*)>([\s\S]*?)<\/li>/g)) {
    const a = li[1], body = li[2];
    const note = (body.match(/<note>([\s\S]*?)<\/note>/) || [, ''])[1].trim();
    const label = body.replace(/<note>[\s\S]*?<\/note>/, '').replace(/<[^>]+>/g, '').trim();
    const dot = (attr(a, 'dot') || '').split(',').map(Number), pos = (attr(a, 'label') || '').split(',').map(Number);
    if (!label || dot.length !== 2 || pos.length !== 2 || dot.some(isNaN) || pos.some(isNaN)) { errors.push(`bad callout item: ${li[0].slice(0, 80)}`); continue; }
    const links = (attr(a, 'link') || '').split(';').map(s => s.trim()).filter(Boolean).map(s => { const m = s.match(/^([^:]+):\s*(?!\/\/)(.+)$/); return m ? { text: m[1].trim(), href: m[2].trim() } : { text: 'Link', href: s }; });
    hotspots.push({ label, ax: dot[0], ay: dot[1], lx: pos[0], ly: pos[1], qty: attr(a, 'qty') || '', match: attr(a, 'match') || label, detail: note, links, key: partKey(label) });
  }
  return { src, alt, cap, hotspots, errors };
}

// Pass 1: parse every page's figures (colours need the whole set before rendering).
// A page is split into text, headings, rules and figure blocks; a <div> row of figures counts as one block,
// so every figure in it shares the same text window: the text back to the previous break (plus that
// heading's own words) and forward to the next break.
const ROW = /^<div>\s*(?:<figure>[\s\S]*?<\/figure>\s*)+<\/div>$/m;
const BLOCK = new RegExp(`(${ROW.source}|<figure>[\\s\\S]*?<\\/figure>|^#{1,6} .*$|^\\*\\*\\*$|\\{% ?(?:end)?(?:tabs|tab|stepper|step)\\b[^%]*%\\})`, 'm');
const parsed = {};
for (const p of pages) {
  const text = readFileSync(`content/${p}.md`, 'utf8');
  const figs = []; let figIndex = 0; const windows = new Map();
  const parts = text.split(BLOCK);
  for (let i = 0; i < parts.length; i++) {
    const block = parts[i];
    if (!block.startsWith('<figure>') && !block.startsWith('<div>')) continue;
    const heading = (parts[i - 2] || '').match(/^#{1,6} (.*)$/) ? parts[i - 2].replace(/^#+ /, '') : '';
    // shared text windows, keyed by block; a claimed phrase is blanked out so a phrase nested inside it
    // (say "power track" inside "channel opposite the power track") can't be claimed again, as on the page
    const back = `${i - 1}`, fwd = `${i + 1}`;
    if (!windows.has(back)) windows.set(back, plain(heading + '\n' + (parts[i - 1] || '')));
    if (!windows.has(fwd)) windows.set(fwd, plain(parts[i + 1] || ''));
    const claim = needle => [back, fwd].some(k => {
      const win = windows.get(k), m = wordRx(needle).exec(win); if (!m) return false;
      const start = m.index + m[1].length; windows.set(k, win.slice(0, start) + ' '.repeat(needle.length) + win.slice(start + needle.length)); return true;
    });
    for (const m of block.matchAll(FIGBLOCK)) {
      figIndex++;
      const f = parseFigure(m[1]);
      if (!f) { figs.push({ index: figIndex, skip: true, raw: m[0], hotspots: [], errors: ['figure without an <img>'], unpaired: [], links: [] }); continue; }
      const unpaired = f.hotspots.filter(h => !claim(h.match)).map(h => h.match);
      figs.push({ index: figIndex, image: f.src, alt: f.alt, caption: f.cap, hotspots: f.hotspots, errors: f.errors, unpaired, links: f.hotspots.flatMap(h => h.links.map(l => l.href)) });
    }
  }
  parsed[p] = { text, figs };
}

// colour assignment: greedy graph colouring over co-occurrence in a photo, most-used parts first
const co = new Map(), uses = new Map();
for (const { figs } of Object.values(parsed)) for (const f of figs) {
  const keys = [...new Set(f.hotspots.map(h => h.key))];
  for (const k of keys) { uses.set(k, (uses.get(k) || 0) + 1); if (!co.has(k)) co.set(k, new Set()); for (const o of keys) if (o !== k) co.get(k).add(o); }
}
const colorOf = {};
const order = [...uses.keys()].sort((a, b) => (pinned[b] ? 1 : 0) - (pinned[a] ? 1 : 0) || uses.get(b) - uses.get(a) || (a < b ? -1 : 1));
const usage = Object.fromEntries(NAMES.map(n => [n, 0]));
for (const k of order) {
  const taken = new Set([...co.get(k)].map(o => colorOf[o]).filter(Boolean));
  let pick = pinned[k] || null;
  if (pick && taken.has(pick)) clashes.push(`${k} is pinned ${pick} but shares a photo with another ${pick} part`);
  if (!pick) {
    // among free colours, prefer the one farthest in hue from colours already in this part's photos, then the least used
    const free = NAMES.filter(n => !taken.has(n));
    const dist = n => taken.size ? Math.min(...[...taken].map(t => { const d = Math.abs(NAMES.indexOf(n) - NAMES.indexOf(t)); return Math.min(d, NAMES.length - d); })) : NAMES.length;
    pick = [...(free.length ? free : NAMES)].sort((a, b) => dist(b) - dist(a) || usage[a] - usage[b] || NAMES.indexOf(a) - NAMES.indexOf(b))[0];
    if (!free.length) clashes.push(`${k}: no free colour, reusing ${pick}`);
  }
  colorOf[k] = pick; usage[pick]++;
}
mkdirSync('.build', { recursive: true });
for (const k of Object.keys(pinned)) if (!uses.has(k)) clashes.push(`${k} is pinned but no figure uses that part name`);
const labelColors = {};
for (const { figs } of Object.values(parsed)) for (const f of figs) for (const h of f.hotspots) labelColors[h.label] = PALETTE[colorOf[h.key]];
writeFileSync('.build/label-colors.json', JSON.stringify(labelColors, null, 2));
writeFileSync('.build/part-colors.generated.json', JSON.stringify(Object.fromEntries(order.map(k => [k, { color: colorOf[k], uses: uses.get(k), pinned: !!pinned[k] }])), null, 2));

// ---- navigation ----------------------------------------------------------------------------------
const titles = {};
for (const p of pages) { const m = parsed[p].text.match(/^# (.+)$/m); titles[p] = m ? m[1] : p; }
function navTree() {
  const root = { children: [] }, byPath = { '': root };
  for (const p of pages) {
    const parts = p.split('/'); let acc = '';
    for (const part of parts) {
      const next = acc ? acc + '/' + part : part;
      if (!byPath[next]) { const node = { path: next, title: titles[next] || part, children: [] }; byPath[next] = node; byPath[acc].children.push(node); }
      acc = next;
    }
  }
  return root.children;
}
const tree = navTree();
function renderNav(nodes, current, depth = 0) {
  return `<ul${depth === 0 ? ' class="top-level"' : ''}>${nodes.map(n => {
    const isCur = n.path === current, open = current === n.path || current.startsWith(n.path + '/');
    const chev = n.children.length ? `<button class="chev" type="button" aria-label="Toggle section">▶</button>` : '';
    const kids = n.children.length ? renderNav(n.children, current, depth + 1) : '';
    return `<li${isCur ? ' aria-current="page"' : ''}${open ? ' class="open"' : ''}><div class="row"><a href="/${n.path}/">${escA(n.title)}</a>${chev}</div>${kids}</li>`;
  }).join('')}</ul>`;
}

// ---- render ---------------------------------------------------------------------------------------
// width/height of a PNG or JPEG from its header, so <img> tags carry a size and the page doesn't shift while
// lazy images load (deep links depend on that). Returns null when the photo isn't downloaded yet.
function imageSize(src) {
  const path = 'public' + src; if (!existsSync(path)) return null;
  const fd = openSync(path, 'r'), buf = Buffer.alloc(65536), n = readSync(fd, buf, 0, buf.length, 0); closeSync(fd);
  if (buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf.readUInt16BE(0) === 0xffd8) {
    let i = 2;
    while (i + 9 < n) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
  }
  return null;
}
// GitBook "space variables" used on the printing pages, with the values the live site renders
const SPACE_VARS = { layer_height_prusa: 'Prusa: .15mm Structural', layer_height_bambu: 'Bambu: .16mm High Quality', infill: '25%', shells: '4 perimeters, 6 top layers, 5 bottom layers' };
function figureOut(f) {
  if (f.skip) return f.raw;
  const lis = f.hotspots.map(h => {
    const a = [`dot="${h.ax},${h.ay}"`, `label="${h.lx},${h.ly}"`, `style="--c: ${PALETTE[colorOf[h.key]]}"`];
    if (h.qty) a.push(`qty="${escA(h.qty)}"`); if (h.match !== h.label) a.push(`match="${escA(h.match)}"`);
    if (h.links.length) a.push(`link="${escA(h.links.map(l => l.text + ': ' + l.href).join('; '))}"`);
    return `<li ${a.join(' ')}>${h.label}${h.detail ? `<note>${h.detail}</note>` : ''}</li>`;
  }).join('');
  const size = imageSize(f.image), dims = size ? ` width="${size.w}" height="${size.h}"` : '';
  if (!size && existsSync('public' + f.image)) console.warn(`could not read the size of ${f.image}; the page may shift while it loads`);
  return `<figure class="shot" id="figure-${f.index}" data-index="${f.index}"><div class="frame"><img src="${f.image}" alt="${escA(f.alt)}"${dims} loading="lazy"></div>${f.caption ? `<figcaption>${f.caption}</figcaption>` : ''}${lis ? `<ol class="callouts">${lis}</ol>` : ''}</figure>`;
}
function preprocess(page) {
  const { text, figs } = parsed[page];
  let k = 0;
  let out = text.replace(FIGBLOCK, () => figureOut(figs[k++]));
  out = out.replace(/^<div>\s*(?=<figure)/gm, '<div class="shot-row">').replace(/<\/figure>\s*\n\s*(?=<figure)/g, '</figure>').replace(/<\/figure>\s*\n\s*<\/div>/g, '</figure></div>');
  // markdown-it ends an HTML block only at a blank line, so guarantee blank lines around figures and rows
  out = out.replace(/([^\n])\n(<figure class="shot"|<div class="shot-row">)/g, '$1\n\n$2').replace(/(<\/figure>|<\/div>)\n(?!\n|<\/div>|<figure)/g, '$1\n\n');
  return out.split('\n').map(line => line
      .replace(/\{% hint style="(\w+)"[^%]*%\}/, (_, s) => `<aside class="hint hint-${s}">\n`)
      .replace(/\{% endhint %\}/, '\n</aside>')
      .replace(/\{% stepper %\}/, '<div class="stepper">').replace(/\{% endstepper %\}/, '</div>')
      .replace(/\{% step %\}/, '<div class="step">\n').replace(/\{% endstep %\}/, '\n</div>')
      .replace(/\{% tabs %\}/, '<div class="tabs">').replace(/\{% endtabs %\}/, '</div>')
      .replace(/\{% tab title="([^"]*)" %\}/, (_, t) => `<div class="tab"><div class="tab-title">${t}</div>\n`).replace(/\{% endtab %\}/, '\n</div>')
      .replace(/\{% embed url="<?([^">]+)>?" %\}/, (_, u) => /\.mp4\b/.test(u) ? `<video class="embed" controls src="${u.replace(/&amp;/g, '&')}"></video>` : `<p class="embed"><a href="${u}">${u}</a></p>`)
      .replace(/<code class="expression">space\.vars\.(\w+)<\/code>/g, (_, v) => SPACE_VARS[v] ?? v)
      .replace(/href="\/open-task-light\/([^"]+)"/g, (_, p) => `href="${localHref('/open-task-light/' + p)}"`)
  ).join('\n');
}

const template = readFileSync('template.html', 'utf8');
const manifest = {};
const OUT = '.build';
mkdirSync(`${OUT}/site`, { recursive: true });
let totalCallouts = 0;
const known = new Set(pages);
for (const p of pages) {
  const env = {};
  const html = md.render(preprocess(p), env);
  const figs = parsed[p].figs;
  for (const f of figs) for (const l of f.links) if (!/^https?:/.test(l) && !known.has(l.split('#')[0].replace(/^\//, '').replace(/\/$/, ''))) f.errors.push(`unknown link path: ${l}`);
  manifest[p] = { figures: figs.map(f => ({ index: f.index, image: f.image || null, alt: f.alt, callouts: f.hotspots.length, labels: f.hotspots.map(h => h.label), unpaired: f.unpaired, errors: f.errors })) };
  const n = figs.reduce((a, f) => a + f.hotspots.length, 0); totalCallouts += n;
  const crumbs = p.split('/').slice(0, -1).map((_, i, a) => { const path = a.slice(0, i + 1).join('/'); return `<a href="/${path}/">${escA(titles[path] || path)}</a>`; }).join(' / ');
  const toc = (env.toc || []).map(t => `<li class="toc-${t.level}"><a href="#${t.id}">${escA(t.text)}</a></li>`).join('');
  const idx = pages.indexOf(p), prev = pages[idx - 1], next = pages[idx + 1];
  const page = template
    .replace('{{TITLE}}', () => escA(titles[p])).replace('{{NAV}}', () => renderNav(tree, p)).replace('{{CRUMBS}}', () => crumbs)
    .replace('{{BODY}}', () => html).replace('{{TOC}}', () => toc)
    .replace('{{NOTE}}', () => figs.length ? `${n} callouts on ${figs.filter(f => f.hotspots.length).length} of ${figs.length} photos` : '')
    .replace('{{PREV}}', () => prev ? `<a href="/${prev}/"><small>Previous</small>${escA(titles[prev])}</a>` : '<span></span>')
    .replace('{{NEXT}}', () => next ? `<a href="/${next}/" class="next"><small>Next</small>${escA(titles[next])}</a>` : '<span></span>');
  mkdirSync(`${OUT}/site/${p}`, { recursive: true });
  writeFileSync(`${OUT}/site/${p}/index.html`, page);
}
writeFileSync(`${OUT}/site/index.html`, `<!doctype html><meta http-equiv="refresh" content="0; url=/${pages[0]}/">`);
cpSync('assets', `${OUT}/site/assets`, { recursive: true });
if (!existsSync('public/images')) console.warn('public/images is missing: run `npm run fetch` to download the photos');
try { lstatSync(`${OUT}/site/images`); } catch { symlinkSync('../../public/images', `${OUT}/site/images`); }
writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2));
const errors = Object.entries(manifest).flatMap(([p, m]) => m.figures.flatMap(f => f.errors.map(e => `${p} figure ${f.index}: ${e}`)));
const unpaired = Object.entries(manifest).flatMap(([p, m]) => m.figures.flatMap(f => f.unpaired.map(u => `${p} figure ${f.index}: "${u}" not found in nearby text`)));
writeFileSync(`${OUT}/unpaired.txt`, unpaired.length ? unpaired.join('\n') + '\n' : '');
console.log(`built ${pages.length} pages, ${totalCallouts} callouts, ${Object.keys(colorOf).length} distinct parts, ${unpaired.length} callouts whose phrase is not in the nearby text (.build/unpaired.txt)`);
if (clashes.length) console.log('colour notes:\n' + clashes.join('\n'));
if (errors.length) { console.error('callout errors:\n' + errors.join('\n')); process.exitCode = 1; }
