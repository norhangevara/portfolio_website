# Full Prompt: Recreate Jasmine Gunarto's Portfolio Website

## Project Brief

Build a pixel-faithful recreation of **jasminegunarto.com** — a high-end visual/motion design portfolio. This is a Next.js 14 (App Router) project with GSAP-powered animations, a custom fluid scaling system, and a deeply considered aesthetic rooted in bold editorial typography, earthy tones, and kinetic interactions.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS custom properties for the design system
- **Animations**: GSAP (GreenSock) + ScrollTrigger plugin + Lenis for smooth scrolling
- **Fonts**:
  - `"mg"` — custom display font (substitute with **"Bebas Neue"** or **"Dharma Gothic E"** from Google Fonts for the massive condensed display text — weight 800/900)
  - **"Manrope"** — Google Font, weight 700, used for all body/nav/UI text
- **Language**: TypeScript

---

## Design System (CSS Custom Properties)

Implement these as CSS variables on `:root`:

```css
:root {
  /* Colors stored as RGB triplets so they can be used with opacity */
  --cl-primary: 0, 0, 0;               /* Pure black */
  --cl-primary-white: 235, 234, 228;   /* Main page background — warm cream/off-white */
  --cl-primary-dark: 9, 9, 9;          /* Near-black */
  --cl-accent-1: 52, 28, 9;            /* Dark chocolate brown — footer CTA band */
  --cl-accent-2: 77, 92, 4;            /* Olive/army green — About page hero */
  --cl-accent-2-lighter: 102, 120, 12; /* Lighter olive green */
  --cl-accent-3: 176, 91, 59;          /* Terra cotta / rust orange */
  --cl-accent-4: 181, 84, 46;          /* Burnt rust orange */
  --cl-text-1: 238, 233, 209;          /* Warm cream text — used on dark backgrounds */
  --cl-background-light: 235, 234, 228; /* Same as primary-white */

  /* Fluid scaling system — all sizes computed relative to viewport width */
  --base-size-desktop-w: 1512;
  --base-size-mobile: 430;
  --scaler: 1; /* Updated via JS to vw/base-size ratio */
}
```

Use these colors as `rgb(var(--cl-primary))` throughout. The page's default background is `rgb(var(--cl-primary-white))` and default text is `rgb(var(--cl-primary))`.

---

## Typography Rules

- **Display / Hero text** (`mg` / substitute Bebas Neue or Dharma Gothic E): Used for ALL large headings — `JASMINE GUNARTO`, `FEATURED WORKS`, `BREAK`, `ABOUT JASMINE`, `LET'S TALK`, project titles. Always uppercase, extremely bold (800–900 weight), very tight letter-spacing (`letter-spacing: -0.02em` to `-0.05em`).
- **Body / UI text** (Manrope 700): Navigation, tags, labels, meta info, footer links. Small, uppercase, tracked (`letter-spacing: 0.05em`–`0.1em`).
- **Mixed case accent text**: Words like `"Design"`, `"Narrative through"` appear in sentence case within otherwise uppercase marquees — use this intentional contrast.

---

## Site Structure

```
/                          → Homepage
/works/                    → Works page (carousel player)
/break/                    → Break page (carousel player)
/about/                    → About page
/[project-slug]/           → Project detail pages (12 works)
```

---

## Global Components

### 1. Top Header Bar (sticky, always visible)

```
[● NEW YORK, US]  [1:02 PM GMT-4]  [36.7783° N, 119.4179°]          [HOME] [WORKS] [BREAK] [ABOUT]
```

- Full-width, cream background (`rgb(var(--cl-primary-white))`), 1px bottom border
- Left cluster: a pulsing green dot + location text, live clock (update every second via `setInterval`), coordinates — all in Manrope, ~11px, uppercase, spaced
- Right cluster: navigation links in Manrope uppercase
- **Nav hover effect**: Each nav link has a split-text duplication effect — on hover, the text slides upward and a duplicate slides in from below (CSS transform + `overflow: hidden` clip)

### 2. Page Load Animation

On every page navigation, show a fullscreen black overlay with a large centered number counting DOWN from ~100 to 000 in the custom display font, cream-colored. The count animates rapidly (ease-out) and the overlay fades out once complete, revealing the page beneath.

### 3. Footer

Two-part footer:

**Upper footer** — cream background:
```
(FOLLOW)                              (NAVIGATION)
INSTAGRAM                                     HOME
LINKEDIN                    BACK TO TOP      WORKS
BEHANCE                                      BREAK
EMAIL                                        ABOUT
```
- `(FOLLOW)` and `(NAVIGATION)` are small labels in Manrope
- Social links + nav links in large Manrope uppercase, hover underline
- `BACK TO TOP` centered, scrolls to top on click
- 1px top border in black

**Lower footer** — dark chocolate brown (`rgb(var(--cl-accent-1))`):
- Infinite scrolling horizontal marquee: `LET'S TALK  LET'S TALK  LET'S TALK` — display font, cream text, large (~120px), links to email
- Speed: medium (CSS `animation: marquee 12s linear infinite`)
- Below marquee: very bottom strip (cream bg) with `● NEW YORK, US | 1:02 PM GMT-4 | 36.7783° N, 119.4179°` left-aligned and `©2026  ALL RIGHTS RESERVED` right-aligned

---

## Page: Homepage (`/`)

### Section 1 — Hero (100vh)

Background: `rgb(var(--cl-primary-white))`

**Layout:**
```
JASMINE GUNARTO          ← full-bleed display font, ~180-220px, overflows viewport edges
                         ← empty space / project card floats here
A VISUAL      [CARD]     DESIGNER
                ↓
           SCROLL DOWN
```

- `JASMINE GUNARTO`: display font weight 900, fills 100% of viewport width, horizontally centered, characters overflow left and right edges intentionally
- **Featured Project Card**: centered on screen between the two lines of text. Shows rotating featured project info: category label top-left (`MOTION DESIGN`), year top-right (`2026`), and a landscape image. Card has a subtle border/outline. Animates through projects on a timer (or on scroll)
- `A VISUAL` floats bottom-left, `DESIGNER` floats bottom-right — both in display font ~90–100px
- `SCROLL DOWN` in small Manrope uppercase, centered at very bottom, with a subtle downward arrow or animated indicator
- On scroll, GSAP ScrollTrigger pins or parallaxes the title text

### Section 2 — Marquee Strip

Horizontal marquee scrolling continuously:

`PURPOSEFUL  Design  CREATING  MOTION  Narrative through  ANIMATION  WITH MEANING  PURPOSEFUL  Design  CREATING  MOTION  …`

- Mixed case intentional: uppercase words in display font, sentence-case words in a lighter weight or italic style
- Background: cream, text: black
- Scrolls left, seamless loop

### Section 3 — "Home in a Hot Pot" Spotlight (Black background)

Full-width black section. Contains:
- A **5-column grid** of food images (cut-out style, no background) — tofu, shrimp, dumpling, mooncake, mango pudding, coconut dessert etc. (placeholder images OK)
- In the rightmost column / cell: large `jas` in a thin-weight serif or custom font (lowercase, elegant)
- Transitions into a **dark chocolate brown** (`rgb(var(--cl-accent-1))`) section below

### Section 4 — "Motion With Meaning" (Dark brown)

Background: `rgb(var(--cl-accent-1))`, text: `rgb(var(--cl-text-1))`

Large multiline display text centered:
```
PURPOSEFUL
Design
CREATING
MOTION
Narrative through
ANIMATION
WITH MEANING
```
Each line is a distinct typographic treatment — some ALL CAPS in display font, some mixed-case — creates a rhythmic visual poem. Text animates in on scroll (stagger reveal from bottom).

### Section 5 — Featured Works

Background: `rgb(var(--cl-primary-white))`

```
FEATURED  WORKS         ← massive display text, bleeds off edges, ~200px
─────────────────────────────────────────────────────────
DESIGN INSIGHTS                    CONCEPTUAL  EXPRESSIVE  IMMERSIVE
```

Below: **4 project cards** displayed in a loose asymmetric grid (not a rigid equal grid — vary sizes). Each card:
- Large image thumbnail (landscape/wide)
- Project title in display font, overlaid or below
- Category tags: `Concept`, `Design`, `Motion`, `Art Direction` etc.
- On hover: slight scale-up + image brightens

Projects:
1. **Home in a Hot Pot** — Concept · Design · Motion (Chinese calligraphy + food imagery)
2. **FLOW** — Art Direction · Concept · Design (purple skate brand stickers on MacBook)
3. **PreCollege '25** — Concept · Design · Motion (community event poster with photos)
4. **The Taste Gap** — Concept · Design · Motion (illustrated ramen bowl)

`SEE ALL WORK` button below: pill/capsule shaped, black border, black text on cream. On hover: fills black with cream text. Links to `/works/`.

### Section 6 — Break Section (Black background)

Background: `rgb(var(--cl-primary))`, text: `rgb(var(--cl-text-1))`

Top:
```
─────────────────────────────────────────────────────────
SHORT, EXPERIMENTAL DESIGNS                    SMALL SCALE VISUAL
```

Large `BREAK` heading in display font (cream, partially visible / large)

Numbered list in massive display font:
```
01  AVANT-GARDE 2025
02  PEA
03  GRAFF MAYHEM
04  FUTURE PROOF
05  XENOFLORA
```
Numbers in small superscript `01` style, titles in large display font (~90px). Each item is a link to the Break page.

`SEE ALL WORK` pill button below (cream border + cream text on black). Hover: fills cream with black text. Links to `/break/`.

---

## Page: Works (`/works/`)

Full-screen immersive media-player-style interface.

**Background**: Pure black

**Layout — 3 columns:**

```
[LEFT EMPTY]    [CENTRAL STRIP — stacked thumbnails]    [RIGHT EMPTY]
```

- Central strip is ~55% of viewport width, centered
- Thumbnails stacked vertically; **3 visible at once**: prev (partially visible top), current (center, highlighted with bracket/corner markers), next (partially visible bottom)
- Current project: full opacity, slight scale-up, corner bracket decorations (thin lines at 4 corners)
- Adjacent projects: partial opacity (~40%)
- Project **title** displayed above the thumbnail strip in large display font (cream)

**Navigation:**
- `PREV` (top-left) and `NEXT` (top-right) in small Manrope uppercase — clicking advances the carousel
- Number indicators: small numbers left of center strip (e.g., `… 1  **2**  3  4 …`) where active is bold/highlighted
- `2/12` counter shown below strip

**Bottom bar:**
- Left: `00:00:02` — elapsed timer counting up in monospace style (auto-increments)
- Right: `● PLAYING` — red dot + text indicating active state

**Projects list (12):**
1. Home in a Hot Pot
2. FLOW
3. PreCollege '25
4. The Taste Gap
5. PINC
6. National Ad Council
7. Telemundo
8. Vote Boldly
9. Moving Poster — Shinichi Maruyama
10. Nature + Abstraction
11. Einstein's Dreams — Title Sequence
12. Demo Reel

Clicking any thumbnail navigates to that project's detail page. Keyboard arrows also navigate.

---

## Page: Break (`/break/`)

Identical layout concept to Works, but for experimental short-form pieces.

**Background**: Pure black

**Layout:**
- Left column: `BREAK` in large display font (cream), vertically centered
- Center column: vertically stacked square/portrait thumbnails (3 visible, same bracket decoration on active)
- Right column: dimmed numbered project list — hovering an item highlights it; active item is bold

**10 Break pieces:**
1. Avant-Garde 2025
2. Pea
3. Graff Mayhem
4. Future Proof
5. Xenoflora
6. Sleeping Creature
7. Elemental Alphabet
8. 12 Principles of Animation
9. Nabe
10. Haku Blossom

Same `PREV` / `NEXT` navigation, same bottom timer + `● PLAYING` indicator.

---

## Page: About (`/about/`)

### Section 1 — Hero (olive green)

Background: `rgb(var(--cl-accent-2))` — army/olive green

```
ABOUT JASMINE          ← massive display font, cream, fills viewport width
─────────────────────────────────────────────────────
WHO'S THIS?                              HELLO, HI, HEY
          [PHOTO of Jasmine, centered]
```

- Photo: portrait, casual, laughing — centered, ~50% width, overlaps the color boundary into the next section
- `WHO'S THIS?` small label left, `HELLO, HI, HEY` small label right (both Manrope, cream, uppercase)
- Two small buttons/links: `RESUME` and `LINKEDIN` (pill shaped, cream outline on olive)

### Section 2 — Bio text (cream background)

Background: `rgb(var(--cl-primary-white))`

Large centered all-caps Manrope body text (~24–32px), generous line height:

```
HEYA, I'M JAS, A MULTIDISCIPLINARY DESIGNER FROM
JAKARTA, INDONESIA, NOW IN THE US,
WORKING ACROSS GRAPHIC, MOTION, AND BRAND.

I LOVE MIXED MEDIA, STORYTELLING,
AND LETTING GOOD CONVERSATIONS AND EVERYDAY
MOMENTS SNEAK INTO MY WORK.

WHEN I'M NOT DESIGNING, I'M
USUALLY WATCHING FILMS,
TRAVELING (WHEN I CAN), OR
HUNTING FOR GOOD FOOD.

FEEL FREE TO CHAT WITH ME
THROUGH MY EMAIL AND LET'S EVEN
TALK ABOUT FOOD ☕:
JASMINEGUNARTO1@GMAIL.COM
```

Below text: 3 food images floating (cut-out style, no background): cheesecake slice, boba tea cup, egg tart — displayed playfully in a loose horizontal arrangement.

Also show personality tags floating near the bio:
`ADVOCATE OF TYPE 🙂` · `FUNNY?, KIND,` · `A HUMAN BEING` · `SNACK + FOOD GIVER`

### Section 3 — Skills (olive green)

Background: `rgb(var(--cl-accent-2))`, text: `rgb(var(--cl-text-1))`

Large stacked display text, each word on its own line, very large (~100–120px), slightly transparent/ghosted:

```
MOTION DESIGN
GRAPHIC DESIGN
BRANDING
STORYTELLING
MOTION COLLAGE
```

Animate on scroll: each line reveals from bottom (clip-path or translateY + opacity).

### Section 4 — Awards (black background)

Background: `rgb(var(--cl-primary))`, text: `rgb(var(--cl-text-1))`

Left label: `AWARD WINNING` (small Manrope, uppercase)

Center: rotating carousel of award-winning project names in huge display font:
- HOME IN A HOT POT
- PINC
- PRECOLLEGE '25
- VOTE BOLDLY
- NATIONAL AD COUNCIL

Each project cycles with a smooth vertical scroll/slide transition. The name fills most of the screen width.

Right: Awards list in small Manrope:
```
2025:
• Collision Award Gold Winner (General-Student)
• Tokyo Film & Screenplay Awards (Selected, Animation)
• Best Hollywood Day Short Film Festival (Selected, Animation)
• New York Lift-Off Film Festival (Selected, Animation)
2026:
• LA Film & Documentary Awards Winner (Best Animation)
ADDY Professional Silver Award (Elements of Advertising, Animation, Special Effects, or Motion Graphics)
ADDY Professional Silver Award (Cross-Platform, Integrated Campaigns)
ADDY Student Silver Award 2025
```

Pagination dots below: 1 2 3 4 5 (corresponding to each award-winning project)

---

## Page: Project Detail (`/[slug]/`)

### Header

Background: `rgb(var(--cl-primary-white))`

```
HOME IN A HOT POT        ← display font, ~140–180px, fills viewport width
────────────────────────────────────────────────────────────────────────
FORM STUDY  [THESIS]                              ROLE  [CONCEPT] [DESIGN] [MOTION]
```

- Project title fills 100% width in display font
- Below title: 1px black border, then two groups:
  - Left: category label (small Manrope) + pill tag (rounded rectangle with border, ~12px Manrope uppercase)
  - Right: "ROLE" label + multiple pill tags

### Hero Image

Full-width image (100vw), ~60–70vh tall, immediately below the header.

Sticky on left: `(INFO)` in small Manrope — clicking expands a project info panel (or just stays decorative)
Sticky on right: `SCROLL DOWN`

### Project Metadata Panel

Below hero image, left-aligned sidebar or inline section:

```
MEDIUM
collage, 2d, 3d, mixed media

TOOLS
ADOBE AFTER EFFECTS, ILLUSTRATOR, PHOTOSHOP, DRAGONFRAME, CINEMA 4D
```

### Tab Navigation

Horizontal tabs in small Manrope:
`OVERVIEW` · `CHALLENGE` · `REFLECTION` · `SCRIPT` · `AWARDS`

Below active tab: body text content (~16–18px Manrope, not all-caps, centered, max-width ~700px)

### Image Gallery

Numbered gallery with counter `01 · 05` (current/total):

**Layout pattern:**
- First image: large single (~65% width, left-aligned or centered)
- Images 2–3: two columns side by side
- Image 4: single large
- Image 5: single large full-width

Each image number shown as `02 · 05` in small Manrope top-left of that image.

### Process Section

Heading: `THE PROCESS` + small label `BEHIND THE SCENES + AFTER THOUGHTS`

Large gallery of process images (up to 15), numbered `01/15` etc. in small Manrope. Two-column grid for process images.

Caption text below each image (small, Manrope, gray-ish tone).

### Credits

```
(PROJECT CREDITS)
CREATOR          JAS GUNARTO
PRODUCTION ADVISOR   JARED GREENLEAF
NARRATOR         FIONA GREENLEAF
SOUND + MUSIC DESIGNER   KELLY WARNER
HOT POT HELPERS 🙂   ELISABETH AUGUSTINE, KARLA ROBLEDO
```

Table-style layout, labels left, values right, separated by lots of space.

### Bottom Navigation

```
SEE NEXT →  FLOW  02/12 PROJECTS     HOME  HOME VISIT
```

- `SEE NEXT` with next project name + number indicator
- `HOME` link back to homepage
- `HOME VISIT` possibly a link to live project/video

---

## Animation Specifications

### GSAP Setup

```js
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

// Smooth scroll
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Key Animations

1. **Page Enter**: Black overlay with countdown number (100 → 000), eases out over ~1.2s, then fades
2. **Hero title**: On load, `JASMINE GUNARTO` scales from slightly larger and settles (subtle entrance)
3. **Scroll-linked parallax**: The hero title scrolls at a slightly different rate than the page (ScrollTrigger `scrub: true`)
4. **Text marquees**: CSS `animation: marquee linear infinite` — duplicate content for seamless loop
5. **Section entrances**: Each section's heading text animates in with `clipPath: 'inset(100% 0 0 0)'` → `inset(0% 0 0 0)` (reveal from bottom)
6. **Featured Works grid**: Each card staggers in with opacity 0→1 and translateY 30→0 on scroll
7. **Works/Break carousel**: GSAP `gsap.to()` on the container, draggable or button-driven, snap to each item
8. **Footer marquee**: CSS marquee, `direction: ltr`, runs at medium speed ~15s loop
9. **Nav hover**: On hover, the nav text slides up (old text exits top, new text enters from bottom using absolute positioning and transform)
10. **About skills list**: Each discipline word clips in from bottom on scroll, staggered 0.15s

---

## Responsive Breakpoints

- **Desktop**: 1512px base (fluid scaling maintains proportions)
- **Tablet** (768px): Reduce hero font size by ~40%, stack some grid items
- **Mobile** (430px): Full stacking, hero font ~80–90px (still bold and dominant), nav collapses to hamburger

The fluid scaling formula:
```js
// Update --scaler on resize
const scaler = window.innerWidth / 1512
document.documentElement.style.setProperty('--scaler', scaler)
```

Then use `calc(100px * var(--scaler))` for any size that should scale proportionally.

---

## Data / Content Structure

Use a `data/projects.ts` file:

```ts
export const works = [
  {
    slug: 'home-in-a-hot-pot',
    title: 'Home in a Hot Pot',
    category: 'Form Study',
    type: 'Thesis',
    roles: ['Concept', 'Design', 'Motion'],
    year: 2025,
    medium: 'Collage, 2D, 3D, Mixed Media',
    tools: ['Adobe After Effects', 'Illustrator', 'Photoshop', 'Dragonframe', 'Cinema 4D'],
    overview: 'A mixed-media animation exploring family dynamics through the metaphor of a shared hot pot meal.',
    heroImage: '/images/home-in-a-hot-pot/hero.jpg',
    thumbnail: '/images/home-in-a-hot-pot/thumb.jpg',
    awards: ['2025: Collision Award Gold Winner', '...']
  },
  // ... 11 more
]

export const breaks = [
  { slug: 'avant-garde-2025', title: 'Avant-Garde 2025', year: 2025 },
  { slug: 'pea', title: 'Pea', year: 2025 },
  // ... 8 more
]
```

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              ← fonts, global GSAP init, Lenis smooth scroll
│   ├── page.tsx                ← Homepage
│   ├── works/page.tsx          ← Works carousel
│   ├── break/page.tsx          ← Break carousel
│   ├── about/page.tsx          ← About
│   └── [slug]/page.tsx         ← Dynamic project detail
├── components/
│   ├── Header.tsx              ← Sticky top bar with live clock
│   ├── Footer.tsx              ← Two-part footer + marquee
│   ├── PageLoader.tsx          ← Black overlay countdown animation
│   ├── Marquee.tsx             ← Reusable horizontal scrolling text
│   ├── ProjectCard.tsx         ← Work thumbnail card
│   ├── CarouselPlayer.tsx      ← Works/Break media-player carousel
│   ├── PillTag.tsx             ← Rounded tag/badge component
│   └── SplitText.tsx           ← Text split for hover nav animation
├── data/
│   └── projects.ts             ← All project + break data
├── styles/
│   └── globals.css             ← CSS variables, font-face, base styles
└── lib/
    └── gsap.ts                 ← GSAP + ScrollTrigger registration
```

---

## Important Visual Details to Get Right

1. **The cream background** is NOT pure white — it's a warm, slightly yellow-tinted off-white: `rgb(235, 234, 228)`. This warmth is essential to the entire feel.
2. **The display font** must be extremely condensed and heavy. If Bebas Neue isn't condensed enough, use `font-stretch: condensed` or try `Dharma Gothic E ExBold` (available on Adobe Fonts) or `Barlow Condensed` at weight 900 as a fallback.
3. **Pill/capsule tags** have a 999px border-radius and a 1px solid border. Background is transparent, text and border match the current text color.
4. **The "LET'S TALK" marquee** is on a dark chocolate brown band, NOT black — `rgb(52, 28, 9)`.
5. **Corner bracket decorations** on the Works/Break carousel active item: 4 thin L-shaped brackets (just two perpendicular lines) at each corner of the thumbnail, ~12px long.
6. **The About page header** is olive green `rgb(77, 92, 4)`, a distinctive earthy tone.
7. **All navigation text** has a duplication/slide effect on hover — implement with two spans (original + clone) inside `overflow: hidden` wrappers.
8. **The works/break pages are full-screen** — `height: 100vh`, `overflow: hidden`. The header overlaps the top portion.
9. **The project detail footer navigation** is a simple horizontal strip: `SEE NEXT → [PROJECT NAME]` on the left, then `[N]/12 PROJECTS`, `HOME`, `HOME VISIT` spaced to the right. All in Manrope uppercase, small.
10. **The "SCROLL DOWN" text** in the homepage hero is very small, centered, possibly with an animated downward chevron or a slowly bouncing arrow.

---

## Placeholder Assets

Where real images aren't available, use:
- `next/image` with `placeholder="blur"` and a matching-toned blur placeholder
- For project thumbnails: use `https://picsum.photos/seed/[project-name]/800/500` with an overlay of the brand color to maintain aesthetic coherence
- For food cut-out images (About page): use emoji rendered large or simple CSS illustrations

---

## Starting Command

```bash
npx create-next-app@latest jasmine-portfolio --typescript --tailwind --eslint --app
cd jasmine-portfolio
npm install gsap @studio-freight/lenis
```

Then implement the components in the order: global styles → Header → Footer → PageLoader → Homepage → Works → Break → About → Project detail.
