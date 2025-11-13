// Elementos principales
const barraLateral = document.querySelector('[data-barra-lateral]');
const enlacesNav = document.querySelectorAll('[enlace-navbar]');

/**
  * Permite mostrar u ocultar un elemento (escena) de la pantalla.
  * Selecciona todos los elementos con la clase scene y les remueve la clase active
  * Selecciona el elemento con el id especificado y le añade la clase active
  * @param {number} id - identificador del elemento.
  */
// Función para manejar escenas
function showScene(id) {
  document.querySelectorAll('.scene').forEach(element => element.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Navegación entre páaginas
enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', () => {
    const paginaId = enlace.getAttribute('enlace-navbar');
    enlacesNav.forEach(e => e.classList.remove('active'));
    enlace.classList.add('active');
    showScene(paginaId);
  });
});

// Cerrar sidebar al hacer clic fuera
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 900) {  // Funciona en móviles
    const clickDentro = barraLateral.contains(e.target);
    if (!clickDentro) barraLateral.classList.remove('active');
  }
});

// Gabino gif
 const imagen = document.getElementById('miImagen');
    let contadorClicks = 0;

    imagen.addEventListener('click', () => {
      contadorClicks++;
      if (contadorClicks === 5) {
        imagen.src = 'img/Gabino-gif.gif'; // Cambia 'tuGif.gif' por el nombre real
      }
    });