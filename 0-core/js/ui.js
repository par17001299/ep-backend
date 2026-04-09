function toggleTheme() {
  const current = document.body.dataset.theme;
  document.body.dataset.theme = current === "dark" ? "light" : "dark";
}
