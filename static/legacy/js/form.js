/**
 * form.js
 *
 * Handles the multi-step quote form, including validation and geolocation.
 */

import { trackEvent } from './analytics';

export function initForm() {
    const form = document.getElementById('quote-form');
    if (!form) return;

    const nextBtns = form.querySelectorAll(".btn-next");
    const prevBtns = form.querySelectorAll(".btn-prev");
    const formSteps = form.querySelectorAll(".form-step");
    const progressSteps = form.querySelectorAll(".progress-step");
    const progressText = document.getElementById('progress-text'); // Para anunciar el paso actual
    const progress = document.getElementById("progress");
    const originInput = form.querySelector('#origin');
    const submitBtn = form.querySelector('button[type="submit"]');
    const geolocateBtn = document.getElementById('geolocate-btn');
    
    // Configuración del campo de fecha
    const dateInput = form.querySelector('#moving_date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }
    
    // Helper para gestionar el estado de carga de los botones de envío
    const setSubmitButtonLoading = (button, isLoading) => {
        button.disabled = isLoading;
        // La clase 'is-loading' activa el spinner y oculta el texto via CSS
        button.classList.toggle('is-loading', isLoading);
    };

    let formStepsNum = 0;    

    nextBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (validateStep(formStepsNum)) {
                formStepsNum++;
                updateFormSteps();
                updateProgressbar();
            }
        });
    });

    prevBtns.forEach((btn) => {        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            formStepsNum--;
            updateFormSteps();
            updateProgressbar();
        });
    });

    // Validación en tiempo real al salir de un campo    
    form.querySelectorAll('input[required], select[required]').forEach((field) => {
        field.addEventListener('blur', () => {
            validateField(field);
        });
    });

    if (geolocateBtn) {
        geolocateBtn.addEventListener('click', (e) => {            
            e.preventDefault();
            handleGeolocation(geolocateBtn);
        });
    }
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateStep(formStepsNum)) {
            setSubmitButtonLoading(submitBtn, true);

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Track the conversion event
            trackEvent('form_submission', {
                form_id: 'quote-form', // eslint-disable-line camelcase
                service_type: data.service_type, // eslint-disable-line camelcase
            });
            
            // Simulación de envío al servidor
            setTimeout(() => {
                setSubmitButtonLoading(submitBtn, false);

                // Ocultar el contenido del formulario (pasos y barra de progreso)
                const formContent = form.querySelectorAll('.progressbar, .form-step, #progress-text');
                formContent.forEach((el) => { el.style.display = 'none'; });

                // Crear y mostrar el mensaje de éxito dentro del formulario
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success-message';
                successMessage.innerHTML = `
                    <div class="success-icon"><i class="fa-solid fa-check-circle"></i></div>
                    <h3>¡Gracias!</h3>
                    <p>Tu solicitud ha sido enviada con éxito. Nos pondremos en contacto a la brevedad.</p>
                `;
                form.appendChild(successMessage);
            }, 2000);
        }
    });

    function updateFormSteps() {
        formSteps.forEach((formStep) => {            
            if (formStep.classList.contains('form-step-active')) {
                formStep.classList.remove('form-step-active');
            }
        });
        formSteps[formStepsNum].classList.add('form-step-active');
    }

    function updateProgressbar() {
        progressSteps.forEach((progressStep, idx) => {            
            if (idx < formStepsNum + 1) {
                progressStep.classList.add("progress-step-active");
            } else {
                progressStep.classList.remove("progress-step-active");
            }
        });
        progress.style.width = (formStepsNum / (progressSteps.length - 1)) * 100 + "%";

        // Anuncio para lectores de pantalla
        if (progressText) {
            const currentStep = progressSteps[formStepsNum];
            progressText.textContent = `Paso ${formStepsNum + 1} de ${formSteps.length}: ${currentStep.dataset.title}`;
        }
    }

    function validateStep(stepIndex) {
        let isStepValid = true;
        const currentStep = formSteps[stepIndex];
        const fieldsToValidate = currentStep.querySelectorAll('[required]');

        // Iterar en orden inverso para enfocar el primer campo con error
        for (let i = fieldsToValidate.length - 1; i >= 0; i--) {
            const field = fieldsToValidate[i];
            if (!validateField(field)) {
                isStepValid = false;
                field.focus(); // Mover el foco al primer campo inválido
            }
        }
        return isStepValid;
    }

    function validateField(field) {
        const value = field.value.trim();
        let message = '';

        if (field.hasAttribute('required') && value === '') {
            message = 'Este campo es obligatorio.';
        } else if (field.type === 'email' && value !== '' && !isValidEmail(value)) {
            message = 'Por favor, ingresá una dirección de correo válida.';
        } else if (field.type === 'tel' && value !== '' && !isValidPhone(value)) {
            message = 'Ingresá un teléfono válido con código de área (10-14 dígitos).';
        }

        if (message) {
            showError(field, message);
            return false;            
        }
        clearError(field);
        return true;
    }

    function showError(field, message) {
        const inputGroup = field.closest('.input-group');
        const errorEl = inputGroup.querySelector('.error-message');
        const errorId = `${field.id}-error`;

        field.classList.add('input-error');
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', errorId);
        errorEl.id = errorId;
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    function clearError(field) {
        const inputGroup = field.closest('.input-group');
        const errorEl = inputGroup.querySelector('.error-message');

        field.classList.remove('input-error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    function isValidEmail(email) {        
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const cleanedPhone = String(phone).replace(/\D/g, '');
        const re = /^\d{10,14}$/;
        return re.test(cleanedPhone);
    }

    // --- Geolocation Helper Functions (scoped within initForm) ---

    function showGeolocationError(button, message) {
        const inputGroup = button.closest('.input-group');
        let errorEl = inputGroup.querySelector('.geolocation-error');
        if (!errorEl) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message geolocation-error';
            errorEl.style.display = 'block';
            inputGroup.appendChild(errorEl);
        }
        errorEl.textContent = message;
    }

    function clearGeolocationError(button) {
        const errorEl = button.closest('.input-group').querySelector('.geolocation-error');
        if (errorEl) errorEl.textContent = '';
    }

    function setGeolocateButtonLoading(button, isLoading, iconElement, removeClasses, addClasses) {
        button.disabled = isLoading;
        if (isLoading) {
            button.classList.add('is-loading');
            if (iconElement) iconElement.classList.remove(...removeClasses);
            if (iconElement) iconElement.classList.add(...addClasses);
        } else {
            button.classList.remove('is-loading');
            if (iconElement) iconElement.classList.remove(...removeClasses);
            if (iconElement) iconElement.classList.add(...addClasses);
        }
    }

    async function handleGeolocation(button) {
        if (!navigator.geolocation) {
            showGeolocationError(button, 'La geolocalización no es compatible con tu navegador.');
            return;
        }

        const icon = button.querySelector('i');

        setGeolocateButtonLoading(button, true, icon, ['fa-location-crosshairs'], ['fa-spinner', 'fa-spin']);
        originInput.disabled = true;
        clearGeolocationError(button);

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            });
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            if (!response.ok) throw new Error('Error en el servicio de geocodificación.');

            const data = await response.json();
            if (data && data.address) {
                const {
                    road, house_number: houseNumber, city, town, suburb,
                } = data.address;
                const addressParts = [
                    `${road || ''} ${houseNumber || ''}`.trim(),
                    suburb,
                    city || town,
                ];
                const formattedAddress = addressParts.filter(Boolean).join(', ');
                originInput.value = formattedAddress;
                validateField(originInput);
            } else {
                throw new Error('No se pudo encontrar una dirección para tu ubicación.');
            }
        } catch (error) {
            const message = error.code === 1 ? 'Permiso de ubicación denegado.' : 'No se pudo obtener tu ubicación.';
            showGeolocationError(button, message);
        } finally {
            setGeolocateButtonLoading(button, false, icon, ['fa-spinner', 'fa-spin'], ['fa-location-crosshairs']);
            originInput.disabled = false;
        }
    }
}
