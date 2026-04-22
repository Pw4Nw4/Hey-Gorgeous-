# Hey Gorgeous

Marketing site for Hey Gorgeous, a bridal hair &amp; makeup specialist (on-location, trials included).

Static HTML/CSS/JS — no build step, no dependencies. Edit the files, refresh the browser.

## Run locally

Any static file server works. From the repo root:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Or, if you have Node:

```sh
npx --yes serve .
```

## Files

- `index.html` — all page content, single page with anchor sections (`#approach`, `#packages`, `#trial`, `#gallery`, `#testimonials`, `#faq`, `#inquire`, `#visit`).
- `styles.css` — one stylesheet. Design tokens live in `:root` at the top (ivory / blush / champagne / gold palette).
- `script.js` — mobile nav toggle, scroll-state header, reveal-on-scroll, client-side inquiry form validation (name + email + future wedding date), footer year.

## Placeholder content

Phone, email, address, package prices, travel radius, deposit percentage, trial cost, and testimonials in `index.html` are placeholders. The gallery and approach "bloom" composition use CSS gradients instead of real photography. Swap these for real content before going live.

The inquiry form is client-side only — submissions are validated and surfaced to the user, but not sent anywhere. Wire it to a backend (Formspree, Netlify Forms, a serverless function, etc.) when ready.
