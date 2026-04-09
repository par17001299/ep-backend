console.log("Loaded page: audit-schedule");

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
  const page = "audit-schedule";
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
  populateUpcoming();
  populateCompleted();
  populateAuditors();
}

function populateUpcoming() {
  const table = document.getElementById("upcomingTable");
  table.innerHTML = `
    <tr><td>ISO 9001 Internal Audit</td><td>Quality</td><td>2026-05-12</td><td>Alice</td></tr>
    <tr><td>Safety Compliance Audit</td><td>Operations</td><td>2026-06-01</td><td>Bob</td></tr>
    <tr><td>Data Governance Review</td><td>Data Governance</td><td>2026-06-15</td><td>Charlie</td></tr>
  `;
}

function populateCompleted() {
  const table = document.getElementById("completedTable");
  table.innerHTML = `
    <tr><td>Fire Safety Audit</td><td>Operations</td><td>2026-03-10</td><td>Pass</td></tr>
    <tr><td>Training Compliance Audit</td><td>HR</td><td>2026-02-18</td><td>Minor Issues</td></tr>
  `;
}

function populateAuditors() {
  const table = document.getElementById("auditorTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Lead Auditor</td><td>Quality</td></tr>
    <tr><td>Bob</td><td>Internal Auditor</td><td>Operations</td></tr>
    <tr><td>Charlie</td><td>Compliance Auditor</td><td>Risk</td></tr>
  `;
}
