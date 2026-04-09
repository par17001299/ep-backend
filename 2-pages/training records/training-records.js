console.log("Loaded page: training-records");

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
  const page = "training-records";
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
  populateRecords();
  populateExpiring();
  populateMatrix();
}

function populateRecords() {
  const table = document.getElementById("recordTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Forklift Safety</td><td>2026-01-12</td><td>2027-01-12</td></tr>
    <tr><td>Bob</td><td>Electrical Awareness</td><td>2025-11-03</td><td>2026-11-03</td></tr>
    <tr><td>Charlie</td><td>Fire Safety</td><td>2026-02-20</td><td>2027-02-20</td></tr>
  `;
}

function populateExpiring() {
  const table = document.getElementById("expiringTable");
  table.innerHTML = `
    <tr><td>Bob</td><td>Electrical Awareness</td><td>2026-11-03</td></tr>
  `;
}

function populateMatrix() {
  const table = document.getElementById("matrixTable");
  table.innerHTML = `
    <tr><td>Forklift Safety</td><td>Operations</td></tr>
    <tr><td>Electrical Awareness</td><td>Maintenance</td></tr>
    <tr><td>Fire Safety</td><td>All Departments</td></tr>
  `;
}
