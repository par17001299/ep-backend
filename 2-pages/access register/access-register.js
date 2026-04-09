console.log("Loaded page: access-register");

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
  const page = "access-register";
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

// Populate Access Tables
function populateTables() {
  populateUserAccess();
  populateRoleAccess();
  populateDepartmentAccess();
}

function populateUserAccess() {
  const table = document.getElementById("userAccessTable");
  table.innerHTML = `
    <tr><td>Alice</td><td>admin</td><td>IT</td></tr>
    <tr><td>Bob</td><td>manager</td><td>Operations</td></tr>
    <tr><td>Charlie</td><td>standard-user</td><td>Operations</td></tr>
  `;
}

function populateRoleAccess() {
  const table = document.getElementById("roleAccessTable");

  Object.entries(window.roleDepartments).forEach(([role, departments]) => {
    const pages = departments
      .flatMap(dept => window.departmentPages[dept] || [])
      .join(", ");

    const row = `
      <tr>
        <td>${role}</td>
        <td>${departments.join(", ")}</td>
        <td>${pages}</td>
      </tr>
    `;

    table.insertAdjacentHTML("beforeend", row);
  });
}

function populateDepartmentAccess() {
  const table = document.getElementById("departmentAccessTable");

  Object.entries(window.departmentPages).forEach(([dept, pages]) => {
    const row = `
      <tr>
        <td>${dept}</td>
        <td>${pages.join(", ")}</td>
      </tr>
    `;

    table.insertAdjacentHTML("beforeend", row);
  });
}
