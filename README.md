# EcoWeb – Modern Abaya & Thobe Store Frontend

EcoWeb is a modern, responsive frontend template for an online **Abaya / Thobe / Modest fashion** store.  
The project is built with **HTML5, CSS3 and vanilla JavaScript**, and focuses on clean UI, mobile-first layout, and realistic e-commerce interactions (cart, wishlist, mega menu, countdown offers, etc.).

---

## ✨ Features

### 🛒 Shopping Experience

- **Interactive Cart**
  - Add products to cart directly from product cards.
  - Cart is shown in a **slide-in side panel** from the right.
  - Change quantity (+/−), remove items, clear the entire cart.
  - Cart total is calculated automatically.
  - Cart count and total are shown in the header.
  - Cart state is saved in `localStorage` (persists after refresh).

- ❤️ **Wishlist**
  - Toggle wishlist using the heart icon on each product.
  - Wishlist items are shown in a dedicated **side panel**.
  - Add wishlist items to cart with one click.
  - Move all wishlist items to cart.
  - Wishlist state is also saved in `localStorage`.

- 🔔 **Toast Notifications**
  - Small floating toast for main actions:
    - “Added to cart 🛒”
    - “Added to wishlist ❤”
    - “Removed from wishlist”, etc.

---

### 🧭 Navigation & Layout

- **Responsive header navigation**
  - Desktop navigation with mega menu.
  - **Departments dropdown** with background images for categories.
- **Off-canvas mobile menu**
  - Desktop menu and header top are automatically copied into the mobile off-canvas.
  - Mobile submenus use an accordion behavior.
- **Bottom navigation bar (mobile)**
  - Quick access to Home, Search, Wishlist, Cart via icons.
  - Cart & wishlist icons open their respective side panels.

---

### 🎨 UI & Components

- **Hero slider** using Swiper:
  - Looping slides.
  - Pagination bullets.
- **Brands strip**
  - Horizontal list of brands/logos (can be customized).
- **Product sections**
  - Main products grid.
  - Mini product list.
  - Product categories section with banners.
- **Countdown “Offer” block**
  - Persistent countdown timer stored in `localStorage`.
  - Auto-resets to a new period when finished.

- **Modern look**
  - Uses Google Fonts: `Poppins` & `Rubik`.
  - Color system defined via CSS variables.
  - Smooth hover effects on buttons, links, and product images.

---

## 🗂 Project Structure

Example structure (can be adjusted to your own setup):

```text
.
├── index.html
├── EcoWeb.css
├── EcoWeb.js
└── assets/
    ├── banner/
    ├── brands/
    ├── menu/
    └── products/
