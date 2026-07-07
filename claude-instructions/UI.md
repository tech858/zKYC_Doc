# zKYC Marketing Site — UI Replication Guide

Purpose: this file briefs another Claude instance (working in a **different** project/repo) on how to reproduce the look, feel, and structural conventions of the zKYC marketing site (`zkyc-main-website`). It is not a copy-paste component library — it documents the design system and patterns so they can be rebuilt correctly in a different codebase.

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router (`app/`) |
| UI library | React 19 |
| Styling | Tailwind CSS v4 — **CSS-first config**, no `tailwind.config.js`. Tokens and `@theme` live directly in `app/globals.css` via `@import "tailwindcss"` and `@theme inline { ... }`. |
| Animation | `framer-motion` (`^12`) — used everywhere: scroll-triggered reveals, hover lifts, custom scroll-linked backgrounds |
| Icons | `lucide-react` (outline style, `strokeWidth` typically 1.5–2) |
| Fonts | `next/font/google` — Geist (sans) + Geist Mono, exposed as CSS vars `--font-geist-sans` / `--font-geist-mono` |

Install baseline:
```bash
npm install next react react-dom framer-motion lucide-react
npm install -D tailwindcss @tailwindcss/postcss typescript
```

## 2. Theme system (light/dark)

- Class-based dark mode: Tailwind's `dark:` variant is redefined in CSS as `@custom-variant dark (&:is(.dark *));` — dark styles apply when an ancestor has `.dark`, not via `prefers-color-scheme`.
- Theme state lives in a small React context (`components/ThemeProvider.tsx`):
  - `useState<"light"|"dark">("light")` as default
  - reads `localStorage.getItem("theme")` on mount
  - toggles `document.documentElement.classList.toggle("dark", ...)`
  - persists back to `localStorage` on toggle
- **Flash-of-wrong-theme fix**: an inline `<script>` in `app/layout.tsx`'s `<head>`, before hydration, reads `localStorage` and adds `.dark` to `<html>` synchronously:
  ```html
  <script>try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}</script>
  ```
- A `Sun`/`Moon` lucide icon button in the navbar calls `toggleTheme()`.

## 3. Design tokens (`app/globals.css`)

CSS custom properties, redefined per theme via `:root` (light, default) and `.dark`:

```css
:root {
  --background: #f8f7fc;
  --foreground: #14101f;
  --violet: #8b5cf6;
  --violet-light: #a78bfa;
  --fuchsia: #d946ef;
  --amber: #fbbf24;
  --coral: #fb7185;
  --surface: rgba(20, 16, 31, 0.03);
  --surface-border: rgba(20, 16, 31, 0.09);
  --surface-violet: rgba(139, 92, 246, 0.05);
}
.dark {
  --background: #130f24;
  --foreground: #ededed;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-border: rgba(255, 255, 255, 0.07);
  --surface-violet: rgba(139, 92, 246, 0.06);
}
```

**Brand color**: violet/fuchsia is the single accent family across the whole site (buttons, badges, icons, focus states, gradient text). Amber and coral only appear in decorative background orbs — never in UI chrome.

**Text colors** (Tailwind utility, not CSS vars) follow a light/dark pair convention on almost every element:
- Headings: `text-slate-900 dark:text-white`
- Body: `text-slate-600 dark:text-white/40` to `dark:text-white/55`
- Muted/meta: `text-slate-400/500 dark:text-white/25` to `dark:text-white/35`
- Borders: `border-slate-900/[0.08] dark:border-white/[0.07]` (hairline, opacity-based, never a flat gray)

This opacity-based border/text pattern (`black-or-white at low alpha`) is the core trick that makes both themes feel native instead of "inverted."

## 4. Reusable CSS utility classes (defined once in `globals.css`, used everywhere)

```css
.glass-card        /* frosted card: var(--surface) bg + var(--surface-border) + backdrop-blur(12px) */
.glass-card-violet /* same but violet-tinted bg + rgba(139,92,246,0.18) border — used for accent cards */
.grad-text          /* violet→fuchsia gradient text via background-clip: text */
.animate-orb-pulse  /* slow opacity/scale pulse (4s) for background glow orbs */
.animate-float       /* gentle vertical float (6s) */
.animate-shimmer     /* horizontal shimmer sweep on gradient backgrounds (3s) */
.animate-ticker       /* infinite horizontal scroll for logo/marquee strips (30s) */
.hero-bg::before/::after /* layered radial-gradient glow + starfield dots, hero-only, desktop-animated */
```

Recreate these first in any new project's global stylesheet — most section components lean on them instead of ad hoc styles.

## 5. Layout & structure conventions

```
app/
  layout.tsx     — fonts, <head> theme script + JSON-LD, wraps children in <ThemeProvider>
  globals.css    — tokens, keyframes, utility classes (documented above)
  page.tsx       — composes sections in order, most below-the-fold sections loaded via next/dynamic
components/
  ThemeProvider.tsx, Navbar.tsx, Footer.tsx, DecorativeBackground.tsx, LoadingScreen.tsx
  *Button.tsx    — several button "flavors" (Gradient, Glass, AnimatedStroke, GradientRing) — pick one convention per project, don't import all of them
sections/
  One file per landing-page section (Hero, FeatureStrip, ProblemSolution, Advantages,
  KYABand, GoLiveSteps, Pricing, FAQ, CTASection). Each is a self-contained
  "use client" component with its own local content array + JSX — no shared CMS/config layer.
```

`app/page.tsx` pattern — only `Hero` (above the fold) is imported eagerly; everything else is `next/dynamic` to keep initial JS small:

```tsx
const Pricing = dynamic(() => import("@/sections/Pricing"));
...
<main>
  <Hero />
  <FeatureStrip />
  ...
</main>
```

**Container rhythm**: nearly every section uses
```
mx-auto max-w-6xl px-4 sm:px-8 py-10 sm:py-16   (or py-20 sm:py-36 for hero-adjacent sections)
```
Section anchors use `id="..."` + `scroll-mt-24` (offset for the fixed navbar) rather than JS scroll math.

## 6. Navbar pattern

- Fixed, centered "pill" nav, not full-width: `fixed top-4 inset-x-0 flex justify-center`, inner `<nav>` capped at `max-w-4xl`, `rounded-full`, translucent (`bg-white/70 dark:bg-black/50 backdrop-blur-2xl`).
- Outer wrapper is `pointer-events-none`, inner `<nav>` is `pointer-events-auto` — lets the transparent gutter around the pill stay click-through.
- Right side: theme toggle icon button → secondary outline CTA ("Book Demo") → primary filled CTA ("Start Free"), in that order, primary always last/rightmost.

## 7. Motion conventions (framer-motion)

Two patterns cover ~90% of animation in this codebase:

**A. Scroll-reveal on section entry** (headers, paragraphs):
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
/>
```

**B. Card grids** — reveal + hover lift, staggered by index:
```tsx
<motion.article
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ y: -6 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.55, delay: i * 0.1 }}
/>
```

Hero-specific: a `fadeUp` variants object with a `custom` delay prop, applied to eyebrow/headline/subtext/CTAs in sequence (`custom={0.1}`, `0.16`, `0.24`, `0.34`...) so the hero staggers in on mount rather than on scroll.

Background elements (`DecorativeBackground.tsx`) use `useScroll` + `useTransform` to tie glow position/opacity to scroll progress — this is the one place motion values (not variants) are used.

## 8. Background animation layers

The site stacks **three independent background animation techniques**, each scoped to a different part of the page. Recreate all three where relevant — they are not redundant with each other:

**A. Hero ambient video loop** (`sections/Hero.tsx`) — the one most likely to be missed on a first pass, since it's a `<video>` tag, not a CSS/motion effect:
```tsx
const videoSrc = theme === "dark" ? "/hero-glow.mp4" : "/hero-glow-light.mp4";

<video
  key={videoSrc}          // forces remount so the correct source loads on theme toggle
  aria-hidden autoPlay muted loop playsInline
  className="hidden md:block absolute inset-0 w-full h-full object-cover
             opacity-70 dark:opacity-40 mix-blend-normal dark:mix-blend-screen pointer-events-none"
  style={{
    maskImage: "radial-gradient(ellipse 70% 65% at 50% 40%, black 0%, transparent 85%)",
    WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 40%, black 0%, transparent 85%)",
    filter: theme === "dark" ? undefined : "saturate(1.6) contrast(1.15)",
  }}
>
  <source src={videoSrc} type="video/mp4" />
</video>
```
Key details worth preserving if rebuilding this:
- **Two separate source files, one per theme** (`hero-glow.mp4` / `hero-glow-light.mp4`) — not one video with a CSS filter doing all the work. The light version is a differently color-graded export; the `saturate`/`contrast` filter is a *supplementary* boost on top of that, only applied in light mode.
- **Desktop-only** (`hidden md:block`) — no video decode cost on mobile.
- **Radial-gradient mask**, not a hard-edged box — this is what makes the loop dissolve into the page background instead of showing a visible rectangle.
- `mix-blend-mode` flips between `normal` (light) and `screen` (dark) so the same compositing approach reads correctly against both a light and a near-black page background.
- Purely decorative (`aria-hidden`, `pointer-events-none`) — never carries content.

**B. Scroll-linked glow** (`components/DecorativeBackground.tsx`, mounted once at page level, fixed behind everything) — see §7; `useScroll`/`useTransform` drive a radial-gradient div's `y` and `opacity` as the user scrolls, plus a small inner accent blob and an off-center warm-toned orb. Desktop only (`hidden md:block`); mobile gets a single static radial-gradient div instead (no JS cost).

**C. CSS starfield + glow** (`.hero-bg::before` / `::after` in `globals.css`) — layered `radial-gradient`s: `::before` is the colored ambient glow, `::after` is ~20 tiny hand-placed `radial-gradient(0.5px|1px ...)` dots forming a starfield, tiled via `background-size: 1000px 1000px` and animated with `@keyframes move-stars` (a slow diagonal `background-position` drift, 150s loop) — **desktop only**, gated behind `@media (min-width: 769px)`. This is a separate utility from `DecorativeBackground.tsx` — check whether a given section opts into `hero-bg` via its class list before assuming the scroll-linked glow is the only thing rendering behind it.

**D. Small recurring orb pulses** (`.animate-orb-pulse`, defined once, reused per-section) — individual sections (e.g. `KYABand.tsx`) drop a small `aria-hidden` div with an inline radial-gradient background and this class to get a self-contained "breathing" glow accent local to that card, independent of the page-level background layers above.

## 9. Button conventions

Two button "shapes" cover the whole site — don't invent new ones:

1. **Primary (filled, inverts per theme)**:
   `bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-white/90`
2. **Secondary (outline)**:
   `border border-slate-300 dark:border-white/12 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/22`

Both are `rounded-full`, `px-6 py-3 text-sm font-semibold`, `transition-all duration-300`. External-flow CTAs (signup app, demo booking form) always get `target="_blank" rel="noreferrer"`. In-page CTAs that change UI state (e.g. a pricing-tab switch) are `<button type="button" onClick={...}>`, not `<a href="#...">`, when the interaction is more than a scroll (see §10).

Arrow suffix convention: a trailing `→` (Unicode arrow) glyph directly in the button label string for "forward" actions (`Book Demo →`, `Contact Sales →`). Reserve the fancier animated-SVG-arrow button (`GradientButton.tsx`) for special one-off CTAs, not the whole site.

## 10. Cross-section interaction pattern (in-page deep links)

When a CTA in one section needs to both scroll to *and* change the state of another section (e.g., "View agent pricing" scrolling to the pricing section AND switching its tab to "Agents"), the convention here is:

```tsx
// Sender
<button onClick={() => {
  window.dispatchEvent(new CustomEvent("pricing-mode", { detail: "agent" }));
  document.getElementById("pricing-agent")?.scrollIntoView({ behavior: "smooth" });
}}>

// Receiver (mounts a listener + also checks location.hash once on mount for deep-linked page loads)
useEffect(() => {
  if (window.location.hash === "#pricing-agent") setMode("agent");
  const handler = (e: Event) => setMode((e as CustomEvent).detail);
  window.addEventListener("pricing-mode", handler);
  return () => window.removeEventListener("pricing-mode", handler);
}, []);
```

This avoids prop drilling/global state libraries for what is otherwise two independent sibling sections on the same page.

## 11. Cards with variable-length content (pricing-card alignment)

When cards in a grid have uneven content (e.g. one plan has far more features than its siblings):
- Grid uses `items-stretch` (not `items-start`) so all cards in a row match the tallest.
- Card is `flex flex-col`; the last content block (feature list) gets `flex-1` so it absorbs the extra height.
- Any block *above* the feature list whose content length varies per card (tagline, price row) gets an explicit `min-h-[Npx]` so headers/CTA buttons line up across cards regardless of text length.
- If one card's list is much longer, collapse it to a shared item count (e.g. 5) by default and add a "Show N more / Show less" toggle (`framer-motion`'s `AnimatePresence` for the reveal) rather than showing all items and breaking the row's visual balance.

## 12. Replication checklist for a new project

1. Set up Next.js App Router + Tailwind v4 CSS-first config.
2. Port `globals.css` tokens, keyframes, and utility classes (§3–4) — adjust the violet/fuchsia hex values to the new brand's accent color, keep the *structure* (opacity-based borders, `--surface*` tokens, `.glass-card`, `.grad-text`).
3. Port `ThemeProvider.tsx` + the pre-paint `<script>` flash-fix verbatim.
4. Build the navbar as a centered floating pill, not a full-width bar.
5. Build sections as independent, locally-content-owned components (no shared CMS needed for a marketing site this size); use `next/dynamic` for everything below the hero.
6. Reuse the two motion patterns in §7 rather than inventing new easing/timing per section.
7. Recreate the three background animation layers (§8) as separate assets/effects — don't collapse them into one; they're scoped differently (hero-only video, page-level scroll glow, desktop-only CSS starfield).
8. Reuse the two button shapes in §9; only add a third if the new project has a genuinely distinct CTA tier (e.g. a special launch promo).
9. If two sections need to talk to each other (tab deep-linking), use the `CustomEvent` + `addEventListener` pattern in §10 instead of pulling in a state manager.
