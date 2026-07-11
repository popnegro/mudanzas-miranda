/**
 * faq.js
 *
 * Handles smooth accordion animation for the FAQ section.
 * This overrides the default <details> toggle behavior to implement a slide animation.
 * Sprint 3
 */

export function initFaq() {
    const detailsElements = document.querySelectorAll('.faq-list details');

    if (!detailsElements.length) {
        return;
    }

    detailsElements.forEach((details) => {
        const summary = details.querySelector('summary');
        const content = summary.nextElementSibling;

        summary.addEventListener('click', (event) => {
            // Prevent the default toggle behavior
            event.preventDefault();

            if (details.open) {
                // Closing animation
                const animation = content.animate(
                    { height: [content.offsetHeight + 'px', '0px'] },
                    { duration: 300, easing: 'ease-out' }
                );
                animation.onfinish = () => {
                    details.removeAttribute('open');
                };
            } else {
                // Opening animation
                details.setAttribute('open', '');
                const animation = content.animate(
                    { height: ['0px', content.offsetHeight + 'px'] },
                    { duration: 300, easing: 'ease-in-out' }
                );
            }
        });
    });
}
