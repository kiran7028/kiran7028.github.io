/**
 * Contact Loader Module
 * Dynamically loads and renders contact section
 */

class ContactLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'contact/contact-config.json';
        this.socialLinksPath = 'contact/social-links.json';
    }

    /**
     * Initialize and load contact section
     */
    async init() {
        try {
            const config = await this.loadJSON(this.configPath);
            const socialLinks = await this.loadJSON(this.socialLinksPath);
            this.renderContact(config, socialLinks);
        } catch (error) {
            console.error('Error loading contact:', error);
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
     * Render contact section
     */
    renderContact(config, socialLinks) {
        const socialHTML = socialLinks.links
            .map(link => this.renderSocialLink(link))
            .join('\n                    ');

        if (this.container) {
            this.container.innerHTML = `
                <h2>${config.sectionTitle}</h2>
                <form id="contact-form" class="contact-form" action="${config.form.action}" method="${config.form.method}" data-recipient="${config.form.recipient}">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>
                <p class="collab">${config.message}</p>
                <div class="social">
                    ${socialHTML}
                </div>
            `;
        }
    }

    /**
     * Render a single social link
     */
    renderSocialLink(link) {
        if (link.icon) {
            // WhatsApp with icon
            return `<a href="${link.url}" target="_blank" aria-label="${link.ariaLabel}" class="project-link" style="display:flex;align-items:center;gap:0.4rem;">
                        <i class="${link.icon}" style="font-size:18px;color:${link.iconColor};"></i>
                        ${link.label}
                    </a>`;
        } else {
            // Regular link
            return `<a href="${link.url}" target="_blank" rel="noopener" aria-label="${link.ariaLabel}" class="project-link">${link.label}</a>`;
        }
    }

    /**
     * Show error message
     */
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <h2>Contact</h2>
                <p style="color: var(--muted);">Unable to load contact information. Please try again later.</p>
            `;
        }
    }
}

// Initialize contact loader when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const contactLoader = new ContactLoader('contact-container');
    contactLoader.init();
});
