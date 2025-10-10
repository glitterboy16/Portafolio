// Elementos principales
const barraLateral = document.querySelector('[data-barra-lateral]');
const enlacesNav = document.querySelectorAll('[enlace-navbar]');
const paginas = document.querySelectorAll('[data-pagina]');


// Navegación entre páginas
enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', () => {
    const paginaId = enlace.getAttribute('enlace-navbar');
    
    // Quitar active de todo
    enlacesNav.forEach(e => e.classList.remove('active'));
    paginas.forEach(p => p.classList.remove('active'));
    
    // Activar enlace y página
    enlace.classList.add('active');
    document.querySelector(`[data-pagina="${paginaId}"]`).classList.add('active');
  });
});

// Cerrar sidebar al hacer clic fuera (solo móviles)
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 1) {
    const clickDentro = barraLateral.contains(e.target) || botonBarra.contains(e.target);
    if (!clickDentro) barraLateral.classList.remove('active');
  }
});

