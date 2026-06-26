/* Main Application Logic */

class App {
  constructor() {
    this.currentCategory = "Burgers"; // Default category
    this.loadMenuFromStorage(); // Load custom menu items from localStorage
    this.init();
  }

  // Load custom menu items from localStorage (added via admin)
  loadMenuFromStorage() {
  const stored = localStorage.getItem("adminMenuItems");
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Only use stored menu if items have images (not stale old data)
      const firstCategory = Object.values(parsed)[0] || [];
      if (firstCategory.length > 0 && firstCategory[0].image) {
        CONFIG.menu = parsed;
      } else {
        // Stale data — clear it and use fresh config
        localStorage.removeItem("adminMenuItems");
      }
    } catch (e) {
      console.warn("Failed to parse stored menu items, using defaults");
      localStorage.removeItem("adminMenuItems");
    }
  }
}
  
  init() {
    this.renderMenu();
    this.attachEventListeners();
    this.updateCartUI();
  }

  // Render menu items for current category
  renderMenu(category = this.currentCategory) {
    const container = document.getElementById("menuGrid");
    if (!container) return;

    const items = CONFIG.menu[category] || [];
    this.currentCategory = category;

    container.innerHTML = items.map(item => `
      <div class="menu-item" data-id="${item.id}">
        <div class="menu-item-img">${item.image ? `<img class="menu-item-image" src="${item.image}" alt="${item.name}" loading="lazy">` : `<span aria-hidden="true">${item.icon}</span>`}</div>
        <div class="menu-item-content">
          <div class="menu-item-name">${item.name}</div>
          <div class="menu-item-desc">${item.desc}</div>
          <div class="menu-item-price">${CONFIG.currency}${item.price.toFixed(2)}</div>
          <div class="menu-item-footer">
            <div class="qty-selector">
              <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
              <input type="text" class="qty-input" value="1" data-id="${item.id}" readonly>
              <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
            </div>
            <button class="add-btn" data-id="${item.id}">Add</button>
          </div>
        </div>
      </div>
    `).join("");

    this.attachMenuEventListeners();
  }

  // Render category buttons
  renderCategories() {
    const container = document.getElementById("menuCategories");
    if (!container) return;

    container.innerHTML = Object.keys(CONFIG.menu).map(cat => `
      <button class="category-btn ${cat === this.currentCategory ? "active" : ""}" data-category="${cat}">
        ${cat}
      </button>
    `).join("");

    this.attachCategoryListeners();
  }

  // Update cart display in UI
  updateCartUI() {
    const countEl = document.getElementById("cartItemsCount");
    const totalEl = document.getElementById("cartTotal");

    if (countEl) {
      const count = cart.getCount();
      countEl.textContent = `Items in cart: ${count}`;
    }

    if (totalEl) {
      const total = cart.getTotal();
      totalEl.textContent = `${CONFIG.currency}${total.toFixed(2)}`;
    }

    // Update nav cart button
    const navCart = document.getElementById("navCartBtn");
    if (navCart) {
      const count = cart.getCount();
      navCart.textContent = `Order (${count})`;
    }
  }

  // Attach menu item event listeners
  attachMenuEventListeners() {
    // Quantity minus buttons
    document.querySelectorAll(".qty-minus").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.qty-input[data-id="${id}"]`);
        const qty = Math.max(1, parseInt(input.value) - 1);
        input.value = qty;
      });
    });

    // Quantity plus buttons
    document.querySelectorAll(".qty-plus").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.dataset.id);
        const input = document.querySelector(`.qty-input[data-id="${id}"]`);
        const qty = parseInt(input.value) + 1;
        input.value = qty;
      });
    });

    // Add to cart buttons
    document.querySelectorAll(".add-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const itemId = parseInt(e.target.dataset.id);
        const qty = parseInt(document.querySelector(`.qty-input[data-id="${itemId}"]`).value);
        const items = CONFIG.menu[this.currentCategory];
        const item = items.find(i => i.id === itemId);

        if (item) {
          cart.addItem(item, qty);
          this.updateCartUI();
          this.showNotification(`${item.name} added to cart!`);
        }
      });
    });

    document.querySelectorAll('.menu-item-image').forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openImageLightbox(img.src, img.alt);
      });
    });
  }

  // Attach category filter event listeners
  attachCategoryListeners() {
    document.querySelectorAll(".category-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        this.renderMenu(e.target.dataset.category);
      });
    });
  }

  openImageLightbox(url, alt = '') {
    const overlay = document.getElementById('menuImageLightbox');
    const image = document.getElementById('menuImageLightboxImg');
    if (!overlay || !image) return;
    image.src = url;
    image.alt = alt;
    overlay.classList.add('active');
  }

  closeImageLightbox() {
    const overlay = document.getElementById('menuImageLightbox');
    const image = document.getElementById('menuImageLightboxImg');
    if (!overlay || !image) return;
    overlay.classList.remove('active');
    image.src = '';
  }

  // Attach global event listeners
  attachEventListeners() {
    // Order button
    const orderBtn = document.getElementById("orderBtn");
    if (orderBtn) {
      orderBtn.addEventListener("click", () => {
        if (cart.getCount() === 0) {
          alert("Please add items to your cart first!");
          return;
        }

        const sale = window.SalesStore
          ? window.SalesStore.recordOnlineOrder(cart.items, cart.getTotal())
          : null;

        whatsapp.sendOrder(cart.items);

        // Clear cart after sending
        setTimeout(() => {
          cart.clear();
          this.updateCartUI();
          this.showNotification(
            sale ? `Order saved as ${sale.id}. Thank you!` : "Order sent! Thank you!"
          );
        }, 500);
      });
    }

    const lightbox = document.getElementById('menuImageLightbox');
    if (lightbox) {
      lightbox.querySelector('.image-lightbox__backdrop')?.addEventListener('click', () => this.closeImageLightbox());
      lightbox.querySelector('.image-lightbox__close')?.addEventListener('click', () => this.closeImageLightbox());
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) this.closeImageLightbox();
      });
    }

    // Category filters on menu page
    this.renderCategories();

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  // Show temporary notification
  showNotification(message) {
    const notif = document.createElement("div");
    notif.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #E63946;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(() => notif.remove(), 3000);
  }

  // Clear cart
  clearCart() {
    cart.clear();
    this.updateCartUI();
    this.showNotification("Cart cleared");
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new App();
});

// Add CSS animation for notifications
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);
