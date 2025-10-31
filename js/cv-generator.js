// ========================================
// CV Generator - Gera PDF completo a partir do conteúdo visível do HTML
// ========================================

// Configuração dos modos de CV
const CV_MODES = {
    COMPLETO: 'completo',
    RESUMIDO: 'resumido'
};

// Função principal para gerar o CV em PDF
async function generateCV(mode = CV_MODES.RESUMIDO) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    let yPosition = 20;
    const pageHeight = 297; // A4 height in mm
    const marginLeft = 15;
    const marginRight = 15;
    const pageWidth = 210; // A4 width in mm
    const contentWidth = pageWidth - marginLeft - marginRight;
    
    // Função auxiliar para verificar e adicionar nova página
    function checkPageBreak(neededSpace = 10) {
        if (yPosition + neededSpace > pageHeight - 20) {
            doc.addPage();
            yPosition = 20;
        }
    }
    
    // Função para adicionar texto com quebra de linha automática
    function addText(text, fontSize, fontStyle = 'normal', color = [0, 0, 0], extraSpacing = 0) {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        doc.setTextColor(color[0], color[1], color[2]);
        
        const lines = doc.splitTextToSize(text, contentWidth);
        lines.forEach(line => {
            checkPageBreak();
            doc.text(line, marginLeft, yPosition);
            yPosition += fontSize * 0.45;
        });
        yPosition += 3 + extraSpacing;
    }
    
    // Função para adicionar linha horizontal
    function addLine() {
        checkPageBreak(5);
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.5);
        doc.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);
        yPosition += 5;
    }
    
    // ===== CABEÇALHO =====
    doc.setFillColor(44, 62, 80);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Kayham Cristoffer Guilhermino de Oliveira', marginLeft, 15);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Estudante de Ciência da Computação | Estagiário em TI - TCE-SP', marginLeft, 22);
    
    doc.setFontSize(9);
    doc.text('Jd. Rodolfo Pirani, São Paulo - SP', marginLeft, 28);
    
    // Links organizados em 3 colunas
    doc.setFontSize(8);
    const col1X = marginLeft;
    const col2X = marginLeft + 60;
    const col3X = marginLeft + 120;
    const linksY = 34;
    
    doc.text('📧 kayham98.1@hotmail.com', col1X, linksY);
    doc.text('🔗 linkedin.com/in/kayhamcristoffer', col2X, linksY);
    doc.text('🌐 kayhamcristoffer.github.io/portfolio', col3X, linksY);
    doc.text('📞 +55 11 99454-6931', col1X, linksY + 5);
    
    yPosition = 52;
    
    // ===== PERFIL PROFISSIONAL =====
    const perfilSection = document.querySelector('.perfil-profissional');
    if (perfilSection) {
        addText('PERFIL PROFISSIONAL', 14, 'bold', [44, 62, 80], 2);
        addLine();
        
        const perfilText = perfilSection.querySelector('p');
        if (perfilText) {
            addText(perfilText.textContent.trim(), 10);
        }
        yPosition += 3;
    }
    
    // ===== FORMAÇÃO ACADÊMICA =====
    const formacaoSection = document.getElementById('formacao');
    if (formacaoSection) {
        addText('FORMAÇÃO ACADÊMICA', 14, 'bold', [44, 62, 80], 2);
        addLine();
        
        const formacaoItems = formacaoSection.querySelectorAll('.formacao-lista li');
        formacaoItems.forEach(item => {
            const text = item.textContent.trim();
            if (text) {
                checkPageBreak();
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text('• ' + text, marginLeft + 3, yPosition);
                yPosition += 6;
            }
        });
        yPosition += 2;
    }
    
    // ===== EXPERIÊNCIAS PROFISSIONAIS =====
    const experienciasSection = document.getElementById('experiencias');
    if (experienciasSection) {
        addText('EXPERIÊNCIAS PROFISSIONAIS', 14, 'bold', [44, 62, 80], 2);
        addLine();
        
        if (mode === CV_MODES.COMPLETO) {
            // MODO COMPLETO: Inclui resumos E trabalhos detalhados
            
            // Experiências Resumidas
            const experienciasResumo = experienciasSection.querySelectorAll('.experiencias-resumo .card');
            experienciasResumo.forEach(exp => {
                const titulo = exp.querySelector('h3');
                const periodo = exp.querySelector('.periodo');
                const descricao = exp.querySelector('p:not(.periodo)');
                
                if (titulo) {
                    checkPageBreak(15);
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(0, 0, 0);
                    doc.text(titulo.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                if (periodo) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    doc.text(periodo.textContent.trim(), marginLeft, yPosition);
                    yPosition += 6;
                }
                
                if (descricao) {
                    doc.setFont('helvetica', 'normal');
                    addText(descricao.textContent.trim(), 9);
                }
                yPosition += 2;
            });
            
            // Trabalhos Detalhados
            const trabalhosDetalhados = experienciasSection.querySelectorAll('.trabalho-item');
            trabalhosDetalhados.forEach(trabalho => {
                checkPageBreak(20);
                
                const titulo = trabalho.querySelector('h4');
                if (titulo) {
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.text(titulo.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                const cargo = trabalho.querySelector('.cargo');
                const departamento = trabalho.querySelector('.departamento');
                const localizacao = trabalho.querySelector('.localizacao');
                const periodoTrabalho = trabalho.querySelector('.periodo-trabalho');
                
                if (cargo) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    doc.text(cargo.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                if (departamento) {
                    doc.setFontSize(9);
                    doc.text(departamento.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                if (localizacao) {
                    doc.text(localizacao.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                if (periodoTrabalho) {
                    doc.text(periodoTrabalho.textContent.trim(), marginLeft, yPosition);
                    yPosition += 6;
                }
                
                // Descrição detalhada
                const descricaoTrabalho = trabalho.querySelector('.descricao-trabalho');
                if (descricaoTrabalho) {
                    const paragrafos = descricaoTrabalho.querySelectorAll('p');
                    paragrafos.forEach(p => {
                        const text = p.textContent.trim();
                        if (text) {
                            doc.setFontSize(9);
                            doc.setFont('helvetica', 'normal');
                            addText(text, 9);
                        }
                    });
                    
                    const listas = descricaoTrabalho.querySelectorAll('ul');
                    listas.forEach(ul => {
                        const items = ul.querySelectorAll('li');
                        items.forEach(item => {
                            const text = item.textContent.trim();
                            if (text) {
                                checkPageBreak();
                                doc.setFontSize(9);
                                doc.text('• ' + text, marginLeft + 5, yPosition);
                                yPosition += 5;
                            }
                        });
                    });
                }
                yPosition += 3;
            });
            
        } else {
            // MODO RESUMIDO: Apenas trabalhos detalhados principais
            const trabalhosDetalhados = experienciasSection.querySelectorAll('.trabalho-item');
            trabalhosDetalhados.forEach(trabalho => {
                checkPageBreak(15);
                
                const titulo = trabalho.querySelector('h4');
                if (titulo) {
                    doc.setFontSize(11);
                    doc.setFont('helvetica', 'bold');
                    doc.text(titulo.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                const cargo = trabalho.querySelector('.cargo');
                const periodoTrabalho = trabalho.querySelector('.periodo-trabalho');
                
                if (cargo) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    doc.text(cargo.textContent.trim(), marginLeft, yPosition);
                    yPosition += 5;
                }
                
                if (periodoTrabalho) {
                    doc.setFontSize(9);
                    doc.text(periodoTrabalho.textContent.trim(), marginLeft, yPosition);
                    yPosition += 6;
                }
                
                // Apenas descrição resumida
                const descricaoTrabalho = trabalho.querySelector('.descricao-trabalho');
                if (descricaoTrabalho) {
                    const firstP = descricaoTrabalho.querySelector('p');
                    if (firstP) {
                        doc.setFont('helvetica', 'normal');
                        addText(firstP.textContent.trim(), 9);
                    }
                    
                    // Primeiros 5 itens da lista
                    const items = descricaoTrabalho.querySelectorAll('li');
                    const maxItems = Math.min(5, items.length);
                    for (let i = 0; i < maxItems; i++) {
                        const text = items[i].textContent.trim();
                        if (text) {
                            checkPageBreak();
                            doc.setFontSize(9);
                            doc.text('• ' + text, marginLeft + 5, yPosition);
                            yPosition += 5;
                        }
                    }
                }
                yPosition += 2;
            });
        }
    }
    
    // ===== PROJETOS =====
    const projetosSection = document.getElementById('projetos');
    if (projetosSection) {
        checkPageBreak(20);
        addText('PROJETOS DESTACADOS', 14, 'bold', [44, 62, 80], 2);
        addLine();
        
        const projetos = projetosSection.querySelectorAll('.projeto-item');
        const maxProjetos = mode === CV_MODES.COMPLETO ? projetos.length : Math.min(5, projetos.length);
        
        for (let i = 0; i < maxProjetos; i++) {
            const projeto = projetos[i];
            checkPageBreak(20);
            
            // Título do projeto
            const toggle = projeto.querySelector('.toggle');
            if (toggle) {
                const tituloText = toggle.textContent.replace('🔽', '').trim();
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text(tituloText, marginLeft, yPosition);
                yPosition += 5;
            }
            
            // Informações do projeto
            const projetoInfo = projeto.querySelector('.projeto-info');
            if (projetoInfo) {
                const strong = projetoInfo.querySelectorAll('strong');
                const spans = projetoInfo.querySelectorAll('span');
                
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                
                strong.forEach((label, idx) => {
                    const value = spans[idx]?.textContent.trim() || '';
                    if (value) {
                        checkPageBreak();
                        doc.text(`${label.textContent} ${value}`, marginLeft, yPosition);
                        yPosition += 4;
                    }
                });
                yPosition += 2;
            }
            
            // Descrição principal
            const content = projeto.querySelector('.content');
            if (content) {
                const descricaoP = content.querySelector('p[data-descricao], p:not(.projeto-info)');
                if (descricaoP && descricaoP.textContent.trim()) {
                    doc.setFont('helvetica', 'normal');
                    addText(descricaoP.textContent.trim(), 9);
                }
                
                if (mode === CV_MODES.COMPLETO) {
                    // Realizações
                    const realizacoesDiv = content.querySelector('.realizacoes-list');
                    if (realizacoesDiv) {
                        const realizacoesParagraphs = realizacoesDiv.querySelectorAll('p');
                        realizacoesParagraphs.forEach(p => {
                            const text = p.textContent.trim();
                            if (text) {
                                checkPageBreak();
                                doc.setFontSize(9);
                                doc.text(text, marginLeft + 3, yPosition);
                                yPosition += 5;
                            }
                        });
                    }
                    
                    // Listas de realizações (UL)
                    const realizacoesUl = content.querySelectorAll('ul[data-realizacoes]');
                    realizacoesUl.forEach(ul => {
                        const items = ul.querySelectorAll('li');
                        items.forEach(item => {
                            const text = item.textContent.trim();
                            if (text) {
                                checkPageBreak();
                                doc.setFontSize(9);
                                doc.text('• ' + text, marginLeft + 3, yPosition);
                                yPosition += 5;
                            }
                        });
                    });
                    
                    // Tecnologias
                    const tecnologiasDiv = content.querySelector('.tecnologias-list');
                    if (tecnologiasDiv) {
                        const tecnologiasParagraphs = tecnologiasDiv.querySelectorAll('p');
                        tecnologiasParagraphs.forEach(p => {
                            const text = p.textContent.trim();
                            if (text) {
                                checkPageBreak();
                                doc.setFontSize(9);
                                doc.text(text, marginLeft + 3, yPosition);
                                yPosition += 4;
                            }
                        });
                    }
                    
                    // Tecnologias (UL)
                    const tecnologiasUl = content.querySelectorAll('ul[data-tecnologias]');
                    tecnologiasUl.forEach(ul => {
                        const items = ul.querySelectorAll('li');
                        items.forEach(item => {
                            const text = item.textContent.trim();
                            if (text) {
                                checkPageBreak();
                                doc.setFontSize(9);
                                doc.text('• ' + text, marginLeft + 3, yPosition);
                                yPosition += 4;
                            }
                        });
                    });
                    
                    // Sub-projetos (h4)
                    const subProjetos = content.querySelectorAll('h4');
                    subProjetos.forEach(h4 => {
                        if (h4.textContent.includes('Projeto')) {
                            checkPageBreak(10);
                            doc.setFontSize(10);
                            doc.setFont('helvetica', 'bold');
                            doc.text(h4.textContent.trim(), marginLeft + 3, yPosition);
                            yPosition += 5;
                            
                            // Lista do sub-projeto
                            let nextElement = h4.nextElementSibling;
                            if (nextElement && nextElement.tagName === 'UL') {
                                const items = nextElement.querySelectorAll('li');
                                items.forEach(item => {
                                    const text = item.textContent.trim();
                                    if (text) {
                                        checkPageBreak();
                                        doc.setFontSize(9);
                                        doc.setFont('helvetica', 'normal');
                                        doc.text('• ' + text, marginLeft + 6, yPosition);
                                        yPosition += 4;
                                    }
                                });
                            }
                        }
                    });
                }
            }
            yPosition += 4;
        }
    }
    
    // ===== HABILIDADES TÉCNICAS =====
    const habilidadesSection = document.getElementById('habilidades');
    if (habilidadesSection) {
        checkPageBreak(20);
        addText('HABILIDADES E COMPETÊNCIAS', 14, 'bold', [44, 62, 80], 2);
        addLine();
        
        const cards = habilidadesSection.querySelectorAll('.card');
        cards.forEach(card => {
            checkPageBreak(10);
            
            const titulo = card.querySelector('h3');
            if (titulo) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(titulo.textContent.trim(), marginLeft, yPosition);
                yPosition += 5;
            }
            
            const items = card.querySelectorAll('li');
            items.forEach(item => {
                const text = item.textContent.trim();
                if (text) {
                    checkPageBreak();
                    doc.setFontSize(9);
                    doc.setFont('helvetica', 'normal');
                    doc.text('• ' + text, marginLeft + 3, yPosition);
                    yPosition += 4;
                }
            });
            yPosition += 2;
        });
    }
    
    // ===== RODAPÉ =====
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        const modeText = mode === CV_MODES.COMPLETO ? 'Completo' : 'Resumido';
        doc.text(`Currículo ${modeText} gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')} - Página ${i} de ${totalPages}`, 
                 marginLeft, pageHeight - 10);
    }
    
    // Salvar PDF
    const modeLabel = mode === CV_MODES.COMPLETO ? 'Completo' : 'Resumido';
    const fileName = `Kayham_Cristoffer_CV_${modeLabel}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    return fileName;
}

// Função auxiliar para tratar botões de geração
function setupCVButton(buttonId, mode = CV_MODES.RESUMIDO) {
    const button = document.getElementById(buttonId);
    
    if (button) {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Adiciona animação de loading
            const originalText = button.innerHTML;
            button.innerHTML = buttonId === 'quickCVBtn' ? '⏳' : '⏳ Gerando CV...';
            button.disabled = true;
            
            try {
                // Aguarda um momento para mostrar o loading
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Gera o PDF
                const fileName = await generateCV(mode);
                
                // Feedback de sucesso
                button.innerHTML = buttonId === 'quickCVBtn' ? '✅' : '✅ CV Gerado!';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
                
                console.log(`CV gerado com sucesso: ${fileName}`);
            } catch (error) {
                console.error('Erro ao gerar CV:', error);
                button.innerHTML = buttonId === 'quickCVBtn' ? '❌' : '❌ Erro ao gerar';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                }, 2000);
            }
        });
    }
}

// Inicialização do gerador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    setupCVButton('generateCV', CV_MODES.RESUMIDO);
    setupCVButton('generateCVCompleto', CV_MODES.COMPLETO);
});

// Também escuta quando as seções são carregadas (para o botão no header)
document.addEventListener('sectionsLoaded', () => {
    setupCVButton('quickCVBtn', CV_MODES.RESUMIDO);
    setupCVButton('generateCV', CV_MODES.RESUMIDO);
    setupCVButton('generateCVCompleto', CV_MODES.COMPLETO);
});
