// ========================================
// CV Generator — Gera PDF a partir do conteúdo visível do HTML
// Versão 2.0 — seletores corrigidos para o HTML refatorado
// ========================================

const CV_MODES = {
    COMPLETO: 'completo',
    RESUMIDO: 'resumido'
};

// Remove emojis, Font Awesome e SVGs de uma string de texto
function removeEmojis(text) {
    if (!text) return '';
    return text
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
        .replace(/🏅/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Extrai texto limpo de um elemento DOM (sem ícones FA, SVG ou emojis)
function cleanText(el) {
    if (!el) return '';
    // Clonar e remover tags de ícone antes de pegar textContent
    const clone = el.cloneNode(true);
    clone.querySelectorAll('i, svg').forEach(n => n.remove());
    return removeEmojis(clone.textContent || '');
}

// ─────────────────────────────────────────────────────────────
// Gerador principal
// ─────────────────────────────────────────────────────────────
async function generateCV(mode = CV_MODES.RESUMIDO) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    let yPos = 20;
    const pageH   = 297;
    const mLeft   = 15;
    const mRight  = 15;
    const pageW   = 210;
    const cWidth  = pageW - mLeft - mRight;

    // ── Helpers ──────────────────────────────────────────────

    function breakPage(needed = 10) {
        if (yPos + needed > pageH - 20) {
            doc.addPage();
            yPos = 20;
        }
    }

    function txt(text, size, style = 'normal', gap = 0) {
        doc.setFontSize(size);
        doc.setFont('helvetica', style);
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize(removeEmojis(text), cWidth);
        lines.forEach(line => {
            breakPage();
            doc.text(line, mLeft, yPos);
            yPos += size * 0.45;
        });
        yPos += 3 + gap;
    }

    function sectionTitle(label) {
        breakPage(12);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(44, 62, 80);
        doc.text(removeEmojis(label), mLeft, yPos);
        yPos += 6;
    }

    function hRule() {
        breakPage(8);
        yPos += 1;
        doc.setDrawColor(44, 62, 80);
        doc.setLineWidth(0.7);
        doc.line(mLeft, yPos, pageW - mRight, yPos);
        yPos += 5;
    }

    function bullet(text, indent = 3) {
        breakPage(6);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const lines = doc.splitTextToSize('• ' + removeEmojis(text), cWidth - indent);
        lines.forEach(line => {
            breakPage();
            doc.text(line, mLeft + indent, yPos);
            yPos += 4.5;
        });
    }

    // ── Cabeçalho colorido ────────────────────────────────────
    doc.setFillColor(44, 62, 80);
    doc.rect(0, 0, pageW, 42, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Kayham Cristoffer Guilhermino de Oliveira', mLeft, 14);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Analista de TI em Formação | Estagiário TCE-SP | Ciência da Computação', mLeft, 21);

    doc.setFontSize(9);
    doc.text('São Paulo – SP  |  +55 (11) 99454-6931  |  kayhamoliveira98@gmail.com', mLeft, 27);

    doc.setFontSize(8);
    const col2X = mLeft + 95;
    doc.text('LinkedIn: linkedin.com/in/kayhamcristoffer', mLeft, 33);
    doc.text('GitHub: github.com/KayhamCristoffer', col2X, 33);
    doc.text('Portfólio: kayhamcristoffer.github.io/portfolio', mLeft, 38);
    doc.text('WhatsApp: wa.me/5511994546931', col2X, 38);

    yPos = 52;

    // ── Perfil Profissional ───────────────────────────────────
    const perfilSection = document.querySelector('.perfil-profissional');
    if (perfilSection) {
        sectionTitle('PERFIL PROFISSIONAL');
        hRule();

        const paragrafos = perfilSection.querySelectorAll('p');
        paragrafos.forEach(p => {
            const t = cleanText(p).replace(/\s+/g, ' ').trim();
            if (t) {
                txt(t, 10, 'normal', 2);
            }
        });
        yPos += 2;
    }

    // ── Formação Acadêmica ────────────────────────────────────
    const formacaoSection = document.getElementById('formacao');
    if (formacaoSection) {
        sectionTitle('FORMAÇÃO ACADÊMICA');
        hRule();

        const items = formacaoSection.querySelectorAll('.formacao-item');
        items.forEach(item => {
            breakPage(18);

            const h3 = item.querySelector('h3');
            if (h3) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(cleanText(h3), mLeft, yPos);
                yPos += 5;
            }

            const inst = item.querySelector('.formacao-instituicao');
            if (inst) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                doc.text(cleanText(inst), mLeft, yPos);
                yPos += 4;
            }

            const periodo = item.querySelector('.formacao-periodo');
            if (periodo) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.text(cleanText(periodo), mLeft, yPos);
                yPos += 5;
            }

            const desc = item.querySelector('.formacao-desc');
            if (desc) {
                doc.setFont('helvetica', 'normal');
                txt(cleanText(desc), 9, 'normal', 1);
            }

            // Certificações Senac intermediárias
            const certs = item.querySelectorAll('.formacao-certificacoes li');
            if (certs.length) {
                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(80, 80, 80);
                doc.text('Certificações intermediárias:', mLeft + 2, yPos);
                yPos += 4;
                certs.forEach(cert => {
                    bullet(cleanText(cert), 5);
                });
            }

            yPos += 3;
        });
    }

    // ── Experiências Profissionais ────────────────────────────
    const expSection = document.getElementById('experiencias');
    if (expSection) {
        sectionTitle('EXPERIÊNCIAS PROFISSIONAIS');
        hRule();

        if (mode === CV_MODES.COMPLETO) {
            // --- COMPLETO: Cards de competências resumidos ---
            const resumoCards = expSection.querySelectorAll('.experiencias-resumo .card');
            if (resumoCards.length) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(44, 62, 80);
                doc.text('Áreas de Atuação', mLeft, yPos);
                yPos += 5;

                resumoCards.forEach(card => {
                    breakPage(14);
                    const titulo = card.querySelector('h3');
                    const periodo = card.querySelector('.periodo');
                    const desc = card.querySelector('p:not(.periodo)');

                    if (titulo) {
                        doc.setFontSize(10);
                        doc.setFont('helvetica', 'bold');
                        doc.setTextColor(0, 0, 0);
                        doc.text(cleanText(titulo), mLeft, yPos);
                        yPos += 4;
                    }
                    if (periodo) {
                        doc.setFontSize(8.5);
                        doc.setFont('helvetica', 'italic');
                        doc.text(cleanText(periodo), mLeft, yPos);
                        yPos += 4;
                    }
                    if (desc) {
                        txt(cleanText(desc), 9, 'normal', 1);
                    }
                    yPos += 1;
                });
                yPos += 3;
            }
        }

        // --- Histórico profissional detalhado ---
        const trabalhos = expSection.querySelectorAll('.trabalho-item');
        trabalhos.forEach(t => {
            breakPage(22);

            const h4 = t.querySelector('h4');
            if (h4) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(cleanText(h4), mLeft, yPos);
                yPos += 5;
            }

            const cargo = t.querySelector('.cargo');
            if (cargo) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.text(cleanText(cargo), mLeft, yPos);
                yPos += 4;
            }

            const dept = t.querySelector('.departamento');
            if (dept) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.text(cleanText(dept), mLeft, yPos);
                yPos += 4;
            }

            // Badges: badge-local e badge-periodo
            const local   = t.querySelector('.badge-local');
            const periodo = t.querySelector('.badge-periodo');
            const badgeParts = [];
            if (local)   badgeParts.push(cleanText(local));
            if (periodo) badgeParts.push(cleanText(periodo));
            if (badgeParts.length) {
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.text(badgeParts.join('  ·  '), mLeft, yPos);
                yPos += 5;
            }

            // Descrição principal (.trabalho-descricao)
            const descP = t.querySelector('.trabalho-descricao');
            if (descP) {
                txt(cleanText(descP), 9, 'normal', 1);
            }

            // Atividades (.trabalho-atividades li)
            const atividades = t.querySelectorAll('.trabalho-atividades li');
            if (mode === CV_MODES.COMPLETO) {
                atividades.forEach(li => bullet(cleanText(li), 4));
            } else {
                // Resumido: primeiros 5 itens
                const max = Math.min(5, atividades.length);
                for (let i = 0; i < max; i++) {
                    bullet(cleanText(atividades[i]), 4);
                }
            }

            yPos += 4;
        });
    }

    // ── Projetos ──────────────────────────────────────────────
    const projSection = document.getElementById('projetos');
    if (projSection) {
        breakPage(20);
        sectionTitle('PROJETOS DESTACADOS');
        hRule();

        const projetos = projSection.querySelectorAll('.projeto-item');
        const maxProj  = mode === CV_MODES.COMPLETO ? projetos.length : Math.min(5, projetos.length);

        for (let i = 0; i < maxProj; i++) {
            const proj = projetos[i];
            breakPage(20);

            // Título (botão toggle ou h3)
            const toggleBtn = proj.querySelector('.toggle');
            const tituloEl  = proj.querySelector('h3');
            const tituloTxt = toggleBtn
                ? cleanText(toggleBtn).replace(/[🔽▼▸]/g, '').trim()
                : (tituloEl ? cleanText(tituloEl) : '');

            if (tituloTxt) {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(tituloTxt, mLeft, yPos);
                yPos += 5;
            }

            // Meta info (strong / span pares)
            const projetoInfo = proj.querySelector('.projeto-info');
            if (projetoInfo) {
                const strongs = projetoInfo.querySelectorAll('strong');
                const spans   = projetoInfo.querySelectorAll('span');
                doc.setFontSize(9);
                doc.setFont('helvetica', 'italic');
                strongs.forEach((s, idx) => {
                    const val = spans[idx] ? cleanText(spans[idx]) : '';
                    if (val) {
                        breakPage();
                        doc.text(`${cleanText(s)} ${val}`, mLeft, yPos);
                        yPos += 4;
                    }
                });
                yPos += 1;
            }

            // Descrição principal
            const content = proj.querySelector('.content');
            if (content) {
                const descP = content.querySelector('p[data-descricao], p:not(.projeto-info)');
                if (descP) {
                    txt(cleanText(descP), 9, 'normal', 1);
                }

                if (mode === CV_MODES.COMPLETO) {
                    // Realizações
                    content.querySelectorAll('.realizacoes-list p, ul[data-realizacoes] li').forEach(el => {
                        bullet(cleanText(el), 3);
                    });

                    // Tecnologias
                    const tecDiv = content.querySelector('.tecnologias-list');
                    if (tecDiv) {
                        txt(cleanText(tecDiv), 9, 'italic', 1);
                    }
                    content.querySelectorAll('ul[data-tecnologias] li').forEach(el => {
                        bullet(cleanText(el), 3);
                    });

                    // Sub-projetos h4
                    content.querySelectorAll('h4').forEach(h4 => {
                        if (h4.textContent.includes('Projeto')) {
                            breakPage(10);
                            doc.setFontSize(10);
                            doc.setFont('helvetica', 'bold');
                            doc.setTextColor(0, 0, 0);
                            doc.text(cleanText(h4), mLeft + 3, yPos);
                            yPos += 5;
                            const nextUl = h4.nextElementSibling;
                            if (nextUl && nextUl.tagName === 'UL') {
                                nextUl.querySelectorAll('li').forEach(li => bullet(cleanText(li), 6));
                            }
                        }
                    });
                }
            }
            yPos += 4;
        }
    }

    // ── Habilidades ───────────────────────────────────────────
    const habSection = document.getElementById('habilidades');
    if (habSection) {
        breakPage(20);
        sectionTitle('HABILIDADES E COMPETÊNCIAS');
        hRule();

        const cards = habSection.querySelectorAll('.card');
        cards.forEach(card => {
            breakPage(10);

            const h3 = card.querySelector('h3');
            if (h3) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(cleanText(h3), mLeft, yPos);
                yPos += 5;
            }

            card.querySelectorAll('li').forEach(li => {
                bullet(cleanText(li), 3);
            });
            yPos += 2;
        });
    }

    // ── Rodapé em todas as páginas ────────────────────────────
    const totalPgs = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPgs; p++) {
        doc.setPage(p);
        doc.setFontSize(7.5);
        doc.setTextColor(140, 140, 140);
        const label = mode === CV_MODES.COMPLETO ? 'Completo' : 'Resumido';
        doc.text(
            `Currículo ${label} · Kayham Cristoffer · gerado em ${new Date().toLocaleDateString('pt-BR')} · Pág ${p}/${totalPgs}`,
            mLeft, pageH - 8
        );
    }

    // ── Salvar ────────────────────────────────────────────────
    const label    = mode === CV_MODES.COMPLETO ? 'Completo' : 'Resumido';
    const fileName = `Kayham_Cristoffer_CV_${label}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    return fileName;
}

// ─────────────────────────────────────────────────────────────
// Setup dos botões
// ─────────────────────────────────────────────────────────────
function setupCVButton(buttonId, mode = CV_MODES.RESUMIDO) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalHTML = button.innerHTML;
        button.innerHTML   = buttonId === 'quickCVBtn' ? '⏳' : '⏳ Gerando CV...';
        button.disabled    = true;

        try {
            await new Promise(r => setTimeout(r, 400));
            const fileName = await generateCV(mode);
            button.innerHTML = buttonId === 'quickCVBtn' ? '✅' : '✅ CV Gerado!';
            console.log('CV gerado:', fileName);
        } catch (err) {
            console.error('Erro ao gerar CV:', err);
            button.innerHTML = buttonId === 'quickCVBtn' ? '❌' : '❌ Erro ao gerar';
        } finally {
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled  = false;
            }, 2200);
        }
    });
}

// ─────────────────────────────────────────────────────────────
// Inicialização
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupCVButton('generateCV',         CV_MODES.RESUMIDO);
    setupCVButton('generateCVCompleto', CV_MODES.COMPLETO);
});

document.addEventListener('sectionsLoaded', () => {
    setupCVButton('quickCVBtn',         CV_MODES.COMPLETO);
    setupCVButton('generateCV',         CV_MODES.RESUMIDO);
    setupCVButton('generateCVCompleto', CV_MODES.COMPLETO);
});
