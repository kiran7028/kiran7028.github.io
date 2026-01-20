/**
 * Skills Loader Module
 * Dynamically loads and renders skills from JSON files
 */

class SkillsLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'data/skills/config.json';
    }

    async init() {
        try {
            console.log('Loading skills from:', this.configPath);
            const config = await this.loadJSON(this.configPath);
            console.log('Loaded config:', config);
            await this.renderSkills(config.categories);
        } catch (error) {
            console.error('Error loading skills:', error);
            this.showError();
            console.log('Error details:', error);
        }
    }

    async loadJSON(path) {
        console.log('Fetching data from:', path);
        const response = await fetch(path);
        console.log('Fetch response:', response);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}`);
        }
        return await response.json();
    }

    async renderSkills(categories) {
        const skillsHTML = await Promise.all(
            categories.map(category => this.renderCategory(category))
        );

        if (this.container) {
            this.container.innerHTML = `
                <div class="skills-panels">
                    ${skillsHTML.join('')}
                </div>
            `;
        }
    }

    async renderCategory(category) {
        const skills = await this.loadJSON(category.dataFile);

        const skillItems = skills
            .map(skill => `<li>${skill.name}</li>`)
            .join('');

        console.log('Image source:', category.icon); // Verify the image source

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
