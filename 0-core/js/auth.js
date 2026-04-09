// auth.js
// Identity + current user context

// In a real system this would come from your IdP / SSO.
// For now, this is your "I am developer" switch.
window.currentUser = {
  id: "u-elliott",
  name: "Elliott",
  email: "elliott@example.com",
  roles: ["developer"], // <- add/remove roles here
  department: "IT"
};

// Convenience alias used by all pages
window.currentUserRoles = window.currentUser.roles;
