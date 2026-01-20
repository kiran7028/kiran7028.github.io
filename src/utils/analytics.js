/**
 * Google Analytics 4 Configuration
 * Privacy-friendly analytics setup
 */

// Analytics Configuration
const ANALYTICS_CONFIG = {
    // Replace with your GA4 Measurement ID
    // Get this from: https://analytics.google.com/
    measurementId: 'G-VZPNDMM5R9', // TODO: Replace with actual ID

    // Privacy settings
    anonymizeIp: true,
    cookieFlags: 'SameSite=None;Secure',

    // Custom events to track
    events: {
        downloadCV: 'download_cv',
        viewProject: 'view_project',
        viewCertification: 'view_certification',
        contactClick: 'contact_click',
        socialClick: 'social_click'
    }
};

/**
 * Initialize Google Analytics
 */
function initAnalytics() {
    // Check if GA4 Measurement ID is configured
    if (ANALYTICS_CONFIG.measurementId === 'G-VZPNDMM5R9') {
        console.warn('⚠️ Google Analytics not configured. Please update ANALYTICS_CONFIG.measurementId');
        return;
    }

    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.measurementId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', ANALYTICS_CONFIG.measurementId, {
        anonymize_ip: ANALYTICS_CONFIG.anonymizeIp,
        cookie_flags: ANALYTICS_CONFIG.cookieFlags
    });

    console.log('✅ Google Analytics initialized');
}

/**
 * Track custom event
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Event parameters
 */
function trackEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
        console.log(`📊 Event tracked: ${eventName}`, eventParams);
    }
}

/**
 * Track page view
 * @param {string} pagePath - Page path
 * @param {string} pageTitle - Page title
 */
function trackPageView(pagePath, pageTitle) {
    if (typeof gtag === 'function') {
        gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
}

/**
 * Setup event listeners for analytics tracking
 */
function setupAnalyticsTracking() {
    // Track CV downloads
    const cvLinks = document.querySelectorAll('a[href*="CV.pdf"], a[href*="resume"]');
    cvLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent(ANALYTICS_CONFIG.events.downloadCV, {
                link_url: link.href
            });
        });
    });

    // Track project views
    const projectLinks = document.querySelectorAll('.project-card a, [data-track="project"]');
    projectLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent(ANALYTICS_CONFIG.events.viewProject, {
                project_name: link.textContent.trim(),
                link_url: link.href
            });
        });
    });

    // Track certification views
    const certLinks = document.querySelectorAll('.certification-card a, [data-track="certification"]');
    certLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent(ANALYTICS_CONFIG.events.viewCertification, {
                certification_name: link.textContent.trim(),
                link_url: link.href
            });
        });
    });

    // Track contact clicks
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], [data-track="contact"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', () => {
            trackEvent(ANALYTICS_CONFIG.events.contactClick, {
                contact_type: 'email'
            });
        });
    });

    // Track social media clicks
    const socialLinks = document.querySelectorAll('.social-links a, [data-track="social"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', () => {
            const platform = link.href.includes('linkedin') ? 'LinkedIn' :
                link.href.includes('github') ? 'GitHub' :
                    link.href.includes('twitter') ? 'Twitter' : 'Other';

            trackEvent(ANALYTICS_CONFIG.events.socialClick, {
                platform: platform,
                link_url: link.href
            });
        });
    });

    console.log('✅ Analytics event tracking configured');
}

// Initialize analytics when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initAnalytics();
        setupAnalyticsTracking();
    });
} else {
    initAnalytics();
    setupAnalyticsTracking();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initAnalytics,
        trackEvent,
        trackPageView,
        ANALYTICS_CONFIG
    };
}
