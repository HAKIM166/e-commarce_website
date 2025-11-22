// ------------------------------
// 1. Copy desktop menus into mobile off-canvas
// ------------------------------
function copyMenu() {
  // copy inside .dpt-cat to .departments
  var dptCategory = document.querySelector(".dpt-cat");
  var dptPlace = document.querySelector(".departments");
  if (dptCategory && dptPlace) {
    dptPlace.innerHTML = dptCategory.innerHTML;
  }

  // copy inside nav to off-canvas nav
  var mainnav = document.querySelector(".header-nav nav");
  var navPlace = document.querySelector(".off-canvas nav");
  if (mainnav && navPlace) {
    navPlace.innerHTML = mainnav.innerHTML;
  }

  // copy .header-top .wrapper to .thetop-nav
  var topNav = document.querySelector(".header-top .wrapper");
  var topPlace = document.querySelector(".off-canvas .thetop-nav");
  if (topNav && topPlace) {
    topPlace.innerHTML = topNav.innerHTML;
  }
}
copyMenu();

// ------------------------------
// 2. Mobile menu open / close
// ------------------------------
const menuButton = document.querySelector(".trigger");
const closeButton = document.querySelector(".t-close");
const siteRoot = document.querySelector(".site");

if (menuButton && closeButton && siteRoot) {
  menuButton.addEventListener("click", function () {
    siteRoot.classList.toggle("showmenu");
  });

  closeButton.addEventListener("click", function () {
    siteRoot.classList.remove("showmenu");
  });
}

// ------------------------------
// 3. Mobile sub menu accordion
// ------------------------------
const submenuIcons = document.querySelectorAll(".has-child .icon-small");

function toggleSubmenu(e) {
  e.preventDefault();
  submenuIcons.forEach((item) => {
    if (item !== this) {
      const parent = item.closest(".has-child");
      if (parent) parent.classList.remove("expand");
    }
  });
  const parent = this.closest(".has-child");
  if (parent) parent.classList.toggle("expand");
}

submenuIcons.forEach((icon) => {
  icon.addEventListener("click", toggleSubmenu);
});

// ------------------------------
// 4. Hero slider (Swiper)
// ------------------------------
if (typeof Swiper !== "undefined") {
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

// ------------------------------
// 5. Search bar (top + bottom)
// ------------------------------
const searchButton = document.querySelector(".t-search");
const searchClose = document.querySelector(".search-close");

if (searchButton && searchClose && siteRoot) {
  searchButton.addEventListener("click", function () {
    siteRoot.classList.toggle("showsearch");
  });
  searchClose.addEventListener("click", function () {
    siteRoot.classList.remove("showsearch");
  });
}

// ------------------------------
// 6. Countdown offer (persistent via localStorage)
// ------------------------------
let countdownTime = localStorage.getItem("countdownEnd");

if (!countdownTime) {
  countdownTime = Date.now() + 2 * 24 * 60 * 60 * 1000; // 2 days
  localStorage.setItem("countdownEnd", countdownTime);
} else {
  countdownTime = +countdownTime;
}

const dayEl = document.getElementById("day-offer");
const hoursEl = document.getElementById("hours-offer");
const minutesEl = document.getElementById("minutes-offer");
const secondsEl = document.getElementById("seconds-offer");

function updateCountdown() {
  const now = Date.now();
  let distance = countdownTime - now;

  if (distance <= 0) {
    // reset for another 24 hours when it finishes
    countdownTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("countdownEnd", countdownTime);
    distance = countdownTime - Date.now();
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (dayEl) dayEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}

if (dayEl && hoursEl && minutesEl && secondsEl) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ------------------------------
// 7. Departments dropdown (desktop)
// ------------------------------
const dptSection = document.querySelector(".header-main");
let dptTrigger, dptMenu;

if (dptSection) {
  dptTrigger = dptSection.querySelector(".dpt-trigger");
  dptMenu = dptSection.querySelector(".dpt-menu");

  if (dptTrigger && dptMenu) {
    dptTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      dptMenu.classList.toggle("active");
    });
  }
}

// =======================================================
// 8. Very simple toast notification
// =======================================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.className = "eco-toast";
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "80px",
    right: "16px",
    padding: "10px 14px",
    background: "#020617",
    color: "#e5e7eb",
    borderRadius: "999px",
    fontSize: "13px",
    boxShadow: "0 18px 45px rgba(15,23,42,.55)",
    zIndex: 2000,
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity .2s, transform .2s",
  });

  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(function () {
      toast.remove();
    }, 220);
  }, 1900);
}

// =======================================================
// 9. Cart & Wishlist logic
// =======================================================
let ecoCart = [];
let ecoWishlist = [];
let ecoBackdrop, ecoCartPanel, ecoWishlistPanel;

function ecoLoadState() {
  try {
    ecoCart = JSON.parse(localStorage.getItem("ecoCart") || "[]");
  } catch (e) {
    ecoCart = [];
  }
  try {
    ecoWishlist = JSON.parse(localStorage.getItem("ecoWishlist") || "[]");
  } catch (e) {
    ecoWishlist = [];
  }
}

function ecoSaveState() {
  localStorage.setItem("ecoCart", JSON.stringify(ecoCart));
  localStorage.setItem("ecoWishlist", JSON.stringify(ecoWishlist));
}

function ecoCartCount() {
  return ecoCart.reduce(function (total, item) {
    return total + (item.qty || 1);
  }, 0);
}

function ecoCartTotal() {
  return ecoCart.reduce(function (total, item) {
    return total + (item.price || 0) * (item.qty || 1);
  }, 0);
}

// ------------------------------
// 9.1 Create side panels (cart & wishlist)
// ------------------------------
function ecoCreatePanels() {
  if (document.getElementById("ecoBackdrop")) return;

  const style = document.createElement("style");
  style.textContent = `
    .eco-panel-backdrop{
      position:fixed;inset:0;background:rgba(15,23,42,0.55);
      z-index:1200;opacity:0;visibility:hidden;
      transition:opacity .25s ease;
    }
    .eco-panel-backdrop.active{opacity:1;visibility:visible;}
    .eco-side-panel{
      position:fixed;top:0;right:0;width:100%;max-width:420px;
      height:100%;background:#020617;color:#e5e7eb;z-index:1201;
      transform:translateX(100%);transition:transform .25s ease;
      display:flex;flex-direction:column;
    }
    .eco-side-panel.active{transform:translateX(0);}
    .eco-panel-header{
      display:flex;align-items:center;justify-content:space-between;
      padding:1rem 1.25rem;border-bottom:1px solid rgba(148,163,184,.35);
    }
    .eco-panel-header h3{margin:0;font-size:1rem;font-weight:600;}
    .eco-panel-close{
      border:none;background:transparent;color:#94a3b8;font-size:1.4rem;
      cursor:pointer;line-height:1;
    }
    .eco-panel-body{
      flex:1;overflow-y:auto;padding:1rem 1.25rem;
    }
    .eco-panel-footer{
      border-top:1px solid rgba(148,163,184,.35);
      padding:.85rem 1.25rem;display:flex;flex-direction:column;gap:.5rem;
    }
    .eco-panel-empty{
      font-size:.9rem;color:#64748b;margin-top:1rem;
    }
    .eco-cart-item,.eco-wishlist-item{
      display:flex;gap:.75rem;margin-bottom:1rem;align-items:flex-start;
    }
    .eco-cart-item img,.eco-wishlist-item img{
      width:64px;height:80px;object-fit:cover;border-radius:.75rem;
    }
    .eco-item-title{font-size:.9rem;font-weight:500;margin-bottom:.1rem;}
    .eco-item-meta{font-size:.8rem;color:#cbd5f5;}
    .eco-item-actions{
      margin-top:.35rem;font-size:.8rem;display:flex;gap:.9rem;color:#f97373;
    }
    .eco-item-actions button{
      border:none;background:transparent;color:inherit;padding:0;cursor:pointer;
    }
    .eco-qty-control{
      display:inline-flex;align-items:center;gap:.35rem;font-size:.8rem;
    }
    .eco-qty-control button{
      width:22px;height:22px;border-radius:999px;border:1px solid rgba(148,163,184,.7);
      background:transparent;color:#e5e7eb;cursor:pointer;
    }
    .eco-cart-total{
      display:flex;justify-content:space-between;align-items:center;
      font-size:.9rem;font-weight:600;
    }
    .eco-panel-footer button{
      border:none;border-radius:999px;padding:.65rem 1rem;font-size:.85rem;
      cursor:pointer;
    }
    .eco-btn-primary{
      background:linear-gradient(135deg,#f97316,#eab308);
      color:#020617;font-weight:600;
    }
    .eco-btn-secondary{
      background:transparent;border:1px solid rgba(148,163,184,.7);
      color:#e5e7eb;
    }
    .products .item.in-wishlist .ri-heart-line,
    .products .item.in-wishlist .ri-heart-fill{
      color:#f97373;
    }
  `;
  document.head.appendChild(style);

  ecoBackdrop = document.createElement("div");
  ecoBackdrop.id = "ecoBackdrop";
  ecoBackdrop.className = "eco-panel-backdrop";

  ecoCartPanel = document.createElement("aside");
  ecoCartPanel.id = "ecoCartPanel";
  ecoCartPanel.className = "eco-side-panel";
  ecoCartPanel.innerHTML = `
    <div class="eco-panel-header">
      <h3>Your cart</h3>
      <button class="eco-panel-close" type="button">&times;</button>
    </div>
    <div class="eco-panel-body">
      <div id="ecoCartItems"></div>
    </div>
    <div class="eco-panel-footer">
      <div class="eco-cart-total">
        <span>Total</span>
        <span id="ecoCartTotalValue">$0.00</span>
      </div>
      <button class="eco-btn-primary" type="button">Checkout</button>
      <button class="eco-btn-secondary" type="button">Clear cart</button>
    </div>
  `;

  ecoWishlistPanel = document.createElement("aside");
  ecoWishlistPanel.id = "ecoWishlistPanel";
  ecoWishlistPanel.className = "eco-side-panel";
  ecoWishlistPanel.innerHTML = `
    <div class="eco-panel-header">
      <h3>Your wishlist</h3>
      <button class="eco-panel-close" type="button">&times;</button>
    </div>
    <div class="eco-panel-body">
      <div id="ecoWishlistItems"></div>
    </div>
    <div class="eco-panel-footer">
      <button class="eco-btn-primary" type="button">Add all to cart</button>
      <button class="eco-btn-secondary" type="button">Clear wishlist</button>
    </div>
  `;

  document.body.appendChild(ecoBackdrop);
  document.body.appendChild(ecoCartPanel);
  document.body.appendChild(ecoWishlistPanel);

  // Close handlers
  ecoBackdrop.addEventListener("click", ecoClosePanels);
  ecoCartPanel
    .querySelector(".eco-panel-close")
    .addEventListener("click", ecoClosePanels);
  ecoWishlistPanel
    .querySelector(".eco-panel-close")
    .addEventListener("click", ecoClosePanels);

  // Clear buttons
  ecoCartPanel
    .querySelector(".eco-btn-secondary")
    .addEventListener("click", function () {
      ecoCart = [];
      ecoSaveState();
      ecoRenderCart();
      ecoUpdateBadges();
      showToast("Cart cleared");
    });

  ecoWishlistPanel
    .querySelector(".eco-btn-secondary")
    .addEventListener("click", function () {
      ecoWishlist = [];
      ecoSaveState();
      ecoRenderWishlist();
      ecoUpdateBadges();
      showToast("Wishlist cleared");
    });

  ecoWishlistPanel
    .querySelector(".eco-btn-primary")
    .addEventListener("click", function () {
      if (!ecoWishlist.length) return;
      ecoWishlist.forEach(function (p) {
        ecoAddToCart(p, false);
      });
      ecoWishlist = [];
      ecoSaveState();
      ecoRenderWishlist();
      ecoRenderCart();
      ecoUpdateBadges();
      showToast("Wishlist items moved to cart");
    });
}

function ecoOpenCart() {
  if (!ecoBackdrop || !ecoCartPanel) return;
  ecoBackdrop.classList.add("active");
  ecoCartPanel.classList.add("active");
  ecoWishlistPanel.classList.remove("active");
  ecoRenderCart();
}

function ecoOpenWishlist() {
  if (!ecoBackdrop || !ecoWishlistPanel) return;
  ecoBackdrop.classList.add("active");
  ecoWishlistPanel.classList.add("active");
  ecoCartPanel.classList.remove("active");
  ecoRenderWishlist();
}

function ecoClosePanels() {
  if (!ecoBackdrop || !ecoCartPanel || !ecoWishlistPanel) return;
  ecoBackdrop.classList.remove("active");
  ecoCartPanel.classList.remove("active");
  ecoWishlistPanel.classList.remove("active");
}

// ------------------------------
// 9.2 Update badges (header counts, totals)
// ------------------------------
function ecoFindHeaderCounter(iconSelector) {
  const icon = document.querySelector(iconSelector);
  if (!icon) return null;
  const li = icon.closest("li");
  if (!li) return null;
  return li.querySelector(".fly-item .item-number");
}

const headerWishlistCounter = ecoFindHeaderCounter(
  "header .header-nav .ri-heart-line"
);
const headerCartCounter = ecoFindHeaderCounter(
  "header .header-nav .ri-shopping-cart-line"
);
const headerCartTotal = document.querySelector(".cart-total");

function ecoUpdateBadges() {
  if (headerWishlistCounter) {
    headerWishlistCounter.textContent = String(ecoWishlist.length || 0);
  }
  if (headerCartCounter) {
    headerCartCounter.textContent = String(ecoCartCount());
  }
  if (headerCartTotal) {
    headerCartTotal.textContent = "$" + ecoCartTotal().toFixed(2);
  }
}

// ------------------------------
// 9.3 Core actions: add / remove / qty
// ------------------------------
function ecoToggleWishlist(product) {
  const existingIndex = ecoWishlist.findIndex(function (p) {
    return p.id === product.id;
  });
  if (existingIndex === -1) {
    ecoWishlist.push(product);
    showToast("Added to wishlist ❤");
  } else {
    ecoWishlist.splice(existingIndex, 1);
    showToast("Removed from wishlist");
  }
  ecoSaveState();
  ecoUpdateBadges();
  ecoRenderWishlist();
  ecoSyncCardsWishlistState();
}

function ecoAddToCart(product, show = true) {
  const existing = ecoCart.find(function (p) {
    return p.id === product.id;
  });
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    ecoCart.push({
      id: product.id,
      name: product.name,
      price: product.price || 0,
      image: product.image || "",
      qty: 1,
    });
  }
  ecoSaveState();
  ecoUpdateBadges();
  ecoRenderCart();
  if (show) showToast("Added to cart 🛒");
}

function ecoChangeQty(id, delta) {
  const item = ecoCart.find(function (p) {
    return p.id === id;
  });
  if (!item) return;
  item.qty = (item.qty || 1) + delta;
  if (item.qty <= 0) {
    ecoRemoveFromCart(id);
    return;
  }
  ecoSaveState();
  ecoUpdateBadges();
  ecoRenderCart();
}

function ecoRemoveFromCart(id) {
  const index = ecoCart.findIndex(function (p) {
    return p.id === id;
  });
  if (index === -1) return;
  ecoCart.splice(index, 1);
  ecoSaveState();
  ecoUpdateBadges();
  ecoRenderCart();
}

function ecoRemoveFromWishlist(id) {
  const index = ecoWishlist.findIndex(function (p) {
    return p.id === id;
  });
  if (index === -1) return;
  ecoWishlist.splice(index, 1);
  ecoSaveState();
  ecoUpdateBadges();
  ecoRenderWishlist();
  ecoSyncCardsWishlistState();
}

// ------------------------------
// 9.4 Render panels content
// ------------------------------
function ecoRenderCart() {
  const container = document.getElementById("ecoCartItems");
  const totalEl = document.getElementById("ecoCartTotalValue");
  if (!container || !totalEl) return;

  container.innerHTML = "";

  if (!ecoCart.length) {
    container.innerHTML =
      '<p class="eco-panel-empty">Your cart is empty. Start shopping!</p>';
  } else {
    ecoCart.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "eco-cart-item";
      row.dataset.id = item.id;
      row.innerHTML = `
        ${
          item.image
            ? '<img src="' + item.image + '" alt="' + item.name + '"/>'
            : ""
        }
        <div>
          <div class="eco-item-title">${item.name}</div>
          <div class="eco-item-meta">$${(item.price || 0).toFixed(
            2
          )} each</div>
          <div class="eco-qty-control">
            <button type="button" data-action="dec">-</button>
            <span>${item.qty || 1}</span>
            <button type="button" data-action="inc">+</button>
          </div>
          <div class="eco-item-actions">
            <button type="button" data-action="remove">Remove</button>
          </div>
        </div>
      `;
      container.appendChild(row);
    });

    // attach events
    container.querySelectorAll(".eco-cart-item").forEach(function (row) {
      const id = row.dataset.id;
      row.addEventListener("click", function (e) {
        const btn = e.target.closest("button");
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        if (action === "inc") {
          ecoChangeQty(id, 1);
        } else if (action === "dec") {
          ecoChangeQty(id, -1);
        } else if (action === "remove") {
          ecoRemoveFromCart(id);
        }
      });
    });
  }

  totalEl.textContent = "$" + ecoCartTotal().toFixed(2);
}

function ecoRenderWishlist() {
  const container = document.getElementById("ecoWishlistItems");
  if (!container) return;

  container.innerHTML = "";

  if (!ecoWishlist.length) {
    container.innerHTML =
      '<p class="eco-panel-empty">Your wishlist is empty.</p>';
  } else {
    ecoWishlist.forEach(function (item) {
      const row = document.createElement("div");
      row.className = "eco-wishlist-item";
      row.dataset.id = item.id;
      row.innerHTML = `
        ${
          item.image
            ? '<img src="' + item.image + '" alt="' + item.name + '"/>'
            : ""
        }
        <div>
          <div class="eco-item-title">${item.name}</div>
          <div class="eco-item-meta">$${(item.price || 0).toFixed(2)}</div>
          <div class="eco-item-actions">
            <button type="button" data-action="add">Add to cart</button>
            <button type="button" data-action="remove">Remove</button>
          </div>
        </div>
      `;
      container.appendChild(row);
    });

    container.querySelectorAll(".eco-wishlist-item").forEach(function (row) {
      const id = row.dataset.id;
      row.addEventListener("click", function (e) {
        const btn = e.target.closest("button");
        if (!btn) return;
        const action = btn.getAttribute("data-action");
        const item = ecoWishlist.find(function (p) {
          return p.id === id;
        });
        if (!item) return;
        if (action === "add") {
          ecoAddToCart(item);
        } else if (action === "remove") {
          ecoRemoveFromWishlist(id);
        }
      });
    });
  }
}

// ------------------------------
// 9.5 Hook product cards
// ------------------------------
function ecoInitProductCards() {
  const cards = document.querySelectorAll(".products .item");
  cards.forEach(function (card, index) {
    const titleEl = card.querySelector("h3 a") || card.querySelector("h3");
    const name = titleEl ? titleEl.textContent.trim() : "Product " + (index + 1);

    const priceEl = card.querySelector(".price .current");
    let price = 0;
    if (priceEl) {
      const cleaned = priceEl.textContent.replace(/,/g, "");
      const match = cleaned.match(/[\d.]+/);
      if (match) price = parseFloat(match[0]);
    }

    const imgEl =
      card.querySelector(".media img") ||
      card.querySelector(".thumbnail img") ||
      card.querySelector(".image img");
    const image = imgEl ? imgEl.getAttribute("src") : "";

    const id =
      card.dataset.productId ||
      (image ? "img-" + image : name.replace(/\s+/g, "-") + "-" + index);
    card.dataset.productId = id;

    const product = { id: id, name: name, price: price, image: image };

    // Wishlist icon on card
    let wishIcon =
      card.querySelector(".hoverable .ri-heart-line") ||
      card.querySelector(".hoverable .ri-heart-fill");
    if (wishIcon) {
      const wishBtn = wishIcon.closest("a");
      if (wishBtn) {
        wishBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          ecoToggleWishlist(product);
        });
      }
    }

    // Cart icon on card (we treat shuffle icon as 'add to cart' if no cart icon)
    let cartIcon =
      card.querySelector(".hoverable .ri-shopping-cart-line") ||
      card.querySelector(".hoverable .ri-shuffle-line");
    if (cartIcon) {
      const cartBtn = cartIcon.closest("a");
      if (cartBtn) {
        cartBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          ecoAddToCart(product);
        });
      }
    }
  });

  // sync initial wishlist state
  ecoSyncCardsWishlistState();
}

function ecoSyncCardsWishlistState() {
  const cards = document.querySelectorAll(".products .item");
  cards.forEach(function (card) {
    const id = card.dataset.productId;
    const icon =
      card.querySelector(".hoverable .ri-heart-line") ||
      card.querySelector(".hoverable .ri-heart-fill");
    const inWishlist = ecoWishlist.some(function (p) {
      return p.id === id;
    });
    if (!icon) return;
    if (inWishlist) {
      icon.classList.remove("ri-heart-line");
      icon.classList.add("ri-heart-fill");
      card.classList.add("in-wishlist");
    } else {
      icon.classList.add("ri-heart-line");
      icon.classList.remove("ri-heart-fill");
      card.classList.remove("in-wishlist");
    }
  });
}

// ------------------------------
// 9.6 Header / bottom triggers
// ------------------------------
function ecoInitTriggers() {
  const cartTriggers = [];
  const wishlistTriggers = [];

  const headerCartIcon = document.querySelector(
    "header .header-nav .ri-shopping-cart-line"
  );
  if (headerCartIcon) cartTriggers.push(headerCartIcon.closest("a"));

  const bottomCartIcon = document.querySelector(
    ".menu-bottom .ri-shopping-cart-line"
  );
  if (bottomCartIcon) cartTriggers.push(bottomCartIcon.closest("a"));

  const headerWishlistIcon = document.querySelector(
    "header .header-nav .ri-heart-line"
  );
  if (headerWishlistIcon) wishlistTriggers.push(headerWishlistIcon.closest("a"));

  const bottomWishlistIcon = document.querySelector(
    ".menu-bottom .ri-heart-line"
  );
  if (bottomWishlistIcon)
    wishlistTriggers.push(bottomWishlistIcon.closest("a"));

  cartTriggers.forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      ecoOpenCart();
    });
  });

  wishlistTriggers.forEach(function (btn) {
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      ecoOpenWishlist();
    });
  });
}

// ------------------------------
// 9.7 Init everything
// ------------------------------
document.addEventListener("DOMContentLoaded", function () {
  ecoCreatePanels();
  ecoLoadState();
  ecoInitProductCards();
  ecoUpdateBadges();
  ecoRenderCart();
  ecoRenderWishlist();
  ecoInitTriggers();
});
