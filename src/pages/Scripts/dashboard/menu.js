function openNav() {
  document.getElementById("Sidebar").style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  const aside = document.getElementById("Sidebar");
  const menuButton = document.querySelector(".menu");
  // Fechar barra lateral quando clicar fora dela
  window.addEventListener("click", function (event) {
    if (!aside.contains(event.target) && !menuButton.contains(event.target)) {
      aside.style.display = "none";
    }
  });
});
