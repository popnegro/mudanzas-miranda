/**
 * main.js
 *
 * Orquesta la inicialización de todos los módulos de la aplicación.
*/

import { initAnalytics, trackEvent } from './analytics';
import { initFaq } from './faq';
import { initForm } from './form';
import { initMobileMenu } from './mobile-menu';
import { initDesktopMenu } from './desktop-menu';

/**
 * Inicializa la navegación por pestañas en la sección de servicios.
 */
function initServiceAsideMenu() {
  const menuContainer = document.querySelector('[role="tablist"]');
  if (!menuContainer) return;

  const tabs = Array.from(menuContainer.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

  const switchTab = (clickedTab) => {
    if (!clickedTab || clickedTab.getAttribute('aria-selected') === 'true') {
      return;
    }

    // 1. Desactivar todas las pestañas y ocultar todos los paneles
    tabs.forEach((tab) => {
      tab.setAttribute('aria-selected', 'false');
      tab.classList.remove('active');
    });
    panels.forEach((panel) => {
      panel.hidden = true;
      panel.classList.remove('active');
    });

    // 2. Activar la pestaña clickeada y mostrar el panel correspondiente
    clickedTab.setAttribute('aria-selected', 'true');
    clickedTab.classList.add('active');

    const panelId = clickedTab.getAttribute('aria-controls');
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
      targetPanel.hidden = false;
      targetPanel.classList.add('active');
      // Actualizar la URL sin recargar la página para permitir compartir
      window.history.pushState(null, '', clickedTab.getAttribute('href'));
    }
  };

  menuContainer.addEventListener('click', (event) => {
    const targetTab = event.target.closest('[role="tab"]');
    if (!targetTab) return;
    event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    switchTab(targetTab);
  });

  // Activar pestaña basada en el hash de la URL al cargar la página
  const { hash: currentHash } = window.location;
  const tabToActivate = currentHash
    ? tabs.find((tab) => tab.getAttribute('href') === currentHash)
    : tabs[0];
  switchTab(tabToActivate);
}

/**
 * Anima el contador de estadísticas cuando es visible en el viewport.
 */
function initStatsCounter() {
  const counter = document.querySelector('.counter-number');
  if (!counter) return;

  const animateCounter = () => {
    const target = Number(counter.getAttribute('data-target'));
    if (Number.isNaN(target)) return;

    const duration = 2000; // ms
    let startTimestamp = null;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      counter.innerText = Math.floor(progress * target).toLocaleString('es-AR');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      animateCounter();
      obs.unobserve(counter); // Animar solo una vez
    }
  }, { threshold: 0.5 });
  observer.observe(counter);
}

/**
 * Inicializa el carrusel de Instagram usando la librería Swiper.
 */
function initInstagramCarousel() {
  const carousel = document.querySelector('.instagram-carousel');
  if (carousel) {
    // eslint-disable-next-line no-new
    new Swiper(carousel, {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: 'fade',
    });
  }
}

/**
 * Muestra notificaciones "toast" de urgencia en páginas de SEO local.
 */
function initUrgencyToasts() {
  // 1. Mejoras en la selección y condiciones de activación
  const toastElement = document.getElementById('urgency-toast');
  if (!toastElement) return;

  // Corregido: La condición correcta para verificar el tipo de página.
  if (document.body.dataset.pageType !== 'local-seo') {
    return;
  }

  // 2. Respetar las preferencias del usuario para reducir movimiento
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Si el usuario prefiere movimiento reducido, no mostramos toasts periódicos.
    // Podríamos optar por mostrar uno solo, estático, o ninguno.
    return;
  }

  // 3. Obtener mensajes desde el HTML para mayor flexibilidad
  const messages = JSON.parse(toastElement.dataset.messages || '[]');
  if (messages.length === 0) return;

  const toastMessage = toastElement.querySelector('.toast-message');
  const closeButton = toastElement.querySelector('.toast-close');
  let toastInterval;
  let currentMessageIndex = 0;

  // 4. Barajar los mensajes para evitar repeticiones
  const shuffledMessages = [...messages].sort(() => Math.random() - 0.5);

  const hideToast = (wasClosedByUser = false) => {
    toastElement.classList.remove('show');
    if (wasClosedByUser) {
      clearInterval(toastInterval); // Detener futuros toasts si el usuario lo cierra
    }
  };

  const showNextToast = () => {
    if (currentMessageIndex >= shuffledMessages.length) {
      currentMessageIndex = 0; // Reiniciar si se mostraron todos
    }
    toastMessage.textContent = shuffledMessages[currentMessageIndex];
    currentMessageIndex += 1;

    toastElement.classList.add('show');

    // Ocultar automáticamente después de un tiempo
    setTimeout(hideToast, 7000);
  };

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      hideToast(true);
    });
  }

  // Mostrar el primer toast después de un retraso
  setTimeout(() => {
    showNextToast();
    // Mostrar nuevos toasts periódicamente
    toastInterval = setInterval(showNextToast, 20000);
  }, 8000);

  // 5. Mejoras de accesibilidad
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');
}

/**
 * Anima la aparición de las secciones al hacer scroll.
 */
function initScrollReveal() {
  const sectionsToReveal = document.querySelectorAll('section[data-reveal]');

  if (!sectionsToReveal.length) return;

  const revealOptions = {
    root: null, // relativo al viewport
    rootMargin: '0px',
    threshold: 0.1, // 10% del elemento debe estar visible
  };

  const revealCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animar solo una vez
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  sectionsToReveal.forEach((section) => revealObserver.observe(section));
}

/**
 * Gestiona la visibilidad del botón flotante de WhatsApp.
 */
function initWhatsAppButton() {
  const whatsAppButton = document.getElementById('whatsapp_chat'); // ID corregido
  if (!whatsAppButton) return;

  // eslint-disable-next-line max-len
  const scrollThreshold = window.innerHeight * 0.8; // Aparece después del 80% del alto de la ventana

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      whatsAppButton.classList.add('visible');
    } else {
      whatsAppButton.classList.remove('visible');
    }
  };

  whatsAppButton.addEventListener('click', () => {
    trackEvent('cta_click', {
      cta_name: 'whatsapp_sticky',
      cta_position: 'floating',
    });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Registra el Service Worker para habilitar funcionalidades offline.
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        // eslint-disable-next-line no-unused-vars
        .then((registration) => {
          // console.log('Service Worker registered with scope:', registration.scope);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          // console.error('Service Worker registration failed:', error);
        });
    });
  }
}

// Punto de entrada principal de la aplicación
function main() {
  initAnalytics();
  initForm();
  initFaq();
  initServiceAsideMenu();
  initInstagramCarousel();
  initMobileMenu();
  initDesktopMenu();
  initStatsCounter();
  initUrgencyToasts();
  initScrollReveal();
  initWhatsAppButton();
  registerServiceWorker(); // Registrar el Service Worker
}

// Ejecutar la inicialización cuando el DOM esté listo.
document.addEventListener('DOMContentLoaded', main);
