/**
 * Main Application Script
 * Initializes all modules and handles global functionality
 */

// ===== URL Cleanup =====
(function cleanURL() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/index.html')) {
        const cleanUrl = currentUrl.replace('/index.html', '/');
        window.history.replaceState({}, document.title, cleanUrl);
    }
})();

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        const target = document.querySelector(href);
        if (target) {
            // Update URL hash without jumping
            history.pushState(null, null, href);
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===== Dark Mode Toggle =====
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const html = document.documentElement;
    const saved = localStorage.getItem('theme');

    // Apply saved theme or default to dark
    if (saved === 'light') {
        html.classList.add('light');
        toggle.textContent = '🌙';
    } else {
        html.classList.remove('light');
        toggle.textContent = '☀️';
    }

    toggle.addEventListener('click', function () {
        html.classList.toggle('light');
        const isLight = html.classList.contains('light');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '🌙' : '☀️';
    });
});

// ===== Contact Form Handler =====
document.addEventListener('submit', function (e) {
    const form = e.target.closest('#contact-form');
    if (!form) return;
    e.preventDefault();

    const name = (form.querySelector('input[name="name"]').value || '').trim();
    const email = (form.querySelector('input[name="email"]').value || '').trim();
    const message = (form.querySelector('textarea[name="message"]').value || '').trim();

    const recipient = form.getAttribute('data-recipient') || atob('a2lyYW43MDI4QGdtYWlsLmNvbQ==');
    const subject = `Portfolio Contact: ${name || 'New Message'}`;
    const lines = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message,
        '',
        `Sent from portfolio site on ${new Date().toLocaleString()}`
    ];
    const body = encodeURIComponent(lines.join('\n'));
    const href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = href;
    setTimeout(() => { form.reset(); }, 300);
});

// ===== Blog Category Filter =====
document.addEventListener('DOMContentLoaded', function () {
    const chipRow = document.querySelector('.chip-row');
    const articles = document.querySelectorAll('.article-card');
    if (!chipRow || !articles.length) return;

    chipRow.addEventListener('click', function (e) {
        const target = e.target.closest('.chip');
        if (!target) return;
        e.preventDefault();

        chipRow.querySelectorAll('.chip').forEach(chip => chip.classList.remove('is-active'));
        target.classList.add('is-active');

        const category = target.getAttribute('data-category');
        articles.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const show = category === 'all' || category === cardCat;
            card.style.display = show ? '' : 'none';
        });
    });
});

// ===== Scroll Animations =====
document.addEventListener('DOMContentLoaded', function () {
    const animateOnScroll = document.querySelectorAll('.section, .project-card, .skill-panel, .blog-card, .article-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ===== Active Nav Link Highlighting =====
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -66% 0px'
    };

    const navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
});

// ===== Initialize All Loaders =====
document.addEventListener('DOMContentLoaded', function () {
    // About
    if (typeof AboutLoader !== 'undefined') {
        const aboutLoader = new AboutLoader('about-container');
        aboutLoader.init();
    }

    // Skills
    if (typeof SkillsLoader !== 'undefined') {
        const skillsLoader = new SkillsLoader('skills-container');
        skillsLoader.init();
    }

    // Projects
    if (typeof ProjectsLoader !== 'undefined') {
        const projectsLoader = new ProjectsLoader('projects-container');
        projectsLoader.init();
    }

    // Certifications
    if (typeof CertificationsLoader !== 'undefined') {
        const certificationsLoader = new CertificationsLoader('certifications-container');
        certificationsLoader.init();
    }

    // Blog
    if (typeof BlogLoader !== 'undefined') {
        const blogLoader = new BlogLoader('blog-container');
        blogLoader.init();
    }

    // Contact
    if (typeof ContactLoader !== 'undefined') {
        const contactLoader = new ContactLoader('contact-container');
        contactLoader.init();
    }
});
