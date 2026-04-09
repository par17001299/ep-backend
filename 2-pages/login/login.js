  import { login } from "./0-core/js/auth.js";

  document.querySelector("#login-btn").addEventListener("click", async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const result = await login(email, password);

    if (result.user) {
      // Login success
      console.log("Logged in:", result.user);
      window.location.href = "dashboard.html"; // or wherever you want
    } else {
      // Login failed
      document.querySelector("#error").textContent = result.message;
    }
  });  import { login } from "./0-core/js/auth.js";

  document.querySelector("#login-btn").addEventListener("click", async () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const result = await login(email, password);

    if (result.user) {
      // Login success
      console.log("Logged in:", result.user);
      window.location.href = "dashboard.html"; // or wherever you want
    } else {
      // Login failed
      document.querySelector("#error").textContent = result.message;
    }
  });