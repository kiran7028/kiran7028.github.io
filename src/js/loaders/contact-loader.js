/**
 * Contact Loader Module
 * Dynamically loads and renders contact section
 */

class ContactLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'data/contact/contact-config.json';
        this.socialLinksPath = 'data/contact/social-links.json';
    }

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

    async loadJSON(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }
        return await response.json();
    }

    renderContact(config, socialLinks) {
        const socialHTML = socialLinks.links
            .map(link => this.renderSocialLink(link))
            .join('\n                    ');

        if (this.container) {
            this.container.innerHTML = `
                <form id="contact-form" class="contact-form" action="${config.form.action}" method="${config.form.method}" data-recipient="${config.form.recipient}">
                    <input type="text" name="name" placeholder="Your Name" required>
                    <input type="email" name="email" placeholder="Your Email" required>
                    <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
                <p style="text-align: center; color: var(--muted); margin-bottom: 1rem;">${config.message}</p>
                <div class="social">
                    ${socialHTML}
                </div>
            `;
        }
    }

    renderSocialLink(link) {
        if (link.icon) {
            const iconStyle = link.iconColor ? `color: ${link.iconColor};` : '';
            return `<a href="${link.url}" target="_blank" aria-label="${link.ariaLabel}" class="social-icon-link" rel="noopener">
                        <i class="${link.icon}" style="font-size: 28px; ${iconStyle}"></i>
                    </a>`;
        } else {
            // Fallback if no icon is provided
            return `<a href="${link.url}" target="_blank" rel="noopener" aria-label="${link.ariaLabel}" class="project-link">${link.label}</a>`;
        }
    }

    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <p style="color: var(--muted);">Unable to load contact information. Please try again later.</p>
            `;
        }
    }
}
