// ---------------------------------------------
// PRODUCT DETAIL PAGE LOGIC
// Reads ?id= from the URL, looks up the product,
// and renders its full detail view.
// ---------------------------------------------

renderNavbar();
renderFooter();

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = getProductById(productId);

const container = document.getElementById("product-container");

if (!product) {
  container.innerHTML = `
    <div class="no-results" style="padding:80px 0;">
      <p>Product not found.</p>
      <a href="products.html" class="btn btn-secondary" style="display:inline-block;margin-top:16px;">Back to Shop</a>
    </div>
  `;
} else {
  document.getElementById("page-title").textContent = `${product.name} — PhoneBazaar`;

  const off = discountPercent(product.price, product.originalPrice);
  let currentQty = 1;

  container.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a> / <a href="products.html">Shop</a> / ${product.name}
    </div>

    <div class="product-detail">
      <div class="detail-image" style="background:${product.color}1A;">
        ${phoneSVG(product, 220)}
      </div>

      <div class="detail-info">
        <p class="brand">${product.brand}</p>
        <h1>${product.name}</h1>
        <p class="tagline">${product.tagline}</p>

        <div class="detail-rating">
          <span class="rating-num">${product.rating} ★</span>
          <span class="reviews">${product.reviews.toLocaleString("en-IN")} ratings</span>
        </div>

        <div class="detail-price-block">
          <span class="detail-price">${formatPrice(product.price)}</span>
          <span class="detail-original-price">${formatPrice(product.originalPrice)}</span>
          <span class="detail-off">${off}% off</span>
        </div>
        <p class="detail-tax-note">Inclusive of all taxes</p>

        <div class="qty-selector">
          <button id="qty-minus" aria-label="Decrease quantity">−</button>
          <span id="qty-value">1</span>
          <button id="qty-plus" aria-label="Increase quantity">+</button>
        </div>

        <div class="detail-actions">
          <button class="btn btn-primary" id="add-to-cart-btn">Add to Cart</button>
          <button class="btn btn-secondary" id="buy-now-btn">Buy Now</button>
        </div>

        <div class="specs-table">
          <h3>Specifications</h3>
          <div class="spec-row"><span class="spec-label">Display</span><span>${product.display}</span></div>
          <div class="spec-row"><span class="spec-label">Processor</span><span>${product.processor}</span></div>
          <div class="spec-row"><span class="spec-label">RAM</span><span>${product.ram}</span></div>
          <div class="spec-row"><span class="spec-label">Storage</span><span>${product.storage}</span></div>
          <div class="spec-row"><span class="spec-label">Camera</span><span>${product.camera}</span></div>
          <div class="spec-row"><span class="spec-label">Battery</span><span>${product.battery}</span></div>
        </div>
      </div>
    </div>

    <div class="description-block">
      <h3>About this item</h3>
      <p>${product.description}</p>
    </div>
  `;

  // ---- Quantity selector ----
  const qtyValueEl = document.getElementById("qty-value");
  document.getElementById("qty-minus").addEventListener("click", () => {
    if (currentQty > 1) currentQty--;
    qtyValueEl.textContent = currentQty;
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    currentQty++;
    qtyValueEl.textContent = currentQty;
  });

  // ---- Add to cart ----
  document.getElementById("add-to-cart-btn").addEventListener("click", () => {
    addToCart(product.id, currentQty);
    const btn = document.getElementById("add-to-cart-btn");
    const original = btn.textContent;
    btn.textContent = "Added ✓";
    setTimeout(() => (btn.textContent = original), 1200);
  });

  // ---- Buy now: add to cart then jump straight to checkout ----
  document.getElementById("buy-now-btn").addEventListener("click", () => {
    addToCart(product.id, currentQty);
    window.location.href = "checkout.html";
  });
}
