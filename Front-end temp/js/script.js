const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');

// Abrir ao clicar no hambúrguer
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
});

// Fechar ao clicar no X
closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

// Fechar ao clicar fora da área lateral
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});