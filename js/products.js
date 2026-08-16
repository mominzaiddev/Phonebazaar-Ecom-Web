// ---------------------------------------------
// PRODUCTS (SHOP) PAGE LOGIC
// Handles: brand filter, price range, min rating,
// sorting, search query, and rendering results.
// ---------------------------------------------

renderNavbar("products");
renderFooter();

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = (urlParams.get("search") || "").toLowerCase();
const brandFromUrl = urlParams.get("brand");

// Current filter state
const state = {
  brands: brandFromUrl ? [brandFromUrl] : [],
  maxPrice: 150000,
  minRating: 0,
  sort: "popularity",
  search: searchQuery,
};

// ---- Build brand filter checkboxes ----
const allBrands = [...new Set(PRODUCTS.map((p) => p.brand))].sort();
const brandFiltersEl = document.getElementById("brand-filters");
brandFiltersEl.innerHTML = allBrands
  .map(
    (brand) => `
    <label class="filter-option">
      <input type="checkbox" value="${brand}" class="brand-checkbox" ${
      state.brands.includes(brand) ? "checked" : ""
    } />
      ${brand}
    </label>
  `
  )
  .join("");

document.querySelectorAll(".brand-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checked = [...document.querySelectorAll(".brand-checkbox:checked")].map(
      (c) => c.value
    );
    state.brands = checked;
    renderProducts();
  });
});

// ---- Rating filter ----
const ratingOptions = [4, 3, 0];
const ratingFiltersEl = document.getElementById("rating-filters");
ratingFiltersEl.innerHTML = ratingOptions
  .map(
    (r) => `
    <label class="filter-option">
      <input type="radio" name="rating" value="${r}" class="rating-radio" ${
      r === 0 ? "checked" : ""
    } />
      ${r === 0 ? "All ratings" : `${r}★ &amp; above`}
    </label>
  `
  )
  .join("");

document.querySelectorAll(".rating-radio").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    state.minRating = Number(e.target.value);
    renderProducts();
  });
});

// ---- Price range slider ----
const priceRange = document.getElementById("price-range");
const priceValue = document.getElementById("price-value");
priceRange.addEventListener("input", (e) => {
  state.maxPrice = Number(e.target.value);
  priceValue.textContent = formatPrice(state.maxPrice);
  renderProducts();
});

// ---- Sort dropdown ----
document.getElementById("sort-select").addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderProducts();
});

// ---- Clear filters ----
document.getElementById("clear-filters-btn").addEventListener("click", () => {
  state.brands = [];
  state.maxPrice = 150000;
  state.minRating = 0;
  state.search = "";
  document.querySelectorAll(".brand-checkbox").forEach((c) => (c.checked = false));
  document.querySelector('.rating-radio[value="0"]').checked = true;
  priceRange.value = 150000;
  priceValue.textContent = formatPrice(150000);
  window.history.replaceState({}, "", "products.html");
  renderProducts();
});

// ---- Core filter + sort + render ----
function renderProducts() {
  let results = PRODUCTS.filter((p) => {
    const matchesBrand = state.brands.length === 0 || state.brands.includes(p.brand);
    const matchesPrice = p.price <= state.maxPrice;
    const matchesRating = p.rating >= state.minRating;
    const matchesSearch =
      !state.search ||
      p.name.toLowerCase().includes(state.search) ||
      p.brand.toLowerCase().includes(state.search);

    return matchesBrand && matchesPrice && matchesRating && matchesSearch;
  });

  if (state.sort === "price-low") {
    results.sort((a, b) => a.price - b.price);
  } else if (state.sort === "price-high") {
    results.sort((a, b) => b.price - a.price);
  } else if (state.sort === "rating") {
    results.sort((a, b) => b.rating - a.rating);
  } else {
    results.sort((a, b) => b.reviews - a.reviews);
  }

  const grid = document.getElementById("products-grid");
  const count = document.getElementById("results-count");

  count.textContent = `${results.length} phone${results.length !== 1 ? "s" : ""} found`;

  grid.innerHTML =
    results.length > 0
      ? results.map(productCard).join("")
      : `<div class="no-results"><p>No phones match your filters.</p></div>`;
}

// Initial render
renderProducts();
