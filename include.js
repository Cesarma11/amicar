 
// ============================================================
// include.js
// Script para cargar fragmentos HTML dinámicamente y
// marcar el link activo en la navegación
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------
  // Selección de todos los elementos que incluyen fragmentos
  // -----------------------------
  const includes = document.querySelectorAll('[data-include]');

  includes.forEach(el => {
    // -----------------------------
    // Obtener la ruta del archivo a incluir desde el atributo data-include
    // -----------------------------
    const file = el.getAttribute('data-include');

    // -----------------------------
    // Cargar el fragmento mediante fetch
    // -----------------------------
    fetch(file)
      .then(resp => {
        if (!resp.ok) throw new Error(`No se pudo cargar ${file}`);
        return resp.text();
      })
      .then(html => {
        // -----------------------------
        // Inyectar el HTML en el elemento correspondiente
        // -----------------------------
        el.innerHTML = html;

        // -----------------------------
        // Marcar link activo en el nav del fragmento recién cargado
        // -----------------------------
        const navLinks = el.querySelectorAll('nav a');
        const currentURL = window.location.pathname.split("/").pop();

        navLinks.forEach(link => {
          const linkHref = link.getAttribute('href');
          if(linkHref === currentURL) {
            link.classList.add('active'); // añade la clase 'active' al link actual
          }
        });

      })
      .catch(err => console.error(err)); // -----------------------------
      // Mostrar errores si falla la carga del fragmento
      // -----------------------------
  });
});


//-----------------------------------------------------------------------------------