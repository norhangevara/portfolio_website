# Full Prompt: Build Norhan Gevara's Portfolio Website

## Project Brief

Build a high-end creative portfolio for **Norhan Gevara** — a brand designer and creative director based in Cairo, Egypt. The site is structurally inspired by jasminegunarto.com but fully adapted to Norhan's identity: a more restrained, systems-oriented aesthetic grounded in sand, terracotta, and near-black. Every visual decision should feel intentional and precise, not decorative.

The site communicates one thing above all else: **this is someone who builds brands that hold together**.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: GSAP + ScrollTrigger + Lenis smooth scrolling
- **Fonts**:
  - Display font: **Bebas Neue** or **Dharma Gothic E** (weight 800–900) — for all hero/section titles
  - Body/UI font: **Manrope** (Google Fonts, weight 600–700) — navigation, labels, body text
- **Language**: TypeScript

---

## Design System (CSS Custom Properties)

```css
:root {
  /* Colors as RGB triplets */
  --cl-primary: 13, 13, 13;               /* Near-black — main text */
  --cl-primary-white: 240, 237, 228;      /* Sand/warm off-white — main background */
  --cl-primary-dark: 8, 8, 8;             /* Pure deep black — dark section bg */
  --cl-accent-1: 56, 30, 18;             /* Deep burnt umber — footer CTA band */
  --cl-accent-2: 176, 91, 59;            /* Terracotta — primary accent color */
  --cl-accent-2-lighter: 200, 120, 85;   /* Lighter terracotta — hover/highlight */
  --cl-accent-3: 140, 115, 85;           /* Warm tan — secondary accent */
  --cl-accent-4: 100, 80, 60;            /* Dark tan — subtle tones */
  --cl-text-1: 240, 237, 228;            /* Warm sand — text on dark backgrounds */
  --cl-background-light: 240, 237, 228;  /* Same as primary-white */

  /* Fluid scaling */
  --base-size-desktop-w: 1512;
  --base-size-mobile: 430;
  --scaler: 1;
}
```

Page default: background `rgb(var(--cl-primary-white))`, text `rgb(var(--cl-primary))`.

---

## Typography Rules

- **Display font** (Bebas Neue / Dharma Gothic E): ALL hero text, section titles, project names, footer marquee. Always uppercase, weight 800–900, tight tracking (`-0.02em` to `-0.05em`). Sizes from 80px (section labels) to 200px+ (hero name).
- **Manrope 700**: Navigation, metadata, tags, captions, body text. Uppercase for UI elements, sentence case for body. Small sizes: 11–14px for labels, 18–24px for body.
- **Intentional mixed case in marquees**: Some words remain lowercase or sentence case as a deliberate typographic rhythm — e.g., "Systems" within "BRAND SYSTEMS" — this creates visual tension.

---

## Site Structure

```
/                          → Homepage
/works/                    → Works page (carousel player)
/playground/               → Playground page (experimental/sketches carousel)
/about/                    → About page
/[project-slug]/           → Project detail pages
```

---

## Global Components

### 1. Top Header Bar (sticky)

```
[● CAIRO, EG]  [LIVE TIME GMT+2]  [30.0444° N, 31.2357° E]          [HOME] [WORKS] [PLAYGROUND] [ABOUT]
```

- Full-width, sand background, 1px bottom border in `rgba(var(--cl-primary), 0.15)`
- Left: pulsing dot + "CAIRO, EG" + live clock (updates every second) + coordinates — Manrope, ~11px, uppercase, tracking
- Right: navigation — Manrope, uppercase, ~12px
- **Nav hover effect**: Split text — on hover the word slides up and a duplicate slides in from below (`overflow: hidden` + CSS transform, 0.3s ease)

### 2. Page Load Animation

Fullscreen black overlay. Centered number counts down rapidly from ~100 to 000 in display font, sand-colored. Eases out over ~1.2s, then fades revealing the page.

### 3. Footer

**Upper footer** — sand background:
```
(FOLLOW)                                        (NAVIGATION)
INSTAGRAM                                               HOME
LINKEDIN                       BACK TO TOP             WORKS
BEHANCE                                          PLAYGROUND
EMAIL                                                  ABOUT
```
- Social links left, nav right, "BACK TO TOP" center — all large Manrope uppercase
- 1px top border

Social links:
- INSTAGRAM → `https://www.instagram.com/the_g_playground/`
- LINKEDIN → `https://www.linkedin.com/in/norhan-gevara-06137a178/`
- BEHANCE → `https://www.behance.net/norhangevara`
- EMAIL → `mailto:norhangevara@gmail.com`

**Lower footer** — deep burnt umber (`rgb(var(--cl-accent-1))`):
- Infinite scrolling marquee: `LET'S TALK  LET'S TALK  LET'S TALK` — display font, sand-colored, ~120px, links to `mailto:norhangevara@gmail.com`
- Below: thin strip with `● CAIRO, EG | [live time] | 30.0444° N, 31.2357° E` left, `©2026  ALL RIGHTS RESERVED` right — Manrope, ~11px

---

## Page: Homepage (`/`)

### Section 1 — Hero (100vh)

Background: `rgb(var(--cl-primary-white))`

```
NORHAN GEVARA            ← full-bleed display font, ~180–220px, overflows left/right
                         ← featured project card floats here (centered)
A BRAND        [CARD]    DESIGNER
                ↓
           SCROLL DOWN
```

- `NORHAN GEVARA`: fills 100% viewport width, display font weight 900, characters bleed off edges
- **Featured Project Card**: centered, rotates through projects on a timer. Shows: category label top-left, year top-right, project image. Thin border outline.
- `A BRAND` bottom-left, `DESIGNER` bottom-right — display font ~90–100px — these are the two halves of her title, split by the card
- `SCROLL DOWN` — Manrope uppercase, centered bottom, subtle animated downward indicator

### Section 2 — Marquee Strip

Continuous horizontal scrolling marquee (CSS `animation: marquee linear infinite`):

`INTENTIONAL  Brand  SYSTEMS  THINKING  Identity through  DIRECTION  WITH PURPOSE  INTENTIONAL  Brand  SYSTEMS  THINKING  …`

- Uppercase for conceptual words, sentence case for craft words — deliberate typographic contrast
- Sand background, near-black text
- Medium speed (~20s loop)

### Section 3 — Featured Project Spotlight (Near-black background)

Full-width dark section. Showcases one hero project prominently:
- Large project image or art direction screenshot filling the section
- Project name in display font overlaid in sand
- Category tags floating near the image
- This section transitions smoothly into the next

*(Project content is placeholder — leave image slots as `[PROJECT IMAGE PLACEHOLDER]` and title as `[FEATURED PROJECT TITLE]`)*

### Section 4 — "Brand Direction" Statement (Terracotta / accent)

Background: `rgb(var(--cl-accent-2))` (terracotta), text: `rgb(var(--cl-text-1))` (sand)

Large stacked display text, centered — this is the manifesto moment:

```
INTENTIONAL
Brand
SYSTEMS
Identity through
DIRECTION
WITH PURPOSE
```

Each line animates in from bottom on scroll (clip-path reveal, staggered). Mixed case is intentional.

### Section 5 — Featured Works

Background: `rgb(var(--cl-primary-white))`

```
FEATURED  WORKS         ← display font, bleeds edges, ~180–200px
────────────────────────────────────────────────────────────────
SELECTED PROJECTS                    STRATEGIC  CRAFTED  PRECISE
```

Below: **4 project cards** in a loose asymmetric grid. Each card:
- Image thumbnail
- Project title in display font
- Discipline tags: `Brand Identity`, `Art Direction`, `Visual Systems`, `Typography` etc.
- On hover: slight scale-up + subtle brightness increase

*(All 4 cards use placeholder project names and images — clearly label as `[PROJECT 01]` through `[PROJECT 04]`)*

`SEE ALL WORK` — pill/capsule button, near-black border, near-black text on sand. On hover: fills near-black, sand text. Links to `/works/`.

### Section 6 — Playground Section (Near-black background)

Background: `rgb(var(--cl-primary))`, text: `rgb(var(--cl-text-1))`

```
────────────────────────────────────────────────────────────────
SHORT, SELF-INITIATED WORK                    EXPERIMENTS & SKETCHES
```

`PLAYGROUND` in large display font (sand, partially visible)

Numbered list in massive display font:
```
01  TYPE STUDY 01
02  GRID EXPERIMENT
03  IDENTITY SKETCH
04  COLOUR SYSTEM
05  MOTION TEST
```
*(Placeholder names — user will replace with real playground pieces)*

`SEE ALL WORK` pill button (sand border + sand text on black). Links to `/playground/`.

---

## Page: Works (`/works/`)

Full-screen, black background, media-player carousel interface. **This is the signature page — execute it precisely.**

**3-column layout:**
- Left: empty (or subtle page label)
- Center (~55% width): stacked vertical thumbnails — 3 visible at once
- Right: empty

**Carousel behavior:**
- **Active thumbnail**: full opacity, slight scale-up, thin L-bracket corner markers (4 corners, ~12px, sand colored)
- **Adjacent thumbnails**: ~40% opacity, slightly smaller
- Project **title** above the strip in display font, sand text
- `PREV` top-left / `NEXT` top-right (Manrope uppercase, small)
- Pagination numbers: `… 1  **2**  3  4 …` below strip, active is bold
- Counter: `2/8` shown below strip

**Bottom bar:**
- Left: `00:00:02` — auto-incrementing elapsed timer, monospace style
- Right: `● PLAYING` — terracotta dot + sand text

**Placeholder projects (8 total):**
1. Project 01 — Brand Identity
2. Project 02 — Art Direction
3. Project 03 — Visual Systems
4. Project 04 — Typography
5. Project 05 — Brand Strategy
6. Project 06 — Packaging
7. Project 07 — Campaign Design
8. Project 08 — Identity System

*(Label these clearly as placeholders. User will replace with real project data.)*

Clicking a thumbnail navigates to `/[slug]/`. Keyboard arrow navigation supported.

---

## Page: Playground (`/playground/`)

Identical carousel structure to Works. Background: near-black.

**3-column layout:**
- Left column: `PLAYGROUND` in large display font (sand), vertically centered
- Center: stacked square/portrait thumbnails, bracket corners on active
- Right: dimmed numbered list of piece titles

**Placeholder pieces (6 total):**
1. Type Study 01
2. Grid Experiment
3. Identity Sketch
4. Colour System
5. Motion Test
6. Archive Fragment

Same `PREV`/`NEXT` nav, bottom timer + `● PLAYING`.

---

## Page: About (`/about/`)

### Section 1 — Hero (terracotta)

Background: `rgb(var(--cl-accent-2))` (terracotta)

```
ABOUT NORHAN           ← display font, sand text, fills viewport width
─────────────────────────────────────────────────────────
WHO'S THIS?                                    CAIRO, EG
          [PORTRAIT PHOTO — centered, ~50% width]
```

- `ABOUT NORHAN` bleeds to edges, weight 900
- `WHO'S THIS?` label left, `CAIRO, EG` label right — small Manrope, sand, uppercase
- Portrait photo centered, overlaps color boundary into the next section
- Optional pill links: `LINKEDIN` `BEHANCE` (sand outline on terracotta)

### Section 2 — Bio text (sand background)

Background: `rgb(var(--cl-primary-white))`

Large centered Manrope uppercase text, generous line height (~1.5), max-width ~820px, font-size ~22–28px:

```
I'M NOT INTERESTED IN MAKING THINGS LOOK GOOD.
THAT'S THE EASY PART.

I'M INTERESTED IN BUILDING BRANDS THAT HOLD
TOGETHER — ACROSS SPACE, ACROSS TOUCHPOINTS,
ACROSS THE WAY PEOPLE EXPERIENCE THEM.

MY WORK SITS BETWEEN DESIGN AND DIRECTION,
WHERE STRATEGY MEETS STORYTELLING AND IDEAS
BECOME SOMETHING YOU CAN ACTUALLY STEP INTO.

I THINK IN SYSTEMS, NOT JUST VISUALS.
IN FEELING, NOT JUST FORM.
AND IN THE KIND OF DETAILS MOST PEOPLE OVERLOOK,
BUT EVERYONE NOTICES.
```

Below bio: 3 floating objects in a loose horizontal arrangement — design-coded items (e.g., a pencil rendered in cut-out style, a swatch card, a grid sheet or book). These are symbolic, not decorative. Use CSS illustrations or simple SVG shapes if no images available.

Personality tags near the bio (small Manrope pills):
`SYSTEMS THINKER` · `DETAIL OBSESSED` · `BRAND STRATEGIST` · `CAIRO → EVERYWHERE`

### Section 3 — Disciplines (terracotta)

Background: `rgb(var(--cl-accent-2))`, text: `rgb(var(--cl-text-1))`

Large stacked display text, each on its own line, ~100–120px, slightly transparent/ghosted:

```
BRAND IDENTITY
ART DIRECTION
VISUAL SYSTEMS
TYPOGRAPHY
CREATIVE DIRECTION
```

Each line animates in from bottom on scroll (clip-path `inset(100% 0 0 0)` → `inset(0%)`, staggered 0.15s).

### Section 4 — *(Awards section removed)*

Since there are no awards yet, replace this with a **"Selected Clients / Collaborations"** placeholder section or skip entirely. If you include it, use a simple dark (near-black) section with text like:

```
MORE TO COME.
CURRENTLY BUILDING.
```

...in large display font, sand-colored, centered — as a confident placeholder rather than an absence.

---

## Page: Project Detail (`/[slug]/`)

### Header

Background: `rgb(var(--cl-primary-white))`

```
[PROJECT TITLE]        ← display font, ~140–180px, fills viewport width
────────────────────────────────────────────────────────────────────────
[CATEGORY]  [TYPE TAG]                              ROLE  [TAG1] [TAG2]
```

- Title fills 100% width in display font
- 1px black border below title
- Left: category text (small Manrope) + pill tag (1px border, rounded-full, 12px Manrope uppercase)
- Right: "ROLE" label + role pill tags

### Hero Image

Full-width (`100vw`), ~60–70vh height.

Sticky left: `(INFO)` — small Manrope label
Sticky right: `SCROLL DOWN`

### Project Metadata

```
MEDIUM
[e.g. Brand Identity, Print, Digital]

TOOLS
[e.g. Adobe Illustrator, Figma, Photoshop]
```

### Content Tabs

`OVERVIEW` · `APPROACH` · `OUTCOME` · `DETAILS`

Body text below active tab: ~17px Manrope, sentence case, centered, max-width ~680px.

### Image Gallery

Numbered: `01 · 05` counter.

Layout:
- First image: large single (~65% width)
- 2nd–3rd: two columns side by side
- 4th: full-width
- 5th: large single

### Process Section

Heading: `THE PROCESS` + `BEHIND THE THINKING`

Grid of process images, numbered `01/10` etc. Two-column layout. Captions below in small Manrope.

### Credits

```
(PROJECT CREDITS)
BRAND DESIGNER    NORHAN GEVARA
[OTHER ROLES]     [NAMES IF APPLICABLE]
```

### Bottom Navigation

```
SEE NEXT →  [NEXT PROJECT]  02/8 PROJECTS      HOME  BACK TO WORKS
```

---

## Animation Specifications

### GSAP Setup

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Key Animations

1. **Page enter loader**: Black overlay, countdown number 100→000 in display font, sand text, eases out ~1.2s
2. **Hero title**: Subtle scale-settle on load
3. **Marquee**: CSS `animation: marquee linear infinite`, duplicate content for seamless loop
4. **Section reveals**: `clipPath: 'inset(100% 0 0 0)'` → `'inset(0%)'` on ScrollTrigger, stagger 0.1–0.15s per element
5. **Works/Playground carousel**: GSAP `gsap.to()` snap per item, keyboard support
6. **Featured Works grid**: Stagger opacity + translateY on scroll
7. **Nav hover**: Split text — two spans in `overflow: hidden`, one slides up on hover, duplicate slides in from below
8. **About disciplines**: Stagger clip-path reveal per line on scroll
9. **Footer LET'S TALK**: CSS marquee, 12s loop, terracotta-brown background

### Marquee CSS

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
.marquee-track {
  display: flex;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
  width: max-content;
}
```

---

## Responsive Breakpoints

- **Desktop**: 1512px base
- **Tablet** (768px): ~40% font size reduction, simplified grid
- **Mobile** (430px): Full stacking, display font ~80–90px, hamburger nav

Fluid scaling:
```js
const scaler = window.innerWidth / 1512
document.documentElement.style.setProperty('--scaler', scaler)
```

Use `calc(100px * var(--scaler))` for fluid sizing.

---

## Data Structure (`data/projects.ts`)

```ts
export const works = [
  {
    slug: 'project-01',
    title: 'Project 01',
    category: 'Brand Identity',
    type: 'Client Work',
    roles: ['Strategy', 'Design', 'Direction'],
    year: 2025,
    medium: 'Brand Identity, Print',
    tools: ['Adobe Illustrator', 'Figma'],
    overview: '[Overview placeholder — describe the brief and approach]',
    heroImage: '/images/project-01/hero.jpg',
    thumbnail: '/images/project-01/thumb.jpg',
  },
  // Repeat for all 8 projects — slug: project-01 through project-08
]

export const playground = [
  { slug: 'type-study-01', title: 'Type Study 01', year: 2025 },
  { slug: 'grid-experiment', title: 'Grid Experiment', year: 2025 },
  { slug: 'identity-sketch', title: 'Identity Sketch', year: 2025 },
  { slug: 'colour-system', title: 'Colour System', year: 2025 },
  { slug: 'motion-test', title: 'Motion Test', year: 2026 },
  { slug: 'archive-fragment', title: 'Archive Fragment', year: 2026 },
]
```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              ← fonts, GSAP init, Lenis, CSS vars
│   ├── page.tsx                ← Homepage
│   ├── works/page.tsx          ← Works carousel
│   ├── playground/page.tsx     ← Playground carousel
│   ├── about/page.tsx          ← About
│   └── [slug]/page.tsx         ← Dynamic project detail
├── components/
│   ├── Header.tsx              ← Sticky top bar, live clock (Cairo GMT+2)
│   ├── Footer.tsx              ← Social links, nav, LET'S TALK marquee
│   ├── PageLoader.tsx          ← Black overlay with countdown
│   ├── Marquee.tsx             ← Reusable horizontal scrolling text
│   ├── ProjectCard.tsx         ← Work thumbnail card
│   ├── CarouselPlayer.tsx      ← Works/Playground carousel with brackets
│   ├── PillTag.tsx             ← Rounded tag component
│   └── SplitText.tsx           ← Nav hover slide animation
├── data/
│   └── projects.ts             ← All projects + playground data
├── styles/
│   └── globals.css             ← CSS variables, font-face, base styles
└── lib/
    └── gsap.ts                 ← GSAP + ScrollTrigger registration
```

---

## Critical Details to Get Right

1. **The sand background is warm**, not pure white — `rgb(240, 237, 228)`. The warmth creates the sophisticated, grounded tone that defines the entire aesthetic.
2. **Terracotta (`rgb(176, 91, 59)`)** is used sparingly — About page hero, the brand statement section, and accent elements only. Never overuse it.
3. **The display font must be extremely condensed and heavy**. If Bebas Neue feels too neutral, use Dharma Gothic E ExBold or Barlow Condensed at weight 900 with `letter-spacing: -0.03em`.
4. **The footer "LET'S TALK" band** is deep burnt umber `rgb(56, 30, 18)` — NOT black. This distinction matters.
5. **Pill tags**: `border-radius: 9999px`, `border: 1px solid currentColor`, transparent background, ~12px Manrope uppercase, no fill unless hover.
6. **Carousel bracket corners**: On the active Works/Playground item, draw 4 corner brackets using `::before` and `::after` pseudo-elements or a thin `<svg>` overlay — L-shapes, ~12px, sand-colored.
7. **The Works/Playground pages are 100vh, overflow hidden** — the header overlays the top.
8. **Nav hover animation**: Each nav item wraps two identical `<span>` elements. Default state: first span visible. On hover: first span slides up (translateY -100%), second span slides in from below (translateY 0). Wrap in `overflow: hidden`.
9. **The project title on detail pages fills 100% of the viewport width** — use a fluid `font-size: clamp(50px, 10vw, 180px)` or compute via JS to ensure it fills edge to edge.
10. **The hero subtitle split** (`A BRAND` left · `DESIGNER` right) — these sit below the name and on either side of the floating project card. On smaller screens, collapse them to a single centered line: `A BRAND DESIGNER`.

---

## Tone Note for Copy

All placeholder text in the site should feel consistent with Norhan's voice: direct, precise, no decoration. Avoid filler like "lorem ipsum" — instead use phrases like `[BRAND IDENTITY PROJECT]`, `[CLIENT WORK, 2025]`, `[OVERVIEW PENDING]` — honest markers of work in progress, not noise.

---

## Starting Command

```bash
npx create-next-app@latest norhan-gevara-portfolio --typescript --tailwind --eslint --app
cd norhan-gevara-portfolio
npm install gsap @studio-freight/lenis
```

Build order: global styles → CSS variables → Header → Footer → PageLoader → Homepage → Works → Playground → About → Project detail.
