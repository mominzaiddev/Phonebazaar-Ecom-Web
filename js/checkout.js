// ---------------------------------------------
// CHECKOUT PAGE LOGIC
// This is a front-end-only demo: submitting the
// form does not send data anywhere — it just
// simulates an order confirmation and clears the cart.
// ---------------------------------------------

renderNavbar();
renderFooter();

const checkoutContainer = document.getElementById("checkout-container");
const cart = getCart();

if (cart.length === 0) {
  checkoutContainer.innerHTML = `
    <div class="empty-cart">
      <h2>Your cart is empty</h2>
      <p>Add a few phones to your cart before checking out.</p>
      <a href="products.html" class="btn btn-secondary">Start Shopping</a>
    </div>
  `;
} else {
  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 50000 ? 0 : 499;
  const total = subtotal + deliveryFee;

  checkoutContainer.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-form" id="checkout-form">
        <h3>Shipping Details</h3>

        <div class="form-row">
          <div class="form-group">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" required />
          </div>
          <div class="form-group">
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" required />
          </div>
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <input type="text" id="address" placeholder="Flat, street, area" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">City</label>
            <input type="text" id="city" required />
          </div>
          <div class="form-group">
            <label for="pincode">Pincode</label>
            <input type="text" id="pincode" maxlength="6" required />
          </div>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" placeholder="10-digit mobile number" required />
        </div>

        <h3 style="margin-top:24px;">Payment Method</h3>
        <div class="form-group">
          <select id="payment-method">
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit / Debit Card</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" style="width:100%;margin-top:10px;">
          Place Order — ${formatPrice(total)}
        </button>
      </form>

      <div class="summary-card">
        <h3>Order Summary</h3>
        ${cart
          .map((item) => {
            const p = getProductById(item.id);
            return `<div class="summary-row"><span>${p.name} × ${item.qty}</span><span>${formatPrice(
              p.price * item.qty
            )}</span></div>`;
          })
          .join("")}
        <div class="summary-row">
          <span>Delivery</span>
          <span>${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
      </div>
    </div>
  `;

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate order placement — generate a fake order ID
    const orderId = "PB" + Math.floor(100000 + Math.random() * 900000);

    checkoutContainer.innerHTML = `
      <div class="success-message">
        <div class="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Your order <strong>#${orderId}</strong> worth ${formatPrice(
      total
    )} has been placed. This is a demo checkout — no real payment was processed.</p>
        <a href="index.html" class="btn btn-secondary">Back to Home</a>
      </div>
    `;

    // Clear the cart after "placing" the order
    localStorage.removeItem("cart");
    updateCartBadge();
  });
}
