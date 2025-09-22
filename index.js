document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("dropdownButton");
  const menu = document.getElementById("dropdownMenu");

  if (button && menu) {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!button.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add("hidden");
      }
    });
  }
});
