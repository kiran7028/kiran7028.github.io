/**
 * Blog Loader Module
 * Dynamically loads and renders blog articles
 */

class BlogLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'data/blog/config.json';
    }

    async init() {
        try {
            const config = await this.loadJSON(this.configPath);
            await this.renderBlog(config);
        } catch (error) {
            console.error('Error loading blog:', error);
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

    async renderBlog(config) {
        const articles = await Promise.all(
            config.articles.map(article => this.renderArticle(article))
        );

        if (this.container) {
            this.container.innerHTML = `
                <div class="blog-list">
                    ${articles.join('')}
                </div>
            `;
        }
    }

    async renderArticle(articleRef) {
        const article = await this.loadJSON(articleRef.dataFile);

        return `
            <article class="blog-card">
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <a href="${article.url}" class="project-link">Read More</a>
            </article>
        `;
    }

    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <p style="color: var(--muted);">Unable to load blog articles. Please try again later.</p>
            `;
        }
    }
}
