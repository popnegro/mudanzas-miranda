/**
 * analytics.js
 *
 * Handles the loading of Google Tag Manager and firing of analytics events.
 * Sprint 5
 */

const GTM_ID = 'GTM-MSL2VRBG';
const GA_ID = 'G-FBVRRZJFP2';
const AW_ID = 'AW-924516027';

function gtag(...args) {
  window.dataLayer.push(...args);
}

export function initAnalytics() {
    // Don't load GTM on development environments or if user has Do Not Track enabled
    if (window.location.hostname === 'localhost' || navigator.doNotTrack === '1') {
        console.log('Analytics disabled for localhost or Do Not Track is enabled.');
        // Make gtag and dataLayer available in dev to prevent errors, but don't send data.
        window.dataLayer = window.dataLayer || [];
        window.gtag = gtag;
        return;
    }

    // Load GTM script during browser idle time to avoid impacting performance
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadAnalyticsScripts);
    } else {
        setTimeout(loadAnalyticsScripts, 2000); // Fallback for older browsers
    }
}

function loadAnalyticsScripts() {
    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag('js', new Date());

    // Configure Google Analytics and Ads
    // Set debug_mode to false for production
    const isDebug = new URLSearchParams(window.location.search).has('debug');
    window.gtag('config', GA_ID, { 'debug_mode': isDebug });
    window.gtag('config', AW_ID, { 'debug_mode': isDebug });

    // GTM Loader
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',GTM_ID);

    // Make conversion function globally available for inline scripts
    window.gtag_report_conversion = gtagReportConversion;
}

/**
 * Pushes an event to the dataLayer.
 * @param {string} eventName The name of the event.
 * @param {object} eventData The data associated with the event.
 */
export function trackEvent(eventName, eventData) {
    if (window.dataLayer) {
        window.dataLayer.push({
            event: eventName,
            ...eventData,
        });
    } else {
        console.warn('dataLayer is not available. Event not tracked:', eventName, eventData);
    }
}

/**
 * Reports a conversion to Google Ads.
 * @param {string} [url] - Optional URL to redirect to after conversion.
 */
function gtagReportConversion(url) {
    const callback = () => {
        if (typeof url !== 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', { send_to: `${AW_ID}/L3muCKa1_N0BELv967gD`, event_callback: callback });
}
