console.log("Loaded page: fleet");

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
  const page = "fleet";
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
  populateVehicles();
  populateInspections();
  populateAssignments();
}

function populateVehicles() {
  const table = document.getElementById("vehicleTable");
  table.innerHTML = `
    <tr><td>Forklift A1</td><td>Forklift</td><td>Active</td></tr>
    <tr><td>Truck T7</td><td>Truck</td><td>In Service</td></tr>
    <tr><td>Van V3</td><td>Van</td><td>Operational</td></tr>
  `;
}

function populateInspections() {
  const table = document.getElementById("inspectionTable");
  table.innerHTML = `
    <tr><td>IN-301</td><td>Forklift A1</td><td>Safety</td><td>Passed</td></tr>
    <tr><td>IN-302</td><td>Truck T7</td><td>Mechanical</td><td>Due</td></tr>
    <tr><td>IN-303</td><td>Van V3</td><td>Safety</td><td>Passed</td></tr>
  `;
}

function populateAssignments() {
  const table = document.getElementById("assignmentTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Forklift A1</td><td>Morning</td></tr>
    <tr><td>Bob</td><td>Truck T7</td><td>Afternoon</td></tr>
    <tr><td>Charlie</td><td>Van V3</td><td>Night</td></tr>
  `;
}
