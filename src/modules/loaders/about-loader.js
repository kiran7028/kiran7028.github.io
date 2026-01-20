/**
 * About Loader Module
 * Dynamically loads and renders about section content
 */

class AboutLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.dataPath = 'about/about-content.json';
    }

    async init() {
        try {
            const data = await this.loadJSON(this.dataPath);
            this.renderAbout(data);
        } catch (error) {
            console.error('Error loading about content:', error);
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

    renderAbout(data) {
        if (this.container) {
            this.container.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.content}</p>
            `;
        }
    }

    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <h2>About Me</h2>
                <p style="color: var(--muted);">Unable to load content. Please try again later.</p>
            `;
        }
    }
}
