// ---------------------------------------------
// REUSABLE COMPONENTS
// No product photos are used anywhere on this site —
// every phone is rendered as a small SVG illustration
// colored per-product, so the site works fully offline
// with zero external image requests.
// ---------------------------------------------

function phoneSVG(product, size = 160) {
  const w = size;
  const h = size * 1.7;
  return `
    <svg width="${w}" height="${h}" viewBox="0 0 160 272" fill="none" xmlns="http://www.w3.org/2000/svg" class="phone-illustration">
      <rect x="8" y="4" width="144" height="264" rx="26" fill="${product.color}" />
      <rect x="16" y="20" width="128" height="232" rx="4" fill="${product.accent}" opacity="0.18" />
      <rect x="16" y="20" width="128" height="150" rx="4" fill="${product.accent}" opacity="0.35" />
      <circle cx="80" cy="14" r="3" fill="${product.accent}" opacity="0.6" />
      <rect x="60" y="248" width="40" height="4" rx="2" fill="${product.accent}" opacity="0.6" />
      <rect x="30" y="40" width="60" height="10" rx="5" fill="${product.accent}" opacity="0.5" />
      <circle cx="128" cy="46" r="10" fill="${product.accent}" opacity="0.5" />
    </svg>
  `;
}

function ratingStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = "★".repeat(full);
  if (half) stars += "½";
  return stars;
}

function discountPercent(price, originalPrice) {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// Builds a product card used on Home + Products listing pages
function productCard(product) {
  const off = discountPercent(product.price, product.originalPrice);
  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="card-image" style="background:${product.color}1A;">
        ${phoneSVG(product, 110)}
        <span class="badge">${product.badge}</span>
      </div>
      <div class="card-body">
        <p class="card-brand">${product.brand}</p>
        <h3 class="card-name">${product.name}</h3>
        <p class="card-tagline">${product.tagline}</p>
        <div class="card-rating">
          <span class="stars">${ratingStars(product.rating)}</span>
          <span class="rating-num">${product.rating}</span>
          <span class="reviews">(${product.reviews.toLocaleString("en-IN")})</span>
        </div>
        <div class="card-price">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="original-price">${formatPrice(product.originalPrice)}</span>
          <span class="off">${off}% off</span>
        </div>
      </div>
    </a>
  `;
}

// Shared navbar — injected into a <div id="navbar"></div> placeholder on every page
function renderNavbar(activePage = "") {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav-top">
      <a href="index.html" class="nav-logo">Phone<span>Bazaar</span></a>

      <div class="nav-search">
        <input type="text" id="nav-search-input" placeholder="Search for smartphones..." autocomplete="off" />
        <button id="nav-search-btn" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>

      <div class="nav-links">
        <a href="products.html" class="${activePage === "products" ? "active" : ""}">Shop</a>
        <a href="cart.html" class="cart-link ${activePage === "cart" ? "active" : ""}">
          Cart
          <span id="cart-badge" class="cart-badge">0</span>
        </a>
      </div>
    </div>
  `;

  const searchInput = document.getElementById("nav-search-input");
  const searchBtn = document.getElementById("nav-search-btn");

  function runSearch() {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
  }

  searchBtn.addEventListener("click", runSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });

  updateCartBadge();
}

// Shared footer — injected into a <div id="footer"></div> placeholder on every page
function renderFooter() {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-col">
        <h4>PhoneBazaar</h4>
        <p>A front-end demo e-commerce project built with HTML, CSS &amp; JavaScript — no backend, all data is local.</p>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="products.html">All Phones</a>
        <a href="cart.html">Your Cart</a>
      </div>
      <div class="footer-col">
        <h4>About this project</h4>
        <a href="https://github.com/" target="_blank" rel="noopener">GitHub Repository</a>
        <a href="index.html">Back to Home</a>
      </div>
    </div>
    <p class="footer-bottom">Built by Momin Zaid — Demo project for portfolio purposes. Not a real store.</p>
  `;
}
