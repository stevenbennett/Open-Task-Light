// Mirrors the live GitBook into content/ (markdown) and public/images/ (photos).
// Image URLs in the markdown are rewritten to local paths; the originals are kept in sources.json.
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname } from 'node:path';
const ROOT = 'https://open-task-light.gitbook.io/open-task-light/';
const txt = await (await fetch(ROOT + 'llms.txt')).text();
const urls = [...new Set(txt.match(/https:\/\/open-task-light\.gitbook\.io\/open-task-light\/[^\s)]+\.md/g))];
const sources = existsSync('sources.json') ? JSON.parse(readFileSync('sources.json', 'utf8')) : {};
let imgCount = 0;
for (const url of urls) {
  const rel = url.slice(ROOT.length).replace(/\.md$/, '');
  const out = `content/${rel}.md`;
  if (existsSync(out)) continue;
  let md = await (await fetch(url)).text();
  md = md.split('\n').filter(l => !l.startsWith('> For the complete documentation index')).join('\n').trimStart();
  const jobs = [];
  md = md.replace(/https:\/\/\d+-files\.gitbook\.io[^"\s)]+/g, (src) => {
    const clean = src.replace(/&amp;/g, '&');
    const ext = (clean.match(/\.(jpe?g|png|gif|webp|svg)/i) || [, 'jpg'])[1].toLowerCase().replace('jpeg', 'jpg');
    const name = createHash('sha1').update(clean).digest('hex').slice(0, 12) + '.' + ext;
    const path = `public/images/${name}`;
    sources[name] = clean;
    if (!existsSync(path)) jobs.push(fetch(clean).then(async r => { writeFileSync(path, Buffer.from(await r.arrayBuffer())); imgCount++; }));
    return `/images/${name}`;
  });
  await Promise.all(jobs);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, md);
  console.log('fetched', rel, jobs.length ? `(${jobs.length} images)` : '');
}
writeFileSync('sources.json', JSON.stringify(sources, null, 2));
writeFileSync('pages.json', JSON.stringify(urls.map(u => u.slice(ROOT.length).replace(/\.md$/, '')), null, 2));
console.log('done', urls.length, 'pages,', imgCount, 'new images');
