// ========================================
// CV Generator v4 — PDF limpo, compacto e sem poluição
// Resumido: máx 2 páginas | Completo: detalhado
// Fixes: T a t u a p é (→ char), &&&& (&amp;), rodapé discreto, 2 colunas habilidades
// ========================================

const CV_MODES = {
    COMPLETO: 'completo',
    RESUMIDO: 'resumido'
};

// ── Limpeza de texto ──────────────────────────────────────────
function removeEmojis(text) {
    if (!text) return '';
    return text
        .replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '')
        .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
        .replace(/🏅/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
}

// Decodifica entidades HTML. Usa textarea trick para cobrir todos os casos.
function decodeHTML(str) {
    if (!str) return '';
    // Primeiro tenta via textarea DOM (mais completo)
    try {
        const ta = document.createElement('textarea');
        ta.innerHTML = str;
        let decoded = ta.value;
        // Substitui → e setas Unicode por texto ASCII para evitar kerning no jsPDF
        decoded = decoded
            .replace(/→/g, '->')
            .replace(/←/g, '<-')
            .replace(/↔/g, '<->')
            .replace(/⇒/g, '=>')
            .replace(/\u2192/g, '->')
            .replace(/\u2190/g, '<-')
            .replace(/\u00B7/g, '·');
        return decoded;
    } catch (e) {
        // Fallback manual
        return str
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&nbsp;/g, ' ')
            .replace(/&rarr;/g, '->')
            .replace(/&larr;/g, '<-')
            .replace(/&middot;/g, '·')
            .replace(/&#x2192;/g, '->')
            .replace(/&#8594;/g, '->')
            .replace(/&#[0-9]+;/g, '')
            .replace(/&[a-zA-Z]+;/g, '');
    }
}

// Extrai texto limpo: remove ícones FA/SVG, decodifica HTML, limpa emojis e espaços duplos
// IMPORTANTE: clona o nó para não mutilar o DOM real
function cleanText(el) {
    if (!el) return '';
    const clone = el.cloneNode(true);
    // Remove todos os elementos não-textuais: ícones FA, SVG, img
    clone.querySelectorAll('i, svg, img').forEach(n => n.remove());
    // Usa innerHTML → decodeHTML para capturar entidades &amp; corretamente
    const raw = clone.innerHTML || '';
    // Strip tags restantes
    const stripped = raw.replace(/<[^>]+>/g, ' ');
    return removeEmojis(decodeHTML(stripped)).replace(/\s+/g, ' ').trim();
}

// ── Gerador principal ─────────────────────────────────────────
async function generateCV(mode = CV_MODES.RESUMIDO) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const pageH  = 297;
    const pageW  = 210;
    const mLeft  = 14;
    const mRight = 14;
    const cWidth = pageW - mLeft - mRight;
    // Rodapé discreto — reserva mínima
    const footerH = 8;
    const maxY    = pageH - footerH;

    let yPos = 20;

    // ── Helpers ─────────────────────────────────────────────

    function newPage() {
        doc.addPage();
        yPos = 18;
    }

    function breakPage(needed = 10) {
        if (yPos + needed > maxY) newPage();
    }

    function txt(text, size, style = 'normal', afterGap = 2) {
        if (!text || !text.trim()) return;
        doc.setFontSize(size);
        doc.setFont('helvetica', style);
        doc.setTextColor(30, 30, 30);
        const lines = doc.splitTextToSize(text, cWidth);
        lines.forEach(line => {
            breakPage(size * 0.5);
            doc.text(line, mLeft, yPos);
            yPos += size * 0.42;
        });
        yPos += afterGap;
    }

    function txtCol(text, size, xStart, colW, style = 'normal') {
        if (!text || !text.trim()) return 0;
        doc.setFontSize(size);
        doc.setFont('helvetica', style);
        doc.setTextColor(40, 40, 40);
        const lines = doc.splitTextToSize(text, colW - 2);
        let h = 0;
        lines.forEach(line => {
            doc.text(line, xStart, yPos + h);
            h += size * 0.42;
        });
        return h;
    }

    function sectionTitle(label) {
        breakPage(14);
        yPos += 3;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(44, 62, 80);
        doc.text(label.toUpperCase(), mLeft, yPos);
        yPos += 3;
        doc.setDrawColor(99, 102, 241);
        doc.setLineWidth(0.5);
        doc.line(mLeft, yPos, pageW - mRight, yPos);
        yPos += 5;
    }

    function bullet(text, indent = 4, size = 8.5) {
        if (!text || !text.trim()) return;
        breakPage(6);
        doc.setFontSize(size);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(30, 30, 30);
        const lines = doc.splitTextToSize('• ' + text, cWidth - indent);
        lines.forEach(line => {
            breakPage(5);
            doc.text(line, mLeft + indent, yPos);
            yPos += size * 0.42;
        });
    }

    function metaLine(text, size = 8.5) {
        if (!text || !text.trim()) return;
        breakPage(5);
        doc.setFontSize(size);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(90, 90, 90);
        doc.text(text, mLeft, yPos);
        yPos += size * 0.42 + 1;
    }

    // ── Cabeçalho ─────────────────────────────────────────────
    doc.setFillColor(44, 62, 80);
    doc.rect(0, 0, pageW, 38, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(17);
    doc.setFont('helvetica', 'bold');
    doc.text('Kayham Cristoffer Guilhermino de Oliveira', mLeft, 12);

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Analista de TI em Formacao  |  Estagiario TCE-SP  |  Ciencia da Computacao', mLeft, 18);

    doc.setFontSize(8.5);
    doc.text('Sao Paulo - SP  |  +55 (11) 99454-6931  |  kayhamoliveira98@gmail.com', mLeft, 23.5);

    doc.setFontSize(8);
    const c2 = mLeft + 95;
    doc.text('linkedin.com/in/kayhamcristoffer', mLeft, 28.5);
    doc.text('github.com/KayhamCristoffer', c2, 28.5);
    doc.text('kayhamcristoffer.github.io/portfolio', mLeft, 33);
    doc.text('wa.me/5511994546931', c2, 33);

    yPos = 46;

    // ── Perfil Profissional ────────────────────────────────────
    const perfilSection = document.querySelector('.perfil-profissional');
    if (perfilSection) {
        sectionTitle('Perfil Profissional');

        // Apenas os <p> diretos (exclui sub-seções)
        const allP = perfilSection.querySelectorAll('p');
        allP.forEach(p => {
            if (p.closest('.sobre-vagas') || p.closest('.sobre-pcd') ||
                p.closest('.sobre-stats') || p.closest('.sobre-ctas') ||
                p.classList.contains('sobre-vagas-titulo') ||
                p.classList.contains('pcd-titulo') ||
                p.classList.contains('pcd-desc')) return;

            const t = cleanText(p);
            if (t) {
                // No resumido, usa só o primeiro parágrafo (perfil principal)
                if (mode === CV_MODES.RESUMIDO) {
                    txt(t, 9, 'normal', 2);
                    return; // Processa só o primeiro — mas o forEach continua; usamos flag abaixo
                }
                txt(t, 9, 'normal', 2);
            }
        });

        // PCD — texto simples, sem badge de lei
        const pcdDesc = perfilSection.querySelector('.pcd-desc');
        if (pcdDesc) {
            const pcdTxt = cleanText(pcdDesc);
            if (pcdTxt) {
                breakPage(6);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(90, 90, 90);
                const pcdLine = 'PCD: ' + pcdTxt;
                const lines = doc.splitTextToSize(pcdLine, cWidth);
                lines.forEach(line => {
                    breakPage(4);
                    doc.text(line, mLeft, yPos);
                    yPos += 3.5;
                });
                yPos += 2;
            }
        }
    }

    // Vagas desejadas — apenas modo completo
    if (mode === CV_MODES.COMPLETO) {
        const tags = document.querySelectorAll('.vaga-tag');
        if (tags.length) {
            const tagTexts = Array.from(tags).map(t => cleanText(t)).filter(Boolean);
            if (tagTexts.length) {
                breakPage(8);
                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'italic');
                doc.setTextColor(99, 102, 241);
                doc.text('Aberto a: ' + tagTexts.join('  |  '), mLeft, yPos);
                yPos += 6;
            }
        }
    }

    // ── Experiências Profissionais ─────────────────────────────
    const expSection = document.getElementById('experiencias');
    if (expSection) {
        sectionTitle('Experiencias Profissionais');

        const allTrabalhos = expSection.querySelectorAll('.trabalho-item');

        allTrabalhos.forEach(t => {
            // Detecta se é voluntário
            const sectionParent = t.closest('.trabalhos-detalhados');
            const subtitleEl = sectionParent && sectionParent.querySelector('.section-subtitle');
            const subtitleTxt = subtitleEl ? cleanText(subtitleEl) : '';
            const isVoluntario = subtitleTxt.toLowerCase().includes('voluntario') ||
                                 subtitleTxt.toLowerCase().includes('voluntário') ||
                                 subtitleTxt.toLowerCase().includes('lideranca') ||
                                 subtitleTxt.toLowerCase().includes('liderança');

            // No resumido, pula voluntário
            if (mode === CV_MODES.RESUMIDO && isVoluntario) return;

            breakPage(20);

            const h4 = t.querySelector('h4');
            if (h4) {
                doc.setFontSize(10.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(44, 62, 80);
                doc.text(cleanText(h4), mLeft, yPos);
                yPos += 5;
            }

            const cargo = t.querySelector('.cargo');
            if (cargo) {
                doc.setFontSize(9.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(30, 30, 30);
                doc.text(cleanText(cargo), mLeft, yPos);
                yPos += 4;
            }

            const dept = t.querySelector('.departamento');
            if (dept) metaLine(cleanText(dept));

            // badges localizacao e periodo
            const localEl   = t.querySelector('.badge-local');
            const periodoEl = t.querySelector('.badge-periodo');
            const parts     = [];
            if (localEl)   parts.push(cleanText(localEl));
            if (periodoEl) parts.push(cleanText(periodoEl));
            if (parts.length) metaLine(parts.join('  |  '));

            yPos += 1;

            // Descrição — no resumido, pula para economizar espaço
            if (mode === CV_MODES.COMPLETO) {
                const descP = t.querySelector('.trabalho-descricao');
                if (descP) txt(cleanText(descP), 9, 'normal', 1);
            }

            const atividades = t.querySelectorAll('.trabalho-atividades li');
            const maxItems = mode === CV_MODES.RESUMIDO ? Math.min(4, atividades.length) : atividades.length;
            for (let i = 0; i < maxItems; i++) {
                bullet(cleanText(atividades[i]), 4, 8.5);
            }
            yPos += 3;
        });

        // Voluntário — no modo completo, como subseção separada
        if (mode === CV_MODES.COMPLETO) {
            let hasVol = false;
            allTrabalhos.forEach(t => {
                const sp = t.closest('.trabalhos-detalhados');
                const subtitleEl = sp && sp.querySelector('.section-subtitle');
                const subtitleTxt = subtitleEl ? cleanText(subtitleEl) : '';
                const isVol = subtitleTxt.toLowerCase().includes('voluntario') ||
                              subtitleTxt.toLowerCase().includes('voluntário') ||
                              subtitleTxt.toLowerCase().includes('lideranca') ||
                              subtitleTxt.toLowerCase().includes('liderança');
                if (!isVol) return;

                if (!hasVol) {
                    breakPage(12);
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(99, 102, 241);
                    doc.text('Voluntario & Lideranca', mLeft, yPos);
                    yPos += 5;
                    hasVol = true;
                }

                const h4 = t.querySelector('h4');
                if (h4) {
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(44, 62, 80);
                    doc.text(cleanText(h4), mLeft, yPos);
                    yPos += 4;
                }

                const cargo = t.querySelector('.cargo');
                if (cargo) metaLine(cleanText(cargo), 9);

                const deptEl = t.querySelector('.departamento');
                if (deptEl) metaLine(cleanText(deptEl), 8.5);

                const localEl   = t.querySelector('.badge-local');
                const periodoEl = t.querySelector('.badge-periodo');
                const parts     = [];
                if (localEl)   parts.push(cleanText(localEl));
                if (periodoEl) parts.push(cleanText(periodoEl));
                if (parts.length) metaLine(parts.join('  |  '));

                const atividades = t.querySelectorAll('.trabalho-atividades li');
                atividades.forEach(li => bullet(cleanText(li), 4, 8.5));
                yPos += 3;
            });
        }
    }

    // ── Formação Acadêmica ─────────────────────────────────────
    const formacaoSection = document.getElementById('formacao');
    if (formacaoSection) {
        sectionTitle('Formacao Academica');

        const items = formacaoSection.querySelectorAll('.formacao-item');

        // Resumido: pula formações básicas / não-técnicas
        const skipInResumo = ['Cadista', 'Audiovisual', 'Contrarregra', 'Ensino Fundamental', 'Ensino Medio', 'Ensino Médio'];

        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const h3txt = h3 ? cleanText(h3) : '';

            if (mode === CV_MODES.RESUMIDO) {
                if (skipInResumo.some(s => h3txt.toLowerCase().includes(s.toLowerCase()))) return;
            }

            breakPage(12);

            if (h3) {
                doc.setFontSize(9.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(44, 62, 80);
                doc.text(h3txt, mLeft, yPos);
                yPos += 4;
            }

            const inst    = item.querySelector('.formacao-instituicao');
            const periodo = item.querySelector('.formacao-periodo');
            const instTxt = inst    ? cleanText(inst)    : '';
            const perTxt  = periodo ? cleanText(periodo) : '';
            const meta    = [instTxt, perTxt].filter(Boolean).join('  |  ');
            if (meta) metaLine(meta, 8.5);

            // Certificações — apenas modo completo
            if (mode === CV_MODES.COMPLETO) {
                const certs = item.querySelectorAll('.formacao-certificacoes li');
                if (certs.length) {
                    metaLine('Certs: ' + Array.from(certs).map(c => cleanText(c)).join('; '), 7.5);
                }
            }
            yPos += 1;
        });
    }

    // ── Habilidades em 2 colunas ───────────────────────────────
    const habSection = document.getElementById('habilidades');
    if (habSection) {
        sectionTitle('Habilidades & Competencias');

        const cards = habSection.querySelectorAll('.card');
        const gap   = 6;
        const colW  = (cWidth - gap) / 2;
        const col1X = mLeft;
        const col2X = mLeft + colW + gap;

        let colYLeft  = yPos;
        let colYRight = yPos;

        cards.forEach(card => {
            const h3      = card.querySelector('h3');
            const liItems = card.querySelectorAll('li');
            if (!h3 && !liItems.length) return;

            // Estima altura do bloco
            const cardH = 5 + liItems.length * 4.0 + 3;

            // Coluna mais baixa (menor Y = mais espaço disponível)
            const useLeft = colYLeft <= colYRight;
            const xStart  = useLeft ? col1X : col2X;
            let   cY      = useLeft ? colYLeft : colYRight;

            // Nova página se necessário
            if (cY + cardH > maxY) {
                newPage();
                colYLeft  = yPos;
                colYRight = yPos;
                cY        = yPos;
            }

            // Título da categoria
            if (h3) {
                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(44, 62, 80);
                doc.text(cleanText(h3), xStart, cY);
                cY += 4.5;
            }

            // Itens em lista
            liItems.forEach(li => {
                const t = cleanText(li);
                if (!t) return;
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(40, 40, 40);
                const lines = doc.splitTextToSize('• ' + t, colW - 2);
                lines.forEach(line => {
                    if (cY > maxY) {
                        newPage();
                        colYLeft  = yPos;
                        colYRight = yPos;
                        cY        = yPos;
                    }
                    doc.text(line, xStart + 1, cY);
                    cY += 3.6;
                });
            });

            cY += 3;

            if (useLeft) colYLeft  = cY;
            else         colYRight = cY;
        });

        // Avança yPos para além das duas colunas
        yPos = Math.max(colYLeft, colYRight) + 2;
    }

    // ── Projetos (apenas no completo) ──────────────────────────
    if (mode === CV_MODES.COMPLETO) {
        const projSection = document.getElementById('projetos');
        if (projSection) {
            sectionTitle('Projetos Destacados');

            const projetos = projSection.querySelectorAll('.projeto-item');

            projetos.forEach(proj => {
                breakPage(16);

                const toggleBtn = proj.querySelector('.toggle');
                const tituloEl  = proj.querySelector('h3');
                const tituloTxt = toggleBtn
                    ? cleanText(toggleBtn).replace(/[🔽▼▸]/g, '').trim()
                    : (tituloEl ? cleanText(tituloEl) : '');

                if (tituloTxt) {
                    doc.setFontSize(9.5);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(44, 62, 80);
                    doc.text(tituloTxt, mLeft, yPos);
                    yPos += 4;
                }

                const content = proj.querySelector('.content');
                if (content) {
                    const descP = content.querySelector('p[data-descricao], p:not(.projeto-info)');
                    if (descP) txt(cleanText(descP), 8.5, 'normal', 1);
                }
                yPos += 2;
            });
        }
    }

    // ── Idiomas & Soft Skills (no resumido — linha compacta) ───
    if (mode === CV_MODES.RESUMIDO) {
        breakPage(12);
        sectionTitle('Idiomas & Soft Skills');
        const idiomasTxt = 'Portugues (Nativo)  |  Ingles Tecnico Intermediario (Wise Up)  |  Proatividade  |  Lideranca  |  Trabalho em equipe  |  Resiliencia';
        txt(idiomasTxt, 8.5, 'normal', 1);
    }

    // ── Rodapé: apenas número de página, discreto ──────────────
    const totalPgs = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPgs; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(180, 180, 180);
        doc.text(`${p} / ${totalPgs}`, pageW - mRight, pageH - 4, { align: 'right' });
    }

    // ── Salvar ────────────────────────────────────────────────
    const label    = mode === CV_MODES.COMPLETO ? 'Completo' : 'Resumido';
    const fileName = `Kayham_Cristoffer_CV_${label}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    return fileName;
}

// ── Setup dos botões ──────────────────────────────────────────
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

// ── Inicialização ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    setupCVButton('generateCV',         CV_MODES.RESUMIDO);
    setupCVButton('generateCVCompleto', CV_MODES.COMPLETO);
});

document.addEventListener('sectionsLoaded', () => {
    setupCVButton('quickCVBtn',         CV_MODES.COMPLETO);
    setupCVButton('generateCV',         CV_MODES.RESUMIDO);
    setupCVButton('generateCVCompleto', CV_MODES.COMPLETO);
});
