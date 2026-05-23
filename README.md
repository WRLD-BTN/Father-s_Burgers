# Father's Burgers - Restaurant Website

A clean, scalable restaurant website for Father's Burgers in Zimbabwe with WhatsApp ordering integration.

## 🎨 Features

- **Responsive Design** - Works on all devices (mobile, tablet, desktop)
- **Color Scheme** - White, Red (#E63946), Orange (#F77F00)
- **WhatsApp Ordering** - Direct order integration via WhatsApp Click-to-Chat API
- **Menu Management** - Easy to update menu items in `js/config.js`
- **Cart System** - Persistent local storage for user cart
- **Contact Forms** - Integrated with FormSpree for email submissions
- **Gallery** - Lightbox gallery with keyboard navigation
- **Zero Backend** - Completely static site, ready to deploy

## 📁 Project Structure

```
Father's Burgers/
├── index.html                 # Main landing & menu page
├── css/
│   └── styles.css            # Main stylesheet (white, red, orange theme)
├── js/
│   ├── config.js             # Configuration & menu data
│   ├── cart.js               # Shopping cart functionality
│   ├── whatsapp.js           # WhatsApp integration
│   └── main.js               # Core app logic
├── pages/
│   ├── contact.html          # Contact & inquiry form
│   └── gallery.html          # Food gallery with lightbox
├── images/
│   └── logo.png              # Logo placeholder (update with your logo)
└── README.md                 # This file
```

## 🚀 Quick Start

1. **Update Configuration** (`js/config.js`):
   - Replace `263771234567` with your WhatsApp number (country code + number, no +)
   - Update `formspreeId` with your FormSpree ID (https://formspree.io)
   - Update restaurant details (email, phone, address, hours)

2. **Add Your Logo**:
   - Place your logo image in `images/logo.png`
   - The site displays "FATHER'S BURGERS" as fallback alt text

3. **Update Menu** (in `js/config.js`):
   ```javascript
   "Burgers": [
     { id: 1, name: "Burger Name", desc: "Description", price: 4.99, icon: "🍔" },
     // Add more items...
   ]
   ```
   - Categories are automatically created from menu keys
   - Change icons, names, prices easily

4. **Deploy to Netlify**:
   - Push to GitHub or zip the folder
   - Drag & drop into Netlify, or connect GitHub repo
   - Custom domain support available

## 🛠 How It Works

### WhatsApp Ordering Flow
1. Customer selects items and quantities
2. Clicks "Send Order via WhatsApp"
3. Pre-formatted message opens in WhatsApp
4. Customer sends message to your business number
5. Order lands in WhatsApp chat ready to confirm

### Menu System
- Menu is defined in `js/config.js` as simple JavaScript objects
- Add/remove categories by adding/removing keys
- All category buttons are auto-generated
- No database needed - fully scalable

### Cart Persistence
- Cart saved to browser's localStorage
- Cart persists across page reloads
- Cleared after successful WhatsApp order

## 📝 Configuration Guide

### Update Restaurant Details
Edit `js/config.js`:
```javascript
restaurant: {
  name: "FATHER'S BURGERS",
  whatsappNumber: "263771234567",  // Your WhatsApp number
  email: "your-email@example.com",
  phone: "+263 77 1234 567",
  address: "Your Address, City",
  hours: "Mon-Fri: 11am - 10pm | Sat: 12pm - 11pm | Sun: 12pm - 9pm"
}
```

### Add FormSpree Integration
1. Go to https://formspree.io
2. Create new form, get your Form ID
3. Update in `pages/contact.html`:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Add Menu Items
In `js/config.js`, add items under any category:
```javascript
"Your Category": [
  { 
    id: unique_number, 
    name: "Item Name", 
    desc: "Short description", 
    price: 5.99, 
    icon: "🍴"  // Any emoji
  },
]
```

## 🎯 Scalability Features

- **Modular JS** - Each feature in separate file (`cart.js`, `whatsapp.js`, etc.)
- **Configuration-driven** - Menu, prices, settings in `config.js`
- **Easy to extend** - Add new pages, categories, or features without touching core logic
- **LocalStorage persistence** - Cart survives page reloads
- **Responsive grid** - Menu automatically adapts to screen size

## 🌐 Deployment Options

### Netlify (Recommended)
- Free tier perfect for small restaurants
- Drag & drop deploy or GitHub integration
- Custom domain support
- Forms with FormSpree for emails

### GitHub Pages
- Free hosting
- Update via git push
- Limitations: no form handling

### Other Hosts
- Vercel, Firebase, AWS S3, any static host
- Just upload all files as-is

## 📞 Support Features

- **Direct WhatsApp** - Customer service link always visible
- **Contact Form** - Email inquiries via FormSpree
- **Phone & Hours** - Easy to find contact info
- **Map Placeholder** - Room to add embedded map later

## 🎨 Customization

### Change Colors
Edit `:root` in `css/styles.css`:
```css
--primary-red: #E63946;
--secondary-orange: #F77F00;
--accent-dark: #D62828;
```

### Add More Pages
1. Create `pages/yourpage.html`
2. Copy header/footer from existing pages
3. Link from navigation in `index.html`

### Mobile-First Design
- Breakpoints at 768px and 480px
- All layouts tested on mobile
- Touch-friendly buttons and spacing

## 📋 Checklist Before Launch

- [ ] Update WhatsApp number in `config.js`
- [ ] Set up FormSpree account and update Form ID
- [ ] Add your logo to `images/logo.png`
- [ ] Update restaurant details (address, hours, etc.)
- [ ] Customize menu items and prices
- [ ] Test cart and WhatsApp order flow
- [ ] Deploy to Netlify or hosting provider
- [ ] Set up custom domain

## 💡 Tips

- Keep menu items concise - describe in 1-2 words
- Use emoji icons consistently
- Update opening hours before major holidays
- Add special offers in hero section
- Monitor WhatsApp messages regularly
- Update photos in gallery regularly

## 📜 License

Free to use for your restaurant. No attribution required.

---

**Need help?** Update the config values and deploy!
Made with ❤️ for Father's Burgers
