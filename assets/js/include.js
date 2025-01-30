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

//Carrega um elemento na página que invoca
function loadHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      
      // Agora que o sidebar foi carregado, podemos inicializar a lógica de toggle
      i//nitializeSidebarToggle();
    })
    .catch(error => {
      console.error("Erro ao carregar o arquivo: ", elementId);
    });
}

// Carregar os componentes
window.onload = function() {
  loadHTML("header", "../includes/header.html");
  loadHTML("breadcrumbId", "../includes/breadcrumb.html");
  loadHTML("footer", "../includes/footer.html");
  loadHTML("sidebar", "../includes/sidebar.html");

// Definir o link ativo após carregar os componentes
 setTimeout(setActiveLink, 100); // Timeout para aguardar o carregamento
};


document.addEventListener("DOMContentLoaded", () => {
  const breadcrumbContainer = document.getElementById("breadcrumb-identifier");
  const path = window.location.pathname.split("/").filter(Boolean);

  let breadcrumbHTML = `<li><a href="../home.html">Home</a></li>`;
  let currentPath = "";

  path.forEach((segment, index) => {
    currentPath += `/${segment}`;
    if (index === path.length - 1) {
      breadcrumbHTML += `<li aria-current="page">${decodeURIComponent(segment)}</li>`;
    } else {
      breadcrumbHTML += `<li><a href="${currentPath}">${decodeURIComponent(segment)}</a></li>`;
    }
  });
  console.log(breadcrumbHTML);
  console.log(breadcrumbContainer);
  breadcrumbContainer.innerHTML = breadcrumbHTML;
});



















/*
function initializeSidebarToggle() {
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarClass = document.querySelector('.sidebar');  
  
  if (toggleBtn && sidebar) {    
      toggleBtn.addEventListener('click', () => {        
        if(sidebar.classList.contains('collapsed')){
          sidebarClass.style.width = '200px';          
        }else{
          sidebarClass.style.width = '50px';          
        }
        sidebar.classList.add('sidebar');
        sidebar.classList.toggle('collapsed');        
    });
  }
}
*/