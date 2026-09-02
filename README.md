# ✨ Cincinnati Aesthetics — Local Med Spa Directory

A curated directory of the best med spas & aesthetics clinics in Greater Cincinnati.
Built from the Local Directory Blueprint, monetized via paid listings.

## Run it
```bash
cd "CincinnatiAesthetics"
python3 server.py
# → http://localhost:8052
```

## Plug in / update listings (no code needed)
Edit **`data/directory.json`**:
- `site` — name, tagline, description
- `areas` — neighborhoods/areas
- `categories` — business categories
- `listings` — each med spa: name, area, category, URL, highlights, description, featured
- `faqs` — real questions people ask

## Monetization (paid listings)
| Tier | Price | What you get |
|------|-------|--------------|
| Standard | $149/mo | Directory listing |
| Featured | $249/mo | Top placement + highlight |
| Spotlight | $399/mo | Homepage + print guide |

## Stripe checkout
The `/api/checkout` endpoint creates a Stripe Checkout Session. To enable it:
1. Create the 3 prices in Stripe dashboard (Products → Add product → monthly recurring)
2. Set env vars: `STRIPE_STANDARD_PRICE`, `STRIPE_FEATURED_PRICE`, `STRIPE_SPOTLIGHT_PRICE`
3. Set the `success_url`/`cancel_url` in `server.py` to your real domain

## Deploy
Push to GitHub Pages (public repo) for a free live link, or any static host.
Note: Stripe checkout needs a backend — for GitHub Pages, host the API separately
(Render/Railway free tier) or use Stripe Payment Links instead.

## The business model
1. **Paid listings** — businesses pay monthly to be featured
2. **Print guide** — design a city guide, mail to neighborhoods; businesses pay $500–$2000 to be featured

**How to get businesses:** make the site look legit first (10-20 solid listings), offer free placements to anchor businesses (Serein is your anchor), then pitch as "we're building a curated city guide."
