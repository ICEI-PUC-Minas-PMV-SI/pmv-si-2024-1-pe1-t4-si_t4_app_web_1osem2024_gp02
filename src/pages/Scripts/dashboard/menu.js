function openNav() {
    const sideBar = document.getElementById("Sidebar");

    if (sideBar) {
        const isVisible = sideBar.classList.contains('visible');
        sideBar.classList.toggle('visible', !isVisible);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var sidebar = document.getElementById("Sidebar");
    var menuButton = document.querySelector(".menu");
    var buttons = document.querySelectorAll('.menu-btn');
    var sections = {
        'resumoBtn': 'resumoSection',
        'transacoesBtn': 'transacoesSection',
        'metasBtn': 'metasSection'
    };
    var conteudoPrincipal = document.getElementById('conteudoPrincipal');

    function toggleSection(buttonId) {
        Object.keys(sections).forEach(function (key) {
            document.getElementById(sections[key]).classList.add('hidden');
        });
        if (document.getElementById(sections[buttonId]).classList.contains('hidden')) {
            document.getElementById(sections[buttonId]).classList.remove('hidden');
            conteudoPrincipal.classList.add('hidden');
        } else {
            conteudoPrincipal.classList.remove('hidden');
        }
    }

    menuButton.addEventListener('click', function () {
        sidebar.style.display = (sidebar.style.display === 'flex') ? 'none' : 'flex';
    });

    function activateButton(button) {
        buttons.forEach(function (btn) {
            btn.classList.remove('green-button');
        });
        button.classList.add('green-button');
    }

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            toggleSection(this.id);
            activateButton(this);
        });
    });

    window.addEventListener('click', function (event) {
        if (window.innerWidth <= 768 && sidebar && menuButton && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
            sidebar.style.display = 'none';
        }
    });
});


