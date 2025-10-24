// ========================================
// Portfolio Kayham Cristoffer - Main JavaScript
// ========================================

// ===== DARK MODE =====
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Verifica preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observa todas as seções
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Observa cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('animate-on-scroll');
        observer.observe(card);
    });
}

// ===== PROGRESS BAR =====
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn?.classList.add('show');
        } else {
            backToTopBtn?.classList.remove('show');
        }
    });
    
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.sticky-nav ul');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu?.classList.toggle('active');
    });
    
    // Fecha menu ao clicar em link
    document.querySelectorAll('.sticky-nav a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// ===== MODAL DE CERTIFICADOS =====
function initCertModal() {
    const modal = document.getElementById("certModal");
    const img = document.getElementById("certImage");
    
    document.querySelectorAll(".view-cert").forEach(button => {
        button.addEventListener("click", () => {
            const src = button.getAttribute("data-image");
            if (img && modal) {
                img.src = src;
                modal.style.display = "flex";
            }
        });
    });
    
    modal?.addEventListener("click", () => {
        modal.style.display = "none";
        if (img) img.src = "";
    });
}

// ===== TOGGLE CARDS EXPANSÍVEIS =====
function initToggleCards() {
    document.querySelectorAll('.toggle').forEach(function (title) {
        title.addEventListener('click', function () {
            this.parentElement.classList.toggle('open');
        });
    });
}

// ===== SKILLS PROGRESS BARS =====
function initSkillsBars() {
    const skillsSection = document.getElementById('habilidades');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const percentage = bar.getAttribute('data-percentage');
                    bar.style.width = percentage + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// ===== GITHUB REPOSITORIES =====
// Função removida - seção de repositórios não está mais no portfólio

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Estudante de Ciência da Computação',
        'Estagiário em TI no TCE-SP',
        'Analista de Infraestrutura',
        'Web Designer'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(type, speed);
    }
    
    type();
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio carregado!');
    
    // Inicializa todas as funcionalidades
    initDarkMode();
    initScrollAnimations();
    initProgressBar();
    initBackToTop();
    initMobileMenu();
    initCertModal();
    initToggleCards();
    initSkillsBars();
    initSmoothScroll();
    initTypingEffect();
});

// ===== LAZY LOADING DE IMAGENS =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
