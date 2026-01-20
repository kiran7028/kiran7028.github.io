# Portfolio Setup & Development Guide

## Overview

This is a modern, modular DevOps Engineer portfolio built with vanilla JavaScript, featuring dynamic content loading from JSON files and a responsive design with dark/light theme support.

**Live Site:** [https://kiran7028profile.github.io](https://kiran7028profile.github.io)

## Project Structure

```
portfolio/
├── index.html                 # Main HTML entry point
├── package.json              # Node.js project metadata
├── .gitignore                # Git ignore rules
│
├── src/                       # Source code
│   ├── modules/              # JavaScript modules
│   │   ├── index.js          # Main application initialization
│   │   └── loaders/          # Dynamic content loaders
│   │       ├── about-loader.js
│   │       ├── skills-loader.js
│   │       ├── projects-loader.js
│   │       ├── certifications-loader.js
│   │       ├── blog-loader.js
│   │       └── contact-loader.js
│   ├── styles/               # Stylesheets
│   │   └── main.css          # Primary stylesheet
│   └── data/                 # Data files (organized by module)
│
├── public/                    # Static public assets
│   └── assets/               # Images, icons, PDFs
│
├── docs/                      # Documentation
│   ├── SETUP.md              # This file
│   └── DEPLOYMENT.md         # Deployment guide
│
├── about/                     # About section data
│   ├── about-content.json
│   └── about-loader.js (legacy)
│
├── skills/                    # Skills section
│   ├── skills-config.json
│   ├── aws-skills.json
│   ├── devops-skills.json
│   ├── programming-skills.json
│   └── skills-loader.js (legacy)
│
├── projects/                  # Projects section
│   ├── projects-config.json
│   ├── kubernetes-cluster.json
│   ├── cicd-pipeline.json
│   ├── terraform-iac.json
│   ├── monitoring-system.json
│   ├── microservices-migration.json
│   └── projects-loader.js (legacy)
│
├── certifications/            # Certifications section
│   ├── certifications-config.json
│   ├── aws-certifications.json
│   ├── devops-certifications.json
│   ├── kubernetes-certifications.json
│   └── certifications-loader.js (legacy)
│
├── blog/                      # Blog section
│   └── blog-data/
│       ├── blog-config.json
│       ├── terraform-automation.json
│       ├── cicd-best-practices.json
│       └── blog-loader.js (legacy)
│
├── contact/                   # Contact section
│   ├── contact-config.json
│   ├── social-links.json
│   └── contact-loader.js (legacy)
│
├── analytics/                 # Analytics tracking
│   └── analytics.js
│
├── performance/               # Performance optimization
│   └── lazy-load.js
│
└── assets/                    # Legacy asset folder
    ├── profile.png
    ├── aws.png
    ├── docker.png
    ├── kubernetes.png
    └── ... (other tech icons)
```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/kiran7028/kiran7028profile.github.io.git
cd kiran7028profile.github.io
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Local Development Server

```bash
npm start
```

The site will be available at `http://localhost:8000`

## Features

✅ **Modular Architecture** - All content separated into JSON configuration files  
✅ **Dynamic Content Loading** - JavaScript loaders render content on-demand  
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile  
✅ **Dark/Light Theme** - Toggle between themes with persistent localStorage  
✅ **SEO Optimized** - Meta tags, structured data (JSON-LD), and clean URLs  
✅ **Performance** - Lazy loading, CSS animations, and optimized assets  
✅ **Accessibility** - ARIA labels, semantic HTML, and keyboard navigation  
✅ **AWS S3 Ready** - Easy deployment with included scripts  

## Development Workflow

### Adding/Editing Content

All content is managed through JSON files organized by section:

#### Skills
- **File:** `skills/skills-config.json` - Define skill categories
- **Data Files:** `skills/aws-skills.json`, `skills/devops-skills.json`, etc.

```json
{
    "categories": [
        {
            "id": "aws",
            "title": "AWS Services",
            "icon": "assets/aws.png",
            "dataFile": "skills/aws-skills.json"
        }
    ]
}
```

#### Projects
- **File:** `projects/projects-config.json` - Configure project order
- **Data Files:** `projects/*.json` - Individual project details

```json
{
    "title": "Kubernetes Cluster Setup",
    "description": "High-availability K8s cluster",
    "technologies": ["Kubernetes", "Docker", "Helm"],
    "links": [
        {"label": "GitHub", "url": "https://..."},
        {"label": "Demo", "url": "https://..."}
    ]
}
```

#### Blog Articles
- **File:** `blog/blog-data/blog-config.json` - Article list
- **Data Files:** `blog/blog-data/*.json` - Article content

#### Certifications
- **File:** `certifications/certifications-config.json` - Category setup
- **Data Files:** `certifications/*.json` - Certification details

#### About
- **File:** `about/about-content.json` - Bio and summary

#### Contact
- **File:** `contact/contact-config.json` - Contact form settings
- **File:** `contact/social-links.json` - Social media links

### Styling

Main stylesheet: `src/styles/main.css`

Key CSS Variables (in `:root`):
```css
--bg: #2C1654;              /* Background */
--primary: #4B0082;         /* Primary color */
--highlight: #A020F0;       /* Highlight/hover */
--magenta: #C71585;         /* Accent color */
--cyan: #7FDBFF;            /* Secondary accent */
--text: #F2ECFF;            /* Text color */
--muted: #cbb8ff;           /* Muted text */
--card: #2f1a5a;            /* Card background */
```

Light theme overrides:
```css
html.light {
    --bg: #f5f7fa;
    --primary: #1e40af;
    --text: #1f2937;
    /* ... other variables */
}
```

### JavaScript Organization

**Main entry point:** `src/modules/index.js`

Key functionalities:
- URL cleanup (removes index.html from URLs)
- Smooth scrolling
- Dark mode toggle with localStorage persistence
- Contact form handler (mailto integration)
- Blog category filtering
- Scroll animations with Intersection Observer
- Active navigation highlighting
- Loader initialization

**Loaders:** `src/modules/loaders/`
- Each loader is a class that fetches JSON and renders HTML
- Classes: `AboutLoader`, `SkillsLoader`, `ProjectsLoader`, `CertificationsLoader`, `BlogLoader`, `ContactLoader`
- All loaders handle errors gracefully with fallback messages

## Customization Guide

### 1. Update Personal Information

**About Section:**
Edit `about/about-content.json`:
```json
{
    "title": "About Me",
    "content": "Your bio here..."
}
```

**Contact:**
Edit `contact/contact-config.json` to update email and form settings.

### 2. Add New Skills

Edit `skills/aws-skills.json` (or other skill files):
```json
[
    { "name": "Kubernetes" },
    { "name": "Docker" },
    { "name": "Terraform" }
]
```

### 3. Add New Projects

Create `projects/my-project.json`:
```json
{
    "title": "My Project",
    "description": "Project details",
    "technologies": ["Tech1", "Tech2"],
    "links": [
        {"label": "GitHub", "url": "https://..."}
    ]
}
```

Then add to `projects/projects-config.json`:
```json
{
    "projects": [
        {"id": "my-project", "dataFile": "projects/my-project.json"}
    ]
}
```

### 4. Update Theme Colors

Edit `src/styles/main.css` CSS variables:
```css
:root {
    --primary: #YOUR_COLOR;
    --magenta: #YOUR_COLOR;
    /* ... */
}
```

### 5. Add Social Links

Edit `contact/social-links.json`:
```json
{
    "links": [
        {
            "label": "LinkedIn",
            "url": "https://linkedin.com/in/yourprofile",
            "icon": "fa-brands fa-linkedin",
            "ariaLabel": "Visit LinkedIn"
        }
    ]
}
```

## Deployment

### Local Testing

```bash
npm start
# Visit http://localhost:8000
```

### AWS S3 Deployment

```bash
bash deploy-to-s3.sh
```

Requirements:
- AWS CLI configured with appropriate credentials
- S3 bucket created with static website hosting enabled
- CloudFront distribution (optional, for caching)

See [AWS-IMPLEMENTATION.md](./AWS-IMPLEMENTATION.md) for detailed setup.

### GitHub Pages

This repository is configured for GitHub Pages. Simply push to the main branch:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize Images:** Compress assets before adding them
2. **Lazy Loading:** The portfolio uses lazy loading for images
3. **CSS:** Minimize CSS in production (consider using a bundler)
4. **Minification:** HTML/CSS/JS minification is optional

## Troubleshooting

### Content Not Loading

1. Check browser console (F12) for errors
2. Verify JSON file paths are correct
3. Ensure JSON syntax is valid
4. Check CORS if hosting on different domain

### Theme Toggle Not Working

1. Clear localStorage: `localStorage.clear()`
2. Check browser's localStorage is enabled
3. Verify `src/modules/index.js` is loaded

### CORS Issues

If serving locally and encountering CORS errors:
```bash
npm start
# Uses Python HTTP server (allows all CORS by default)
```

## Dependencies

- **None required** for basic functionality
- Optional: `http-server` for development

## Lighthouse Scores

Target metrics:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

## License

MIT - See LICENSE file

## Contact

- Email: kiran7028@gmail.com
- GitHub: https://github.com/kiran7028
- Portfolio: https://kiran7028profile.github.io

---

**Last Updated:** January 2026
