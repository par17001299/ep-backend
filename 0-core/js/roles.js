// roles.js
// Role definitions and which departments they can see

window.roleDefinitions = {
  developer: {
    label: "Developer",
    description: "Full platform access, including all departments and pages."
  },
  admin: {
    label: "Administrator",
    description: "Broad access to operational and governance areas."
  },
  manager: {
    label: "Manager",
    description: "Access to their department’s operational and HR views."
  },
  supervisor: {
    label: "Supervisor",
    description: "Access to frontline operational pages."
  },
  user: {
    label: "User",
    description: "Standard access to self‑service and limited views."
  }
};

// Which departments each role can access
window.roleDepartments = {
  developer: ["Operations", "HR", "Quality", "Risk", "Data Governance", "IT"],
  admin: ["Operations", "HR", "Quality", "Risk", "Data Governance", "IT"],
  manager: ["Operations", "HR", "Quality"],
  supervisor: ["Operations"],
  user: []
};
