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
    }
    
    // Toggle dark mode com botão
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
}

// Reinicializa dark mode quando seções carregam
document.addEventListener('sectionsLoaded', () => {
    initDarkMode();
});

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
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".sticky-nav ul");

  if (!hamburger || !navMenu) {
    console.error("Hamburger ou menu não encontrado!");
    return;
  }

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    console.log("Menu clicado");
  });
});
// ===== MODAL DE CERTIFICADOS EM TELA CHEIA =====
function initCertModal() {
    let currentCertIndex = 0;
    let allCertificates = [];
    
    // Coleta todos os certificados
    function collectCertificates() {
        allCertificates = [];
        document.querySelectorAll(".view-cert").forEach((button, index) => {
            allCertificates.push({
                src: button.getAttribute("data-image"),
                button: button,
                index: index
            });
        });
    }
    
    // Cria modal em tela cheia se não existir
    function createFullscreenModal() {
        if (document.getElementById("certModal")) return;
        
        const modalHTML = `
            <div id="certModal" class="cert-modal-fullscreen">
                <button class="cert-close-btn" title="Fechar">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <button class="cert-nav-btn cert-prev-btn" title="Certificado Anterior">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="cert-nav-btn cert-next-btn" title="Próximo Certificado">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <div class="cert-image-container">
                    <img id="certImage" src="" alt="Certificado">
                    <div class="cert-counter"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
    
    // Exibe certificado no modal
    function showCertificate(index) {
        const modal = document.getElementById("certModal");
        const img = document.getElementById("certImage");
        const counter = modal.querySelector(".cert-counter");
        
        if (index >= 0 && index < allCertificates.length) {
            currentCertIndex = index;
            img.src = allCertificates[index].src;
            counter.textContent = `${index + 1} / ${allCertificates.length}`;
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; // Impede scroll do body
        }
    }
    
    // Fecha modal
    function closeModal() {
        const modal = document.getElementById("certModal");
        const img = document.getElementById("certImage");
        modal.style.display = "none";
        img.src = "";
        document.body.style.overflow = ""; // Restaura scroll do body
    }
    
    // Navega para próximo certificado
    function nextCertificate() {
        if (currentCertIndex < allCertificates.length - 1) {
            showCertificate(currentCertIndex + 1);
        } else {
            showCertificate(0); // Volta ao primeiro
        }
    }
    
    // Navega para certificado anterior
    function prevCertificate() {
        if (currentCertIndex > 0) {
            showCertificate(currentCertIndex - 1);
        } else {
            showCertificate(allCertificates.length - 1); // Vai para o último
        }
    }
    
    // Inicializa eventos
    function initEvents() {
        collectCertificates();
        createFullscreenModal();
        
        const modal = document.getElementById("certModal");
        const closeBtn = modal.querySelector(".cert-close-btn");
        const prevBtn = modal.querySelector(".cert-prev-btn");
        const nextBtn = modal.querySelector(".cert-next-btn");
        
        // Botões de visualização
        document.querySelectorAll(".view-cert").forEach((button, index) => {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                showCertificate(index);
            });
        });
        
        // Botão fechar
        closeBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal();
        });
        
        // Botões de navegação
        nextBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            nextCertificate();
        });
        
        prevBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            prevCertificate();
        });
        
        // Fechar ao clicar fora da imagem
        modal?.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navegação por teclado
        document.addEventListener("keydown", (e) => {
            if (modal.style.display === "flex") {
                if (e.key === "Escape") closeModal();
                if (e.key === "ArrowRight") nextCertificate();
                if (e.key === "ArrowLeft") prevCertificate();
            }
        });
    }
    
    // Aguarda seções serem carregadas
    if (document.readyState === 'loading') {
        document.addEventListener('sectionsLoaded', initEvents);
    } else {
        // Se já carregou, tenta após timeout
        setTimeout(initEvents, 1000);
    }
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
    // Aguarda seções serem carregadas
    function startTyping() {
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
    
    // Tenta iniciar imediatamente
    if (document.getElementById('typing-text')) {
        startTyping();
    }
    
    // Tenta novamente quando seções carregarem
    document.addEventListener('sectionsLoaded', startTyping);
}

// ===== MENU DINÂMICO (HIDE ON SCROLL DOWN, SHOW ON SCROLL UP) =====
function initDynamicMenu() {
    const nav = document.querySelector('.sticky-nav');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNav() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past threshold
            nav.classList.add('hidden');
        } else {
            // Scrolling up or at top
            nav.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    });
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
    initDynamicMenu();
    initCertModal();
    initToggleCards();
    initSkillsBars();
    initSmoothScroll();
    initTypingEffect();
});

// Reinicializa toggles quando seções carregam
document.addEventListener('sectionsLoaded', () => {
    initToggleCards();
    initDynamicMenu();
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
