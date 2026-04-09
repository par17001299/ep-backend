console.log("Loaded page: attendance");

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
  const page = "attendance";
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
  populateDaily();
  populateAbsences();
  populateSummary();
}

function populateDaily() {
  const table = document.getElementById("dailyTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>06:02</td><td>14:01</td><td>Present</td></tr>
    <tr><td>Bob</td><td>14:05</td><td>22:00</td><td>Late</td></tr>
    <tr><td>Charlie</td><td>—</td><td>—</td><td>Absent</td></tr>
  `;
}

function populateAbsences() {
  const table = document.getElementById("absenceTable");
  table.innerHTML = `
    <tr><td>Charlie</td><td>Sick Leave</td><td>2026-04-09</td></tr>
    <tr><td>Bob</td><td>Annual Leave</td><td>2026-03-28</td></tr>
  `;
}

function populateSummary() {
  const table = document.getElementById("summaryTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>22</td><td>0</td><td>1</td></tr>
    <tr><td>Bob</td><td>20</td><td>1</td><td>3</td></tr>
    <tr><td>Charlie</td><td>18</td><td>4</td><td>0</td></tr>
  `;
}
