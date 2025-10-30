// ========================================
// Content Renderer - Renderiza conteúdo a partir de data-attributes
// ========================================

// Aguarda as seções serem carregadas
document.addEventListener('sectionsLoaded', () => {
    renderAllContent();
});

function renderAllContent() {
    renderFormacao();
    renderExperiencias();
    renderProjetos();
    renderHabilidades();
}

// ===== RENDERIZAR FORMAÇÃO =====
function renderFormacao() {
    const formacaoItems = document.querySelectorAll('.formacao-lista li[data-curso]');
    
    formacaoItems.forEach(item => {
        const curso = item.getAttribute('data-curso');
        const periodo = item.getAttribute('data-periodo');
        
        if (curso && periodo && !item.textContent.trim()) {
            item.textContent = `${curso} (${periodo})`;
        }
    });
}

// ===== RENDERIZAR EXPERIÊNCIAS =====
function renderExperiencias() {
    // Renderizar experiências resumidas
    const experiencias = document.querySelectorAll('.experiencias-resumo [data-experiencia]');
    
    experiencias.forEach(exp => {
        const periodoElement = exp.querySelector('.periodo[data-periodo]');
        const descricaoElement = exp.querySelector('p[data-descricao]');
        
        if (periodoElement && !periodoElement.textContent.trim()) {
            const periodo = periodoElement.getAttribute('data-periodo');
            periodoElement.innerHTML = `<em>${periodo}</em>`;
        }
        
        if (descricaoElement && !descricaoElement.textContent.trim()) {
            const descricao = descricaoElement.getAttribute('data-descricao');
            descricaoElement.textContent = descricao;
        }
    });
    
    // Renderizar trabalhos detalhados
    const trabalhos = document.querySelectorAll('.trabalho-item');
    
    trabalhos.forEach(trabalho => {
        const cargoElement = trabalho.querySelector('.cargo[data-cargo]');
        const localElement = trabalho.querySelector('.localizacao[data-local]');
        const periodoElement = trabalho.querySelector('.periodo-trabalho[data-periodo]');
        
        if (cargoElement && !cargoElement.textContent.trim()) {
            const cargo = cargoElement.getAttribute('data-cargo');
            cargoElement.innerHTML = `<strong>${cargo}</strong>`;
        }
        
        if (localElement && !localElement.textContent.trim()) {
            const local = localElement.getAttribute('data-local');
            localElement.textContent = `📍 ${local}`;
        }
        
        if (periodoElement && !periodoElement.textContent.trim()) {
            const periodo = periodoElement.getAttribute('data-periodo');
            periodoElement.textContent = `📅 ${periodo}`;
        }
    });
}

// ===== RENDERIZAR PROJETOS =====
function renderProjetos() {
    const projetos = document.querySelectorAll('.projeto-item');
    
    projetos.forEach(projeto => {
        // Renderizar info do projeto
        const instituicaoElement = projeto.querySelector('[data-instituicao]');
        const localElement = projeto.querySelector('[data-local]');
        const periodoElement = projeto.querySelector('[data-periodo]');
        
        if (instituicaoElement && !instituicaoElement.textContent.trim()) {
            const instituicao = instituicaoElement.getAttribute('data-instituicao');
            instituicaoElement.textContent = instituicao;
        }
        
        if (localElement && !localElement.textContent.trim()) {
            const local = localElement.getAttribute('data-local');
            localElement.textContent = local;
        }
        
        if (periodoElement && !periodoElement.textContent.trim()) {
            const periodo = periodoElement.getAttribute('data-periodo');
            periodoElement.textContent = periodo;
        }
        
        // Renderizar descrição
        const descricaoElement = projeto.querySelector('p[data-descricao]');
        if (descricaoElement && !descricaoElement.textContent.trim()) {
            const descricao = descricaoElement.getAttribute('data-descricao');
            descricaoElement.textContent = descricao;
        }
    });
}

// ===== RENDERIZAR HABILIDADES =====
function renderHabilidades() {
    const skillItems = document.querySelectorAll('[data-skill]');
    
    skillItems.forEach(item => {
        const skill = item.getAttribute('data-skill');
        if (skill && !item.textContent.trim()) {
            item.textContent = skill;
        }
    });
    
    const idiomaItems = document.querySelectorAll('[data-idioma]');
    
    idiomaItems.forEach(item => {
        const idioma = item.getAttribute('data-idioma');
        const nivel = item.getAttribute('data-nivel');
        if (idioma && nivel && !item.textContent.trim()) {
            item.textContent = `${idioma} – ${nivel}`;
        }
    });
    
    const certificacaoItems = document.querySelectorAll('[data-certificacao]');
    
    certificacaoItems.forEach(item => {
        const certificacao = item.getAttribute('data-certificacao');
        const horas = item.getAttribute('data-horas');
        if (certificacao && horas && !item.textContent.trim()) {
            item.textContent = `${certificacao} - ${horas} horas`;
        }
    });
}

console.log('✅ Content Renderer carregado!');
