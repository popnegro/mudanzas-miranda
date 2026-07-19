/**
 * desktop-menu.js
 *
 * Gestiona la accesibilidad del mega-menú de escritorio.
 * Cambia el comportamiento de hover a click para ser accesible por teclado.
 */
export function initDesktopMenu() {
    const dropdown = document.querySelector('.has-dropdown');
    if (!dropdown) return;

    const toggle = dropdown.querySelector('.mega-menu-toggle');
    const menu = dropdown.querySelector('.mega-menu');

    if (!toggle || !menu) return;

    const openMenu = () => {
        dropdown.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        dropdown.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dropdown.classList.contains('is-open')) {
            closeMenu();
            toggle.focus(); // Devolver el foco al botón que abrió el menú
        }
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
        if (dropdown.classList.contains('is-open') && !dropdown.contains(e.target)) {
            closeMenu();
        }
    });
}