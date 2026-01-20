// Clean up URL - Remove index.html from URL path
(function cleanURL() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/index.html')) {
        const cleanUrl = currentUrl.replace('/index.html', '/');
        window.history.replaceState({}, document.title, cleanUrl);
    }
})();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Dark mode toggle with persistence and proper theme switching
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

// Basic contact form handler (no backend; prevent default)
document.addEventListener('submit', function (e) {
    const form = e.target.closest('#contact-form');
    if (!form) return;
    e.preventDefault();

    const name = (form.querySelector('input[name="name"]').value || '').trim();
    const email = (form.querySelector('input[name="email"]').value || '').trim();
    const message = (form.querySelector('textarea[name="message"]').value || '').trim();

    // Obfuscated email to prevent spam bots (base64 encoded)
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

    // Open the user's email client with prefilled details
    window.location.href = href;

    // Optional UX: confirm and reset
    setTimeout(() => { form.reset(); }, 300);
});

// Simple blog category filter
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

// Smooth scroll animations with Intersection Observer
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in animation class to elements
    const animateOnScroll = document.querySelectorAll('.section, .project-card, .skill-panel, .blog-card, .article-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for multiple items
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

// Active nav link highlighting
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
