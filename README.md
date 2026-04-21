# Hey Gorgeous

Marketing site for Hey Gorgeous, a neighborhood beauty studio (hair, nails, skin, lashes &amp; brows, makeup).

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

- `index.html` — all page content, single page with anchor sections (`#services`, `#about`, `#gallery`, `#testimonials`, `#book`, `#visit`).
- `styles.css` — one stylesheet. Design tokens live in `:root` at the top.
- `script.js` — mobile nav toggle, scroll-state header, reveal-on-scroll, client-side form validation, footer year.

## Placeholder content

Phone, email, address, hours, prices, and stylist counts in `index.html` are placeholders. The gallery uses CSS gradients instead of real photography. Swap these for real content before going live.

The booking form is client-side only — submissions are validated and surfaced to the user, but not sent anywhere. Wire it to a backend (Formspree, Netlify Forms, a serverless function, etc.) when ready.
