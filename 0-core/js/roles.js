export function hasRole(user, role) {
  return user.roles?.includes(role);
}
