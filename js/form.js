/**
 * form.js
 *
 * Handles client-side form validation for the quote form.
 * Sprint 4
 */

import { trackEvent } from './analytics.js';

export function initForm() {
    const form = document.getElementById('quote-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm(form)) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Track the conversion event
            trackEvent('form_submission', {
                form_id: 'quote-form',
                service_type: data.service_type
            });

            console.log('Form data is valid:', data);
            // Here you would typically send the data to a server
            // e.g., fetch('/api/quote', { method: 'POST', body: JSON.stringify(data) });
            alert('¡Gracias! Tu solicitud ha sido enviada.');
            form.reset();
        }
    });
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        const errorEl = field.nextElementSibling;
        if (!field.value.trim()) {
            isValid = false;
            showError(field, errorEl, 'Este campo es obligatorio.');
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            isValid = false;
            showError(field, errorEl, 'Por favor, ingresá un email válido.');
        } else {
            clearError(field, errorEl);
        }
    });

    return isValid;
}

function showError(field, errorEl, message) {
    field.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
}

function clearError(field, errorEl) {
    field.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.style.display = 'none';
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
