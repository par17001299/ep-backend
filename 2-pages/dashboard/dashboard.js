console.log("Loaded page: dashboard");

const menuButton = document.getElementById("menuButton");
const megaMenu = document.getElementById("megaMenu");

menuButton.addEventListener("click", () => {
  megaMenu.hidden = !megaMenu.hidden;
});
  import { requireAuth } from "./0-core/js/access.js";
  import { hasPermission } from "./0-core/js/permissions.js";

  const user = await requireAuth();

  // Example: hide admin panel if user lacks permission
  if (!hasPermission(user, "admin.panel.view")) {
    document.querySelector("#admin-panel").style.display = "none";
  }
    import { logout } from "./0-core/js/auth.js";

  document.querySelector("#logout-btn").addEventListener("click", async () => {
    await logout();
    window.location.href = "index.html";
  });