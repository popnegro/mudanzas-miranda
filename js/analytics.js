/**
 * analytics.js
 *
 * Handles the loading of Google Tag Manager and firing of analytics events.
 * Sprint 5
 */

const GTM_ID = 'GTM-XXXXXXX'; // Placeholder GTM ID

export function initAnalytics() {
    // Don't load GTM on development environments or if user has Do Not Track enabled
    if (window.location.hostname === 'localhost' || navigator.doNotTrack === '1') {
        console.log('Analytics disabled for localhost or Do Not Track is enabled.');
        return;
    }

    // Load GTM script during browser idle time to avoid impacting performance
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadGtm);
    } else {
        setTimeout(loadGtm, 2000); // Fallback for older browsers
    }
}

function loadGtm() {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',GTM_ID);
    console.log('GTM loaded.');
}

/**
 * Pushes an event to the dataLayer.
 * @param {string} eventName The name of the event.
 * @param {object} eventData The data associated with the event.
 */
export function trackEvent(eventName, eventData) {
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': eventName,
            ...eventData
        });
    } else {
        console.warn('dataLayer is not available. Event not tracked:', eventName, eventData);
    }
}
