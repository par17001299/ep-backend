console.log("Loaded page: system");
console.log("Loaded page: system-pages");

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
  const page = "system-pages";
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
  populatePageTable();
  populateDeptTable();
  populateStatusTable();
}

function populatePageTable() {
  const table = document.getElementById("pageTable");

  Object.entries(window.departmentPages).forEach(([dept, pages]) => {
    pages.forEach(page => {
      const row = `
        <tr>
          <td>${page}</td>
          <td>${dept}</td>
          <td>/2-pages/${page}/index.html</td>
        </tr>
      `;
      table.insertAdjacentHTML("beforeend", row);
    });
  });
}

function populateDeptTable() {
  const table = document.getElementById("deptTable");

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

function populateStatusTable() {
  const table = document.getElementById("statusTable");

  Object.entries(window.departmentPages).forEach(([dept, pages]) => {
    pages.forEach(page => {
      const row = `
        <tr>
          <td>${page}</td>
          <td>Active</td>
        </tr>
      `;
      table.insertAdjacentHTML("beforeend", row);
    });
  });
}
