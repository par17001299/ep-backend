// access.js
// Department → pages mapping and helpers

// Pages grouped by department
window.departmentPages = {
  Operations: ["maintenance", "fleet", "inspections", "workloads", "shifts"],
  HR: ["attendance", "training-records", "performance-review"],
  Quality: ["audit-schedule", "non-conformances", "corrective-actions"],
  Risk: ["risk-register", "controls-register", "controls-testing"],
  "Data Governance": ["data-lineage-map", "data-steward-register", "data-retention-schedule"],
  IT: ["org-structure", "job-roles", "access-register", "system-pages"]
};

// Reverse lookup: page → departments
window.pageDepartments = {};

Object.keys(window.departmentPages).forEach(dept => {
  window.departmentPages[dept].forEach(page => {
    if (!window.pageDepartments[page]) {
      window.pageDepartments[page] = [];
    }
    window.pageDepartments[page].push(dept);
  });
});

console.log("RBAC engine loaded: access.js");
console.log("RBAC engine initialised.");
