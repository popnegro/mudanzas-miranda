/**
 * mobile-menu.js
 *
 * Gestiona la apertura y cierre del menú de navegación móvil y sus submenús.
 */

/**
 * Inicializa la funcionalidad del menú móvil.
 * - Toggle para abrir/cerrar el panel.
 * - Manejo de submenús desplegables.
 */
export function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const menuPanel = document.getElementById('main-menu-panel');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!mobileToggle || !menuPanel || !mobileMenu) return;

    const closeMenuBtn = menuPanel.querySelector('.close-menu-btn');
    const DROPDOWN_SELECTOR = '.has-dropdown-mobile > a';
    let lastFocusedElement;

    const trapFocus = (event) => {
        if (event.key !== 'Tab') return;

        const focusableElements = Array.from(menuPanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    };

    const openMenu = () => {
        lastFocusedElement = document.activeElement;
        document.body.classList.add('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'true');
        menuPanel.addEventListener('keydown', trapFocus);
        closeMenuBtn.focus();
    };

    const closeMenu = () => {
        document.body.classList.remove('menu-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        menuPanel.removeEventListener('keydown', trapFocus);
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    mobileToggle.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Delegación de eventos para los submenús
    mobileMenu.addEventListener('click', (event) => {
        const dropdownLink = event.target.closest(DROPDOWN_SELECTOR);
        if (dropdownLink) {
            event.preventDefault();
            const parent = dropdownLink.parentElement;
            const isOpen = parent.classList.toggle('open');
            
            dropdownLink.setAttribute('aria-expanded', isOpen);

            const submenu = parent.querySelector('.mobile-submenu');
            submenu.style.maxHeight = isOpen ? `${submenu.scrollHeight}px` : '0';
        }
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
}