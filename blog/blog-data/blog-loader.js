/**
 * Blog Loader Module
 * Dynamically loads and renders blog articles for the homepage
 */

class BlogLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.configPath = 'blog/blog-data/blog-config.json';
    }

    /**
     * Initialize and load blog articles
     */
    async init() {
        try {
            const config = await this.loadJSON(this.configPath);
            await this.renderBlog(config);
        } catch (error) {
            console.error('Error loading blog:', error);
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
     * Render blog section
     */
    async renderBlog(config) {
        const articles = await Promise.all(
            config.articles.map(article => this.renderArticle(article))
        );

        if (this.container) {
            this.container.innerHTML = `
                <h2>${config.sectionTitle}</h2>
                <div class="blog-list">
                    ${articles.join('')}
                </div>
            `;
        }
    }

    /**
     * Render a single article
     */
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

    /**
     * Show error message
     */
    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <h2>Blog & Knowledge Sharing</h2>
                <p style="color: var(--muted);">Unable to load blog articles. Please try again later.</p>
            `;
        }
    }
}

// Initialize blog loader when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    const blogLoader = new BlogLoader('blog-container');
    blogLoader.init();
});
