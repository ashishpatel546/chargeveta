# chargeveta.in

The marketing website for ChargeVeta, built by AppMeSoft Private Limited.
The product itself lives at `app.chargeveta.in`; this site only links to it.

```bash
npm install
npm run dev     # http://localhost:9020
npm run build   # every page is prerendered as static HTML
npm run start   # serve the production build on :9020
npm run lint
```

## Changing a phone number, email, address or link

Edit **`src/data/site.json`** — nothing else. The header, footer, contact page,
WhatsApp form, WhatsApp QR code, floating WhatsApp button, structured data
(Google) and the social share image all read from it.

| Key | Used for |
|---|---|
| `contact.phone` | Shown on the site and used for `tel:` links |
| `contact.whatsapp` | Digits only, with country code, no `+` (e.g. `917838160389`). Drives the form, QR code and every WhatsApp button |
| `contact.email` | Support email |
| `contact.address`, `contact.mapsUrl` | Office address and its Google Maps link |
| `contact.hours` | Hours shown on the contact page |
| `app.*` | Sign-in links to the operator console, driver app and fleet portal |
| `company.*` | AppMeSoft name, website and email |
| `url`, `domain` | Canonical site address, used for SEO, sitemap and robots |

## How the contact form works

Nothing is posted to a server. Submitting the form builds a message from the
fields and opens `https://wa.me/<contact.whatsapp>?text=…` in a new tab, so the
visitor sends it from their own WhatsApp. The QR code encodes the same `wa.me`
link.

## Where things are

- `src/app/` — pages: home, `platform`, `solutions`, `about`, `contact`, `privacy`, `terms`
- `src/lib/platform.ts` — the feature catalogue on the Platform page. Only list what the product ships.
- `src/components/LiveSession.tsx` — the hero's replayed charging session (OCPP frames, meter, GST receipt)
- `src/components/ConsolePreview.tsx`, `DriverPhone.tsx` — the animated product previews
- `src/components/Brand.tsx` — ChargeVeta mark and the AppMeSoft wordmark (App blue, Me green, Soft saffron)
- `public/images/` — photographs, all CC0; sources in `public/images/CREDITS.md`

Every animation stops when it is off screen or the tab is hidden, has a pause
control where it loops, and is replaced by its final frame when the visitor's
system asks for reduced motion.
