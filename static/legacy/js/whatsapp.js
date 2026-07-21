/**
 * whatsapp.js
 *
 * Handles the visibility of the sticky WhatsApp button.
 * Sprint 4
 */

import { trackEvent } from './analytics.js';

export function initWhatsAppButton() {
    const whatsAppButton = document.getElementById('whatsapp-sticky');
    if (!whatsAppButton) return;

    const scrollThreshold = window.innerHeight * 0.8; // Show after 80% of viewport height

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
            cta_position: 'floating'
        });
    });

    // Use a passive listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
}
