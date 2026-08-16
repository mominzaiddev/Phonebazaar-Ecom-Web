// ---------------------------------------------
// CART PAGE LOGIC
// ---------------------------------------------

renderNavbar("cart");
renderFooter();

function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById("cart-container");

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any phones yet.</p>
        <a href="products.html" class="btn btn-secondary">Start Shopping</a>
      </div>
    `;
    return;
  }

  const itemsHTML = cart
    .map((item) => {
      const product = getProductById(item.id);
      if (!product) return "";

      return `
        <div class="cart-item" data-id="${product.id}">
          <div class="item-image" style="background:${product.color}1A;">
            ${phoneSVG(product, 80)}
          </div>
          <div class="cart-item-info">
            <p class="brand">${product.brand}</p>
            <h3>${product.name}</h3>
            <div class="cart-item-controls">
              <div class="qty-selector">
                <button class="cart-qty-minus" aria-label="Decrease quantity">−</button>
                <span>${item.qty}</span>
                <button class="cart-qty-plus" aria-label="Increase quantity">+</button>
              </div>
              <span class="cart-item-price">${formatPrice(product.price * item.qty)}</span>
            </div>
            <button class="remove-btn">Remove</button>
          </div>
        </div>
      `;
    })
    .join("");

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 50000 ? 0 : 499;
  const total = subtotal + deliveryFee;

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${itemsHTML}</div>

      <div class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal (${cart.reduce((s, i) => s + i.qty, 0)} items)</span>
          <span>${formatPrice(subtotal)}</span>
        </div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
        <a href="checkout.html" class="btn btn-primary" style="width:100%;display:block;text-align:center;margin-top:16px;">Proceed to Checkout</a>
      </div>
    </div>
  `;

  // ---- Attach event listeners for qty +/- and remove ----
  document.querySelectorAll(".cart-item").forEach((itemEl) => {
    const id = Number(itemEl.dataset.id);
    const cartItem = getCart().find((i) => i.id === id);

    itemEl.querySelector(".cart-qty-minus").addEventListener("click", () => {
      updateQty(id, cartItem.qty - 1);
      renderCartPage();
    });

    itemEl.querySelector(".cart-qty-plus").addEventListener("click", () => {
      updateQty(id, cartItem.qty + 1);
      renderCartPage();
    });

    itemEl.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(id);
      renderCartPage();
    });
  });
}

renderCartPage();
