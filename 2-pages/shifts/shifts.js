console.log("Loaded page: shifts");

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
  const page = "shifts";
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
  populateSchedule();
  populateAssignments();
  populateAvailability();
}

function populateSchedule() {
  const table = document.getElementById("scheduleTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Morning</td><td>06:00</td><td>14:00</td></tr>
    <tr><td>Bob</td><td>Afternoon</td><td>14:00</td><td>22:00</td></tr>
    <tr><td>Charlie</td><td>Night</td><td>22:00</td><td>06:00</td></tr>
  `;
}

function populateAssignments() {
  const table = document.getElementById("assignmentTable");
  table.innerHTML = `
    <tr><td>Morning</td><td>Alice</td><td>3</td></tr>
    <tr><td>Afternoon</td><td>Bob</td><td>2</td></tr>
    <tr><td>Night</td><td>Charlie</td><td>1</td></tr>
  `;
}

function populateAvailability() {
  const table = document.getElementById("availabilityTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Available</td><td>Tomorrow 06:00</td></tr>
    <tr><td>Bob</td><td>On Shift</td><td>Today 22:00</td></tr>
    <tr><td>Charlie</td><td>Resting</td><td>Tomorrow 22:00</td></tr>
  `;
}
