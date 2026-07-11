/**
 * Main application entry point.
 * Sprint 1: Initial setup.
 *
 * This file will orchestrate the initialization of all other modules.
 */

import { initMenu } from './menu.js';
import { initFaq } from './faq.js';
import { initForm } from './form.js';
import { initWhatsAppButton } from './whatsapp.js';
import { initAnalytics, trackEvent } from './analytics.js';

console.log("Mudanzas Miranda - App Initialized");

function initHeroCta() {
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', () => {
            trackEvent('cta_click', {
                cta_name: 'hero_whatsapp',
                cta_position: 'hero'
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initFaq();
    initForm();
    initWhatsAppButton();
    initAnalytics();
    initHeroCta();
    // In future sprints, we will initialize other modules, e.g.:
    // initLazyLoad();
    // initObservers();
});
