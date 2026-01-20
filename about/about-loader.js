/**
 * About Loader Module
 * Dynamically loads and renders about section content
 */

class AboutLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataPath = 'about/about-content.json';
    }

    /**
     * Initialize and load about content
     */
    async init() {
        try {
            const data = await this.loadJSON(this.dataPath);
            this.renderAbout(data);
        } catch (error) {
            console.error('Error loading about content:', error);
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
     * Render about content
     */
    renderAbout(data) {
        if (this.container) {
            this.container.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.content}</p>
            `;
        }
    }

    /**
     * Show error message
     */
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <h2>About Me</h2>
                <p style="color: var(--muted);">Unable to load content. Please try again later.</p>
            `;
        }
    }
}

// Initialize about loader when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const aboutLoader = new AboutLoader('about-container');
    aboutLoader.init();
});
