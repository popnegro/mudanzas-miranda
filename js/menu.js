/**
 * menu.js
 * 
 * Handles the mobile navigation menu toggle.
 * Sprint 2
 */

export function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('#main-menu');

    if (!menuToggle || !mainMenu) {
        console.warn('Menu toggle or main menu not found. Skipping menu initialization.');
        return;
    }

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        document.body.classList.toggle('menu-open');
    });
}
