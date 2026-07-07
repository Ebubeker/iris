# Leads & Conversion Tracking — Setup & Action Items

This document covers the lead-capture + analytics work added to fix "the site
gets no leads." Some of it is code (already done); some of it are **manual steps
you must do once** in Supabase / Google Tag Manager / Google, marked ⚠️.

---

## 1. Reliable lead capture (done in code)

The contact form (`קבלו הצעת מחיר`) previously used a hidden iframe and **always
showed "sent successfully" even when the email silently failed** — and stored
nothing. It now:

1. **Saves every submission to a Supabase `leads` table first** (source of truth).
2. Then sends the email notification via Web3Forms' JSON API, and reads the
   **real** success/failure result.
3. Shows success only if the lead was captured by at least one channel.
4. Has a **honeypot** field that silently drops bots.

### ⚠️ Step 1a — create the leads table (run once)
In the Supabase SQL editor, run the contents of **`supabase-leads.sql`**.
Visitors (anon) can only INSERT; only you (logged in) can read leads.

### ⚠️ Step 1b — test the form end-to-end
After deploying, submit the form on the live site and confirm:
- A row appears in Supabase → Table editor → `leads`.
- The email arrives at **info@iris-hr.work** (check spam). If it does **not**
  arrive, the Web3Forms access key / recipient needs to be re-verified at
  https://web3forms.com — but leads are now safe in the DB regardless.

### Where you read leads
Admin panel → **פניות** tab. Each lead shows name, phone (click to call),
email, service, message, and a status (חדשה / טופלה / סגורה). A badge shows how
many new leads are waiting.

---

## 2. Conversion tracking (done in code, needs GTM wiring)

GTM (`GTM-M2SGHXBH`) was already installed but **fired no conversion events** —
so analytics could only see pageviews, never leads. The site now pushes these
events to the `dataLayer`:

| Event name          | Fires when…                                  |
|---------------------|----------------------------------------------|
| `generate_lead`     | contact form submitted successfully (params: `lead_service`, `email_delivered`) |
| `whatsapp_click`    | any WhatsApp button/link clicked (param: `click_location`) |
| `phone_click`       | a phone `tel:` link tapped (param: `click_location`) |
| `submit_testimonial`| a testimonial submitted                      |

### ⚠️ Step 2a — wire them up in Google Tag Manager
For each event above:
1. **Triggers → New → Custom Event**, Event name = `generate_lead` (etc.).
2. **Tags → New → GA4 Event**, Configuration tag = your GA4 tag, Event name =
   the same name, fire on that trigger.
3. (Optional but recommended) add a **Google Ads Conversion** tag on
   `generate_lead` and `whatsapp_click` if/when you run ads.
4. **Submit / Publish** the container.

### ⚠️ Step 2b — confirm GA4 exists in the container
Make sure the container actually contains a **GA4 Configuration tag** with a real
Measurement ID (`G-XXXXXXX`). Without it, nothing reaches GA4. Use GTM **Preview**
mode to watch the events fire as you click around.

---

## 3. Still-manual growth items (not code) ⚠️

These are the highest-leverage things for a local Israeli service business and
can't be done in the repo:

- **Google Search Console** — verify the property (`https://www.iris-hr.work/`),
  submit `https://www.iris-hr.work/sitemap.xml`, and check the Coverage/Pages
  report to confirm Google is actually indexing the pages.
- **Google Business Profile** — create/claim it for "איריס שני – יועצת משאבי אנוש",
  category HR consultant, area גבעת ברנר / מרכז. For local searches this is often
  the #1 lead source.
- Ask happy clients to leave Google reviews and to submit a testimonial via the
  site (כתבו המלצה button).

---

## 4. New SEO surfaces added (done in code)

- **Dedicated, indexable service pages** at `/services/<slug>` (e.g.
  `/services/salary-slip-analysis`), each with its own title, meta description,
  `Service` + breadcrumb structured data, and internal links. The homepage
  service content used to live only inside click-dialogs that crawlers never saw.
- These pages are **prerendered** (`scripts/prerender.mjs`) and included in the
  **sitemap** (`api/sitemap.ts`). If you add/rename a service in
  `src/data/services.tsx`, also update the slug lists in those two files.
- A persistent **floating WhatsApp button** on every public page.
- Phone numbers are now tappable `tel:` links site-wide.
- Oversized images were downscaled (hero photo 3.4 MB → ~0.4 MB) for faster load.

---

## 5. Verify the prerender per-route in production

After deploy, confirm each route serves its **own** prerendered HTML (not the
homepage). For example:

```
curl -s https://www.iris-hr.work/faq | grep -o '<title>[^<]*</title>'
curl -s https://www.iris-hr.work/services/salary-slip-analysis | grep -o '<title>[^<]*</title>'
```

Each should return a different, page-specific `<title>`. If they all return the
homepage title, the Vercel routing/prerender output needs a look.
