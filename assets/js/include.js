

//Carrega um elemento na página que invoca
function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch(error => {
      console.error("Erro ao carregar o arquivo: ", error);
    });
}

//Ativa um link selecionado
function setActiveLink() {
  const links = document.querySelectorAll('.nav-links li a, .sidebar ul li a');
  const currentPath = window.location.pathname;

  links.forEach(link => {
    if (link.href.includes(currentPath)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;

      // Agora que o sidebar foi carregado, podemos inicializar a lógica de toggle
      initializeSidebarToggle();
    })
    .catch(error => {
      console.error("Erro ao carregar o arquivo: ", error);
    });
}

function initializeSidebarToggle() {
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {    
      toggleBtn.addEventListener('click', () => {             
        sidebar.classList.add('sidebar');
        sidebar.classList.toggle('collapsed');
    });
  }
}

// Carregar o cabeçalho e o rodapé
window.onload = function() {
  loadHTML("header", "../includes/header.html");
  loadHTML("footer", "../includes/footer.html");
  loadHTML("sidebar", "../includes/sidebar.html");

   // Definir o link ativo após carregar os componentes
 setTimeout(setActiveLink, 100); // Timeout para aguardar o carregamento
};




