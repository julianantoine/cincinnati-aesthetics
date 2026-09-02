// Cincinnati Aesthetics directory — loads data/directory.json and renders the site.
// Edit data/directory.json to update listings. No code changes needed.

let DATA = null;

async function init() {
  try {
    const res = await fetch("data/directory.json");
    DATA = await res.json();
  } catch (e) {
    document.getElementById("listings").innerHTML = "<p>Couldn't load directory data. Serve via a local server (python3 -m http.server).</p>";
    return;
  }
  renderCategories();
  renderFilters();
  renderListings("all", "all");
  renderFaq();
  bindCapture();
}

function renderCategories() {
  const grid = document.getElementById("catGrid");
  grid.innerHTML = DATA.categories.map(c => `
    <a class="cat-card" href="#listings" onclick="filterTo('all','${c.id}')">
      <h3>${c.name}</h3>
      <p>${c.description}</p>
      <span class="cat-count">${DATA.listings.filter(l => l.category === c.id).length} listing${DATA.listings.filter(l => l.category === c.id).length === 1 ? "" : "s"}</span>
    </a>`).join("");
}

function renderFilters() {
  const areaSel = document.getElementById("areaFilter");
  areaSel.innerHTML = '<option value="all">All Areas</option>' +
    DATA.areas.map(a => `<option value="${a.id}">${a.name}</option>`).join("");
  const catSel = document.getElementById("catFilter");
  catSel.innerHTML = '<option value="all">All Categories</option>' +
    DATA.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function filterTo(area, cat) {
  document.getElementById("areaFilter").value = area;
  document.getElementById("catFilter").value = cat;
  renderListings(area, cat);
  document.getElementById("listings").scrollIntoView({ behavior: "smooth" });
}

function applyFilter() {
  renderListings(document.getElementById("areaFilter").value, document.getElementById("catFilter").value);
}

function renderListings(areaId, catId) {
  const box = document.getElementById("listings");
  let items = DATA.listings;
  if (areaId !== "all") items = items.filter(l => l.area === areaId);
  if (catId !== "all") items = items.filter(l => l.category === catId);
  if (items.length === 0) { box.innerHTML = "<p>No businesses match this filter yet.</p>"; return; }
  box.innerHTML = items.map(l => `
    <div class="listing ${l.featured ? "featured" : ""}">
      ${l.featured ? '<span class="l-badge">★ Featured</span>' : ""}
      <div class="l-head">
        <h3>${l.name}</h3>
        <span class="l-area">${(DATA.areas.find(a => a.id === l.area) || {}).name || ""}</span>
      </div>
      <p class="l-desc">${l.description}</p>
      <div class="l-highlights">
        ${l.highlights.map(h => `<span class="hl">✓ ${h}</span>`).join("")}
      </div>
      <div class="l-foot">
        <span class="l-cat">${(DATA.categories.find(c => c.id === l.category) || {}).name || ""}</span>
        <a class="btn btn-sm" href="${l.url}" target="_blank" rel="noopener">Visit →</a>
      </div>
    </div>`).join("");
}

function renderFaq() {
  const box = document.getElementById("faqList");
  box.innerHTML = DATA.faqs.map(f => `
    <details class="faq-item">
      <summary>${f.q}</summary>
      <p>${f.a}</p>
    </details>`).join("");
}

function bindCapture() {
  const form = document.getElementById("captureForm");
  const note = document.getElementById("captureNote");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector("input").value;
    note.textContent = `Thanks! We'll send the guide to ${email}. (Wire this form to your email provider.)`;
    form.reset();
  });
}

// Stripe checkout — opens the Stripe Payment Link for the selected tier.
// Tiers: standard ($149), featured ($249), spotlight ($399).
const PAYMENT_LINKS = {
  standard: "https://buy.stripe.com/eVq5kwaPpe3a5zrenR57W00",
  featured: "https://buy.stripe.com/bJefZag9J7EM6Dv7Zt57W01",
  spotlight: "https://buy.stripe.com/bJe28kaPp3owbXP2F957W02",
};

function checkout(tier) {
  const link = PAYMENT_LINKS[tier];
  if (link) {
    window.open(link, "_blank");
  } else {
    document.getElementById("checkoutNote").textContent = "Checkout isn't configured yet. Contact us to get featured.";
  }
}

document.addEventListener("DOMContentLoaded", init);
