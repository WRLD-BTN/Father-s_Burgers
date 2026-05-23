// Menu Items Format Guide
// Copy-paste template to add new items in config.js

/* 
=================================================================
HOW TO ADD MENU ITEMS
=================================================================

1. Open js/config.js
2. Find the menu object
3. Find the category (e.g., "Burgers")
4. Copy the template below
5. Paste and update values

=================================================================
TEMPLATE
=================================================================
*/

{
  id: 99,                                    // Unique number (no duplicates!)
  name: "Item Name",                         // Display name (2-3 words max)
  desc: "Short description",                 // One sentence description
  price: 5.99,                               // Price as number (no currency symbol)
  icon: "🍔"                                 // Emoji icon from list below
}

/*
=================================================================
EMOJI ICONS (Pick one for each item)
=================================================================

Burgers/Proteins:
🍔 Classic burger
🍖 Chicken/meat
🥓 Bacon
🌮 Wrap/taco
🥙 Filled bread
🍗 Wings

Sides:
🍟 Fries
🧅 Onion rings
🥗 Salad
🥔 Potatoes

Drinks:
🥤 Soft drink/soda
💧 Water
🧃 Juice
🥛 Milkshake
☕ Coffee

Combos:
👨‍👩‍👧‍👦 Family pack
🎉 Special/combo
🏆 Premium

=================================================================
EXAMPLE: ADDING CHICKEN BURGER
=================================================================
*/

{
  id: 6,
  name: "Chicken Burger",
  desc: "Crispy fried chicken, fresh lettuce, mayo",
  price: 5.49,
  icon: "🍖"
}

/*
=================================================================
FULL EXAMPLE IN config.js
=================================================================
*/

const CONFIG = {
  menu: {
    "Burgers": [
      { id: 1, name: "Classic Burger", desc: "Beef, lettuce, tomato, onion", price: 4.99, icon: "🍔" },
      { id: 2, name: "Chicken Burger", desc: "Crispy fried chicken, mayo", price: 5.49, icon: "🍖" },
      { id: 3, name: "Spicy Burger", desc: "Beef with jalapeños and spicy mayo", price: 5.99, icon: "🌶️" },
    ],
    "Sides": [
      { id: 11, name: "French Fries", desc: "Crispy & golden", price: 2.49, icon: "🍟" },
      { id: 12, name: "Onion Rings", desc: "Battered & deep fried", price: 2.99, icon: "🧅" },
    ],
    "Drinks": [
      { id: 21, name: "Soft Drink", desc: "Coke, Sprite, Fanta (500ml)", price: 1.99, icon: "🥤" },
      { id: 22, name: "Milkshake", desc: "Vanilla, Chocolate, Strawberry", price: 3.99, icon: "🥛" },
    ]
  }
};

/*
=================================================================
TIPS FOR GREAT MENU ITEMS
=================================================================

✓ Keep names short (2-3 words maximum)
✓ Description should be 1 sentence, max 10 words
✓ Use simple, appetizing descriptions
✓ Update prices when ingredients cost changes
✓ Use appropriate emoji icons
✓ Give each item a unique ID number
✓ Add items to logical categories

BAD: "The absolutely delicious hand-crafted gourmet burger with special sauce"
GOOD: "Classic Burger"

The description explains more!

=================================================================
ID NUMBERS - KEEP THEM ORGANIZED
=================================================================

Burgers:     1-10
Sides:       11-20
Drinks:      21-30
Combos:      31-40
Specials:    41-50

This keeps things organized and easy to manage!

=================================================================
WHEN TO UPDATE MENU
=================================================================

• New item launching → Add to menu
• Item sold out → Remove or mark unavailable
• Price increase → Update price
• Name change → Update name
• Seasonal item → Add/remove as needed

Just edit config.js and deploy!

=================================================================
TESTING NEW ITEMS
=================================================================

1. Add item to config.js
2. Save file
3. Refresh browser (F5)
4. Check if item appears in correct category
5. Add to cart and test WhatsApp message
6. Verify price and description

All done! Your menu is updated.

=================================================================
*/
