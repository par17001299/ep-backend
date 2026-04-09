console.log("Loaded page: login");

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "Show" : "Hide";
});

document.getElementById("loginButton").addEventListener("click", () => {
  alert("Static login placeholder — integrate authentication here.");
});
