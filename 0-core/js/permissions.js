export function hasPermission(user, permission) {
  return user.permissions?.includes(permission) || user.permissions?.includes("system.admin");
}
