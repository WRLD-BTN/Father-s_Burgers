/* Admin Dashboard JavaScript - All functionality */

// Check authentication on page load
document.addEventListener("DOMContentLoaded", () => {
  admin.requireAuth();
  initializeDashboard();
});

// Initialize dashboard
function initializeDashboard() {
  updateDashboard();
  renderMenuItems();
  renderSales();
  renderExpenses();
  renderInventory();
  updateReports();
  attachEventListeners();
}

// Attach all event listeners
function attachEventListeners() {
  // Add menu item form
  document.getElementById("addMenuForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewMenuItem();
  });

  // Record sale form
  document.getElementById("recordSaleForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    recordSale();
  });

  // Add expense form
  document.getElementById("addExpenseForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    addExpense();
  });

  // Update inventory form
  document.getElementById("updateInventoryForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    updateInventory();
  });

  const newItemImageInput = document.getElementById("newItemImage");
  if (newItemImageInput) {
    newItemImageInput.addEventListener("change", handleNewItemImagePreview);
  }
}

// ===== DASHBOARD FUNCTIONS =====

function updateDashboard() {
  const today = dashboard.getTodayTotals();
  const weekly = dashboard.getWeeklyTotals();
  const monthly = dashboard.getMonthlyTotals();

  // Today's stats
  document.getElementById("todaySales").textContent = `$${today.sales.toFixed(2)}`;
  document.getElementById("todayOrders").textContent = `${today.transactionCount} orders`;
  document.getElementById("todayExpenses").textContent = `$${today.expenses.toFixed(2)}`;
  document.getElementById("todayExpenseCount").textContent = `${today.expenseCount} expenses`;
  document.getElementById("todayProfit").textContent = `$${today.profit.toFixed(2)}`;

  // Weekly stats
  document.getElementById("weeklySales").textContent = `$${weekly.sales.toFixed(2)}`;
  document.getElementById("weeklyOrders").textContent = `${weekly.transactionCount} orders`;
  document.getElementById("weeklyProfit").textContent = `$${weekly.profit.toFixed(2)}`;

  // Monthly stats
  document.getElementById("monthlySales").textContent = `$${monthly.sales.toFixed(2)}`;
  document.getElementById("monthlyOrders").textContent = `${monthly.transactionCount} orders`;

  // Best sellers
  renderBestSellers();
}

function renderBestSellers() {
  const best = dashboard.getBestSellers();
  const container = document.getElementById("bestSellers");

  if (best.length === 0) {
    container.innerHTML = "<p style='color: #999;'>No sales data yet</p>";
    return;
  }

  container.innerHTML = best.map((item, idx) => `
    <div style="padding: 1rem; border-bottom: 1px solid #EEEEEE; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 600; color: #1A1A1A;">#${idx + 1} ${item.name}</div>
        <div style="font-size: 0.85rem; color: #666;">Sold: ${item.quantity} | Revenue: $${item.revenue.toFixed(2)}</div>
      </div>
      <div style="font-size: 1.5rem; color: #E63946; font-weight: 700;">${item.revenue.toFixed(2)}</div>
    </div>
  `).join("");
}

// ===== MENU MANAGEMENT =====

function renderMenuItems() {
  const container = document.getElementById("menuItemsList");
  let html = "";

  for (let category in dashboard.menuItems) {
    html += `<h4 style="color: #E63946; margin-top: 2rem; margin-bottom: 1rem;">${category}</h4>`;
    
    dashboard.menuItems[category].forEach(item => {
      const imgHtml = item.image ? `<img src="${item.image}" alt="${item.name}" loading="lazy" width="72" height="72" style="width:72px;height:72px;object-fit:cover;border-radius:8px;">` : `<span aria-hidden="true">${item.icon}</span>`;
      html += `
        <div class="menu-item-card" data-id="${item.id}">
          <div class="menu-item-header">
            <div>
              <div class="menu-item-name">${item.name}</div>
              <div style="color: #666; font-size: 0.9rem;">${item.desc}</div>
            </div>
            <div class="menu-item-icon">${imgHtml}</div>
          </div>
          <div class="menu-item-details">
            <div class="detail-item">
              <div class="detail-label">Price</div>
              <div class="detail-value">$${item.price.toFixed(2)}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Category</div>
              <div class="detail-value">${category}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">ID</div>
              <div class="detail-value">${item.id}</div>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button class="btn btn-secondary btn-small" onclick="editMenuItem(${item.id})">✏️ Edit</button>
            <button class="btn btn-danger btn-small" onclick="deleteMenuItem(${item.id})">🗑️ Delete</button>
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = html;
  // Attach drag & drop handlers to each menu-item-card for image updates
  document.querySelectorAll('.menu-item-card').forEach(card => {
    const id = parseInt(card.getAttribute('data-id'));
    // support dropping files from desktop
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      card.style.background = '#FFF7F7';
    });
    card.addEventListener('dragleave', (e) => {
      card.style.background = '';
    });
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.style.background = '';
      const file = e.dataTransfer.files && e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        handleMenuImageDrop(id, file);
      } else {
        showAlert('❌ Please drop an image file', 'error', 'menu');
      }
    });
    // also support clicking the card to choose a file
    card.addEventListener('click', (e) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        const f = input.files[0];
        if (f) handleMenuImageDrop(id, f);
      };
      input.click();
    });
  });
}

function addNewMenuItem() {
  const category = document.getElementById("newCategory").value;
  const name = document.getElementById("newItemName").value;
  const price = parseFloat(document.getElementById("newItemPrice").value);
  const icon = document.getElementById("newItemIcon").value;
  const desc = document.getElementById("newItemDesc").value;
  const imageFile = document.getElementById("newItemImage")?.files?.[0] || null;

  if (!category || !name || !price || !icon || !desc) {
    alert("All fields required!");
    return;
  }

  // Get next ID
  let nextId = 1;
  for (let cat in dashboard.menuItems) {
    dashboard.menuItems[cat].forEach(item => {
      if (item.id >= nextId) nextId = item.id + 1;
    });
  }

  const newItem = { id: nextId, name, desc, price, icon };

  if (imageFile) {
    uploadImageFile(imageFile).then(url => {
      newItem.image = url;
      dashboard.addMenuItem(category, newItem);
      showAlert("✅ Item added successfully with image!", "success", "menu");
      document.getElementById("addMenuForm").reset();
      renderMenuItems();
      updateDashboard();
    }).catch(err => {
      console.error(err);
      showAlert('❌ Image upload failed', 'error', 'menu');
    });
  } else {
    dashboard.addMenuItem(category, newItem);
    showAlert("✅ Item added successfully!", "success", "menu");
    document.getElementById("addMenuForm").reset();
    clearNewItemImagePreview();
    renderMenuItems();
    updateDashboard();
  }
}

// Handle image file drop to update existing menu item
function handleMenuImageDrop(itemId, file) {
  if (!file) return;
  uploadImageFile(file).then(url => {
    dashboard.updateMenuItem(itemId, { image: url });
    showAlert('✅ Image updated for item', 'success', 'menu');
    renderMenuItems();
    updateDashboard();
  }).catch(err => {
    console.error(err);
    showAlert('❌ Image upload failed', 'error', 'menu');
  });
}

function readImageFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

function uploadImageFile(file) {
  const fd = new FormData();
  fd.append('image', file);
  return fetch('/upload-image', { method: 'POST', body: fd })
    .then(res => {
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    })
    .then(data => data.url)
    .catch(() => {
      // If the upload endpoint is unavailable, store the image locally as a data URL.
      return readImageFileAsDataURL(file);
    });
}

function clearNewItemImagePreview() {
  const previewWrapper = document.getElementById("newItemImagePreviewWrapper");
  const preview = document.getElementById("newItemImagePreview");
  if (preview) {
    preview.src = "";
    preview.alt = "";
  }
  if (previewWrapper) {
    previewWrapper.classList.add("hidden");
  }
}

function handleNewItemImagePreview() {
  const input = document.getElementById("newItemImage");
  const preview = document.getElementById("newItemImagePreview");
  const previewWrapper = document.getElementById("newItemImagePreviewWrapper");
  if (!input || !preview || !previewWrapper) return;

  const file = input.files?.[0];
  if (!file || !file.type.startsWith("image/")) {
    clearNewItemImagePreview();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.alt = file.name;
    previewWrapper.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function editMenuItem(itemId) {
  const item = findMenuItem(itemId);
  if (!item) return;

  const newPrice = prompt(`Edit price for "${item.name}" (Current: $${item.price}):`);
  if (newPrice === null) return;

  const price = parseFloat(newPrice);
  if (isNaN(price) || price < 0) {
    alert("Invalid price!");
    return;
  }

  dashboard.updateMenuItem(itemId, { price });
  showAlert("✅ Item updated!", "success", "menu");
  renderMenuItems();
}

function deleteMenuItem(itemId) {
  const item = findMenuItem(itemId);
  if (!item) return;

  if (!confirm(`Delete "${item.name}"? This cannot be undone.`)) return;

  dashboard.deleteMenuItem(itemId);
  showAlert("✅ Item deleted!", "success", "menu");
  renderMenuItems();
}

function findMenuItem(itemId) {
  for (let category in dashboard.menuItems) {
    const item = dashboard.menuItems[category].find(i => i.id === itemId);
    if (item) return item;
  }
  return null;
}

// ===== SALES TRACKING =====

function recordSale() {
  const amount = parseFloat(document.getElementById("saleAmount").value);
  const paymentMethod = document.getElementById("paymentMethod").value;
  const itemsSold = document.getElementById("itemsSold").value;

  if (!amount || amount <= 0) {
    showAlert("❌ Invalid amount!", "error", "sales");
    return;
  }

  const mockItems = itemsSold ? parseItemsString(itemsSold) : [{ name: "Various", quantity: 1, price: amount }];
  dashboard.addSale(mockItems, amount, paymentMethod);

  showAlert("✅ Sale recorded successfully!", "success", "sales");
  document.getElementById("recordSaleForm").reset();
  renderSales();
  updateDashboard();
}

function renderSales() {
  const today = new Date().toLocaleDateString();
  const todaySales = dashboard.sales.filter(s => s.date === today);
  const container = document.getElementById("salesList");

  if (todaySales.length === 0) {
    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">No sales recorded yet</div>';
    return;
  }

  const totalToday = todaySales.reduce((sum, s) => sum + s.total, 0);

  container.innerHTML = todaySales.map(sale => `
    <div style="display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr 1fr 0.5fr; gap: 1rem; align-items: center;">
      <div style="font-weight: 700; color: #1A1A1A;">${sale.id || "-"}</div>
      <div>${sale.time}</div>
      <div style="color: #E63946; font-weight: 600;">$${sale.total.toFixed(2)}</div>
      <div><span class="badge badge-primary">${sale.paymentMethod}</span></div>
      <div><span class="badge ${sale.source === "online" ? "badge-success" : "badge-secondary"}">${sale.source || "manual"}</span></div>
      <div style="font-size: 0.9rem; color: #666;">${sale.items.length} items</div>
      <button class="btn btn-danger btn-small" onclick="deleteSale(${JSON.stringify(sale.id)})">🗑️</button>
    </div>
  `).join("");
}

function deleteSale(saleId) {
  if (!confirm("Delete this sale?")) return;
  dashboard.sales = dashboard.sales.filter(s => s.id !== saleId);
  dashboard.saveSales();
  showAlert("✅ Sale deleted!", "success", "sales");
  renderSales();
  updateDashboard();
}

// ===== EXPENSES TRACKING =====

function addExpense() {
  const category = document.getElementById("expenseCategory").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const description = document.getElementById("expenseDesc").value;

  if (!category || !amount || amount <= 0) {
    showAlert("❌ Invalid data!", "error", "expenses");
    return;
  }

  dashboard.addExpense(category, amount, description);
  showAlert("✅ Expense recorded!", "success", "expenses");
  document.getElementById("addExpenseForm").reset();
  renderExpenses();
  updateDashboard();
}

function renderExpenses() {
  const today = new Date().toLocaleDateString();
  const todayExpenses = dashboard.expenses.filter(e => e.date === today);
  const container = document.getElementById("expensesList");

  if (todayExpenses.length === 0) {
    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">No expenses recorded yet</div>';
    return;
  }

  container.innerHTML = todayExpenses.map(exp => `
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 2fr 0.5fr; gap: 1rem;">
      <div>${exp.time}</div>
      <div><span class="badge badge-secondary">${exp.category}</span></div>
      <div style="color: #E63946; font-weight: 600;">$${exp.amount.toFixed(2)}</div>
      <div style="font-size: 0.9rem; color: #666;">${exp.description || "-"}</div>
      <button class="btn btn-danger btn-small" onclick="deleteExpense(${exp.id})">🗑️</button>
    </div>
  `).join("");
}

function deleteExpense(expenseId) {
  if (!confirm("Delete this expense?")) return;
  dashboard.expenses = dashboard.expenses.filter(e => e.id !== expenseId);
  dashboard.saveExpenses();
  showAlert("✅ Expense deleted!", "success", "expenses");
  renderExpenses();
  updateDashboard();
}

// ===== INVENTORY MANAGEMENT =====

function renderInventory() {
  const container = document.getElementById("inventoryList");
  const selector = document.getElementById("inventoryItem");
  
  // Update item selector
  const items = [];
  for (let cat in dashboard.menuItems) {
    dashboard.menuItems[cat].forEach(item => {
      items.push({ id: item.id, name: `${item.name} (${cat})` });
    });
  }

  selector.innerHTML = '<option value="">Select Item...</option>' + 
    items.map(i => `<option value="${i.id}">${i.name}</option>`).join("");

  // Render inventory table
  if (Object.keys(dashboard.inventory).length === 0) {
    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #999;">No inventory records yet</div>';
    return;
  }

  const html = '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem;">' +
    Object.entries(dashboard.inventory).map(([itemId, inv]) => {
      const item = findMenuItem(parseInt(itemId));
      const name = item ? item.name : `Item #${itemId}`;
      return `
        <div style="padding: 1rem; border-bottom: 1px solid #EEEEEE;">
          <div style="font-weight: 600; color: #1A1A1A;">${name}</div>
          <div style="font-size: 0.9rem; color: #666;">Qty: ${inv.quantity} ${inv.unit}</div>
          <div style="font-size: 0.85rem; color: #999;">Updated: ${inv.lastUpdated}</div>
        </div>
      `;
    }).join("") + '</div>';

  container.innerHTML = html;
}

function updateInventory() {
  const itemId = parseInt(document.getElementById("inventoryItem").value);
  const quantity = parseInt(document.getElementById("inventoryQty").value);
  const unit = document.getElementById("inventoryUnit").value;

  if (!itemId || !quantity) {
    showAlert("❌ Select item and quantity!", "error", "inventory");
    return;
  }

  dashboard.updateInventoryItem(itemId, quantity, unit);
  showAlert("✅ Inventory updated!", "success", "inventory");
  document.getElementById("updateInventoryForm").reset();
  renderInventory();
}

// ===== REPORTS =====

function updateReports() {
  const today = dashboard.getTodayTotals();
  const weekly = dashboard.getWeeklyTotals();
  const monthly = dashboard.getMonthlyTotals();

  // Today's summary
  document.getElementById("todaySummary").innerHTML = `
    <div style="margin-bottom: 0.8rem;"><strong>Date:</strong> ${today.date}</div>
    <div style="margin-bottom: 0.8rem;"><strong>Sales:</strong> <span style="color: #06A77D; font-weight: 600;">$${today.sales.toFixed(2)}</span></div>
    <div style="margin-bottom: 0.8rem;"><strong>Expenses:</strong> <span style="color: #E63946; font-weight: 600;">$${today.expenses.toFixed(2)}</span></div>
    <div style="margin-bottom: 0.8rem;"><strong>Profit:</strong> <span style="color: #E63946; font-weight: 700; font-size: 1.2rem;">$${today.profit.toFixed(2)}</span></div>
    <div style="font-size: 0.9rem; color: #666;">Transactions: ${today.transactionCount}</div>
  `;

  // Weekly summary
  document.getElementById("weeklySummary").innerHTML = `
    <div style="margin-bottom: 0.8rem;"><strong>Last 7 Days</strong></div>
    <div style="margin-bottom: 0.8rem;"><strong>Sales:</strong> <span style="color: #06A77D; font-weight: 600;">$${weekly.sales.toFixed(2)}</span></div>
    <div style="margin-bottom: 0.8rem;"><strong>Expenses:</strong> <span style="color: #E63946; font-weight: 600;">$${weekly.expenses.toFixed(2)}</span></div>
    <div style="margin-bottom: 0.8rem;"><strong>Profit:</strong> <span style="color: #E63946; font-weight: 700; font-size: 1.2rem;">$${weekly.profit.toFixed(2)}</span></div>
    <div style="font-size: 0.9rem; color: #666;">Transactions: ${weekly.transactionCount}</div>
  `;

  // Monthly summary
  document.getElementById("monthlySummary").innerHTML = `
    <div style="margin-bottom: 0.8rem;"><strong>Last 30 Days</strong></div>
    <div style="margin-bottom: 0.8rem;"><strong>Sales:</strong> <span style="color: #06A77D; font-weight: 600;">$${monthly.sales.toFixed(2)}</span></div>
    <div style="margin-bottom: 0.8rem;"><strong>Expenses:</strong> <span style="color: #E63946; font-weight: 600;">$${monthly.expenses.toFixed(2)}</span></div>
    <div style="margin-bottom: 0.8rem;"><strong>Profit:</strong> <span style="color: #E63946; font-weight: 700; font-size: 1.2rem;">$${monthly.profit.toFixed(2)}</span></div>
    <div style="font-size: 0.9rem; color: #666;">Transactions: ${monthly.transactionCount}</div>
  `;
}

// ===== UTILITY FUNCTIONS =====

function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach(tab => {
    tab.classList.remove("active");
  });

  // Remove active from all nav items
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  // Show selected tab
  const tab = document.getElementById(tabName);
  if (tab) {
    tab.classList.add("active");
  }

  // Mark nav item as active
  event.target.classList.add("active");

  // Refresh data for some tabs
  if (tabName === "sales") renderSales();
  if (tabName === "expenses") renderExpenses();
  if (tabName === "inventory") renderInventory();
  if (tabName === "reports") updateReports();
}

function showAlert(message, type, tabName) {
  const alertEl = document.getElementById(`${tabName}Alert`) || document.querySelector(".alert");
  if (!alertEl) return;

  alertEl.textContent = message;
  alertEl.className = `alert ${type}`;
  alertEl.style.display = "block";

  setTimeout(() => {
    alertEl.style.display = "none";
  }, 3000);
}

function adminLogout() {
  if (confirm("Logout from admin panel?")) {
    admin.logout();
    window.location.href = "../index.html";
  }
}

function parseItemsString(str) {
  // Simple parser: "2x Burger, 1x Fries" -> array of items
  if (!str) return [];
  return str.split(",").map(item => {
    const match = item.trim().match(/(\d+)\s*x\s*(.+)/);
    return {
      name: match ? match[2] : item.trim(),
      quantity: match ? parseInt(match[1]) : 1,
      price: 0
    };
  });
}

function exportSalesData() {
  const csv = dashboard.exportSalesCSV();
  downloadCSV(csv, "sales.csv");
}

function downloadCSV(type) {
  let csv, filename;

  if (type === "sales") {
    csv = dashboard.exportSalesCSV();
    filename = "sales.csv";
  } else if (type === "expenses") {
    csv = dashboard.exportExpensesCSV();
    filename = "expenses.csv";
  }

  const link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  link.download = filename;
  link.click();
}

function clearAllData() {
  if (!confirm("⚠️ WARNING: This will delete ALL sales and expense data! Continue?")) return;
  if (!confirm("Really? This cannot be undone!")) return;

  dashboard.sales = [];
  dashboard.expenses = [];
  dashboard.saveSales();
  dashboard.saveExpenses();

  showAlert("✅ All data cleared!", "success", "reports");
  updateDashboard();
  renderSales();
  renderExpenses();
}
