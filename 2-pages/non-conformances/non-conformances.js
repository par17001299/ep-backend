console.log("Loaded page: non-conformances");

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
  const page = "non-conformances";
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
  populateOpen();
  populateClosed();
  populateCategories();
}

function populateOpen() {
  const table = document.getElementById("openTable");
  table.innerHTML = `
    <tr><td>NC-101</td><td>Incorrect torque applied to assembly</td><td>Operations</td><td>Open</td></tr>
    <tr><td>NC-102</td><td>Training record missing for new hire</td><td>HR</td><td>Investigating</td></tr>
    <tr><td>NC-103</td><td>Unlabelled chemical container</td><td>Quality</td><td>Open</td></tr>
  `;
}

function populateClosed() {
  const table = document.getElementById("closedTable");
  table.innerHTML = `
    <tr><td>NC-090</td><td>Expired forklift certification</td><td>Operations</td><td>2026-03-12</td></tr>
    <tr><td>NC-091</td><td>Incorrect document version used</td><td>Quality</td><td>2026-02-28</td></tr>
  `;
}

function populateCategories() {
  const table = document.getElementById("categoryTable");
  table.innerHTML = `
    <tr><td>Safety</td><td>Issues that pose a risk to health or safety</td></tr>
    <tr><td>Process</td><td>Deviations from documented procedures</td></tr>
    <tr><td>Training</td><td>Gaps in competency or certification</td></tr>
    <tr><td>Documentation</td><td>Incorrect, missing, or outdated documents</td></tr>
  `;
}
