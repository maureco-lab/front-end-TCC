document.addEventListener("DOMContentLoaded", function () {
    // 1. Carregar o Header
    fetch("/header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            // Após carregar o header, precisamos garantir que a sidebar saiba 
            // que o botão de abrir (menuToggle) agora existe no DOM
            inicializarEventos(); 
        });

    // 2. Carregar a Sidebar
    fetch("/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("sidebar-container").innerHTML = data;
            inicializarEventos();
        });
});

function inicializarEventos() {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    // Verifica se os elementos já foram carregados no HTML antes de aplicar o clique
    if (menuToggle && sidebar) {
        menuToggle.onclick = () => sidebar.classList.add('open');
    }

    if (closeSidebar && sidebar) {
        closeSidebar.onclick = () => sidebar.classList.remove('open');
    }

    //ATIVAR ITEM ATUAL NO MENU
    const links = document.querySelectorAll('.sidebar-nav li a');
    links.forEach(link => {
        if (link.href === window.location.href) {
            link.parentElement.classList.add('active');
        }
    });
}