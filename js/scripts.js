document.addEventListener('DOMContentLoaded', () => { // Ejecutar todo cuando el DOM esté listo
    // 2. Lógica para el menú móvil (reemplaza la necesidad de jQuery para esta tarea)
    const mobileToggle = document.querySelector('.mobile-toggle-btn');
    const navBar = document.querySelector('.nav-bar');
    if(mobileToggle && navBar) {
        mobileToggle.addEventListener('click', () => {
            navBar.classList.toggle('nav-open');
        }, { passive: true });
    }

    // 3. Lógica para limpiar parámetros de la URL
    const r = new URL(window.location.href);
    if (r.searchParams.has('i')) {
        r.searchParams.delete('i');
        history.pushState({}, '', r.href);
    }

    // 5. Lógica para el acordeón (solo uno abierto a la vez)
    const detailsElements = document.querySelectorAll('.accordion-1 details');
    detailsElements.forEach(details => {
        details.addEventListener('toggle', () => {
            if (!details.open) return;
            detailsElements.forEach(otherDetails => {
                if (otherDetails !== details) {
                    otherDetails.open = false;
                }
            });
        });
    });

    // 6. Lógica para el mapa interactivo de Leaflet
    if (document.getElementById('map')) {
        const markers = {}; // Objeto para almacenar los marcadores
        const map = L.map('map').setView([-33.5, -68.8], 8); // Vista centrada en Mendoza

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const locations = [
            { name: 'Ciudad', coords: [-32.8895, -68.8458] },
            { name: 'Godoy Cruz', coords: [-32.9167, -68.8333] },
            { name: 'Guaymallén', coords: [-32.8995, -68.7936] },
            { name: 'Las Heras', coords: [-32.85, -68.8] },
            { name: 'Luján de Cuyo', coords: [-33.0333, -68.8833] },
            { name: 'Maipú', coords: [-32.9667, -68.7333] },
            { name: 'San Martín', coords: [-33.0805, -68.4681] },
            { name: 'Rivadavia', coords: [-33.1914, -68.4631] },
            { name: 'Junín', coords: [-33.15, -68.4833] },
            { name: 'Tunuyán', coords: [-33.5795, -69.015] },
            { name: 'Tupungato', coords: [-33.3719, -69.1469] },
            { name: 'San Carlos', coords: [-33.775, -69.0333] },
            { name: 'San Rafael', coords: [-34.6167, -68.3333] },
            { name: 'General Alvear', coords: [-34.975, -67.690] },
            { name: 'Malargüe', coords: [-35.475, -69.585] }
        ];

        const truckIcon = L.icon({
            iconUrl: 'img/favicon.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        const highlightIcon = L.icon({
            iconUrl: 'img/favicon.png',
            iconSize: [48, 48],
            iconAnchor: [24, 24],
            popupAnchor: [0, -24]
        });

        locations.forEach(location => {
            const marker = L.marker(location.coords, { icon: truckIcon }).addTo(map).bindPopup(`<b>Mudanzas en ${location.name}</b>`);
            markers[location.name] = marker;
        });

        const destinationCards = document.querySelectorAll('.destination-card');
        destinationCards.forEach(card => {
            const titleElement = card.querySelector('.destination-card__title');
            const locationName = titleElement.textContent.replace('Mudanzas en ', '').trim();

            card.addEventListener('mouseenter', () => {
                if (markers[locationName]) {
                    markers[locationName].setIcon(highlightIcon).openPopup();
                }
            });

            card.addEventListener('mouseleave', () => {
                if (markers[locationName]) {
                    markers[locationName].setIcon(truckIcon).closePopup();
                }
            });
        });
    }

    // Lógica para resaltar el enlace del menú activo (Scrollspy)
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.menu a[href^="#"]');
    if (sections.length > 0 && navLinks.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active-link');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active-link');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });
        sections.forEach(section => observer.observe(section));
    }

    // Lógica para el formulario de cotización
    const cotizadorForm = document.getElementById('cotizador-form');
    if (cotizadorForm) {
        cotizadorForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const origen = document.getElementById('origen').value;
            const destino = document.getElementById('destino').value;
            const fecha = document.getElementById('fecha').value;

            // Formatear la fecha para que sea más legible
            const fechaFormateada = new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            // Tu número de WhatsApp en formato internacional sin '+' o '00'
            const telefonoWhatsapp = '5492615130910';

            // Crear el mensaje estructurado
            let mensaje = `¡Hola! Quisiera un presupuesto para una mudanza con los siguientes datos:\n\n`;
            mensaje += `*Origen:* ${origen}\n`;
            mensaje += `*Destino:* ${destino}\n`;
            mensaje += `*Fecha estimada:* ${fechaFormateada}\n\n`;
            mensaje += `Quedo a la espera de su contacto. ¡Gracias!`;

            // Codificar el mensaje para la URL
            const mensajeCodificado = encodeURIComponent(mensaje);

            // Crear y abrir la URL de WhatsApp
            const urlWhatsapp = `https://wa.me/${telefonoWhatsapp}?text=${mensajeCodificado}`;
            window.open(urlWhatsapp, '_blank');
        });

        // Geolocalización
        const geolocateBtn = document.getElementById('geolocate-btn');
        const origenInput = document.getElementById('origen');
        if (geolocateBtn && origenInput) {
            geolocateBtn.addEventListener('click', () => {
                if (!navigator.geolocation) {
                    alert('La geolocalización no es soportada por tu navegador.');
                    return;
                }

                geolocateBtn.querySelector('i').classList.add('fa-spin'); // Feedback visual

                const successCallback = async (position) => {
                    const { latitude, longitude } = position.coords;
                    // Usar una API de geocodificación inversa (ej. OpenStreetMap/Nominatim)
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        origenInput.value = data.display_name || `${latitude}, ${longitude}`;
                    } catch (error) {
                        origenInput.value = `${latitude}, ${longitude}`;
                    }
                    geolocateBtn.querySelector('i').classList.remove('fa-spin');
                };

                const errorCallback = () => {
                    geolocateBtn.querySelector('i').classList.remove('fa-spin');
                    alert('No se pudo obtener tu ubicación. Por favor, comprueba los permisos o ingrésala manualmente.');
                };

                // Se añade un timeout de 10 segundos para mejorar la experiencia de usuario.
                navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { timeout: 10000 });
            });
        }
    }

    // Lógica para el nuevo Hero Carousel
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        const wrapper = heroCarousel.closest('.hero-carousel-wrapper');
        const slides = heroCarousel.querySelectorAll('.hero-slide');
        const indicatorsContainer = document.querySelector('.hero-carousel-indicators');
        let currentSlide = 0;
        let autoPlayInterval;

        // Crear indicadores
        slides.forEach((slide, index) => {
            const indicator = document.createElement('button');
            indicator.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
            indicator.dataset.index = index;
            indicatorsContainer.appendChild(indicator);
        });

        const indicators = indicatorsContainer.querySelectorAll('button');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentSlide = index;
            resetAutoPlay();
        }

        function next() {
            showSlide((currentSlide + 1) % slides.length);
        }

        function prev() {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(next, 5000); // Cambia cada 5 segundos
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => showSlide(parseInt(indicator.dataset.index)));
        });

        wrapper.addEventListener('mouseenter', stopAutoPlay);
        wrapper.addEventListener('mouseleave', startAutoPlay);

        showSlide(0); // Mostrar la primera imagen al cargar
        startAutoPlay(); // Iniciar el autoplay
    }

    // Lógica para animar los números de las estadísticas
    const statsContainer = document.querySelector('[data-animate-numbers="true"]');
    if (statsContainer) {
        const animateNumbers = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    const statNumbers = entry.target.querySelectorAll('.stat-card__number');
                    statNumbers.forEach(statNumber => {
                        const finalValue = parseInt(statNumber.dataset.value, 10);
                        const duration = 2000; // 2 segundos
                        let startTime = null;

                        const step = (timestamp) => {
                            if (!startTime) startTime = timestamp;
                            const progress = Math.min((timestamp - startTime) / duration, 1);
                            const currentValue = Math.floor(progress * finalValue);

                            statNumber.textContent = statNumber.dataset.value.replace(/\d+/, currentValue.toLocaleString('es-AR'));

                            if (progress < 1) {
                                window.requestAnimationFrame(step);
                            }
                        };
                        window.requestAnimationFrame(step);
                    });
                    entry.target.dataset.animated = "true"; // Marcar como animado
                }
            });
        };

        const observer = new IntersectionObserver(animateNumbers, {
            threshold: 0.5 // Se activa cuando el 50% del elemento es visible
        });
        observer.observe(statsContainer);
    }
});