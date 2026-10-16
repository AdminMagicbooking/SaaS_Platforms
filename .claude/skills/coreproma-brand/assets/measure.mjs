#!/usr/bin/env node
// Fit-check a COREPROMA document before you trust it.
//
//   node measure.mjs path/to/doc.html [--shot]
//
// A4 pages are fixed-height with overflow:hidden, so content that runs past the
// bottom is SILENTLY CLIPPED — the browser shows no scrollbar and no warning.
// This prints the slack (px) between the last content block and the footer on
// every page. Negative slack means text is being cut off in the PDF.
//
// --shot also writes .page-N.png next to the HTML so you can eyeball each page.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

// Resolve playwright from the project being worked on, not from this skill
// folder — the skill is normally copied somewhere outside the project's
// node_modules tree.
const chromium = await (async () => {
  const req = createRequire(pathToFileURL(path.join(process.cwd(), 'x.js')));
  try {
    // playwright ships CJS, so under dynamic import the API hangs off .default.
    const m = await import(pathToFileURL(req.resolve('playwright')).href);
    return m.chromium ?? m.default?.chromium;
  } catch {
    console.error('playwright not found. Run `npm i -D playwright` in this project, then retry.');
    process.exit(1);
  }
})();

const file = process.argv[2];
const shot = process.argv.includes('--shot');
if (!file) { console.error('usage: node measure.mjs <file.html> [--shot]'); process.exit(1); }

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
await page.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'networkidle' });

const rows = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].map((pg, i) => {
    const kids = [...pg.children];
    const footer = pg.querySelector('.footer');
    const top = pg.getBoundingClientRect().top;
    // Last child is the footer; the one before it is the last content block.
    const lastContent = kids[kids.length - 2];
    const contentBottom = lastContent.getBoundingClientRect().bottom - top;
    const footerTop = footer.getBoundingClientRect().top - top;
    return {
      page: i + 1,
      contentBottom: Math.round(contentBottom),
      footerTop: Math.round(footerTop),
      slack: Math.round(footerTop - contentBottom),
    };
  })
);

let bad = 0;
for (const r of rows) {
  const ok = r.slack >= 0;
  if (!ok) bad++;
  console.log(
    `page ${r.page}: content ends ${r.contentBottom}px, footer at ${r.footerTop}px, ` +
    `slack ${r.slack}px  ${ok ? (r.slack < 8 ? 'TIGHT' : 'ok') : 'OVERFLOW — CONTENT IS BEING CLIPPED'}`
  );
}

if (shot) {
  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    const out = path.join(path.dirname(file), `.page-${i + 1}.png`);
    await pages[i].screenshot({ path: out });
    console.log('wrote', out);
  }
}

await browser.close();
process.exit(bad ? 1 : 0);
