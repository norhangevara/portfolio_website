# Norhan Gevara Portfolio — Webflow Setup Guide

This guide walks you through rebuilding your portfolio inside Webflow's visual editor while keeping the exact same design, colours, fonts, and animations. The strategy: you build the structure visually in Webflow, paste in the CSS and JS snippets below, and match class names as you go.

---

## STEP 1 — Create a new Webflow project

1. Log into [webflow.com](https://webflow.com) → **New Project → Blank Site**
2. Name it `Norhan Gevara Portfolio`
3. Go to **Site Settings → Custom Code**

---

## STEP 2 — Paste this into **Head Code** (Site Settings → Custom Code → Head)

This loads your fonts and injects all design tokens and base styles.

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">

<style>
/* ── DESIGN TOKENS ── */
:root {
  --cl-primary: 13, 13, 13;
  --cl-primary-white: 240, 237, 228;
  --cl-primary-dark: 8, 8, 8;
  --cl-accent-1: 56, 30, 18;
  --cl-accent-2: 176, 91, 59;
  --cl-accent-2-lighter: 200, 120, 85;
  --cl-accent-3: 140, 115, 85;
  --cl-accent-4: 100, 80, 60;
  --cl-text-1: 240, 237, 228;
}

/* ── BASE ── */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body {
  background: rgb(var(--cl-primary-white));
  color: rgb(var(--cl-primary));
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  overflow-x: hidden;
}
a { text-decoration: none; color: inherit; }

/* ── PAGE LOADER ── */
#page-loader {
  position: fixed; inset: 0;
  background: rgb(var(--cl-primary-dark));
  z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.6s ease, visibility 0.6s ease;
}
#page-loader.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
#loader-number {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(80px, 15vw, 180px);
  color: rgb(var(--cl-text-1));
  letter-spacing: -0.02em;
  line-height: 1;
}

/* ── HEADER ── */
#site-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  background: rgb(var(--cl-primary-white));
  border-bottom: 1px solid rgba(var(--cl-primary), 0.12);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px; height: 44px;
}
.header-meta {
  display: flex; align-items: center; gap: 24px;
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-primary), 0.7);
}
.header-meta .dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: #4CAF50; animation: pulse 2s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.header-nav { display: flex; align-items: center; gap: 32px; }
.nav-link {
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; position: relative; overflow: hidden;
  display: inline-flex; flex-direction: column; height: 1.2em;
}
.nav-link span { display: block; line-height: 1.2; transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1); }
.nav-link .nav-clone { position: absolute; top: 100%; left: 0; }
.nav-link:hover span { transform: translateY(-100%); }
.nav-link.active span { opacity: 0.5; }

/* ── HERO ── */
#hero {
  min-height: 100vh;
  background: rgb(var(--cl-primary-white));
  display: flex; flex-direction: column; overflow: hidden;
}
.hero-title-wrap {
  padding: 60px 32px 0;
  border-bottom: 1px solid rgba(var(--cl-primary), 0.15);
}
.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(72px, 13vw, 200px);
  line-height: 0.9; letter-spacing: -0.01em;
  display: block;
}
.hero-middle {
  display: flex; align-items: stretch; flex: 1;
  border-bottom: 1px solid rgba(var(--cl-primary), 0.15);
}
.hero-subtitle-left, .hero-subtitle-right {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(48px, 8vw, 120px);
  letter-spacing: 0.04em;
  display: flex; align-items: center;
  padding: 0 32px; flex: 1;
}
.hero-subtitle-right { justify-content: flex-end; }
.hero-card {
  width: clamp(180px, 22vw, 320px);
  border-left: 1px solid rgba(var(--cl-primary), 0.15);
  border-right: 1px solid rgba(var(--cl-primary), 0.15);
  display: flex; flex-direction: column;
  padding: 16px;
}
.hero-card-meta {
  display: flex; justify-content: space-between;
  font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; margin-bottom: 12px;
  color: rgba(var(--cl-primary), 0.6);
}
.hero-card-img {
  flex: 1; background: rgba(var(--cl-primary), 0.08);
  border-radius: 2px; min-height: 140px;
  display: flex; align-items: center; justify-content: center;
}
.hero-card-placeholder {
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(var(--cl-primary), 0.4); text-align: center;
  padding: 8px; transition: opacity 0.3s ease;
}
.scroll-down {
  font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
  font-weight: 700; padding: 14px 32px;
  color: rgba(var(--cl-primary), 0.5);
}

/* ── MARQUEE ── */
.marquee-section {
  overflow: hidden; border-top: 1px solid rgba(var(--cl-primary), 0.12);
  border-bottom: 1px solid rgba(var(--cl-primary), 0.12);
  padding: 12px 0;
}
.marquee-track {
  display: flex; gap: 24px; align-items: baseline;
  white-space: nowrap;
  animation: marquee 28s linear infinite;
}
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-item {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 4vw, 52px); letter-spacing: 0.04em;
  color: rgb(var(--cl-primary)); white-space: nowrap;
}
.marquee-item.lowercase { font-family: 'Manrope', sans-serif; font-size: clamp(18px, 2.5vw, 32px); font-weight: 800; }
.marquee-divider { font-size: 24px; color: rgba(var(--cl-primary), 0.3); }

/* ── SPOTLIGHT ── */
#spotlight {
  background: rgb(var(--cl-primary)); padding: 80px 32px;
}
.spotlight-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
}
.spotlight-image {
  aspect-ratio: 4/3; background: rgba(var(--cl-text-1), 0.08);
  border-radius: 2px; overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.spotlight-placeholder {
  display: flex; flex-direction: column; align-items: center; gap: 8px;
  color: rgba(var(--cl-text-1), 0.3);
}
.spotlight-eyebrow {
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-text-1), 0.5); margin-bottom: 16px;
}
.spotlight-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(48px, 6vw, 96px); line-height: 0.95;
  letter-spacing: 0.01em; color: rgb(var(--cl-text-1)); margin-bottom: 24px;
}
.spotlight-tags { display: flex; gap: 8px; flex-wrap: wrap; }

/* ── PILL ── */
.pill {
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  font-weight: 700; padding: 5px 14px; border-radius: 999px; display: inline-block;
}
.pill-light { border: 1px solid rgba(var(--cl-text-1), 0.3); color: rgb(var(--cl-text-1)); }
.pill-dark  { border: 1px solid rgba(var(--cl-primary), 0.25); color: rgb(var(--cl-primary)); }

/* ── MANIFESTO ── */
#manifesto {
  background: rgb(var(--cl-accent-2)); padding: 64px 32px;
  overflow: hidden;
}
.manifesto-lines { display: flex; flex-direction: column; }
.manifesto-line {
  overflow: hidden;
  border-bottom: 1px solid rgba(var(--cl-text-1), 0.15);
  padding: 8px 0;
}
.manifesto-line.mixed { text-align: right; }
.manifesto-line-inner {
  display: inline-block;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(48px, 9vw, 140px);
  line-height: 1; letter-spacing: 0.02em;
  color: rgb(var(--cl-text-1));
}
.manifesto-line.mixed .manifesto-line-inner {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(28px, 5vw, 72px); font-weight: 800; font-style: italic;
}

/* ── SCROLL REVEAL ── */
.reveal-clip {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-clip.visible { clip-path: inset(0%); }
.fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }

/* ── FEATURED WORKS ── */
#featured-works { padding: 64px 32px; background: rgb(var(--cl-primary-white)); }
.section-title-bleed {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 10vw, 160px);
  line-height: 0.9; letter-spacing: -0.01em;
  color: rgb(var(--cl-primary));
  border-bottom: 1px solid rgba(var(--cl-primary), 0.15);
  padding-bottom: 16px; margin-bottom: 24px;
}
.section-meta-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 40px;
}
.section-label {
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-primary), 0.5);
}
.works-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;
  margin-bottom: 40px;
}
.card { display: block; cursor: pointer; }
.card-placeholder {
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, rgba(var(--cl-accent-3), 0.4), rgba(var(--cl-accent-2), 0.5));
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.card-placeholder-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 18px; letter-spacing: 0.1em;
  color: rgba(var(--cl-primary), 0.3);
}
.card-info { padding: 16px 0 8px; }
.card-title {
  font-family: 'Bebas Neue', sans-serif; font-size: 28px;
  letter-spacing: 0.04em; margin-bottom: 8px;
}
.card-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.cta-wrap { text-align: center; padding-top: 32px; }
.btn-pill {
  display: inline-block;
  border: 1.5px solid rgb(var(--cl-primary));
  color: rgb(var(--cl-primary));
  font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
  font-weight: 700; padding: 12px 32px; border-radius: 999px;
  transition: background 0.25s ease, color 0.25s ease;
}
.btn-pill:hover { background: rgb(var(--cl-primary)); color: rgb(var(--cl-primary-white)); }
.btn-pill-light {
  border-color: rgb(var(--cl-text-1)); color: rgb(var(--cl-text-1));
}
.btn-pill-light:hover { background: rgb(var(--cl-text-1)); color: rgb(var(--cl-primary)); }

/* ── PLAYGROUND PREVIEW ── */
#playground-preview {
  background: rgb(var(--cl-primary)); padding: 64px 32px;
}
.section-title-bleed-light {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(56px, 10vw, 160px);
  line-height: 0.9; letter-spacing: -0.01em;
  color: rgb(var(--cl-text-1));
  border-bottom: 1px solid rgba(var(--cl-text-1), 0.15);
  padding-bottom: 16px; margin-bottom: 24px;
}
.playground-meta-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 32px;
}
.playground-list { list-style: none; }
.playground-item {
  display: flex; align-items: baseline; gap: 24px;
  border-bottom: 1px solid rgba(var(--cl-text-1), 0.1);
  padding: 20px 0; cursor: pointer;
}
.playground-item:hover .playground-name { opacity: 0.6; }
.playground-num {
  font-size: 11px; letter-spacing: 0.1em; font-weight: 700;
  color: rgba(var(--cl-text-1), 0.35); min-width: 28px;
}
.playground-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(24px, 3.5vw, 48px); letter-spacing: 0.04em;
  color: rgb(var(--cl-text-1)); transition: opacity 0.3s ease;
}

/* ── FOOTER ── */
#site-footer { background: rgb(var(--cl-primary-white)); }
.footer-upper {
  display: grid; grid-template-columns: 1fr auto 1fr;
  align-items: start; padding: 48px 32px; gap: 40px;
  border-top: 1px solid rgba(var(--cl-primary), 0.12);
}
.footer-col-label {
  font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-primary), 0.4); margin-bottom: 16px;
}
.footer-links { list-style: none; }
.footer-links li + li { margin-top: 6px; }
.footer-link {
  font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;
  font-weight: 700; position: relative; overflow: hidden;
  display: inline-flex; flex-direction: column; height: 1.2em;
}
.footer-link span { display: block; line-height: 1.2; transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1); }
.footer-clone { position: absolute; top: 100%; left: 0; color: rgb(var(--cl-accent-2)); }
.footer-link:hover span { transform: translateY(-100%); }
.footer-back-top { display: flex; align-items: center; justify-content: center; }
.back-top-btn {
  background: none; border: 1.5px solid rgba(var(--cl-primary), 0.3);
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; padding: 10px 24px; border-radius: 999px;
  cursor: pointer; transition: border-color 0.25s ease;
}
.back-top-btn:hover { border-color: rgb(var(--cl-primary)); }
.footer-nav-col { text-align: right; }
.footer-marquee-band {
  background: rgb(var(--cl-accent-1)); overflow: hidden;
  padding: 20px 0; cursor: pointer;
}
.footer-marquee-track {
  display: flex; gap: 32px; align-items: center; white-space: nowrap;
  animation: marquee 20s linear infinite;
}
.footer-marquee-item {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(36px, 5vw, 72px); letter-spacing: 0.08em;
  color: rgb(var(--cl-text-1)); white-space: nowrap;
}
.footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 32px;
  border-top: 1px solid rgba(var(--cl-primary), 0.1);
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-primary), 0.5);
}
.footer-bottom-meta { display: flex; gap: 24px; }
</style>
```

---

## STEP 3 — Paste this into **Footer Code** (Site Settings → Custom Code → Footer)

This adds all your interactions: page loader, live clock, scroll reveals, and animations.

```html
<script>
/* ── PAGE LOADER ── */
function runPageLoader() {
  const loader = document.getElementById('page-loader');
  const numEl  = document.getElementById('loader-number');
  if (!loader || !numEl) return;
  let count = 100;
  const interval = setInterval(() => {
    count = Math.max(0, count - (100 / 30));
    numEl.textContent = String(Math.round(count)).padStart(3, '0');
    if (count <= 0) {
      clearInterval(interval);
      numEl.textContent = '000';
      setTimeout(() => loader.classList.add('hidden'), 200);
    }
  }, 1400 / 30);
}

/* ── LIVE CLOCK (Cairo GMT+2) ── */
function startClock() {
  const clocks = document.querySelectorAll('[data-live-clock]');
  if (!clocks.length) return;
  function update() {
    const cairoTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
    const h = String(cairoTime.getHours() % 12 || 12);
    const m = String(cairoTime.getMinutes()).padStart(2, '0');
    const ampm = cairoTime.getHours() >= 12 ? 'PM' : 'AM';
    clocks.forEach(el => el.textContent = `${h}:${m} ${ampm}  GMT+2`);
  }
  update(); setInterval(update, 1000);
}

/* ── BACK TO TOP ── */
function initBackToTop() {
  document.querySelectorAll('.back-top-btn').forEach(btn =>
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
  );
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-clip, .fade-up');
  if (!items.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('visible'), delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  items.forEach(item => observer.observe(item));
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  runPageLoader();
  startClock();
  initBackToTop();
  initScrollReveal();
});
</script>
```

---

## STEP 4 — Add your colours in Webflow's Style Panel

Go to **Style Panel → Swatches** and add these:

| Name | Hex |
|------|-----|
| Sand (background) | `#F0EDE4` |
| Near-black | `#0D0D0D` |
| Terracotta | `#B05B3B` |
| Burnt Umber | `#381E12` |
| Warm Tan | `#8C7355` |

---

## STEP 5 — Add your fonts

Go to **Site Settings → Fonts → Add Google Font** and add:
- **Bebas Neue** (used for all display headings)
- **Manrope** (weights 400, 600, 700, 800 — used for body text)

---

## STEP 6 — Page structure (build this visually in Webflow)

Each page follows this structure. In Webflow, use **Div Block** for every wrapper and give it the class name shown:

### Homepage (`index.html`)

```
Body
 ├── Div  #page-loader
 │    └── Text  #loader-number  →  "100"
 │
 ├── Nav  #site-header
 │    ├── Div  .header-meta
 │    │    ├── Div  .dot
 │    │    ├── Text  "Cairo, EG"
 │    │    ├── Text  [data-live-clock]  →  "--:-- --  GMT+2"
 │    │    └── Text  "30.0444° N, 31.2357° E"
 │    └── Div  .header-nav
 │         ├── Link  .nav-link  href="/"       → span "Home"  + span.nav-clone "Home"
 │         ├── Link  .nav-link  href="/works"  → span "Works" + span.nav-clone "Works"
 │         ├── Link  .nav-link  href="/playground" → ...
 │         └── Link  .nav-link  href="/about"  → ...
 │
 ├── Section  #hero
 │    ├── Div  .hero-title-wrap → Span .hero-title "NORHAN GEVARA"
 │    ├── Div  .hero-middle
 │    │    ├── Span  .hero-subtitle-left  "A BRAND"
 │    │    ├── Div  .hero-card
 │    │    │    ├── Div  .hero-card-meta
 │    │    │    │    ├── Span  #hero-card-cat  "Brand Identity"
 │    │    │    │    └── Span  #hero-card-year "2025"
 │    │    │    └── Div  .hero-card-img
 │    │    │         └── Div  .hero-card-placeholder  #hero-card-ph  "FEATURED PROJECT"
 │    │    └── Span  .hero-subtitle-right  "DESIGNER"
 │    └── Div  .scroll-down  "SCROLL DOWN"
 │
 ├── Div  .marquee-section
 │    └── Div  .marquee-track  (paste the marquee items inside)
 │
 ├── Section  #spotlight
 │    └── Div  .spotlight-inner
 │         ├── Div  .spotlight-image .fade-up  (add your image here)
 │         └── Div  .spotlight-text
 │              ├── Para  .spotlight-eyebrow .fade-up  "Featured Work · 2025"
 │              ├── H2   .spotlight-title .fade-up  "YOUR PROJECT TITLE"
 │              └── Div  .spotlight-tags .fade-up  (add .pill.pill-light spans)
 │
 ├── Section  #manifesto
 │    └── Div  .manifesto-lines
 │         ├── Span  .manifesto-line  → Span .manifesto-line-inner .reveal-clip "INTENTIONAL"
 │         ├── Span  .manifesto-line.mixed → Span .manifesto-line-inner .reveal-clip "Brand"
 │         ├── (repeat for each line...)
 │
 ├── Section  #featured-works
 │    ├── H2  .section-title-bleed  "FEATURED  WORKS"
 │    ├── Div  .section-meta-row  (label + pills)
 │    ├── Div  .works-grid
 │    │    └── (4 × Link .card → .card-placeholder + .card-info)
 │    └── Div  .cta-wrap → Link .btn-pill "See All Work"
 │
 ├── Section  #playground-preview
 │    ├── H2  .section-title-bleed-light  "PLAYGROUND"
 │    ├── Div  .playground-meta-row
 │    ├── List  .playground-list
 │    │    └── (5 × List Item .playground-item → .playground-num + .playground-name)
 │    └── Div  .cta-wrap → Link .btn-pill.btn-pill-light "See All Work"
 │
 └── Footer  #site-footer
      ├── Div  .footer-upper  (social links + back to top + navigation)
      ├── Div  .footer-marquee-band → Div .footer-marquee-track (LET'S TALK items)
      └── Div  .footer-bottom  (location + clock + copyright)
```

---

## STEP 7 — Per-page custom code

For pages with special interactions (Works, Playground), add this JS to that **page's** Before `</body>` tag (Page Settings → Custom Code):

### Works & Playground pages — add to Page Custom Code Footer

```html
<style>
/* Carousel layout */
.carousel-page { height: 100vh; overflow: hidden; display: flex; flex-direction: column; background: rgb(var(--cl-primary)); }
.carousel-status-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 32px; height: 44px; margin-top: 44px;
  border-bottom: 1px solid rgba(var(--cl-text-1), 0.1);
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-text-1), 0.5);
}
.carousel-main { display: flex; flex: 1; overflow: hidden; }
.carousel-strip {
  flex: 1; display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.carousel-item {
  position: absolute; cursor: pointer;
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  background: rgba(var(--cl-text-1), 0.06);
  display: flex; align-items: center; justify-content: center;
}
.carousel-item.active  { width: 42vw; height: 58vh; opacity: 1; transform: translateX(0) scale(1); z-index: 2; }
.carousel-item.adjacent{ width: 28vw; height: 44vh; opacity: 0.4; transform: translateX(0) scale(0.88); z-index: 1; }
.carousel-item.hidden  { opacity: 0; transform: scale(0.7); pointer-events: none; z-index: 0; }
.carousel-item.active::before, .carousel-item.active::after {
  content: ''; position: absolute; width: 18px; height: 18px;
  border-color: rgb(var(--cl-accent-2)); border-style: solid;
}
.carousel-item.active::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.carousel-item.active::after  { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
.corner-tr, .corner-bl {
  position: absolute; width: 18px; height: 18px;
  border-color: rgb(var(--cl-accent-2)); border-style: solid;
}
.corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.carousel-right {
  width: 260px; border-left: 1px solid rgba(var(--cl-text-1), 0.1);
  padding: 32px 24px; overflow-y: auto;
}
.carousel-right-item {
  font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  font-weight: 700; color: rgba(var(--cl-text-1), 0.35);
  padding: 12px 0; border-bottom: 1px solid rgba(var(--cl-text-1), 0.08);
  cursor: pointer; transition: color 0.25s ease;
}
.carousel-right-item.active, .carousel-right-item:hover { color: rgb(var(--cl-text-1)); }
.carousel-nav-btn {
  position: fixed; top: 50%; transform: translateY(-50%);
  background: none; border: 1px solid rgba(var(--cl-text-1), 0.2);
  color: rgb(var(--cl-text-1));
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; padding: 10px 18px; cursor: pointer;
  transition: border-color 0.25s ease;
}
#carousel-prev { left: 24px; }
#carousel-next { right: 300px; }
</style>

<script>
function initCarousel() {
  const strip = document.getElementById('carousel-strip');
  if (!strip) return;
  const items = Array.from(strip.querySelectorAll('.carousel-item'));
  const titleEl = document.getElementById('carousel-title');
  const counterEl = document.getElementById('carousel-counter');
  const rightList = document.getElementById('carousel-right-list');
  const total = items.length;
  let current = 0;
  const names = items.map(el => el.dataset.title || '');

  function updateCarousel(newIdx) {
    current = ((newIdx % total) + total) % total;
    items.forEach((item, i) => {
      item.classList.remove('active', 'adjacent', 'hidden');
      const diff = ((i - current + total) % total);
      if (diff === 0) item.classList.add('active');
      else if (diff === 1 || diff === total - 1) item.classList.add('adjacent');
      else item.classList.add('hidden');
    });
    if (titleEl) { titleEl.style.opacity='0'; setTimeout(()=>{ titleEl.textContent=names[current]; titleEl.style.opacity='1'; },200); }
    if (counterEl) counterEl.textContent = `${current+1}/${total}`;
    if (rightList) rightList.querySelectorAll('.carousel-right-item').forEach((el,i)=>el.classList.toggle('active',i===current));
  }

  if (rightList) names.forEach((name,i)=>{ const d=document.createElement('div'); d.className='carousel-right-item'; d.textContent=name; d.addEventListener('click',()=>updateCarousel(i)); rightList.appendChild(d); });
  document.getElementById('carousel-prev')?.addEventListener('click',()=>updateCarousel(current-1));
  document.getElementById('carousel-next')?.addEventListener('click',()=>updateCarousel(current+1));
  items.forEach((item,i)=>item.addEventListener('click',()=>{ if(i===current && item.dataset.href) window.location.href=item.dataset.href; else updateCarousel(i); }));
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft'||e.key==='ArrowUp') updateCarousel(current-1); if(e.key==='ArrowRight'||e.key==='ArrowDown') updateCarousel(current+1); });
  updateCarousel(0);
}

function initCarouselTimer() {
  const timerEl = document.getElementById('carousel-timer');
  if (!timerEl) return;
  let secs = 0;
  setInterval(()=>{ secs++; const hh=String(Math.floor(secs/3600)).padStart(2,'0'); const mm=String(Math.floor((secs%3600)/60)).padStart(2,'0'); const ss=String(secs%60).padStart(2,'0'); timerEl.textContent=`${hh}:${mm}:${ss}`; },1000);
}

document.addEventListener('DOMContentLoaded',()=>{ initCarousel(); initCarouselTimer(); });
</script>
```

---

## STEP 8 — Webflow-specific tips

**Setting class names in Webflow:**
Click any element → in the Style Panel on the left, click the class field and type the class name exactly as shown (e.g. `hero-title`, `marquee-track`).

**Adding IDs:**
Click element → in the right panel under Element Settings, set the ID field (e.g. `page-loader`, `site-header`).

**Adding data attributes:**
Click element → Element Settings → Custom Attributes → `+` button → key: `data-live-clock`, value: (leave blank).

**Images:**
Wherever you see `.card-placeholder` or `.spotlight-image`, swap the div for a **Image element** and upload your project photos directly.

**Animations (Webflow Interactions):**
The scroll reveal classes (`.reveal-clip`, `.fade-up`) are handled by the JS above. You can also layer Webflow's native Interactions panel on top for richer effects.

**Publishing:**
Every time you make changes in Webflow's editor, hit **Publish** and your site updates instantly — no code, no terminal.

---

## Quick reference — element IDs and classes

| Element | ID or Class |
|---------|------------|
| Page loader overlay | `#page-loader` |
| Loader number | `#loader-number` |
| Header | `#site-header` |
| Live clock element | `data-live-clock` attribute |
| Hero section | `#hero` |
| Hero display title | `.hero-title` |
| Spotlight section | `#spotlight` |
| Manifesto section | `#manifesto` |
| Featured works | `#featured-works` |
| Playground preview | `#playground-preview` |
| Footer | `#site-footer` |
| Scroll reveal elements | `.reveal-clip` or `.fade-up` |
| Carousel wrapper | `#carousel-strip` |
| Carousel prev button | `#carousel-prev` |
| Carousel next button | `#carousel-next` |
| Carousel title display | `#carousel-title` |
| Carousel project list | `#carousel-right-list` |
| Carousel timer | `#carousel-timer` |
