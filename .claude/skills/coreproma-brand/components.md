# COREPROMA component reference

Copy-paste markup for every block in the system. All of it depends on
`assets/coreproma.css` being inlined in the document's `<style>`.

Order inside a `<section class="page">` is always: content blocks, then
`<div class="footer">` last. The measure script relies on the footer being the
final child.

---

## Section header

The `.rule` is a gradient line that fills the leftover width. `.gain` is an
optional benefit label that rides at the right end of that line, so it costs no
vertical space. Drop `.gain` if the section has no single clear payoff.

```html
<div class="sec">
  <div class="sec-head">
    <span class="num">01</span>
    <h2>Titre de section</h2>
    <span class="rule"></span>
    <span class="gain">Bénéfice en deux mots</span>
  </div>
  <!-- section body -->
</div>
```

On the first section of any page after page 1, add `style="padding-top:15mm"` —
there is no hero to supply the top margin.

---

## Two-card row

The workhorse layout. `.tool.a` gets a sage top border, `.tool.b` gold; the
`.feat` check marks follow the same colour. Cards in a row are stretched to
equal height, so the taller card sets the row height — shortening the *shorter*
card saves nothing.

```html
<div class="tools">
  <div class="tool a">
    <h3>Titre</h3>
    <!-- one visual block: .chips | .flow | .tasklist | .cmp | .noteviz -->
    <p>Une phrase.</p>
    <ul class="feat">
      <li>Un fait</li>
    </ul>
  </div>
  <div class="tool b">…</div>
</div>
```

---

## Card visuals

Pick exactly one per card. Two visuals in one card overflows the page.

### `.chips` — breadth of coverage

Pills size to their own text and wrap. Use for "everything this covers" lists.

```html
<div class="chips">
  <div class="chip">Réunions</div>
  <div class="chip">Tâches</div>
  <div class="chip">Réserves</div>
</div>
```

### `.flow` — a numbered sequence

Three steps maximum; a connecting line is drawn automatically. The last step's
badge turns gold. `.fpill` is an optional tag on the step title.

```html
<div class="flow">
  <div class="fstep">
    <span class="fn">1</span>
    <div><b>Titre de l'étape<span class="fpill">Photo</span></b><i>Ce qui se passe.</i></div>
  </div>
  <div class="fstep">
    <span class="fn">2</span>
    <div><b>Titre de l'étape</b><i>Ce qui se passe.</i></div>
  </div>
</div>
```

### `.tasklist` — rows with a status chip

Status classes: `st-done` (green), `st-wait` (amber), `st-late` (red),
`st-neutral` (grey). Never use `st-late` for anything that is not actually
overdue or failing; the red reads as an alarm.

```html
<div class="tasklist">
  <div class="trow">
    <div><span class="tname">Libellé<span class="tco">Entreprise · échéance 14/06</span></span></div>
    <span class="tst st-done">Validée</span>
  </div>
</div>
```

### `.cmp` — comparison table

Four columns. `.best` highlights the winning cell, `.miss` flags an omission.
`.cmp-note` is the amber caveat strip that goes underneath.

```html
<div class="cmp">
  <div class="cmp-r cmp-h"><span>Lot</span><span>Devis A</span><span>Devis B</span><span>Devis C</span></div>
  <div class="cmp-r"><span>Ligne</span><span>4 200</span><span class="best">3 850</span><span>4 410</span></div>
  <div class="cmp-r"><span>Garantie</span><span>incluse</span><span class="miss">absente</span><span>incluse</span></div>
  <div class="cmp-r cmp-t"><span>Total €</span><span>6 100</span><span class="best">5 900</span><span>6 190</span></div>
</div>
<div class="cmp-note"><b>⚑</b><span>À vérifier : …</span></div>
```

### `.noteviz` — icon rows

Three rows maximum. The last row's icon tile turns gold. Icons are inline SVG
(see Icons below).

```html
<div class="noteviz">
  <div class="nrow">
    <div class="ni"><svg viewBox="0 0 24 24">…</svg></div>
    <div class="nt"><b>Titre</b>Explication sur une ou deux lignes.</div>
  </div>
</div>
```

---

## `.dashwrap` — full-width panel

For anything that needs the whole column: schedules, dashboards, document
grids. `.panel-cap` is a small-caps caption with a rule that fills the rest of
the line. A panel can hold several caption + content pairs.

```html
<div class="dashwrap">
  <div class="panel-cap">Légende du panneau</div>
  <!-- .gantt | .kpis | .docgrid -->
</div>
```

### `.gantt` — schedule with a photo lane

`left` and `width` are percentages across the five-month axis. `.g-bar.pending`
renders the greyed "upcoming" style. The photo lane pins are day markers with a
count.

```html
<div class="gantt">
  <div class="g-months"><span>Mars</span><span>Avril</span><span>Mai</span><span>Juin</span><span>Juillet</span></div>
  <div class="g-row">
    <div class="g-lab">Fondations</div>
    <div class="g-track"><div class="g-bar" style="left:0;width:26%"><b>TERMINÉ</b></div></div>
  </div>
  <div class="g-row">
    <div class="g-lab">Second œuvre</div>
    <div class="g-track"><div class="g-bar pending" style="left:74%;width:26%"><b>À VENIR</b></div></div>
  </div>
  <div class="g-photolane">
    <div class="g-lab">Photos du chantier</div>
    <div class="g-pt">
      <div class="g-pin" style="left:6%">4</div>
    </div>
  </div>
</div>
```

### `.kpis` — figure tiles

Set `grid-template-columns` to the number of tiles. `.kpi-detail` is an
optional single line of breakdown underneath.

```html
<div class="kpis">
  <div class="kpi"><div class="v">4</div><div class="l">Actions en retard</div></div>
  <div class="kpi"><div class="v">9</div><div class="l">Sous 5 jours ouvrés</div></div>
  <div class="kpi"><div class="v">3</div><div class="l">Messages non lus</div></div>
</div>
<div class="kpi-detail">Groupées par chantier : Projet A <b>5</b> · Projet B <b>4</b></div>
```

### `.docgrid` — labelled tiles, three per row

```html
<div class="docgrid">
  <div class="docitem"><b>Permis de construire</b><span>Arrêté, plans et affichage</span></div>
</div>
<p class="doc-note">Une phrase de précision.</p>
```

---

## Page-closing blocks

### `.excl` — feature grid, two columns

Icon tile plus heading plus one sentence. Six items fill a page nicely.

```html
<div class="excl">
  <div class="ex">
    <div class="ic"><svg viewBox="0 0 24 24">…</svg></div>
    <div><h4>Titre</h4><p>Une phrase.</p></div>
  </div>
</div>
```

### `.gains` — benefits band, light

Put it *before* `.included`: the payoff should land before the specification.

```html
<div class="gains">
  <h3>Ce que vous y gagnez</h3>
  <div class="gainrow">
    <div class="gain-i"><h5>Bénéfice</h5><p>Un fait concret, pas un adjectif.</p></div>
  </div>
</div>
```

Set `.gainrow`'s `grid-template-columns` to the item count (4 or 5 works).

### `.included` — inclusions band, dark

Two-column check list on the dark green ground.

```html
<div class="included">
  <h3>Ce qui est inclus</h3>
  <ul class="inclist">
    <li>5 chantiers · jusqu'à 10 utilisateurs par chantier</li>
  </ul>
</div>
```

### `.startgrid` — three numbered steps

```html
<div class="startgrid">
  <div class="startstep">
    <div class="n">1</div>
    <h4>Créez votre compte</h4>
    <p>Une phrase.</p>
  </div>
</div>
```

### `.closing` — final call to action

```html
<div class="closing">
  <h2 class="display">Titre</h2>
  <p>Rappel de l'offre.</p>
  <a class="cta-lg" href="#">Démarrer l'essai gratuit →</a>
  <div class="links">Démo interactive : <b>coreproma.com/…</b></div>
</div>
```

---

## Icons

Never use emoji or box-drawing glyphs (▤ ⬡ ⚇ 🎙). They render at different
weights depending on which font happens to supply them, and print soft. Use
inline SVG on a 24×24 viewBox with no `fill` and no `stroke` attributes — the
CSS supplies `stroke:currentColor`, `fill:none` and the stroke width, so icons
inherit the tile colour automatically.

```html
<div class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-6.2"/></svg></div>
```

The set already drawn in the Pro brochure, reusable as-is:

| Meaning | Paths |
|---|---|
| people / collaboration | `<circle cx="9" cy="8" r="3.2"/><path d="M3.2 20a5.8 5.8 0 0 1 11.6 0"/><path d="M16.5 5.6a3.2 3.2 0 0 1 0 6"/><path d="M20.8 20a5.8 5.8 0 0 0-3.4-5.3"/>` |
| approval | `<circle cx="12" cy="12" r="9"/><path d="M7.8 12.3l2.9 2.9 5.5-6.2"/>` |
| mail | `<rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="M3.6 6.6L12 12.8l8.4-6.2"/>` |
| file import | `<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M12 11.5v5.5"/><path d="M9.6 14.6L12 12.2l2.4 2.4"/>` |
| link / portal | `<path d="M10.5 13.5a4.5 4.5 0 0 0 6.4 0l2.4-2.4a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2"/><path d="M13.5 10.5a4.5 4.5 0 0 0-6.4 0l-2.4 2.4a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2"/>` |
| layers / templates | `<path d="M12 3.2l8.5 4.6L12 12.4 3.5 7.8z"/><path d="M3.5 12.4L12 17l8.5-4.6"/><path d="M3.5 16.6L12 21.2l8.5-4.6"/>` |
| microphone | `<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5 10.5a7 7 0 0 0 14 0"/><path d="M12 17.5v4"/>` |
| pencil / edit | `<path d="M4 20.2h4.2L20 8.4a2.3 2.3 0 0 0-3.2-3.2L5 17z"/><path d="M15.4 6.6l2.9 2.9"/>` |
| document | `<rect x="4" y="3" width="16" height="18" rx="2.2"/><path d="M8 8.5h8M8 12.5h8M8 16.5h5"/>` |

---

## Logo

Mark plus wordmark plus strapline, laid out horizontally so it fits a document
header. The mark is the gold house containing three ascending bars, drawn as
SVG rather than embedded from `app-icon-1024.png` — the raster asset carries a
dark navy background that fights the hero, and prints soft at small sizes.

```html
<div class="brandrow">
  <div class="logomark">
    <svg viewBox="0 0 64 64" role="img" aria-label="COREPROMA">
      <path d="M6 28 L32 5.5 L58 28 V56 H6 Z" fill="none" stroke="#e5b25d" stroke-width="5" stroke-linejoin="round"/>
      <rect x="17.5" y="40" width="7" height="13.5" fill="#e5b25d"/>
      <rect x="28.5" y="34" width="7" height="19.5" fill="#e5b25d"/>
      <rect x="39.5" y="28" width="7" height="25.5" fill="#e5b25d"/>
    </svg>
  </div>
  <div class="brandtext">
    <div class="brandname">COREPROMA</div>
    <div class="brandtag">CONSTRUCTION · RENOVATION · PROJECT MANAGER</div>
  </div>
</div>
```

Do not put the mark on a coloured tile. The brand asset is gold directly on a
dark ground.
