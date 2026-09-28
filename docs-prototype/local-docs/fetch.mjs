// Mirrors the live GitBook into content/ (markdown) and public/images/ (photos).
// Pages already in content/ are kept as they are (they may carry callouts); photos are downloaded
// whenever they are missing, so a fresh clone gets its images without touching the pages.
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';
const ROOT = 'https://open-task-light.gitbook.io/open-task-light/';
async function get(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} for ${url}`);
  return r;
}
const txt = await (await get(ROOT + 'llms.txt')).text();
const urls = [...new Set(txt.match(/https:\/\/open-task-light\.gitbook\.io\/open-task-light\/[^\s)]+\.md/g))];
const sources = existsSync('sources.json') ? JSON.parse(readFileSync('sources.json', 'utf8')) : {};
let newPages = 0;
for (const url of urls) {
  const rel = url.slice(ROOT.length).replace(/\.md$/, '');
  const out = `content/${rel}.md`;
  if (existsSync(out)) continue;
  let md = await (await get(url)).text();
  md = md.split('\n').filter(l => !l.startsWith('> For the complete documentation index')).join('\n').trimStart();
  md = md.replace(/https:\/\/\d+-files\.gitbook\.io[^"\s)]+/g, (src) => {
    const clean = src.replace(/&amp;/g, '&');
    const ext = (clean.match(/\.(jpe?g|png|gif|webp|svg)/i) || [, 'jpg'])[1].toLowerCase().replace('jpeg', 'jpg');
    const name = createHash('sha1').update(clean).digest('hex').slice(0, 12) + '.' + ext;
    sources[name] = clean;
    return `/images/${name}`;
  });
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, md); newPages++;
  console.log('fetched', rel);
}
writeFileSync('sources.json', JSON.stringify(sources, null, 2));
writeFileSync('pages.json', JSON.stringify(urls.map(u => u.slice(ROOT.length).replace(/\.md$/, '')), null, 2));

mkdirSync('public/images', { recursive: true });
const missing = Object.entries(sources).filter(([name]) => !existsSync(`public/images/${name}`));
let done = 0;
for (let i = 0; i < missing.length; i += 8) {
  await Promise.all(missing.slice(i, i + 8).map(async ([name, src]) => {
    try { writeFileSync(`public/images/${name}`, Buffer.from(await (await get(src)).arrayBuffer())); done++; }
    catch (e) { console.warn('image failed:', name, e.message); }
  }));
  if (missing.length > 40 && (i + 8) % 80 === 0) console.log(`images ${Math.min(i + 8, missing.length)}/${missing.length}`);
}
console.log(`done: ${urls.length} pages (${newPages} new), ${done} of ${missing.length} missing images downloaded`);
if (done < missing.length) process.exitCode = 1;
