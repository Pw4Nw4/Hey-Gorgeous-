# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **Hey Gorgeous**, a beauty studio. Static HTML/CSS/JS — no framework, no build step, no package manifest, no test suite. Three source files plus a README.

## Commands

There is no build, lint, or test toolchain. To preview changes, serve the directory with any static server and open it in a browser:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
# or
npx --yes serve .
```

When touching CSS/JS/HTML, verify in a browser — type checks and unit tests don't exist here.

## Architecture

Single-page site. Everything the visitor sees lives in `index.html`; the page is split into anchor-linked sections (`#services`, `#about`, `#gallery`, `#testimonials`, `#book`, `#visit`) that the sticky `.site-header` nav jumps to.

Three files do all the work:

- **`index.html`** — semantic markup, one `<main>` with `<section>`s. The hero, about, gallery and map visuals are CSS-only (gradients and pseudo-elements), not `<img>`s. Google Fonts (Fraunces + Inter) are loaded via `<link>` in the head.
- **`styles.css`** — single stylesheet, mobile-first with two breakpoints (`860px`, `700px`). Design tokens (colors, radii, shadows, fonts, container width, section padding) are CSS custom properties on `:root` — change tokens there rather than hardcoding values in component rules. Component blocks are grouped by section with `/* ---------------- name ---------------- */` banners. A `prefers-reduced-motion` block disables transitions/animations.
- **`script.js`** — one IIFE, no modules. Handles: mobile nav toggle (toggles `.is-open` on `.site-header`, flips `aria-expanded` on the button, closes on link click); scroll-state header shadow (`.is-scrolled`); `IntersectionObserver`-driven reveal animation (adds `.reveal` then `.is-visible` to a fixed selector list); client-side booking form validation that writes status into `.form-status`; footer year injection into `#year`.

### Conventions worth preserving

- **Accessibility baked in**: skip link, `aria-expanded` on the nav toggle, `aria-label`s on landmarks, `role="list"`/`role="listitem"` on the gallery grid, focus states on form inputs, `prefers-reduced-motion` support. Don't regress these when editing.
- **Reveal-on-scroll selector list** in `script.js` is explicit — if you add a new section or card type and want it to animate in, add it to that `querySelectorAll` call. Otherwise it renders statically, which is fine.
- **Booking form is client-only.** Validation runs on submit; there is no backend. If asked to wire it up, pick a destination (Formspree / Netlify Forms / serverless endpoint) and replace the success branch in `script.js` — don't invent one silently.
- **Gallery + map are intentionally image-free** — they use CSS gradients and pseudo-elements so the repo has no binary assets. If real photos are added later, keep them in an `assets/` folder and update the `.tile-*` rules to use `background-image` with the files.
- **Content is placeholder**: phone `(555) 555-0123`, email `hello@heygorgeous.example`, address `128 Rose Lane`, hours, prices and team size are all filler. Replace with real data before shipping; don't treat these as facts to preserve.

## Branch convention

Development for this task runs on `claude/add-claude-documentation-gBlYV`. Commit and push there.
