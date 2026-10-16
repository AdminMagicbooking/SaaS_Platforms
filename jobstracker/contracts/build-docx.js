const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, PageNumber, HeadingLevel, TabStopType,
  LevelFormat, PageBreak, VerticalAlign
} = require('docx');

const NAVY = '072244', TEAL = '0A8180', GREY = '5B6770', LIGHT = 'E6F2F2', RULE = 'C9D3D6';
const FONT = 'Arial';
const md = fs.readFileSync(process.argv[2], 'utf8').split('\n');
const logo = fs.readFileSync(process.argv[3]);
const out = process.argv[4];

// ---------- inline markdown -> runs ----------
function runs(text, base = {}) {
  const r = [];
  // unescape \[ \] \_ \*
  text = text.replace(/\\([\[\]_*])/g, '$1');
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) r.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) r.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else r.push(new TextRun({ text: t.slice(1, -1), font: 'Consolas', ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) r.push(new TextRun({ text: text.slice(last), ...base }));
  return r;
}

const body = [];
const P = (opts) => body.push(new Paragraph(opts));

function heading(text, level) {
  if (level === 2) {
    const isSchedule = /^Schedule/.test(text);
    body.push(new Paragraph({
      children: [new TextRun({ text, bold: true, color: NAVY, size: 26, font: FONT })],
      spacing: { before: isSchedule ? 0 : 360, after: 120 },
      pageBreakBefore: isSchedule,
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 4 } },
      keepNext: true,
    }));
  }
}

function para(text, extra = {}) {
  P({ children: runs(text, { size: 20, font: FONT }), spacing: { after: 120, line: 288 }, ...extra });
}

function table(rows) {
  const cols = rows[0].length;
  const total = 9360; // 6.5in
  const widths = cols === 2 ? [2600, 6760] : cols === 3 ? [2400, 4160, 2800] : [1100, 3760, 2000, 2500];
  const tr = rows.map((cells, i) => new TableRow({
    tableHeader: i === 0,
    cantSplit: true,
    children: cells.map((c, j) => new TableCell({
      width: { size: widths[j], type: WidthType.DXA },
      shading: i === 0 ? { fill: LIGHT, type: ShadingType.CLEAR, color: 'auto' } : undefined,
      margins: { top: 70, bottom: 70, left: 110, right: 110 },
      verticalAlign: VerticalAlign.TOP,
      children: [new Paragraph({ children: runs(c.trim(), { size: 18, font: FONT, bold: i === 0, color: i === 0 ? NAVY : undefined }), spacing: { after: 0, line: 264 } })],
    })),
  }));
  body.push(new Table({
    rows: tr, columnWidths: widths, width: { size: total, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: RULE }, bottom: { style: BorderStyle.SINGLE, size: 6, color: RULE },
      left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: RULE }, insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
    },
  }));
  P({ spacing: { after: 120 } });
}

// ---------- parse ----------
let i = 0, skip = false, tableBuf = [];
function flushTable() { if (tableBuf.length) { table(tableBuf); tableBuf = []; } }
while (i < md.length) {
  const line = md[i]; i++;
  if (line.startsWith('# ')) continue;            // title handled by cover
  if (/^Oct \d+, 2026 ·/.test(line)) continue;     // byline
  if (line.startsWith('## ')) {
    flushTable();
    const h = line.slice(3).trim();
    skip = h === 'How to use this draft';          // internal notes, not for the customer
    if (!skip) heading(h, 2);
    continue;
  }
  if (skip) continue;
  if (line.startsWith('|')) {
    if (/^\|\s*-+/.test(line)) continue;
    tableBuf.push(line.split('|').slice(1, -1));
    continue;
  }
  flushTable();
  if (!line.trim()) continue;
  if (/^- \[ \] /.test(line)) continue;
  if (/^- /.test(line)) { P({ children: runs(line.slice(2), { size: 20, font: FONT }), numbering: { reference: 'bul', level: 0 }, spacing: { after: 60, line: 276 } }); continue; }
  const num = line.match(/^(\d+)\. (.*)/);
  if (num) { P({ children: runs(num[2], { size: 20, font: FONT }), numbering: { reference: 'num', level: 0 }, spacing: { after: 60, line: 276 } }); continue; }
  if (/^\*\*[^*]+\*\*$/.test(line.trim())) { para(line, { keepNext: true, spacing: { before: 200, after: 80 } }); continue; }
  if (/^\*\*Signed for/.test(line)) { para(line, { spacing: { before: 360, after: 120 } }); continue; }
  para(line);
}
flushTable();

// ---------- cover ----------
const cover = [
  new Paragraph({ children: [new ImageRun({ type: 'png', data: logo, transformation: { width: 318, height: 60 } })], spacing: { before: 2400, after: 600 } }),
  new Paragraph({ children: [new TextRun({ text: 'Subscription Agreement', bold: true, color: NAVY, size: 56, font: FONT })], spacing: { after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: 'Jobs Tracker field-operations platform', color: TEAL, size: 28, font: FONT })], spacing: { after: 600 }, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: TEAL, space: 8 } } }),
  new Paragraph({ children: [new TextRun({ text: 'Master terms, Order Forms, Data Processing terms and Service Levels', size: 22, color: GREY, font: FONT })], spacing: { after: 80 } }),
  new Paragraph({ children: [new TextRun({ text: 'Supplier: Workwiz Limited, company no. 04999377', size: 22, color: GREY, font: FONT })], spacing: { after: 80 } }),
  new Paragraph({ children: [new TextRun({ text: 'First Floor, 1 Des Roches Square, Witan Way, Witney, Oxfordshire OX28 4BE', size: 22, color: GREY, font: FONT })], spacing: { after: 80 } }),
  new Paragraph({ children: [new TextRun({ text: 'Version: DRAFT 16 October 2026', size: 22, color: GREY, font: FONT })], spacing: { after: 80 } }),
  new Paragraph({ children: [new TextRun({ text: 'Confidential', bold: true, size: 22, color: NAVY, font: FONT })], spacing: { before: 400 } }),
];

const header = new Header({ children: [new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 6 } },
  children: [
    new ImageRun({ type: 'png', data: logo, transformation: { width: 117, height: 22 } }),
    new TextRun({ text: '\tSubscription Agreement · DRAFT', size: 16, color: GREY, font: FONT }),
  ],
})] });
const footer = new Footer({ children: [new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: 9360 }],
  border: { top: { style: BorderStyle.SINGLE, size: 4, color: RULE, space: 6 } },
  children: [
    new TextRun({ text: 'Workwiz Limited · Company no. 04999377 · Confidential', size: 16, color: GREY, font: FONT }),
    new TextRun({ children: ['\tPage ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES], size: 16, color: GREY, font: FONT }),
  ],
})] });

const doc = new Document({
  creator: 'Workwiz Limited',
  title: 'Jobs Tracker — Subscription Agreement',
  styles: { default: { document: { run: { font: FONT, size: 20, color: '1F2A30' } } } },
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
  ] },
  sections: [
    { properties: { page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }, titlePage: true },
      headers: { default: header, first: new Header({ children: [new Paragraph('')] }) },
      footers: { default: footer, first: new Footer({ children: [new Paragraph('')] }) },
      children: [...cover, new Paragraph({ children: [new PageBreak()] }), ...body] },
  ],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('wrote', out, b.length); });
