console.log("Loaded page: inspections");

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
  const page = "inspections";
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
  populateChecklists();
  populateRecords();
  populateSchedules();
}

function populateChecklists() {
  const table = document.getElementById("checklistTable");
  table.innerHTML = `
    <tr><td>Forklift Safety</td><td>Vehicle</td><td>v1.2</td></tr>
    <tr><td>Conveyor Line Inspection</td><td>Equipment</td><td>v3.0</td></tr>
    <tr><td>Generator Safety</td><td>Power</td><td>v2.1</td></tr>
  `;
}

function populateRecords() {
  const table = document.getElementById("recordTable");
  table.innerHTML = `
    <tr><td>IR-501</td><td>Forklift A1</td><td>Safety</td><td>Passed</td></tr>
    <tr><td>IR-502</td><td>Conveyor Line 3</td><td>Mechanical</td><td>Failed</td></tr>
    <tr><td>IR-503</td><td>Generator B2</td><td>Safety</td><td>Passed</td></tr>
  `;
}

function populateSchedules() {
  const table = document.getElementById("scheduleTable");
  table.innerHTML = `
    <tr><td>Forklift A1</td><td>Monthly</td><td>2026-05-12</td></tr>
    <tr><td>Conveyor Line 3</td><td>Weekly</td><td>2026-04-15</td></tr>
    <tr><td>Generator B2</td><td>Quarterly</td><td>2026-06-01</td></tr>
  `;
}
