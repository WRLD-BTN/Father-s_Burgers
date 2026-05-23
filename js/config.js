/* Configuration - Restaurant settings & menu data */

const CONFIG = {
  // Restaurant Contact
  restaurant: {
    name: "FATHER'S BURGERS",
    whatsappNumber: "263716512214", // Updated to target WhatsApp number (country code + number, no +)
    email: "order@fathersburgers.co.zw",
    phone: "+263 71 651 2214",
    address: "123 Main Street, Harare, Zimbabwe",
    hours: "Mon-Fri: 11am - 10pm | Sat: 12pm - 11pm | Sun: 12pm - 9pm"
  },

  // Menu categories & items (easily scalable)
  menu: {
    "Burgers": [
      { id: 1, name: "Classic Burger", desc: "Beef patty, lettuce, tomato, onion", price: 4.99, icon: "🍔" },
      { id: 2, name: "Cheese Burger", desc: "Beef patty with melted cheddar", price: 5.49, icon: "🧀" },
      { id: 3, name: "Double Deluxe", desc: "Two beef patties, bacon, cheese", price: 7.99, icon: "🍔" },
      { id: 4, name: "Spicy Burger", desc: "Beef patty with jalapeños & spicy mayo", price: 5.99, icon: "🌶️" },
      { id: 5, name: "Bacon Burger", desc: "Beef patty, crispy bacon, cheddar", price: 6.99, icon: "🥓" },
    ],
    "Sides": [
      { id: 11, name: "French Fries", desc: "Crispy & golden", price: 2.49, icon: "🍟" },
      { id: 12, name: "Onion Rings", desc: "Battered & deep fried", price: 2.99, icon: "🧅" },
      { id: 13, name: "Coleslaw", desc: "Fresh cabbage salad", price: 1.99, icon: "🥗" },
      { id: 14, name: "Fried Chicken Wings", desc: "6 pieces, honey garlic", price: 5.99, icon: "🍗" },
    ],
    "Drinks": [
      { id: 21, name: "Soft Drink", desc: "Coke, Fanta, Sprite (500ml)", price: 1.99, icon: "🥤" },
      { id: 22, name: "Bottled Water", desc: "Still or sparkling (500ml)", price: 1.49, icon: "💧" },
      { id: 23, name: "Juice", desc: "Orange, Mango, Pineapple (500ml)", price: 2.49, icon: "🧃" },
      { id: 24, name: "Milkshake", desc: "Vanilla, Chocolate, Strawberry", price: 3.99, icon: "🥛" },
    ],
    "Combos": [
      { id: 31, name: "Burger Combo", desc: "Burger + Fries + Drink", price: 8.99, icon: "🍔" },
      { id: 32, name: "Family Pack", desc: "2 Burgers + 2 Sides + 2 Drinks", price: 16.99, icon: "👨‍👩‍👧‍👦" },
    ]
  },

  // Currency & formatting
  currency: "$",
  taxRate: 0.05, // 5% tax if needed

  // Contact form endpoint (FormSpree)
  formspreeId: "YOUR_FORMSPREE_ID", // Update with actual ID
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
