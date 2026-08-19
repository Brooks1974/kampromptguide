# The Key Account Manager’s Guide to Prompting

A public [Astro](https://astro.build) site for [kampromptguide.com](https://kampromptguide.com).

It is the classroom and giveaway companion to *The Key Account Manager’s Guide to Prompting* (Value Matters workbook, v3.0, July 2026, Richard Brooks). Twelve copyable prompts. No login, no waitlist, no CMS.

The brand on the page is **Value Matters**. The domain can stay kampromptguide.com.

`/` is the catalog: search, Start here, filter pills, closed cards, and a table of all 12. Each prompt also has a page at `/prompts/[slug]`. `/prompts` (no slug) redirects home.

## Run locally

```bash
npm i && npm run dev
```

Then open the URL Astro prints (usually `http://localhost:4321`).

```bash
npm run build
npm run preview
```

## Deploy on Netlify

1. In Netlify, **Add new site → Import an existing project**.
2. Connect this GitHub repo (`Brooks1974/kampromptguide`).
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Node version: `22` (also set in `netlify.toml`).
6. Deploy the production branch (`main` once this is merged).

`netlify.toml` already sets the build command and publish directory.

## DNS (Cloudflare) — for Rich

Once the Netlify site is live and Netlify has issued the production URLs:

In Cloudflare, change **only** the two **A** records for `kampromptguide.com` and `www` (currently `185.158.133.1`, Lovable) to the addresses Netlify shows for the custom domain.

Leave **MX** and **TXT** on `send.email` and the Resend DKIM record alone.

## Stack

- Astro 7 (static), TypeScript
- One CSS file, Value Matters navy / mist / azure
- Copy buttons are vanilla JS
- No analytics, no cookie banner, no backend
