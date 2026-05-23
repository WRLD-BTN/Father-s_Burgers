/* WhatsApp Integration - Send orders via WhatsApp API */

class WhatsAppOrder {
  constructor() {
    this.baseUrl = "https://wa.me";
  }

  // Send cart to WhatsApp
  sendOrder(cartItems) {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const message = cart.getFormattedForWhatsApp();
    const phoneNumber = CONFIG.restaurant.whatsappNumber;
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `${this.baseUrl}/${phoneNumber}?text=${encodedMsg}`;

    // Open WhatsApp in new window
    window.open(whatsappUrl, "_blank", "width=500,height=600");
  }

  // Quick contact via WhatsApp (from contact page)
  quickContact(name, message) {
    const msg = `Hi Father's Burgers! My name is ${name}. ${message}`;
    const encodedMsg = encodeURIComponent(msg);
    const whatsappUrl = `${this.baseUrl}/${CONFIG.restaurant.whatsappNumber}?text=${encodedMsg}`;
    window.open(whatsappUrl, "_blank");
  }

  // Generate WhatsApp share link for social
  getShareLink() {
    const msg = "Order delicious burgers from Father's Burgers! 🍔 Fresh, tasty, and affordable!";
    const encodedMsg = encodeURIComponent(msg);
    return `${this.baseUrl}/${CONFIG.restaurant.whatsappNumber}?text=${encodedMsg}`;
  }
}

// Initialize global WhatsApp instance
const whatsapp = new WhatsAppOrder();
