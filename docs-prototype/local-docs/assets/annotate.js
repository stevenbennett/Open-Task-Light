// Draws dot + leader + label callouts from each figure's nested <ol class="callouts"> list, shows a hover card,
// pairs each callout with the phrase in the nearby text, and keeps small (row) images clean until enlarged.
(function () {
  const body = document.body;
  // URL parameters, handy for sharing a view: ?mode=dots|leaders|off, ?pin=<part name> (on the first figure carrying it, or the one named by ?figure=), ?expand=<figure number>, ?figure=<figure number> to scroll to any photo
  const params = new URLSearchParams(location.search);
  body.dataset.mode = ['leaders', 'dots', 'off'].includes(params.get('mode')) ? params.get('mode') : 'leaders';
  const modeInput = document.querySelector(`.proto-mode input[value="${body.dataset.mode}"]`); if (modeInput) modeInput.checked = true;
  let pinnedByUrl = false;
  if (params.has('figure') || params.has('expand') || params.has('pin')) history.scrollRestoration = 'manual'; // a reload must not undo the deep link
  const target = document.getElementById('figure-' + params.get('figure'));
  if (target) { target.scrollIntoView({ block: 'center' }); window.addEventListener('load', () => target.scrollIntoView({ block: 'center' }), { once: true }); }
  document.querySelectorAll('.proto-mode input').forEach(r => r.addEventListener('change', () => { body.dataset.mode = r.value; closeTip(); }));
  const tpl = document.getElementById('tooltip-tpl');
  const abs = h => { if (h.startsWith('http')) return h; const [path, hash] = h.replace(/^\//, '').split('#'); return '/' + path.replace(/\/$/, '') + '/' + (hash ? '#' + hash : ''); };

  let openTip = null, pinned = null;
  function closeTip() { if (openTip) { openTip.remove(); openTip = null; } pinned = null; }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTip(); });
  document.addEventListener('click', e => { if (!e.target.closest('.callout, .tip, .ref')) closeTip(); });

  // the same window the build checks: back to the previous figure, heading or rule (the heading's own words
  // count), then forward to the next one
  function nearbyText(fig) {
    const stop = 'figure, .shot-row, h1, h2, h3, h4, h5, h6, hr, .tabs, .tab, .stepper, .step';
    const grab = el => el.matches('ul, ol') ? [...el.querySelectorAll('li')] : el.matches('p, aside, details, blockquote, td') ? [el] : el.matches('table') ? [...el.querySelectorAll('td, th')] : [];
    const back = [], fwd = [];
    let el = (fig.closest('.shot-row') || fig).previousElementSibling;
    while (el && !el.matches(stop)) { back.unshift(...grab(el)); el = el.previousElementSibling; } // document order
    if (el && /^H[1-6]$/.test(el.tagName)) back.unshift(el); // the heading's own words count, first
    el = (fig.closest('.shot-row') || fig).nextElementSibling;
    while (el && !el.matches(stop)) { fwd.push(...grab(el)); el = el.nextElementSibling; }
    return back.concat(fwd);
  }
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // wrap the first whole-word occurrence of the phrase naming this part, skipping text inside links or other refs
  function wrapMatch(textEls, needle, color, title) {
    const rx = new RegExp(`(^|[^A-Za-z0-9])${esc(needle)}(?![A-Za-z0-9])`, 'i');
    for (const el of textEls) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let node; while ((node = walker.nextNode())) {
        if (node.parentElement.closest('.ref, a')) continue;
        const m = rx.exec(node.textContent); if (!m) continue;
        const mid = node.splitText(m.index + m[1].length); mid.splitText(needle.length);
        const ref = document.createElement('span'); ref.className = 'ref'; ref.style.setProperty('--c', color); ref.title = title;
        mid.parentNode.insertBefore(ref, mid); ref.appendChild(mid);
        const b = document.createElement('span'); b.className = 'bullet'; ref.prepend(b);
        return ref;
      }
    }
    return null;
  }

  function showTip(fig, spot, color, isPinned) {
    const frame = fig.querySelector(':scope > .frame') || fig;
    if (body.dataset.mode === 'off') return;
    closeTip();
    const tip = tpl.content.firstElementChild.cloneNode(true);
    tip.style.setProperty('--c', color);
    tip.querySelector('.tip-label').textContent = spot.label;
    tip.querySelector('.tip-qty').textContent = /^\d+$/.test(spot.qty || '') ? 'Qty ' + spot.qty : (spot.qty || '');
    tip.querySelector('.tip-detail').textContent = spot.detail || '';
    const links = tip.querySelector('.tip-links');
    (spot.links || []).forEach(l => { const a = document.createElement('a'); a.href = abs(l.href); a.textContent = l.text; links.appendChild(a); });
    if (isPinned) tip.classList.add('pinned');
    frame.appendChild(tip);
    const useLabel = body.dataset.mode === 'leaders';
    const fw = frame.clientWidth, fh = frame.clientHeight;
    const px = (useLabel ? spot.lx : spot.ax) / 100 * fw, py = (useLabel ? spot.ly : spot.ay) / 100 * fh;
    const tw = tip.offsetWidth, th = tip.offsetHeight;
    const left = Math.min(Math.max(px - tw / 2, 4), fw - tw - 4);
    let top = py + 16, cls = 'below';
    if (top + th > fh - 4) { top = py - th - 16; cls = 'above'; }
    tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.setProperty('--ax', (px - left) + 'px'); tip.classList.add(cls);
    openTip = tip; if (isPinned) pinned = spot;
  }

  document.querySelectorAll('figure.shot').forEach(fig => {
    const list = fig.querySelector(':scope > ol.callouts'); if (!list) return;
    const num = s => (s || '').split(',').map(Number);
    const hotspots = [...list.querySelectorAll(':scope > li')].map(li => {
      const [ax, ay] = num(li.getAttribute('dot')), [lx, ly] = num(li.getAttribute('label'));
      const note = li.querySelector('note');
      const label = [...li.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
      const links = (li.getAttribute('link') || '').split(';').map(s => s.trim()).filter(Boolean).map(s => { const m = s.match(/^([^:]+):\s*(?!\/\/)(.+)$/); return m ? { text: m[1].trim(), href: m[2].trim() } : { text: 'Link', href: s }; });
      return { label, ax, ay, lx, ly, qty: li.getAttribute('qty') || '', match: li.getAttribute('match') || label, detail: note ? note.textContent.trim() : '', links, color: li.style.getPropertyValue('--c'), li };
    }).filter(h => !isNaN(h.ax) && !isNaN(h.lx));
    if (!hotspots.length) return;
    fig.classList.add('annotated');
    const frame = fig.querySelector(':scope > .frame') || fig;
    const inRow = !!fig.closest('.shot-row');
    if (inRow) fig.classList.add('small');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'leaders'); frame.appendChild(svg);
    list.classList.add('legend');
    const textEls = nearbyText(fig);
    const items = [];

    hotspots.forEach((spot, i) => {
      const color = spot.color || '#f0524f';
      const co = document.createElement('div'); co.className = 'callout'; co.style.setProperty('--c', color);
      const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'dot'; dot.textContent = i + 1;
      dot.setAttribute('aria-label', `${spot.label}${spot.qty ? ', ' + spot.qty : ''}`);
      dot.style.left = spot.ax + '%'; dot.style.top = spot.ay + '%';
      const lbl = document.createElement('button'); lbl.type = 'button'; lbl.className = 'lbl'; lbl.textContent = spot.label; lbl.tabIndex = -1;
      lbl.style.left = spot.lx + '%'; lbl.style.top = spot.ly + '%';
      const path = document.createElementNS(svg.namespaceURI, 'path'); path.setAttribute('class', 'lead'); path.style.stroke = color;
      const halo = path.cloneNode(); halo.setAttribute('class', 'lead halo');
      svg.append(halo, path); co.append(dot, lbl); frame.appendChild(co);
      items.push({ spot, path, halo, lbl });

      // the list is the legend in dots mode: number it and put quantity and link beside the name, before the note
      const li = spot.li, note = li.querySelector('note');
      const n = document.createElement('span'); n.className = 'n'; n.textContent = i + 1; li.prepend(n);
      const extra = document.createDocumentFragment();
      if (spot.qty) { const q = document.createElement('span'); q.className = 'muted'; q.textContent = ` (${spot.qty})`; extra.append(q); }
      const link = (spot.links || [])[0];
      if (link) { const a = document.createElement('a'); a.href = abs(link.href); a.textContent = link.text; extra.append(' · ', a); }
      note ? li.insertBefore(extra, note) : li.append(extra);

      const ref = spot.match ? wrapMatch(textEls, spot.match, color, spot.label) : null;
      const hot = on => { co.classList.toggle('is-hot', on); path.classList.toggle('is-hot', on); if (ref) ref.classList.toggle('is-hot', on); };
      [dot, lbl].forEach(el => {
        el.addEventListener('mouseenter', () => { hot(true); if (!pinned) showTip(fig, spot, color, false); });
        el.addEventListener('mouseleave', () => { hot(false); if (!pinned) closeTip(); });
        el.addEventListener('click', e => { e.stopPropagation(); if (pinned === spot) closeTip(); else showTip(fig, spot, color, true); });
      });
      dot.addEventListener('focus', () => { hot(true); showTip(fig, spot, color, false); });
      dot.addEventListener('blur', () => { hot(false); if (!pinned) closeTip(); });
      if (ref) {
        ref.addEventListener('mouseenter', () => hot(true));
        ref.addEventListener('mouseleave', () => hot(false));
        ref.addEventListener('click', () => { if (fig.classList.contains('small')) expand(true); fig.scrollIntoView({ block: 'center', behavior: 'smooth' }); showTip(fig, spot, color, true); });
      }
    });

    function draw() {
      const w = frame.clientWidth, h = frame.clientHeight; if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      items.forEach(({ spot, path, halo, lbl }) => {
        const ax = spot.ax / 100 * w, ay = spot.ay / 100 * h;
        const r = lbl.getBoundingClientRect(), fr = frame.getBoundingClientRect();
        const cx = r.left - fr.left + r.width / 2, cy = r.top - fr.top + r.height / 2;
        const dx = ax - cx, dy = ay - cy, horiz = Math.abs(dx) * r.height > Math.abs(dy) * r.width;
        const sx = cx + (horiz ? Math.sign(dx) * r.width / 2 : dx / Math.abs(dy || 1) * r.height / 2);
        const sy = cy + (horiz ? dy / Math.abs(dx || 1) * r.width / 2 : Math.sign(dy) * r.height / 2);
        const mx = (sx + ax) / 2, my = (sy + ay) / 2, len = Math.hypot(ax - sx, ay - sy) || 1, k = Math.min(18, len * 0.18);
        const d = `M ${sx} ${sy} Q ${mx - (ay - sy) / len * k} ${my + (ax - sx) / len * k} ${ax} ${ay}`;
        path.setAttribute('d', d); halo.setAttribute('d', d);
      });
    }
    new ResizeObserver(draw).observe(frame);
    fig.querySelector('img').addEventListener('load', draw);
    draw();

    // small images in a row: callouts stay hidden until the image is enlarged
    function expand(on) {
      fig.classList.toggle('expanded', on); fig.classList.toggle('small', !on); closeTip();
      chip.textContent = on ? 'Shrink' : 'Enlarge to see callouts';
      requestAnimationFrame(draw);
    }
    const chip = document.createElement('button'); chip.type = 'button'; chip.className = 'shot-toggle';
    if (inRow) {
      chip.textContent = 'Enlarge to see callouts';
      chip.addEventListener('click', e => { e.stopPropagation(); expand(!fig.classList.contains('expanded')); });
      fig.querySelector('img').addEventListener('click', () => expand(!fig.classList.contains('expanded')));
      fig.querySelector('img').style.cursor = 'zoom-in';
    } else {
      chip.textContent = 'Hide callouts';
      chip.addEventListener('click', () => { const hidden = fig.classList.toggle('hidden-callouts'); chip.textContent = hidden ? 'Show callouts' : 'Hide callouts'; closeTip(); });
    }
    frame.appendChild(chip);

    // honour ?figure=, ?expand= and ?pin=: scroll and expand right away (that also starts the lazy image),
    // and open the card once the image has a size. ?pin= opens the first figure carrying that part.
    const wanted = params.get('pin');
    const hit = wanted && !pinnedByUrl && (!target || fig === target) && hotspots.find(h => h.label.toLowerCase() === wanted.toLowerCase());
    if (hit) pinnedByUrl = true;
    if (inRow && (params.get('expand') === fig.dataset.index || hit)) expand(true);
    if (hit || params.get('expand') === fig.dataset.index) { fig.scrollIntoView({ block: 'center' }); window.addEventListener('load', () => fig.scrollIntoView({ block: 'center' }), { once: true }); }
    if (hit) { const img = fig.querySelector('img'); const open = () => showTip(fig, hit, hit.color, true); if (img.complete && img.naturalWidth) open(); else img.addEventListener('load', open, { once: true }); }
  });
})();
