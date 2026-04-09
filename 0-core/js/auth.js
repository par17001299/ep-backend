const API = "https://ep-backend-production.up.railway.app";

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return await res.json();
}

// LOGOUT
export async function logout() {
  await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
}

// SESSION CHECK
export async function getSessionUser() {
  const res = await fetch(`${API}/auth/me`, {
    credentials: "include"
  });

  if (!res.ok) return null;
  return await res.json();
}