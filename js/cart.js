/* Cart Management - Handle add/remove items, totals, persistence */

class Cart {
  constructor() {
    this.items = this.loadFromStorage();
  }

  // Load cart from localStorage
  loadFromStorage() {
    const stored = localStorage.getItem("fathersBurgersCart");
    return stored ? JSON.parse(stored) : [];
  }

  // Save cart to localStorage
  save() {
    localStorage.setItem("fathersBurgersCart", JSON.stringify(this.items));
  }

  // Add or update item in cart
  addItem(item, quantity = 1) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
    }
    this.save();
  }

  // Remove item from cart
  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    this.save();
  }

  // Update item quantity
  updateQuantity(itemId, quantity) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) this.removeItem(itemId);
      else this.save();
    }
  }

  // Get total price
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Get item count
  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Clear entire cart
  clear() {
    this.items = [];
    this.save();
  }

  // Get cart as formatted string for WhatsApp
  getFormattedForWhatsApp() {
    let msg = "🍽️ *NEW ORDER - FATHER'S BURGERS*\n\n";
    this.items.forEach(item => {
      msg += `• ${item.name} x${item.quantity} = ${CONFIG.currency}${(item.price * item.quantity).toFixed(2)}\n`;
    });
    msg += `\n*Total: ${CONFIG.currency}${this.getTotal().toFixed(2)}*\n\n`;
    msg += `📱 Please confirm order receipt`;
    return msg;
  }
}

// Initialize global cart instance
const cart = new Cart();
