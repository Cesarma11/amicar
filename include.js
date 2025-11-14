// ============================================================
// include.js
// Carga fragmentos HTML dinámicamente y activa menú hamburguesa
// Carga el header o encabezado
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');

  includes.forEach(el => {
    const file = el.getAttribute('data-include');

    fetch(file)
      .then(resp => {
        if (!resp.ok) throw new Error(`No se pudo cargar ${file}`);
        return resp.text();
      })
      .then(html => {
        el.innerHTML = html;

        // ======== ACTIVAR MENÚ HAMBURGUESA ========
        const hamburger = el.querySelector('#hamburger');
        const menu = el.querySelector('#menu');
        if (hamburger && menu) {
          hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
          });
        }

        // ======== MARCAR LINK ACTIVO ========
        const navLinks = el.querySelectorAll('nav a');
        const currentURL = window.location.pathname.split("/").pop();

        navLinks.forEach(link => {
          const linkHref = link.getAttribute('href');
          if (linkHref === currentURL) {
            link.classList.add('active');
          }
        });
      })
      .catch(err => console.error(err));
  });
});
