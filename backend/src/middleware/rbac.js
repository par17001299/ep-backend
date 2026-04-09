// src/middleware/rbacMiddleware.js
export function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}

export function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const perms = req.session.user.permissions || [];
    if (!perms.includes(permission) && !perms.includes("system.admin")) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
