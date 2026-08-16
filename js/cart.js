// ---------------------------------------------
// CART LOGIC (shared across every page)
// Cart is stored in localStorage as an array of
// { id, qty } objects — actual product details
// are looked up from PRODUCTS in data.js when needed.
// ---------------------------------------------

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  const cart = getCart();
  const item = cart.find((item) => item.id === productId);
  if (!item) return;

  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }

  item.qty = qty;
  saveCart(cart);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

// Updates the little number badge on the cart icon in the navbar.
// Called on every page load and whenever the cart changes.
function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
