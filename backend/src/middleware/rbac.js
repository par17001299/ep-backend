export function rbac(requiredPermission) {
  return (req, res, next) => {
    const perms = req.session.user?.permissions || [];
    if (!perms.includes(requiredPermission)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
