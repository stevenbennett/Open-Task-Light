// Draws dot + leader + label callouts from each figure's data-callouts JSON, shows a hover card,
// pairs each callout with the phrase in the nearby text, and keeps small (row) images clean until enlarged.
(function () {
  const body = document.body;
  body.dataset.mode = 'leaders';
  document.querySelectorAll('.proto-mode input').forEach(r => r.addEventListener('change', () => { body.dataset.mode = r.value; closeTip(); }));
  const tpl = document.getElementById('tooltip-tpl');
  const abs = h => h.startsWith('http') ? h : '/' + h.replace(/^\//, '') + (h.includes('#') || h.endsWith('/') ? '' : '/');

  let openTip = null, pinned = null;
  function closeTip() { if (openTip) { openTip.remove(); openTip = null; } pinned = null; }
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTip(); });
  document.addEventListener('click', e => { if (!e.target.closest('.callout, .tip')) closeTip(); });

  // text elements around a figure: backwards to the previous figure/heading/rule, then forwards to the next
  function nearbyText(fig) {
    const stop = 'figure, .shot-row, h1, h2, h3, hr';
    const grab = el => el.matches('ul, ol') ? [...el.querySelectorAll('li')] : el.matches('p, aside') ? [el] : [];
    const back = [], fwd = [];
    let el = (fig.closest('.shot-row') || fig).previousElementSibling, g = 0;
    while (el && g++ < 14 && !el.matches(stop)) { back.push(...grab(el)); el = el.previousElementSibling; }
    el = (fig.closest('.shot-row') || fig).nextElementSibling; g = 0;
    while (el && g++ < 14 && !el.matches(stop)) { fwd.push(...grab(el)); el = el.nextElementSibling; }
    return back.concat(fwd);
  }
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // wrap the phrase naming this part; whole-word matches first so "Solder" doesn't grab "Soldering iron"
  function wrapMatch(textEls, needle, color, title) {
    const tryRx = (rx) => {
      for (const el of textEls) {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node; while ((node = walker.nextNode())) {
          if (node.parentElement.closest('.ref')) continue;
          const m = rx.exec(node.textContent); if (!m) continue;
          const at = m.index + (m[1] ? m[1].length : 0);
          const mid = node.splitText(at); mid.splitText(needle.length);
          const ref = document.createElement('span'); ref.className = 'ref'; ref.style.setProperty('--c', color); ref.title = title;
          mid.parentNode.insertBefore(ref, mid); ref.appendChild(mid);
          const b = document.createElement('span'); b.className = 'bullet'; ref.prepend(b);
          return ref;
        }
      }
      return null;
    };
    return tryRx(new RegExp(`(^|[^A-Za-z0-9])${esc(needle)}(?![A-Za-z0-9])`, 'i')) || tryRx(new RegExp(`()${esc(needle)}`, 'i'));
  }

  function showTip(fig, spot, color, isPinned) {
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
    fig.appendChild(tip);
    const useLabel = body.dataset.mode === 'leaders';
    const fw = fig.clientWidth, fh = fig.clientHeight;
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
    const meta = { hotspots: [...list.querySelectorAll(':scope > li')].map(li => {
      const [ax, ay] = num(li.getAttribute('dot')), [lx, ly] = num(li.getAttribute('label'));
      const note = li.querySelector('note');
      const label = [...li.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
      const links = (li.getAttribute('link') || '').split(';').map(s => s.trim()).filter(Boolean).map(s => { const m = s.match(/^([^:]+):\s*(.+)$/); return m ? { text: m[1].trim(), href: m[2].trim() } : { text: 'Link', href: s }; });
      return { label, ax, ay, lx, ly, qty: li.getAttribute('qty') || '', match: li.getAttribute('match') || label, detail: note ? note.textContent.trim() : '', links, color: li.style.getPropertyValue('--c') || 'var(--c1)', li };
    }).filter(h => !isNaN(h.ax) && !isNaN(h.lx)) };
    if (!meta.hotspots.length) return;
    fig.classList.add('annotated');
    const inRow = !!fig.closest('.shot-row');
    if (inRow) fig.classList.add('small');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'leaders'); fig.appendChild(svg);
    list.classList.add('legend');
    const textEls = nearbyText(fig);
    const items = [];

    meta.hotspots.forEach((spot, i) => {
      const color = spot.color || 'var(--c1)';
      const co = document.createElement('div'); co.className = 'callout'; co.style.setProperty('--c', color);
      const dot = document.createElement('button'); dot.type = 'button'; dot.className = 'dot'; dot.textContent = i + 1;
      dot.setAttribute('aria-label', `${spot.label}${spot.qty ? ', ' + spot.qty : ''}`);
      dot.style.left = spot.ax + '%'; dot.style.top = spot.ay + '%';
      const lbl = document.createElement('button'); lbl.type = 'button'; lbl.className = 'lbl'; lbl.textContent = spot.label; lbl.tabIndex = -1;
      lbl.style.left = spot.lx + '%'; lbl.style.top = spot.ly + '%';
      const path = document.createElementNS(svg.namespaceURI, 'path'); path.setAttribute('class', 'lead'); path.style.stroke = color;
      const halo = path.cloneNode(); halo.setAttribute('class', 'lead halo');
      svg.append(halo, path); co.append(dot, lbl); fig.appendChild(co);
      items.push({ spot, path, halo, lbl });

      const li = spot.li; const n = document.createElement('span'); n.className = 'n'; n.textContent = i + 1; li.prepend(n);
      if (spot.qty) { const q = document.createElement('span'); q.className = 'muted'; q.textContent = ` (${spot.qty})`; li.insertBefore(q, li.querySelector('note')); }
      const link = (spot.links || [])[0];
      if (link) { const a = document.createElement('a'); a.href = abs(link.href); a.textContent = link.text; li.append(' · ', a); }

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
      const w = fig.clientWidth, h = fig.clientHeight; if (!w || !h) return;
      svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
      items.forEach(({ spot, path, halo, lbl }) => {
        const ax = spot.ax / 100 * w, ay = spot.ay / 100 * h;
        const r = lbl.getBoundingClientRect(), fr = fig.getBoundingClientRect();
        const cx = r.left - fr.left + r.width / 2, cy = r.top - fr.top + r.height / 2;
        const dx = ax - cx, dy = ay - cy, horiz = Math.abs(dx) * r.height > Math.abs(dy) * r.width;
        const sx = cx + (horiz ? Math.sign(dx) * r.width / 2 : dx / Math.abs(dy || 1) * r.height / 2);
        const sy = cy + (horiz ? dy / Math.abs(dx || 1) * r.width / 2 : Math.sign(dy) * r.height / 2);
        const mx = (sx + ax) / 2, my = (sy + ay) / 2, len = Math.hypot(ax - sx, ay - sy) || 1, k = Math.min(18, len * 0.18);
        const d = `M ${sx} ${sy} Q ${mx - (ay - sy) / len * k} ${my + (ax - sx) / len * k} ${ax} ${ay}`;
        path.setAttribute('d', d); halo.setAttribute('d', d);
      });
    }
    new ResizeObserver(draw).observe(fig);
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
    fig.appendChild(chip);
  });
})();
