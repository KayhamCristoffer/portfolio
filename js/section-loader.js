// ========================================
// Section Loader - Carrega seções HTML dinamicamente
// ========================================

const sections = [
    { id: 'sobre', file: 'sections/sobre.html', target: 'sobre-section' },
    { id: 'formacao', file: 'sections/formacao.html', target: 'formacao-section' },
    { id: 'experiencias', file: 'sections/experiencias.html', target: 'experiencias-section' },
    { id: 'projetos', file: 'sections/projetos.html', target: 'projetos-section' },
    { id: 'habilidades', file: 'sections/habilidades.html', target: 'habilidades-section' },
    { id: 'certificados', file: 'sections/certificados.html', target: 'certificados-section' }
];

// Função para carregar uma seção
async function loadSection(section) {
    try {
        const response = await fetch(section.file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.getElementById(section.target);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    } catch (error) {
        console.error(`Erro ao carregar seção ${section.id}:`, error);
    }
}

// Carrega todas as seções
async function loadAllSections() {
    try {
        await Promise.all(sections.map(section => loadSection(section)));
        console.log('✅ Todas as seções foram carregadas!');
        
        // Dispara evento personalizado para indicar que as seções foram carregadas
        document.dispatchEvent(new Event('sectionsLoaded'));
    } catch (error) {
        console.error('Erro ao carregar seções:', error);
    }
}

// Carrega as seções quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllSections);
} else {
    loadAllSections();
}
