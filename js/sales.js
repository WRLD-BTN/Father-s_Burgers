/* Shared Sales Manager - Local sales tracking with daily unique IDs */

class SalesManager {
  constructor(storageKey = "adminSales") {
    this.storageKey = storageKey;
  }

  getTodayKey(date = new Date()) {
    return date.toISOString().slice(0, 10);
  }

  getCurrentTime(date = new Date()) {
    return date.toLocaleTimeString();
  }

  getDisplayDate(dateKey = this.getTodayKey()) {
    const [year, month, day] = dateKey.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString();
  }

  loadSales() {
    const stored = localStorage.getItem(this.storageKey);
    const sales = stored ? JSON.parse(stored) : [];
    return sales.map(sale => this.normalizeSale(sale));
  }

  saveSales(sales) {
    localStorage.setItem(this.storageKey, JSON.stringify(sales));
  }

  normalizeSale(sale) {
    const timestamp = sale.timestamp || Date.now();
    const dateKey = sale.dateKey || this.getTodayKey(new Date(timestamp));
    const date = sale.date || this.getDisplayDate(dateKey);

    return {
      ...sale,
      id: sale.id,
      dateKey,
      date,
      time: sale.time || new Date(timestamp).toLocaleTimeString(),
      items: Array.isArray(sale.items) ? sale.items : [],
      total: Number(sale.total) || 0,
      paymentMethod: sale.paymentMethod || "whatsapp",
      source: sale.source || "manual",
      timestamp
    };
  }

  getDailySequence(dateKey = this.getTodayKey()) {
    return this.loadSales().filter(sale => sale.dateKey === dateKey).length + 1;
  }

  generateSaleId(dateKey = this.getTodayKey()) {
    const sequence = this.getDailySequence(dateKey);
    return `${dateKey};${String(sequence).padStart(2, "0")}`;
  }

  createSaleRecord({ items, total, paymentMethod = "whatsapp", source = "online" }) {
    const timestamp = Date.now();
    const dateKey = this.getTodayKey(new Date(timestamp));

    return this.normalizeSale({
      id: this.generateSaleId(dateKey),
      dateKey,
      date: this.getDisplayDate(dateKey),
      time: this.getCurrentTime(new Date(timestamp)),
      items: (items || []).map(item => ({ ...item })),
      total: Number(total) || 0,
      paymentMethod,
      source,
      timestamp
    });
  }

  recordSale(details) {
    const sales = this.loadSales();
    const sale = this.createSaleRecord(details);
    sales.push(sale);
    this.saveSales(sales);
    return sale;
  }

  recordOnlineOrder(items, total) {
    return this.recordSale({
      items,
      total,
      paymentMethod: "whatsapp",
      source: "online"
    });
  }
}

const SalesStore = typeof window !== "undefined" ? new SalesManager() : null;

if (typeof window !== "undefined") {
  window.SalesManager = SalesStore;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SalesManager };
}
