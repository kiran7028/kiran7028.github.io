/**
 * Certifications Loader Module
 * Dynamically loads and renders certifications from JSON files
 * Similar structure to Skills Loader
 */

class CertificationsLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'certifications/certifications-config.json';
    }

    /**
     * Initialize and load all certifications
     */
    async init() {
        try {
            const config = await this.loadJSON(this.configPath);
            await this.renderCertifications(config.categories);
        } catch (error) {
            console.error('Error loading certifications:', error);
            this.showError();
        }
    }

    /**
     * Load JSON file
     */
    async loadJSON(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }
        return await response.json();
    }

    /**
     * Render all certification categories
     */
    async renderCertifications(categories) {
        const certificationsHTML = await Promise.all(
            categories.map(category => this.renderCategory(category))
        );

        if (this.container) {
            this.container.innerHTML = `
                <h2>Certifications</h2>
                <div class="certifications-grid">
                    ${certificationsHTML.join('')}
                </div>
            `;
        }
    }

    /**
     * Render a single certification category
     */
    async renderCategory(category) {
        const certifications = await this.loadJSON(category.dataFile);

        const certItems = certifications
            .map(cert => `
                <div class="cert-item">
                    <h4>${cert.name}</h4>
                    <p class="cert-issuer">${cert.issuer}</p>
                    <p class="cert-date">${cert.date}</p>
                    ${cert.credentialId ? `<p class="cert-id">ID: ${cert.credentialId}</p>` : ''}
                    ${cert.verifyUrl ? `<a href="${cert.verifyUrl}" target="_blank" rel="noopener" class="cert-verify">Verify</a>` : ''}
                </div>
            `)
            .join('');

        return `
            <article class="cert-panel">
                <header class="cert-panel-header">
                    <img src="${category.icon}" alt="${category.iconAlt}" class="cert-icon">
                    <h3>${category.title}</h3>
                </header>
                <div class="cert-list">
                    ${certItems}
                </div>
            </article>
        `;
    }

    /**
     * Show error message
     */
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <h2>Certifications</h2>
                <div style="text-align: center; padding: 2rem; color: var(--muted);">
                    <p>Unable to load certifications. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Initialize certifications loader when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const certificationsLoader = new CertificationsLoader('certifications-container');
    certificationsLoader.init();
});
