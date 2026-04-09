import { getSessionUser } from "./auth.js";

export async function requireAuth() {
  const user = await getSessionUser();

  if (!user) {
    window.location.href = "index.html"; // redirect to login
    return null;
  }

  return user;
}
