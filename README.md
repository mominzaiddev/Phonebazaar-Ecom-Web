# PhoneBazaar — Smartphone E-Commerce Website

A responsive, multi-page e-commerce website for browsing and "purchasing" smartphones — built entirely with **vanilla HTML, CSS, and JavaScript**. No backend, no database, no frameworks — all product data, cart state, and checkout flow run client-side.

🔗 **Live Demo:** [add your GitHub Pages link here]

---

## Features

- **Home page** — hero banner, category navigation, and curated product rows (Bestsellers, Under ₹30,000, Premium Flagships)
- **Shop page** — full product catalog with:
  - Filter by brand
  - Filter by price range (slider)
  - Filter by minimum rating
  - Sort by price, rating, or popularity
- **Product detail page** — dynamic routing via URL parameters (`product.html?id=1`), full specs, quantity selector, add-to-cart and buy-now actions
- **Cart page** — add/remove items, update quantities, live subtotal and delivery calculation, persisted with `localStorage`
- **Checkout page** — shipping form and simulated order placement with a generated order ID
- **Site-wide search** — search bar in the navbar filters products by name or brand
- **Fully responsive** — works across desktop, tablet, and mobile screen sizes

---

## Tech Stack

- **HTML5** — semantic page structure across 5 pages
- **CSS3** — custom design system with CSS variables, responsive grid/flexbox layouts, no external UI framework
- **JavaScript (ES6+)** — DOM manipulation, event delegation, `localStorage` for cart persistence, dynamic rendering of product data
- **SVG** — custom-drawn phone illustrations generated per-product (no external image dependencies)

No build tools, no npm dependencies — open `index.html` and it runs.

---

## Project Structure

```
phonebazaar/
├── index.html              # Home page
├── products.html            # Shop / catalog page with filters
├── product.html              # Product detail page (dynamic via ?id=)
├── cart.html                 # Shopping cart
├── checkout.html             # Checkout & order placement
├── css/
│   └── style.css             # Shared stylesheet for all pages
└── js/
    ├── data.js               # Product data (12 smartphones)
    ├── cart.js                # Cart logic (localStorage read/write)
    ├── components.js          # Reusable UI builders (navbar, footer, product card, SVG icons)
    ├── main.js                # Home page rendering
    ├── products.js            # Shop page filtering/sorting logic
    ├── product-detail.js      # Product detail page logic
    ├── cart-page.js           # Cart page rendering
    └── checkout.js            # Checkout form & order simulation
```

---

## How to Run Locally

No installation needed — this is a static site.

**Option 1 — Just open it:**
Double-click `index.html` to open it directly in your browser.

**Option 2 — Run a local server** (recommended, avoids any browser file-access restrictions):
```bash
# Python 3
python3 -m http.server 8000

# then visit
http://localhost:8000
```

---

## Key Implementation Notes

- **No product photos are used.** Every phone is rendered as a custom SVG illustration colored per-product, keeping the site copyright-safe and fast to load with zero external image requests.
- **Cart state** is stored in `localStorage` as an array of `{ id, qty }` objects and synced across every page via `cart.js`.
- **Product detail routing** works without a backend by reading `?id=` from the URL and looking up the matching product from the static `data.js` array.
- Checkout is a **simulated flow** — no real payment is processed; submitting the form clears the cart and displays a generated order confirmation.

---

## What This Project Demonstrates

- Multi-page site architecture with shared components (navbar/footer injected via JS)
- State management without a framework (cart persistence, filters, sorting)
- Manual testing of core user flows — search, filter, add-to-cart, checkout — across screen sizes to catch layout and functional issues
- Clean, maintainable vanilla JS organized by page/responsibility

---

## Author

**Momin Zaid**
📧 mominzaid004@gmail.com
🔗 [LinkedIn](#) · [GitHub](#)

*This is a demo project built for portfolio purposes — not a real store.*
