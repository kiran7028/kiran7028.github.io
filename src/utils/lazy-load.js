/**
 * Lazy Loading Utility
 * Implements lazy loading for images using Intersection Observer API
 */

class LazyLoader {
    constructor(options = {}) {
        this.options = {
            root: options.root || null,
            rootMargin: options.rootMargin || '50px',
            threshold: options.threshold || 0.01,
            loadingClass: options.loadingClass || 'lazy-loading',
            loadedClass: options.loadedClass || 'lazy-loaded',
            errorClass: options.errorClass || 'lazy-error'
        };

        this.observer = null;
        this.init();
    }

    /**
     * Initialize lazy loading
     */
    init() {
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            console.warn('⚠️ Intersection Observer not supported, loading all images immediately');
            this.loadAllImages();
            return;
        }

        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                root: this.options.root,
                rootMargin: this.options.rootMargin,
                threshold: this.options.threshold
            }
        );

        // Observe all lazy images
        this.observeImages();

        console.log('✅ Lazy loading initialized');
    }

    /**
     * Handle intersection events
     */
    handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }

    /**
     * Load a single image
     */
    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (!src) return;

        // Add loading class
        img.classList.add(this.options.loadingClass);

        // Create new image to preload
        const tempImg = new Image();

        tempImg.onload = () => {
            // Set actual src
            img.src = src;
            if (srcset) {
                img.srcset = srcset;
            }

            // Update classes
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.loadedClass);

            // Remove data attributes
            delete img.dataset.src;
            delete img.dataset.srcset;

            console.log(`✅ Image loaded: ${src}`);
        };

        tempImg.onerror = () => {
            img.classList.remove(this.options.loadingClass);
            img.classList.add(this.options.errorClass);
            console.error(`❌ Failed to load image: ${src}`);
        };

        tempImg.src = src;
        if (srcset) {
            tempImg.srcset = srcset;
        }
    }

    /**
     * Observe all lazy images
     */
    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');

        lazyImages.forEach(img => {
            // If browser supports native lazy loading and image has loading="lazy"
            if ('loading' in HTMLImageElement.prototype && img.loading === 'lazy') {
                // Let browser handle it
                return;
            }

            // Otherwise use Intersection Observer
            if (img.dataset.src) {
                this.observer.observe(img);
            }
        });

        console.log(`📊 Observing ${lazyImages.length} lazy images`);
    }

    /**
     * Load all images immediately (fallback for unsupported browsers)
     */
    loadAllImages() {
        const lazyImages = document.querySelectorAll('img[data-src]');

        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                delete img.dataset.src;
            }
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                delete img.dataset.srcset;
            }
        });
    }

    /**
     * Destroy the lazy loader
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize lazy loading when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.lazyLoader = new LazyLoader({
            rootMargin: '50px',
            threshold: 0.01
        });
    });
} else {
    window.lazyLoader = new LazyLoader({
        rootMargin: '50px',
        threshold: 0.01
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LazyLoader;
}
