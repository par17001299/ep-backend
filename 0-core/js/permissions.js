// permissions.js
// Core access decision logic

/**
 * Returns true if any of the user's roles can access the given page.
 * @param {string} page - page identifier, e.g. "performance-review"
 * @param {string[]} roles - array of role keys, e.g. ["developer", "admin"]
 */
window.hasAccess = function (page, roles) {
  // Safety guards
  if (!page || !Array.isArray(roles)) return false;

  // 1) Developer shortcut: full access
  if (roles.includes("developer")) {
    return true;
  }

  // 2) Find which departments own this page
  const departmentsForPage = window.pageDepartments[page] || [];
  if (departmentsForPage.length === 0) {
    // Page not mapped → default deny (or flip to true if you prefer)
    return false;
  }

  // 3) For each role, see if it has any of those departments
  for (const role of roles) {
    const allowedDepartments = window.roleDepartments[role] || [];
    const intersection = departmentsForPage.some(dept =>
      allowedDepartments.includes(dept)
    );
    if (intersection) {
      return true;
    }
  }

  // 4) No match → deny
  return false;
};
