# The Health enLight Initiative — Website

A modern, animated marketing site for The Health enLight Initiative, a health-
enlightenment NGO. Built with **Next.js 15 (App Router)**, **Tailwind CSS** and
**Framer Motion**.

The hero features an animated, auto-cycling stack of **upcoming-event cards**;
the rest of the site tells the organisation's story through varied, editorial
sections drawn from the initiative's real content.

---

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Build for production:

```bash
npm run build
npm start
```

> Requires Node 18.18+ (Node 20+ recommended).

---

## Instant preview (no install)

Open `preview/index.html` directly in a browser to see the homepage design and
the animated event cards without installing anything. It's a static snapshot for
review only — the real, multi-page site is the Next.js app.

---

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, header, footer
  page.tsx            Home (hero + events, programs, approach, story, gallery, testimonials, CTA)
  about/page.tsx      Mission, vision, approach, numbers, story
  team/page.tsx       Team roster (placeholder profiles)
  gallery/page.tsx    Filterable, animated photo gallery
  blog/page.tsx       Research/blog posts (placeholder)
  contact/page.tsx    Contact details + form + map
  volunteer/page.tsx  Volunteer info + form
  not-found.tsx       Custom 404
  robots.ts,          SEO: robots + sitemap
  sitemap.ts
  globals.css         Tailwind layers + design tokens
components/
  Header.tsx          Sticky nav (transparent over hero → solid on scroll) + mobile drawer
  Footer.tsx
  EventCards.tsx      ★ Animated upcoming-events card stack
  Reveal.tsx          Scroll-reveal primitives (Reveal / RevealGroup / RevealItem)
  CountUp.tsx         Animated stat counters
  GalleryGrid.tsx     Filterable masonry gallery
  ContactForm.tsx     Accessible form (contact + volunteer variants)
  PageHeader.tsx      Dark hero band for interior pages
  Button.tsx, icons.tsx
lib/
  content.ts          ★ Single source of content (text, events, stats, gallery, etc.)
public/
  favicon.svg
preview/
  index.html          Static homepage preview
```

★ = the files you'll most likely edit first.

---

## Design tokens

Defined in `tailwind.config.ts` (and mirrored as CSS variables in `globals.css`).

| Token | Value | Use |
|-------|-------|-----|
| `brand` | `#0b4422` | Primary — CTAs, headings, active states |
| `brand-950` | `#052a15` | Dark hero / section backgrounds |
| `leaf` | `#3fa66a` | Fresh accent, highlights, "live" markers |
| `gold` | `#e0a72e` | Event badges, warm emphasis |
| `cream` | `#f7f5ef` | Alternating light sections |
| `ink` | `#12211a` | Body text |
| `muted` | `#5b6b62` | Secondary text |

Typography: **Fraunces** (display serif) + **Inter** (body), loaded via
`next/font` (no layout shift).

Motion: entrances use `cubic-bezier(0.22, 1, 0.36, 1)` at 0.5–0.6s; all motion
collapses to short fades under `prefers-reduced-motion`.

---

## Editing content

Almost all copy lives in **`lib/content.ts`**:

- `events` — the animated hero cards. **Placeholder** dates/details; replace with
  real programme events. Each card takes an image, tag, status, date, time,
  location and an `accent` of `"gold"` or `"leaf"`.
- `stats`, `programs`, `approach`, `story`, `testimonials`, `missionPoints` —
  real content from the organisation.
- `team`, `posts` — **placeholders**, clearly flagged in the UI. Swap in real
  member profiles / research articles.
- `gallery` — pulls the live photos from the initiative's domain.

---

## Images

The gallery and event photos currently reference the initiative's live domain
(`www.thehealthenlightinitiative.org/gallery/...`), whitelisted in
`next.config.mjs` under `images.remotePatterns`. To host your own images,
add them to `public/` (or a CDN) and update the URLs in `lib/content.ts` and the
`remotePatterns` list.

---

## Forms

`ContactForm` validates on submit and shows success/error states, but **does not
send email** — there is no backend wired up. Connect a form endpoint (e.g.
Formspree, Resend, a Next route handler, or your CRM) in `components/ContactForm.tsx`
where the `setTimeout` simulation is.

---

## Accessibility & SEO

- Semantic landmarks, single `<h1>` per page, logical heading order
- Skip-to-content link, visible focus rings, keyboard-operable nav, tabs and forms
- `prefers-reduced-motion` respected throughout
- Per-page metadata, Open Graph/Twitter tags, `robots.ts` + `sitemap.ts`

---

## Known gaps / next steps

- Replace placeholder **events**, **team profiles** and **blog posts** with real data.
- Wire the **contact/volunteer forms** to a real endpoint.
- Migrate gallery images to your own hosting and update `remotePatterns`.
- Add an OG share image at `public/og.jpg` and reference it in `app/layout.tsx`.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). CSS uses
`aspect-ratio`, `backdrop-filter` and logical grid — all widely supported.
