# DougWeb

The public website for Doug, the AI call screener. Open source under the
[MIT license](LICENSE). The license covers this code. The Doug name and logo
aren't included.

Next.js 16 (App Router, TypeScript), plain CSS, no UI framework. It deploys to
Vercel from the root of this repository.

```bash
npm install
cp .env.example .env.local   # optional for local work
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build, for Lighthouse
npm run lint
```

## Editing copy and prices

Everything you'll want to change lives in `content/`. Each file is plain
TypeScript data, and the page reads from it.

| File | What it controls |
|---|---|
| `content/pricing.ts` | **All prices**, plan names, what each plan includes, the founding-member label, the founding-seat cap, included minutes and the pilot terms. The pricing section, FAQ, Terms page and structured data all read from here. |
| `content/site.ts` | Site URL, page title and description, contact email, legal entity name, the **founder note**, and the **"Hear Doug" audio** (`demo.src`). |
| `content/faq.ts` | The FAQ questions and answers. |
| `content/latency.ts` | The latency budget, and the slot for **measured** latency. |
| `content/transcripts.ts` | The three example calls typed out in the hero. |

Section copy that isn't data (headlines, step descriptions, rules, trust
statements) is in `components/Sections.tsx` and `components/Hero.tsx`, next to
the markup it belongs to.

### Honesty switches: read before editing

- **Founding-seat cap.** `founding.seats` in `content/pricing.ts` is `null`,
  so no cap is shown anywhere. Set a number and the pricing section states the
  cap, and `/api/early-access` enforces it: requests past the cap are stored
  with `founding: false`, and that person's confirmation says so. Don't
  mention a cap anywhere else.
- **Latency.** The speed section shows a *design budget* and says so. When
  pilot calls give you real numbers, set `measured` in `content/latency.ts`
  and the section switches to "Measured on N pilot calls…". Don't put a
  number in `measured` that didn't come from real calls.
- **Audio demo.** `demo.src` is `null`, so the page shows "Audio sample coming
  soon". Put an unedited recording of a real call through our pipeline (with
  the caller's consent) in `public/` and point `demo.src` at it.
- **Included minutes.** `includedMinutes` is `null`, so the FAQ says the
  allowance will be agreed in writing before billing starts. Set numbers when
  you've decided them.
- **Team note.** The paragraphs and signature are in `content/site.ts`.
- **Legal pages.** `app/privacy` and `app/terms` describe what the service
  actually does (30-day retention, which providers see data, the recording
  and AI notice). If the product changes, update them too, and bump
  `legalUpdated` in `content/site.ts`. The governing state is
  `governingState` in the same file.

Social-proof slots don't exist on purpose. Add testimonials, logos or counts
only when real ones exist.

## Headline options

The shipped headline is **"Every call answered. Only the right ones reach
you."** It's in `components/Hero.tsx`. The alternatives considered:

1. Every call answered. Only the right ones reach you. *(chosen: states both outcomes, and every word is literally true)*
2. Your calls, handled.
3. Answered by Doug. Decided by your rules.
4. The phone rings. Doug decides whether you hear it.
5. You take the calls that matter. Doug takes the rest.
6. Never miss the call that mattered.
7. Your phone, with a chief of staff.
8. Someone should answer your phone. Now someone does.
9. Answer nothing. Miss nothing.
10. Quiet phone. Nothing missed.

(9 and 10 overpromise: Doug can't guarantee nothing is missed. 2 is elegant but
says nothing a competitor couldn't.)

## Early-access form

`POST /api/early-access` validates on the server with the same schema as the
browser (`lib/early-access.ts`). It drops honeypot hits silently,
rate-limits each IP to 5 requests per 10 minutes, stores to Upstash/Vercel KV,
and emails you through Resend. See `.env.example` for every variable and what
happens when one is missing.

Stored keys: `doug:ea:<email>` (JSON, latest details) and `doug:ea:list` (all
emails, newest first). To read them:

```bash
curl -s -H "Authorization: Bearer $KV_REST_API_TOKEN" "$KV_REST_API_URL/lrange/doug:ea:list/0/-1"
curl -s -H "Authorization: Bearer $KV_REST_API_TOKEN" "$KV_REST_API_URL/get/doug:ea:someone@example.com"
```

## Analytics

Vercel Web Analytics is included (cookieless). Enable it in the Vercel
dashboard under **Analytics**. Conversion events (defined in `lib/analytics.ts`):

| Event | When |
|---|---|
| `cta_click` | Any "Request early access" or "Hear Doug" button (`cta`, `location`) |
| `calculator_used` | Once after a visitor settles on their calculator numbers (`monthly`) |
| `demo_play` | The demo recording starts playing |
| `form_submit` | The form is submitted (`use`, `status: ok/error`) |

Custom events need a Vercel plan that includes them. On other plans they're
silently dropped. Locally, the analytics script 404s because it's only served
on Vercel. That's expected, and it's the one console error Lighthouse reports
locally.

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project** and import the repository. Vercel detects
   Next.js, so leave the root directory and build settings at their defaults.
3. **Storage**: add Upstash for Redis from the Marketplace and connect it to
   the project. That sets `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
4. **Environment variables**: set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`,
   `EARLY_ACCESS_NOTIFY_TO` and `EARLY_ACCESS_FROM` for Production, and for
   Preview if you want previews to store and email too.
5. Deploy. Every pull request now gets its own Preview deployment, and
   `robots.txt` blocks indexing on previews automatically.

### Connecting your domain

1. Vercel → Project → **Settings → Domains → Add**, and enter `yourdomain.com`.
   Add `www.yourdomain.com` too, and set it to redirect to the apex (or the
   other way round).
2. At your DNS provider, create the records Vercel shows. Typically:
   - apex `yourdomain.com`: an **A** record to `76.76.21.21`
   - `www`: a **CNAME** to `cname.vercel-dns.com`

   (Use the exact values in the Vercel dashboard, which are authoritative.)
   Or switch your nameservers to Vercel's and it creates the records for you.
3. Wait for the domain to show **Valid Configuration**. Vercel issues the TLS
   certificate automatically.
4. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy, so canonical
   URLs, OG images and the sitemap point at the real domain.
5. In Resend, verify the same domain (it gives you SPF/DKIM records to add), so
   `EARLY_ACCESS_FROM` can send from it.

## Quality bar and how it's checked

- Lighthouse (mobile), run locally against `npm start`: Performance 99,
  Accessibility 100, Best Practices 96 (the only deduction is the analytics
  404 described above), SEO 100. LCP 1.96 s, CLS 0.
- First-load JS: see "Known limits" below.
- Contrast: every text/background pair is at least 4.5:1 (the tokens in
  `app/globals.css` note their ratios).
- Motion: only `transform` and `opacity` animate. Everything works with
  `prefers-reduced-motion: reduce`, and the hero transcript has a Pause
  control (WCAG 2.2.2).

### Known limits

- **First-load JS is about 150 KB brotli / 183 KB gzip, over the 120 KB
  target.** About 170 KB gzip of that is the Next.js 16 + React 19 runtime
  itself, measured on a page with almost no client code. This site's own
  client code is about 13 KB. No change *within* Next.js gets under 120 KB.
  Moving the landing page to a zero-JS framework such as Astro would, and the
  content files in `content/` would carry over unchanged.
