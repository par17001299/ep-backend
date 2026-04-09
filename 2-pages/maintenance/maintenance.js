console.log("Loaded page: maintenance");

// Mega menu toggle
const menuButton = document.getElementById("menuButton");
const megaMenu = document.getElementById("megaMenu");

menuButton.addEventListener("click", () => {
  megaMenu.hidden = !megaMenu.hidden;
});

// Tabs
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    panels.forEach(p => p.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// RBAC Access Gate
document.addEventListener("DOMContentLoaded", () => {
  const page = "maintenance";
  const roles = window.currentUserRoles;

  const pageContent = document.getElementById("page-content");
  const accessDenied = document.getElementById("access-denied");

  if (window.hasAccess(page, roles)) {
    pageContent.hidden = false;
    populateTables();
  } else {
    accessDenied.hidden = false;
  }
});

// Populate Tables
function populateTables() {
  populateAssets();
  populateWorkOrders();
}

function populateAssets() {
  const table = document.getElementById("assetTable");
  table.innerHTML = `
    <tr><td>Forklift A1</td><td>Vehicle</td><td>Active</td></tr>
    <tr><td>Conveyor Line 3</td><td>Equipment</td><td>Maintenance Due</td></tr>
    <tr><td>Generator B2</td><td>Power</td><td>Operational</td></tr>
  `;
}

function populateWorkOrders() {
  const table = document.getElementById("workOrderTable");
  table.innerHTML = `
    <tr><td>WO-1023</td><td>Forklift A1</td><td>Repair</td><td>Open</td></tr>
    <tr><td>WO-1024</td><td>Conveyor Line 3</td><td>Inspection</td><td>Scheduled</td></tr>
    <tr><td>WO-1025</td><td>Generator B2</td><td>Service</td><td>Completed</td></tr>
  `;
}
