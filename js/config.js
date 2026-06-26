/* Configuration - Restaurant settings & menu data */

const CONFIG = {
  restaurant: {
    name: "FATHER'S BURGERS",
    whatsappNumber: "263716512214",
    email: "order@fathersburgers.co.zw",
    phone: "+263 71 651 2214",
    address: "Main Campus Fse Gate, Harare, Zimbabwe",
    hours: "Mon-Fri: 11am - 10pm | Sat: 12pm - 11pm | Sun: 12pm - 9pm"
  },
  menu: {
    "Burgers": [
      { id: 1, name: "Classic Burger", desc: "Beef patty, lettuce, tomato, onion", price: 4.99, icon: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format" },
      { id: 2, name: "Cheese Burger", desc: "Beef patty with melted cheddar", price: 5.49, icon: "🧀", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop&auto=format" },
      { id: 3, name: "Double Deluxe", desc: "Two beef patties, bacon, cheese", price: 7.99, icon: "🍔", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=300&fit=crop&auto=format" },
      { id: 4, name: "Spicy Burger", desc: "Beef patty with jalapeños & spicy mayo", price: 5.99, icon: "🌶️", image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop&auto=format" },
      { id: 5, name: "Bacon Burger", desc: "Beef patty, crispy bacon, cheddar", price: 6.99, icon: "🥓", image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop&auto=format" },
    ],
    "Sides": [
      { id: 11, name: "French Fries", desc: "Crispy & golden", price: 2.49, icon: "🍟", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format" },
      { id: 12, name: "Onion Rings", desc: "Battered & deep fried", price: 2.99, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop&auto=format" },
      { id: 13, name: "Coleslaw", desc: "Fresh cabbage salad", price: 1.99, icon: "🥗", image: "https://images.unsplash.com/photo-1621508638997-e30808c10653?w=400&h=300&fit=crop&auto=format" },
      { id: 14, name: "Fried Chicken Wings", desc: "6 pieces, honey garlic", price: 5.99, icon: "🍗", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop&auto=format" },
    ],
    "Drinks": [
      { id: 21, name: "Soft Drink", desc: "Coke, Fanta, Sprite (500ml)", price: 1.99, icon: "🥤", image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=300&fit=crop&auto=format" },
      { id: 22, name: "Bottled Water", desc: "Still or sparkling (500ml)", price: 1.49, icon: "💧", image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop&auto=format" },
      { id: 23, name: "Juice", desc: "Orange, Mango, Pineapple (500ml)", price: 2.49, icon: "🧃", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&auto=format" },
      { id: 24, name: "Milkshake", desc: "Vanilla, Chocolate, Strawberry", price: 3.99, icon: "🥛", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop&auto=format" },
    ],
    "Combos": [
      { id: 31, name: "Burger Combo", desc: "Burger + Fries + Drink", price: 8.99, icon: "🍔", image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=300&fit=crop&auto=format" },
      { id: 32, name: "Family Pack", desc: "2 Burgers + 2 Sides + 2 Drinks", price: 16.99, icon: "👨‍👩‍👧‍👦", image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=300&fit=crop&auto=format" },
    ]
  },
  currency: "$",
  taxRate: 0.05,
  formspreeId: "YOUR_FORMSPREE_ID",
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
