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
    // Esconde todas as seções
    Object.keys(sections).forEach(function(key) {
      document.getElementById(sections[key]).classList.add('hidden');
    });
    // Mostra a seção relacionada ao botão
    if (document.getElementById(sections[buttonId]).classList.contains('hidden')) {
      document.getElementById(sections[buttonId]).classList.remove('hidden');
      conteudoPrincipal.classList.add('hidden');
    } else {
      conteudoPrincipal.classList.remove('hidden');
    }
  }

  function activateButton(button) {
    // Desativa todos os botões
    buttons.forEach(function(btn) {
      btn.classList.remove('green-button');
    });
    // Ativa o botão pressionado
    button.classList.add('green-button');
  }

  // Adiciona eventos para os botões do menu
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      toggleSection(this.id);
      activateButton(this);
    });
  });

  // Evento de clique para mostrar/ocultar sidebar
  menuButton.addEventListener('click', function() {
    sidebar.style.display = (sidebar.style.display === 'flex') ? 'none' : 'flex';
  });

  // Evento para fechar a sidebar ao clicar fora
  window.addEventListener('click', function(event) {
    if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !menuButton.contains(event.target)) {
      sidebar.style.display = 'none';
    }
  });
});
