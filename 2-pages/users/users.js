console.log("Loaded page: users");

// Mega menu toggle
document.getElementById("menuButton").addEventListener("click", () => {
  document.getElementById("megaMenu").hidden =
    !document.getElementById("megaMenu").hidden;
});

// RBAC Gate
document.addEventListener("DOMContentLoaded", () => {
  if (window.hasAccess("users", window.currentUserRoles)) {
    document.getElementById("page-content").hidden = false;
    initUsersPage();
  } else {
    document.getElementById("access-denied").hidden = false;
  }
});

// ---------------------------
// USER DATA (temporary static)
// ---------------------------
let users = [
  {
    emp: "1001",
    name: "Elliott",
    email: "elliott@example.com",
    department: "IT",
    roles: ["developer", "admin"],
    status: "Active"
  },
  {
    emp: "1002",
    name: "Alice",
    email: "alice@example.com",
    department: "Quality",
    roles: ["manager"],
    status: "Active"
  },
  {
    emp: "1003",
    name: "Bob",
    email: "bob@example.com",
    department: "Operations",
    roles: ["supervisor"],
    status: "Active"
  }
];

// ---------------------------
// INITIALISE PAGE
// ---------------------------
function initUsersPage() {
  renderUsers();
  setupModals();
}

// ---------------------------
// RENDER USERS TABLE
// ---------------------------
function renderUsers() {
  const table = document.getElementById("usersTable");
  table.innerHTML = "";

  users.forEach((u, index) => {
    table.innerHTML += `
      <tr>
        <td>${u.emp}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.department}</td>
        <td>${u.roles.join(", ")}</td>
        <td>${u.status}</td>
        <td>
          <button class="ember-button ghost" onclick="editUser(${index})">Edit</button>
          <button class="ember-button danger" onclick="disableUser(${index})">Disable</button>
        </td>
      </tr>
    `;
  });
}

// ---------------------------
// MODALS
// ---------------------------
let editingIndex = null;

function setupModals() {
  const modal = document.getElementById("userModal");
  const disableModal = document.getElementById("disableModal");

  document.getElementById("addUserBtn").onclick = () => openUserModal();
  document.getElementById("cancelUserBtn").onclick = () => modal.hidden = true;
  document.getElementById("saveUserBtn").onclick = saveUser;

  document.getElementById("cancelDisableBtn").onclick = () => disableModal.hidden = true;
  document.getElementById("confirmDisableBtn").onclick = confirmDisable;
}

function openUserModal(user = null, index = null) {
  editingIndex = index;

  document.getElementById("modalTitle").innerText =
    index === null ? "Add User" : "Edit User";

  document.getElementById("empNumberInput").value = user?.emp || "";
  document.getElementById("nameInput").value = user?.name || "";
  document.getElementById("emailInput").value = user?.email || "";
  document.getElementById("departmentInput").value = user?.department || "";
  document.getElementById("rolesInput").value = user?.roles || [];

  document.getElementById("userModal").hidden = false;
}

function editUser(index) {
  openUserModal(users[index], index);
}

function saveUser() {
  const emp = document.getElementById("empNumberInput").value;
  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const department = document.getElementById("departmentInput").value;
  const roles = Array.from(document.getElementById("rolesInput").selectedOptions).map(o => o.value);

  const userData = { emp, name, email, department, roles, status: "Active" };

  if (editingIndex === null) {
    users.push(userData);
  } else {
    users[editingIndex] = userData;
  }

  document.getElementById("userModal").hidden = true;
  renderUsers();
}

// ---------------------------
// DISABLE USER
// ---------------------------
let disableIndex = null;

function disableUser(index) {
  disableIndex = index;
  document.getElementById("disableText").innerText =
    `Disable user ${users[index].name}?`;
  document.getElementById("disableModal").hidden = false;
}

function confirmDisable() {
  users[disableIndex].status = "Disabled";
  document.getElementById("disableModal").hidden = true;
  renderUsers();
}
