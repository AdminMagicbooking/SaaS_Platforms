#!/usr/bin/env node
// Render a COREPROMA document to print-ready A4 PDF.
//
//   node topdf.mjs path/to/doc.html path/to/out.pdf
//
// preferCSSPageSize honours the document's own `@page{size:A4;margin:0}`, so the
// PDF page box matches the .page box exactly and nothing is rescaled.
// printBackground is required or every tinted card, the dark hero and the footer
// bar all render white.
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

// Resolve playwright from the project being worked on (see measure.mjs).
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

const [file, out] = process.argv.slice(2);
if (!file || !out) { console.error('usage: node topdf.mjs <file.html> <out.pdf>'); process.exit(1); }

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage();
await page.goto(pathToFileURL(path.resolve(file)).href, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('wrote', out);
