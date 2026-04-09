console.log("Loaded page: workloads");

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
  const page = "workloads";
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
  populateTasks();
  populateAssignments();
  populateTechnicians();
}

function populateTasks() {
  const table = document.getElementById("taskTable");
  table.innerHTML = `
    <tr><td>TK-201</td><td>Inspect Forklift A1</td><td>High</td><td>Open</td></tr>
    <tr><td>TK-202</td><td>Repair Conveyor Line 3</td><td>Critical</td><td>In Progress</td></tr>
    <tr><td>TK-203</td><td>Service Generator B2</td><td>Medium</td><td>Scheduled</td></tr>
  `;
}

function populateAssignments() {
  const table = document.getElementById("assignmentTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Inspect Forklift A1</td><td>Morning</td></tr>
    <tr><td>Bob</td><td>Repair Conveyor Line 3</td><td>Afternoon</td></tr>
    <tr><td>Charlie</td><td>Service Generator B2</td><td>Night</td></tr>
  `;
}

function populateTechnicians() {
  const table = document.getElementById("techTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>3</td><td>Active</td></tr>
    <tr><td>Bob</td><td>2</td><td>Active</td></tr>
    <tr><td>Charlie</td><td>1</td><td>On Break</td></tr>
  `;
}
