// ========================================
// Portfolio Kayham Cristoffer — main.js
// Refatorado: Mai/2025
// ========================================

/* ===== DARK MODE ===== */
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;

    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggle.setAttribute('aria-pressed', 'true');
    }

    toggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
}

/* ===== SCROLL ANIMATIONS (Intersection Observer) ===== */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('section, .card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/* ===== PROGRESS BAR ===== */
function initProgressBar() {
    const bar = document.getElementById('progressBar');
    if (!bar) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
                bar.style.width = `${pct}%`;
                bar.setAttribute('aria-valuenow', Math.round(pct));
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ===== BACK TO TOP ===== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===== MENU MOBILE ===== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.sticky-nav ul');
    if (!hamburger || !navMenu) return;

    // Evita listeners duplicados
    if (hamburger.dataset.initialized) return;
    hamburger.dataset.initialized = 'true';

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fecha ao clicar em link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Fecha com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ===== MODAL DE CERTIFICADOS ===== */
function initCertModal() {
    let currentIndex = 0;
    let certificates = [];

    function collectCerts() {
        certificates = Array.from(document.querySelectorAll('.view-cert')).map(btn => ({
            src: btn.getAttribute('data-image'),
            isPdf: btn.getAttribute('data-image')?.toLowerCase().endsWith('.pdf') ?? false
        }));
    }

    function createModal() {
        if (document.getElementById('certModal')) return;
        document.body.insertAdjacentHTML('beforeend', `
            <div id="certModal" class="cert-modal-fullscreen" role="dialog" aria-modal="true" aria-label="Visualizador de certificados">
                <button class="cert-close-btn" title="Fechar" aria-label="Fechar certificado">
                    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
                <button class="cert-nav-btn cert-prev-btn" title="Anterior" aria-label="Certificado anterior">
                    <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
                </button>
                <button class="cert-nav-btn cert-next-btn" title="Próximo" aria-label="Próximo certificado">
                    <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
                </button>
                <div class="cert-image-container">
                    <img id="certImage" src="" alt="Certificado" style="display:none;">
                    <iframe id="certPdf" src="" title="Certificado PDF" style="display:none;"></iframe>
                    <div class="cert-counter" aria-live="polite"></div>
                </div>
            </div>
        `);
    }

    function show(index) {
        const modal   = document.getElementById('certModal');
        const img     = document.getElementById('certImage');
        const pdf     = document.getElementById('certPdf');
        const counter = modal.querySelector('.cert-counter');

        if (index < 0 || index >= certificates.length) return;

        currentIndex = index;
        const cert = certificates[index];

        img.style.display = 'none';
        pdf.style.display = 'none';
        img.src = '';
        pdf.src = '';

        if (cert.isPdf) {
            pdf.src = cert.src;
            pdf.style.display = 'block';
        } else {
            img.src = cert.src;
            img.style.display = 'block';
        }

        counter.textContent = `${index + 1} / ${certificates.length}`;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function close() {
        const modal = document.getElementById('certModal');
        if (!modal) return;
        modal.style.display = 'none';
        document.getElementById('certImage').src = '';
        document.getElementById('certPdf').src  = '';
        document.body.style.overflow = '';
    }

    function next() {
        show((currentIndex + 1) % certificates.length);
    }

    function prev() {
        show((currentIndex - 1 + certificates.length) % certificates.length);
    }

    function setupEvents() {
        collectCerts();
        createModal();

        const modal   = document.getElementById('certModal');
        const closeBtn = modal.querySelector('.cert-close-btn');
        const prevBtn  = modal.querySelector('.cert-prev-btn');
        const nextBtn  = modal.querySelector('.cert-next-btn');

        document.querySelectorAll('.view-cert').forEach((btn, i) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                show(i);
            });
        });

        closeBtn?.addEventListener('click', close);
        prevBtn?.addEventListener('click', prev);
        nextBtn?.addEventListener('click', next);

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) close();
        });

        document.addEventListener('keydown', (e) => {
            if (modal.style.display !== 'flex') return;
            if (e.key === 'Escape')      close();
            if (e.key === 'ArrowRight')  next();
            if (e.key === 'ArrowLeft')   prev();
        });
    }

    // Aguarda seções carregarem
    document.addEventListener('sectionsLoaded', setupEvents, { once: true });
}

/* ===== TOGGLE CARDS EXPANSÍVEIS ===== */
function initToggleCards() {
    document.querySelectorAll('.toggle').forEach(title => {
        if (title.dataset.initialized) return;
        title.dataset.initialized = 'true';

        title.addEventListener('click', function () {
            const card = this.closest('.card') || this.parentElement;
            card.classList.toggle('open');
        });
    });
}

/* ===== SKILLS PROGRESS BARS ===== */
function initSkillsBars() {
    const section = document.getElementById('habilidades');
    if (!section) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                        bar.style.width = (bar.getAttribute('data-percentage') || 0) + '%';
                    });
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(section);
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ===== TYPING EFFECT ===== */
function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el || el.dataset.initialized) return;
    el.dataset.initialized = 'true';

    const phrases = [
        'Analista de TI & Desenvolvedor Web',
        'Estagiário em TI no TCE-SP',
        'Especialista em Redes e Infraestrutura',
        'Estudante de Ciência da Computação'
    ];

    let phraseIndex = 0;
    let charIndex   = 0;
    let deleting    = false;

    function tick() {
        const current = phrases[phraseIndex];

        if (deleting) {
            el.textContent = current.slice(0, --charIndex);
        } else {
            el.textContent = current.slice(0, ++charIndex);
        }

        if (!deleting && charIndex === current.length) {
            setTimeout(() => { deleting = true; tick(); }, 2200);
            return;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(tick, deleting ? 45 : 90);
    }

    tick();
}

/* ===== MENU DINÂMICO (esconde ao scroll down) ===== */
function initDynamicMenu() {
    const nav = document.querySelector('.sticky-nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;
    let ticking     = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const current = window.scrollY;
                if (current > lastScrollY && current > 120) {
                    nav.classList.add('hidden');
                } else {
                    nav.classList.remove('hidden');
                }
                lastScrollY = current;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ===== LAZY LOADING DE IMAGENS ===== */
function initLazyImages() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                    }
                    obs.unobserve(img);
                }
            });
        },
        { rootMargin: '200px 0px' }
    );

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

/* ===== ACTIVE NAV LINKS (scroll spy) ===== */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.sticky-nav ul a[href^="#"]');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach(link => {
                        link.classList.toggle(
                            'active-nav',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
}

/* ===== INICIALIZAÇÃO ===== */
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initBackToTop();
    initCertModal();

    // Aguarda seções dinâmicas
    document.addEventListener('sectionsLoaded', () => {
        initDarkMode();
        initScrollAnimations();
        initMobileMenu();
        initDynamicMenu();
        initToggleCards();
        initSkillsBars();
        initSmoothScroll();
        initTypingEffect();
        initLazyImages();
        initScrollSpy();
    }, { once: true });
});
