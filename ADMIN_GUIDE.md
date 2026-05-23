# 🔐 Admin Panel - Complete Guide

## Access & Authentication

### Admin Login
- **URL:** `pages/admin-login.html`
- **Password:** `Revelations2026`
- Or click **🔐 Admin** link in navigation

**Security Note:** This password is stored in code for now. For production, use secure backend authentication.

---

## Admin Dashboard Features

### 1️⃣ Dashboard Overview (Default View)

Shows real-time business metrics:

**Today's Stats:**
- 💰 Sales revenue
- 💳 Expenses
- 📈 Net profit
- 📊 Number of orders/expenses

**Weekly & Monthly:**
- Sales, expenses, and profit trends
- Transaction counts

**Best Sellers:**
- Top 5 best-selling items
- Quantity sold & revenue generated
- Automatically updated from sales data

**Quick Actions:**
- Record Sale
- Add Expense
- Edit Menu
- Export Sales Data

---

### 2️⃣ Menu Management 🍔

**Edit Menu Items:**
- Add new items to any category
- Edit prices on existing items
- Delete items
- Change descriptions and icons

**Add New Item:**
1. Select category (Burgers, Sides, Drinks, Combos, or create Specials)
2. Enter item name
3. Set price
4. Choose emoji icon
5. Write description
6. Click "Add Item"

**Edit Price:**
- Click "Edit" on any item
- Enter new price
- Automatically saves

**Delete Item:**
- Click "Delete" to remove from menu
- Cannot be undone

**Note:** Menu changes appear instantly on the main website!

---

### 3️⃣ Daily Sales 💰

**Record a Sale:**
1. Enter sale amount (required)
2. Select payment method:
   - WhatsApp
   - Cash
   - Mobile Money
   - Card
3. (Optional) List items sold: "2x Burger, 1x Fries"
4. Click "Record Sale"

**Today's Sales List:**
- Shows all sales recorded today
- Time of transaction
- Payment method
- Total for the day
- Delete option for corrections

**Features:**
- Sale totals update automatically
- Syncs with dashboard metrics
- Includes in reports

---

### 4️⃣ Expenses 💳

**Track All Business Expenses:**

**Expense Categories:**
- Ingredients/Food
- Supplies
- Rent/Lease
- Utilities
- Wages/Staff
- Maintenance
- Marketing
- Transport
- Other

**Add Expense:**
1. Select category
2. Enter amount
3. Write description (optional)
4. Click "Add Expense"

**Today's Expenses List:**
- Time & category
- Amount & description
- Delete option for corrections

**Profit Calculation:**
- Profit = Sales - Expenses
- Automatically calculated on dashboard
- Daily, weekly, and monthly totals

---

### 5️⃣ Inventory Management 📦

**Track Stock Levels:**

**Update Stock:**
1. Select menu item
2. Enter quantity
3. Choose unit:
   - Pieces (pcs)
   - Kilogram (kg)
   - Liter
   - Box
   - Case
4. Click "Update Stock"

**Current Inventory:**
- Shows all items with quantities
- Last updated date
- Unit type

**Use Case:**
- Track ingredient levels
- Monitor supplies
- Plan ordering
- Prevent stockouts

---

### 6️⃣ Reports & Analytics 📈

**Financial Summary:**

**Today's Summary:**
- Date
- Total sales
- Total expenses
- Net profit
- Transaction count

**Weekly Summary (Last 7 Days):**
- Weekly sales trend
- Weekly expenses
- Weekly profit
- Number of transactions

**Monthly Summary (Last 30 Days):**
- Monthly sales total
- Monthly expenses
- Monthly profit
- Transaction count

**Export Data:**

**Export as CSV:**
- Sales CSV - for spreadsheet analysis
- Expenses CSV - detailed expense records
- Use for: accounting, tax prep, analysis

**Clear Data:**
- ⚠️ Warning: Permanently deletes all sales and expenses
- Use with extreme caution!
- Good for: testing, or at year-end archive

---

## 💡 Admin Tips & Best Practices

### Daily Workflow
1. **Morning:** Check inventory levels
2. **Throughout Day:** Record sales and expenses
3. **Evening:** Review daily totals
4. **Weekly:** Export reports for analysis

### Menu Management
- Update prices when ingredients cost changes
- Add seasonal items to "Specials" category
- Keep item names short (2-3 words)
- Use accurate descriptions for customers

### Expense Tracking
- Record all expenses for accurate profit calculation
- Be specific in descriptions (helps with tax records)
- Categories help organize spending patterns
- Review expenses weekly to identify cost-saving areas

### Sales Recording
- Record sales as they happen (more accurate)
- Bulk record at end of day if tracking individually is hard
- Note payment methods for cash flow analysis
- List items sold (helps with inventory tracking)

### Reports & Analysis
- Review weekly trends to spot patterns
- Compare weekly profits to identify good/bad weeks
- Export monthly data for tax preparation
- Use best sellers to guide inventory ordering

---

## 🔒 Security & Data

### Password Protection
- Admin panel requires password: **Revelations2026**
- Password stored in JavaScript (frontend only)
- **Production Recommendation:** Move to secure backend with database

### Data Storage
- All data stored in browser's localStorage
- Data persists across page reloads
- Data clears if browser cache is cleared
- **Backup Recommendation:** Export data weekly to CSV

### Session Security
- Admin login expires when browser session ends
- Logout clears authentication
- Open multiple admin pages in same browser = same session

---

## 🆘 Troubleshooting

### "Password incorrect"
- Make sure you typed exactly: `Revelations2026`
- Try again (case-sensitive)

### Sales/expenses not showing
- Refresh page (F5)
- Check if you're logged in
- Make sure data was saved

### Data disappeared
- Check browser localStorage hasn't been cleared
- Try exporting data first before clearing cache

### Menu items not updating
- Refresh main website (index.html) to see changes
- Clear browser cache if changes don't appear

### Export not working
- Check browser allows downloads
- Verify downloads folder exists
- Try different browser if issue persists

---

## 📋 Data Format Reference

### Sales Record Fields
```
{
  id: timestamp,
  date: "MM/DD/YYYY",
  time: "HH:MM:SS AM/PM",
  items: [{name, quantity, price}],
  total: amount,
  paymentMethod: "whatsapp|cash|mobile_money|card",
  timestamp: milliseconds
}
```

### Expense Record Fields
```
{
  id: timestamp,
  date: "MM/DD/YYYY",
  time: "HH:MM:SS AM/PM",
  category: "category name",
  amount: amount,
  description: "text",
  timestamp: milliseconds
}
```

### Inventory Record Fields
```
{
  quantity: number,
  unit: "pcs|kg|liter|box|case",
  lastUpdated: "MM/DD/YYYY"
}
```

---

## 🎯 Next Steps

1. **First Login:** Change password in `js/admin.js` to something secure
2. **Daily Use:** Record sales and expenses
3. **Weekly:** Review reports and export data
4. **Monthly:** Analyze trends and plan inventory

---

## ⚡ Quick Reference

| Feature | Access | Description |
|---------|--------|-------------|
| Dashboard | Home tab | Overview metrics |
| Menu Edit | 🍔 tab | Add/edit/delete items |
| Record Sale | 💰 tab | Log transactions |
| Add Expense | 💳 tab | Track costs |
| Inventory | 📦 tab | Manage stock levels |
| Reports | 📈 tab | View analytics & export |

---

## 🚀 Advanced Features You Can Add

- Profit margin calculation per item
- Inventory alerts (low stock warnings)
- Customer receipt generation
- Email daily reports to owner
- Mobile app for on-the-go recording
- Multi-user admin accounts
- Backup to cloud storage

---

**Remember:** Keep your password safe and export data regularly!

For questions, refer to config files or contact development team.
