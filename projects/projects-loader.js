/**
 * Projects Loader Module
 * Dynamically loads and renders project cards
 */

class ProjectsLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'projects/projects-config.json';
    }

    /**
     * Initialize and load projects
     */
    async init() {
        try {
            const config = await this.loadJSON(this.configPath);
            await this.renderProjects(config);
        } catch (error) {
            console.error('Error loading projects:', error);
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
     * Render projects section
     */
    async renderProjects(config) {
        const projects = await Promise.all(
            config.projects.map(project => this.renderProject(project))
        );

        if (this.container) {
            this.container.innerHTML = `
                <h2>${config.sectionTitle}</h2>
                <div class="projects-grid">
                    ${projects.join('')}
                </div>
            `;
        }
    }

    /**
     * Render a single project card
     */
    async renderProject(projectRef) {
        const project = await this.loadJSON(projectRef.dataFile);

        const techStack = project.technologies.join(' | ');
        const links = project.links
            .map(link => `<a href="${link.url}" class="project-link">${link.label}</a>`)
            .join('\n                            ');

        return `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p class="project-tech">${techStack}</p>
                <p>${project.description}</p>
                <div class="project-links">
                    ${links}
                </div>
            </div>
        `;
    }

    /**
     * Show error message
     */
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <h2>DevOps Projects</h2>
                <p style="color: var(--muted);">Unable to load projects. Please try again later.</p>
            `;
        }
    }
}

// Initialize projects loader when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const projectsLoader = new ProjectsLoader('projects-container');
    projectsLoader.init();
});
