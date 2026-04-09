console.log("Loaded page: performance-review");

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
  const page = "performance-review";
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
  populateReviews();
  populateGoals();
  populateCompetencies();
}

function populateReviews() {
  const table = document.getElementById("reviewTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>2025</td><td>Exceeds</td><td>Manager</td></tr>
    <tr><td>Bob</td><td>2025</td><td>Meets</td><td>Supervisor</td></tr>
    <tr><td>Charlie</td><td>2025</td><td>Below</td><td>Manager</td></tr>
  `;
}

function populateGoals() {
  const table = document.getElementById("goalTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Improve inspection accuracy</td><td>In Progress</td></tr>
    <tr><td>Bob</td><td>Complete safety certification</td><td>Completed</td></tr>
    <tr><td>Charlie</td><td>Reduce downtime incidents</td><td>Not Started</td></tr>
  `;
}

function populateCompetencies() {
  const table = document.getElementById("competencyTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>Technical Skills</td><td>Advanced</td></tr>
    <tr><td>Bob</td><td>Communication</td><td>Intermediate</td></tr>
    <tr><td>Charlie</td><td>Safety Awareness</td><td>Basic</td></tr>
  `;
}
