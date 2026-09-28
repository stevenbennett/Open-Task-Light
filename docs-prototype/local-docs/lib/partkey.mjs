// The key that gives a part its colour everywhere: the label, normalized so spelling variants agree.
const PLURALS = ['screw', 'nut', 'washer', 'cable', 'spacer', 'wheel', 'pin', 'button', 'terminal', 'wire', 'support', 'tab', 'clip'];
export function partKey(label, aliases = {}) {
  let k = label.toLowerCase().replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
  k = k.replace(/(\d+) ?[x×] ?(\d+) ?mm\b/g, '$1x$2 mm').replace(/(\d+)mm\b/g, '$1 mm');
  for (const p of PLURALS) k = k.replace(new RegExp(`\\b${p}s\\b`, 'g'), p);
  return aliases[k] || k;
}
