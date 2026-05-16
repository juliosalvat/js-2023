# Theme Upgrade — Session Log

Comprehensive log of the design overhaul applied across the site in this session: a dark, accent-blue theme inspired by a 3-column hero mockup (`ai-animation/desktop-ai-animation-layout.png`).

---

## Theme Tokens (used everywhere)

```css
--js-accent:      #00b2ff;
--js-accent-dark: #0089c7;
--ai-bg:          #0a0d14;
--ai-surface:     #11151f;
--ai-card:        #161b27;
--ai-border:      rgba(255, 255, 255, .08);
--ai-text:        #ffffff;
--ai-muted:       #8a93a6;
--ai-dim:         #5d6478;
--ai-radius:      14px;
--ai-radius-lg:   22px;
--ai-ease:        cubic-bezier(0.22, 1, 0.36, 1);
```

Base font-size in `css/style.css` is `html { font-size: 62.5% }` → **1rem = 10px**. All inline `rem` values were sized with this in mind.

---

## Files Modified

| File | Scope |
|---|---|
| `ai-animation/index.html` | Full desktop redesign (mobile TikTok feed preserved) |
| `index.html` | Full home redesign (hero, About, Experience, Apps rail, Design & Dev cards) |
| `characters/index.html` | Hero redesign + themed About + new Gallery section |
| `css/style.css` | Global footer + navigation overhaul |

---

## 1. `ai-animation/` — Desktop redesign

### Layout
A 3-column hero matching the mockup:

- **Left**: `AI Animation Reel` eyebrow → `Visual Stories That Connect.` headline → description → `View Work` CTA
- **Center**: portrait 9:16 featured video player
  - Top bar: `Up Next` badge + expand-to-fullscreen icon
  - Controls bar: play/pause button + clickable progress bar + `00:00 / 00:00` timecode
  - Outside the card: `‹` / `›` prev/next arrows
  - Below the card: pagination dots (one per video, wrap-to-rows for 34 entries)
- **Right**: `Featured Animation` eyebrow → animation title → `AI Character Study` subtitle → description → meta block (Director / Year / Category) → `Watch Case Study` link

### Stories rail
Below the hero — `More Stories, Different Worlds.` headline + horizontal scroll-snap rail of every video. Each card hover-previews the muted thumbnail and (on hover) swaps the featured player. Click opens the fullscreen Bootstrap modal.

### Interactions / refinements
- `Let's Connect` link in the top-right opens `mailto:code@juliosalvat.com`
- Year shows `2026`
- **All 34** videos rotate through the featured player (originally was limited to 6)
- Audio plays **unmuted** by default; if the browser blocks unmuted autoplay, falls back to muted and unmutes on the user's first interaction (pointerdown/touchstart/keydown)
- Arrow keys cycle videos, spacebar / `k` toggles play, keyboard `/` focuses search (when applicable)
- Modal sizes itself to each video's actual aspect ratio (no black bars)

### Mobile (≤768px)
Untouched. The TikTok-style scroll-snap feed with auto-play, tap-to-mute, hint pill, and IntersectionObserver-driven preload remains exactly as before. All new desktop classes are hidden via the existing `display: none !important` mobile rule.

---

## 2. Home page (`/index.html`)

### Hero (3-column)
- **Left**: `Hi, I'm Julio` eyebrow → `Engineering Meets Art.` (with `Art.` in accent) → bio paragraph → **Download Resume** (filled blue CTA) + **View Work** (ghost CTA) → 4 social icons (Twitter / LinkedIn / GitHub / Email)
- **Center**: portrait card with `Available for Work` badge (green pulse), `img/julio.png`, name + role caption pinned to bottom
- **Right**: `Currently` eyebrow → `Skywest.` headline → role + description → meta (Since / Stack / Focus) → `View Experience` link

### Full-page background image
`img/hero.jpg` rendered as `<img class="page-bg">` (the first element in `<body>`), `position: fixed; height: 100%; object-fit: cover; z-index: -1`. Each themed section paints a `rgba(10, 13, 20, .92)` overlay on top so the image bleeds through subtly across the entire page.

### About section (`.section-about`)
Dark overlay; `Hi! I'm Julio` heading gets a small `About` eyebrow + accent line; `heading-tertiary` subheadings are in accent blue / uppercase; paragraphs use muted gray; the `composition` photos get an accent-blue ring on hover (replacing the old `#436588` outline). On phones (≤37.5em) the composition is hidden entirely.

### Experience section (`.section-features`)
- The original blue-tint + skew-Y + background-image are killed
- `Where I've Been` eyebrow + `Experience.` headline
- Feature boxes restyled as dark cards (`var(--ai-card)`), border, soft shadow, lift on hover
- Company names in accent blue uppercase; role headings in white bold
- List items get a left-aligned blue dot bullet + accent dividers

### Application Screens (`.section-thumb-grid`)
The original two grids (Reporting App + 3D Marketplace) are combined into **one randomized horizontal rail** containing all 24 screens. Each visit reshuffles via Fisher–Yates.

- Card: 16:10 aspect, image at top, accent expand icon top-right, project label + screen name in the gradient overlay at the bottom
- Click opens the existing `.thumb-modal` (unchanged)

### Design & Development (`.section-tours`)
Cards are kept as-is structurally but skinned for the dark theme:
- Front side: `var(--ai-card)` surface, subtle border
- Picture overlays: unified `#00b2ff → #051d34` gradient (replaces the green/pink/purple mix)
- Heading pills: dark with `backdrop-filter: blur(6px)`
- Details list: muted text, accent dividers
- Back side: 3 variations of accent-blue gradient
- CTA buttons: accent-blue pill matching the rest of the site

### Mobile-specific niceties
- Logo at `7rem` matching the `.navigation__button` size, positioned to mirror the nav button
- Download Resume + View Work centered
- Social icons centered with **white background + accent-blue glyphs**, inverting on hover

---

## 3. Characters page (`/characters/index.html`)

### Hero
The original full-bleed Ken Burns slideshow is recomposed into the same 3-column hero shell. The existing `SlideshowEngine` JS is **reused** — only the DOM around it is restyled and repositioned.

- **Left**: `Character Design` eyebrow → `Crafted Worlds, Drawn by Hand.` → description → `View Gallery` CTA
- **Center**: the existing `.slideshow-hero` re-skinned as the 9:16 portrait card; prev/next arrows moved outside the card; the original play-pause + bullets + counter are hidden (134 slides made bullets impractical)
- **Right**: `Featured Series` eyebrow → `Nura.` headline → meta (Artist / Year / Medium) → `Read the Process` link

### Character Design (`#about`) — themed
- Anchor `id="about"` added so `Read the Process` actually scrolls to it
- Dark overlay, accent-blue `heading-tertiary` sub-titles, muted body copy
- `scroll-margin-top` + `html { scroll-behavior: smooth }`

### NEW: Gallery section (`#gallery`)
Added under the Character Design section. `View Gallery` button now targets `#gallery`.

- `The Collection` eyebrow → `Character Gallery.` headline
- Horizontal scroll-snap rail of **30 randomly-sampled** images from the existing `SLIDES` array (different each load)
- Card background `#376c8d` (visible during image load), portrait 9:14 aspect
- Each card: image + expand icon + `Nura · Study NN` overlay
- Click opens a fullscreen `.thumb-modal` styled to match the dark theme (Escape / X / click-outside to close)

### Mobile
- Logo enlarged to `7rem` matching `.navigation__button`
- View Gallery CTA centered horizontally
- Hero text sizes bumped (eyebrow / desc / featured info)

---

## 4. Global — `css/style.css`

### Footer (rewritten)
- Background `#0a0d14` (was `#333`)
- Top edge gradient accent line via `::before`
- Logo: white via `filter: brightness(0) invert(1)`, smaller (`12rem`)
- Links: muted gray default, accent blue on hover (no more rotating-scale effect)
- Copyright text in dim gray with link text in white
- Added `z-index: 1`, `isolation: isolate`, and `.footer * { background-color: transparent !important }` so the fixed `.page-bg` cannot bleed through and no descendant can paint a different shade

### Navigation menu (when expanded)
- **Background** circle: radial of `#00b2ff → #0089c7` (was `#051d34 → #72b6fb`)
- **Layout**: stacked vertically, left-aligned, max-width `64rem`, top + bottom dividers between items
- **Link style**:
  - Type: `3.2rem` weight 800, mixed-case (not uppercase), tighter letter-spacing
  - Number prefix (`01`, `02`, …) is small (`1.3rem`), dark, uppercase-spaced
  - Removed the old `120deg` linear-gradient sliding hover
- **Hover**: padding-left slides right ~5px, text deepens to near-black, an `→` arrow fades in on the right edge
- Responsive: type/padding shrink at tab-port (≤56.25em) and phone (≤37.5em)

### `.composition`
Hidden via `display: none` at phone breakpoint (`max-width: 37.5em`).

---

## Notable Implementation Notes / Gotchas

- **`html { font-size: 62.5% }` in `css/style.css`** means `1rem = 10px`, not 16px. Hero typography was originally sized assuming a 16px base — the late `HERO TYPOGRAPHY BUMP` blocks in each page roughly double these values (eyebrow `.72rem → 1.3rem`, desc `1rem → 1.7rem`, etc.).
- **Fixed background image cut-off**: `background-attachment: fixed` on `html`/`body` has cut-off bugs in some browsers and broke when a section above the footer had a fully-opaque light background (which then cut off the visible image). Solved by switching to a real `<img class="page-bg">` element + `position: fixed; height: 100%; z-index: -1` and making every page section semi-transparent so the image always bleeds through.
- **Footer banding**: traced to the fixed page-bg leaking through under certain stacking contexts. Fixed with the trio: explicit `z-index: 1`, `isolation: isolate`, and forced-transparent backgrounds on every descendant.
- **Mobile preservation on ai-animation**: all new desktop class names (`.ai-hero`, `.ai-stories`, `.ai-connect`) are explicitly listed in the `@media (max-width: 768px) { ... display: none !important; ... }` rule. The mobile TikTok feed CSS + JS path is unchanged.
- **Cards on Design & Dev section**: the flip-card structure and animation remain — only the visual skin (colors / gradients / backgrounds / typography) was restyled.
- **Slideshow engine reuse on characters page**: the existing `SlideshowEngine` class queries `.slideshow`, `.slideshow-bullets`, `.slideshow-nav--prev/--next`, `.slideshow-playpause`. The redesign kept these class names so the engine works unchanged inside the new 3-column shell; we just hide controls via CSS where they're not desired.
