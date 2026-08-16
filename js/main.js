// ---------------------------------------------
// HOME PAGE LOGIC
// ---------------------------------------------

renderNavbar("home");
renderFooter();

// Category chips (just links into the filtered products page)
const categories = ["All", "Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Realme", "Vivo"];
const categoryStrip = document.getElementById("category-strip");
categoryStrip.innerHTML = categories
  .map(
    (cat) =>
      `<a href="products.html${cat !== "All" ? `?brand=${cat}` : ""}" class="category-chip">${cat}</a>`
  )
  .join("");

// Bestsellers: top rated products
const bestsellers = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 4);
document.getElementById("bestsellers-grid").innerHTML = bestsellers
  .map(productCard)
  .join("");

// Budget picks: under ₹30,000
const budgetPicks = PRODUCTS.filter((p) => p.price < 30000).slice(0, 4);
document.getElementById("budget-grid").innerHTML = budgetPicks
  .map(productCard)
  .join("");

// Flagships: highest priced
const flagships = [...PRODUCTS].sort((a, b) => b.price - a.price).slice(0, 4);
document.getElementById("flagship-grid").innerHTML = flagships
  .map(productCard)
  .join("");
