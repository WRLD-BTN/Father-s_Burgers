/* Admin Authentication & State Management */

/* Admin Authentication & State Management */

class AdminManager {
  constructor() {
    this.isAuthenticated = this.checkAuth();

    // SHA-256 hash of: Revelations2026
    this.passwordHash =
      "7a20304df2e81e2e490486f9101a178287c979b23b698de250089265aedc3b17";
  }

  // Check if admin is logged in
  checkAuth() {
    return sessionStorage.getItem("adminAuth") === "true";
  }

  // SHA-256 hashing function
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  // Admin login
  async login(password) {
    const enteredHash = await this.hashPassword(password);

    if (enteredHash === this.passwordHash) {
      sessionStorage.setItem("adminAuth", "true");
      this.isAuthenticated = true;
      return true;
    }

    return false;
  }

  // Admin logout
  logout() {
    sessionStorage.removeItem("adminAuth");
    this.isAuthenticated = false;
  }

  // Redirect to login if not authenticated
  requireAuth() {
    if (!this.isAuthenticated) {
      window.location.href = "admin-login.html";
    }
  }
}

// Admin Dashboard State
class AdminDashboard {
  constructor() {
    this.sales = this.loadSales();
    this.expenses = this.loadExpenses();
    this.menuItems = JSON.parse(localStorage.getItem("adminMenuItems")) || CONFIG.menu;
    this.inventory = this.loadInventory();
  }

  // Sales tracking
  loadSales() {
    if (typeof window !== "undefined" && window.SalesStore) {
      return window.SalesStore.loadSales();
    }

    const stored = localStorage.getItem("adminSales");
    return stored ? JSON.parse(stored) : [];
  }

  saveSales() {
    if (typeof window !== "undefined" && window.SalesStore) {
      window.SalesStore.saveSales(this.sales);
      return;
    }

    localStorage.setItem("adminSales", JSON.stringify(this.sales));
  }

  // Add sale record
  addSale(items, total, paymentMethod = "whatsapp") {
    const sale = typeof window !== "undefined" && window.SalesStore
      ? window.SalesStore.recordSale({
          items,
          total,
          paymentMethod,
          source: "manual"
        })
      : {
          id: Date.now(),
          dateKey: new Date().toISOString().slice(0, 10),
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          items: items,
          total: parseFloat(total),
          paymentMethod: paymentMethod,
          source: "manual",
          timestamp: Date.now()
        };

    this.sales = this.loadSales();
    return sale;
  }

  // Expenses tracking
  loadExpenses() {
    const stored = localStorage.getItem("adminExpenses");
    return stored ? JSON.parse(stored) : [];
  }

  saveExpenses() {
    localStorage.setItem("adminExpenses", JSON.stringify(this.expenses));
  }

  // Add expense record
  addExpense(category, amount, description = "") {
    const expense = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      category: category,
      amount: parseFloat(amount),
      description: description,
      timestamp: Date.now()
    };
    this.expenses.push(expense);
    this.saveExpenses();
    return expense;
  }

  // Inventory tracking
  loadInventory() {
    const stored = localStorage.getItem("adminInventory");
    return stored ? JSON.parse(stored) : {};
  }

  saveInventory() {
    localStorage.setItem("adminInventory", JSON.stringify(this.inventory));
  }

  // Update inventory item
  updateInventoryItem(itemId, quantity, unit = "pcs") {
    if (!this.inventory[itemId]) {
      this.inventory[itemId] = { quantity: 0, unit: unit, lastUpdated: new Date().toLocaleDateString() };
    }
    this.inventory[itemId].quantity = quantity;
    this.inventory[itemId].lastUpdated = new Date().toLocaleDateString();
    this.saveInventory();
  }

  // Daily totals
  getTodayTotals() {
    const today = new Date().toLocaleDateString();
    const todaySales = this.sales.filter(s => s.date === today);
    const todayExpenses = this.expenses.filter(e => e.date === today);

    const salesTotal = todaySales.reduce((sum, s) => sum + s.total, 0);
    const expensesTotal = todayExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      date: today,
      sales: salesTotal,
      expenses: expensesTotal,
      profit: salesTotal - expensesTotal,
      transactionCount: todaySales.length,
      expenseCount: todayExpenses.length
    };
  }

  // Weekly totals
  getWeeklyTotals() {
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const weekSales = this.sales.filter(s => s.timestamp >= weekAgo);
    const weekExpenses = this.expenses.filter(e => e.timestamp >= weekAgo);

    const salesTotal = weekSales.reduce((sum, s) => sum + s.total, 0);
    const expensesTotal = weekExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      sales: salesTotal,
      expenses: expensesTotal,
      profit: salesTotal - expensesTotal,
      transactionCount: weekSales.length
    };
  }

  // Monthly totals
  getMonthlyTotals() {
    const monthAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const monthSales = this.sales.filter(s => s.timestamp >= monthAgo);
    const monthExpenses = this.expenses.filter(e => e.timestamp >= monthAgo);

    const salesTotal = monthSales.reduce((sum, s) => sum + s.total, 0);
    const expensesTotal = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      sales: salesTotal,
      expenses: expensesTotal,
      profit: salesTotal - expensesTotal,
      transactionCount: monthSales.length
    };
  }

  // Best sellers
  getBestSellers() {
    const itemSales = {};
    this.sales.forEach(sale => {
      sale.items.forEach(item => {
        if (!itemSales[item.id]) {
          itemSales[item.id] = { name: item.name, quantity: 0, revenue: 0 };
        }
        itemSales[item.id].quantity += item.quantity;
        itemSales[item.id].revenue += item.price * item.quantity;
      });
    });

    return Object.values(itemSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }

  // Update menu item
  updateMenuItem(itemId, updates) {
    for (let category in this.menuItems) {
      const item = this.menuItems[category].find(i => i.id === itemId);
      if (item) {
        Object.assign(item, updates);
        this.saveMenuItems();
        return true;
      }
    }
    return false;
  }

  // Save menu items
  saveMenuItems() {
    localStorage.setItem("adminMenuItems", JSON.stringify(this.menuItems));
    // Also update CONFIG for current session
    CONFIG.menu = this.menuItems;
  }

  // Add menu item
  addMenuItem(category, item) {
    if (!this.menuItems[category]) {
      this.menuItems[category] = [];
    }
    this.menuItems[category].push(item);
    this.saveMenuItems();
  }

  // Delete menu item
  deleteMenuItem(itemId) {
    for (let category in this.menuItems) {
      this.menuItems[category] = this.menuItems[category].filter(i => i.id !== itemId);
    }
    this.saveMenuItems();
  }

  // Export data as CSV
  exportSalesCSV() {
    let csv = "ID,Date,Time,Items,Quantity,Total,Payment Method,Source\n";
    this.sales.forEach(sale => {
      const items = sale.items.map(i => `${i.name}(x${i.quantity})`).join("; ");
      const qty = sale.items.reduce((sum, i) => sum + i.quantity, 0);
      csv += `${sale.id || ""},${sale.date},${sale.time},"${items}",${qty},${sale.total},${sale.paymentMethod},${sale.source || "manual"}\n`;
    });
    return csv;
  }

  // Export expenses as CSV
  exportExpensesCSV() {
    let csv = "Date,Time,Category,Amount,Description\n";
    this.expenses.forEach(exp => {
      csv += `${exp.date},${exp.time},${exp.category},${exp.amount},"${exp.description}"\n`;
    });
    return csv;
  }
}

// Initialize globals
const admin = new AdminManager();
const dashboard = new AdminDashboard();
