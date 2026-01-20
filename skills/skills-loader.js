/**
 * Skills Loader Module
 * Dynamically loads and renders skills from JSON files
 */

class SkillsLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'skills/skills-config.json';
    }

    /**
     * Initialize and load all skills
     */
    async init() {
        try {
            const config = await this.loadJSON(this.configPath);
            await this.renderSkills(config.categories);
        } catch (error) {
            console.error('Error loading skills:', error);
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
     * Render all skill categories
     */
    async renderSkills(categories) {
        const skillsHTML = await Promise.all(
            categories.map(category => this.renderCategory(category))
        );

        if (this.container) {
            this.container.innerHTML = skillsHTML.join('');
        }
    }

    /**
     * Render a single skill category
     */
    async renderCategory(category) {
        const skills = await this.loadJSON(category.dataFile);

        const skillItems = skills
            .map(skill => `<li>${skill.name}</li>`)
            .join('');

        return `
            <article class="skill-panel">
                <header class="skill-panel-header">
                    <img src="${category.icon}" alt="${category.iconAlt}" class="skill-icon">
                    <h3>${category.title}</h3>
                </header>
                <ul class="skill-list">
                    ${skillItems}
                </ul>
            </article>
        `;
    }

    /**
     * Show error message
     */
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--muted);">
                    <p>Unable to load skills. Please try again later.</p>
                </div>
            `;
        }
    }
}

// Initialize skills loader when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const skillsLoader = new SkillsLoader('skills-container');
    skillsLoader.init();
});
