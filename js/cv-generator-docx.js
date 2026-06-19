// ========================================
// CV Generator DOCX — Exportação Word editável
// Usa docx.js (window.docx) carregado via CDN
// Resumido e Completo — mesma estrutura do cv-generator.js
// ========================================

async function generateCVDocx(mode = 'resumido') {
    if (!window.docx) {
        alert('Biblioteca Word ainda carregando. Tente novamente em 2 segundos.');
        return;
    }

    const {
        Document, Packer, Paragraph, TextRun, HeadingLevel,
        AlignmentType, BorderStyle, Table, TableRow, TableCell,
        WidthType, ShadingType, TabStopType, TabStopPosition,
        Header, Footer, PageNumber, NumberFormat,
        convertInchesToTwip, convertMillimetersToTwip
    } = window.docx;

    // ── Helpers de limpeza (reusa cleanText do cv-generator.js se disponível) ──
    function clean(el) {
        if (!el) return '';
        if (typeof cleanText === 'function') return cleanText(el);
        const clone = el.cloneNode(true);
        clone.querySelectorAll('i, svg, img').forEach(n => n.remove());
        return clone.textContent.replace(/\s+/g, ' ').trim();
    }

    function str(s) {
        return (s || '').replace(/\s+/g, ' ').trim();
    }

    // ── Paleta de cores ──
    const COR_TITULO  = '2C3E50'; // azul escuro cabeçalho
    const COR_ACCENT  = '6366F1'; // violeta destaque
    const COR_CINZA   = '888888'; // metadados
    const COR_BRANCO  = 'FFFFFF';
    const COR_FUNDO   = 'F4F6FA'; // fundo suave
    const COR_BORDA   = 'CBD5E1';

    // ── Builders de parágrafo ──

    function paraHeading(text, color = COR_TITULO) {
        return new Paragraph({
            children: [new TextRun({ text: str(text), bold: true, size: 28, color, font: 'Calibri' })],
            spacing: { before: 240, after: 80 },
        });
    }

    function sectionHeader(label) {
        return [
            new Paragraph({
                children: [
                    new TextRun({ text: label.toUpperCase(), bold: true, size: 22, color: COR_TITULO, font: 'Calibri' })
                ],
                spacing: { before: 280, after: 60 },
                border: {
                    bottom: { style: BorderStyle.SINGLE, size: 6, color: COR_ACCENT, space: 4 }
                }
            })
        ];
    }

    function jobTitle(text) {
        return new Paragraph({
            children: [new TextRun({ text: str(text), bold: true, size: 22, color: COR_TITULO, font: 'Calibri' })],
            spacing: { before: 180, after: 40 },
        });
    }

    function jobMeta(text) {
        return new Paragraph({
            children: [new TextRun({ text: str(text), italics: true, size: 18, color: COR_CINZA, font: 'Calibri' })],
            spacing: { before: 20, after: 20 },
        });
    }

    function bodyText(text, bold = false) {
        return new Paragraph({
            children: [new TextRun({ text: str(text), size: 20, bold, font: 'Calibri', color: '1E1E1E' })],
            spacing: { before: 30, after: 30 },
        });
    }

    function bulletPara(text) {
        return new Paragraph({
            children: [new TextRun({ text: str(text), size: 19, font: 'Calibri', color: '333333' })],
            bullet: { level: 0 },
            spacing: { before: 30, after: 30 },
            indent: { left: convertInchesToTwip(0.25) },
        });
    }

    function spacer(pts = 80) {
        return new Paragraph({ children: [new TextRun('')], spacing: { before: 0, after: pts } });
    }

    // ── Cabeçalho colorido (tabela de 1 linha) ──
    function buildHeader() {
        return new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            shading: { type: ShadingType.SOLID, color: COR_TITULO, fill: COR_TITULO },
                            margins: { top: 200, bottom: 200, left: 300, right: 300 },
                            borders: {
                                top:    { style: BorderStyle.NONE },
                                bottom: { style: BorderStyle.NONE },
                                left:   { style: BorderStyle.NONE },
                                right:  { style: BorderStyle.NONE },
                            },
                            children: [
                                new Paragraph({
                                    children: [new TextRun({ text: 'Kayham Cristoffer Guilhermino de Oliveira', bold: true, size: 34, color: COR_BRANCO, font: 'Calibri' })],
                                    spacing: { after: 60 },
                                }),
                                new Paragraph({
                                    children: [new TextRun({ text: 'Analista de TI em Formacao  |  Estagiario TCE-SP  |  Ciencia da Computacao', size: 20, color: 'D0D8E8', font: 'Calibri' })],
                                    spacing: { after: 40 },
                                }),
                                new Paragraph({
                                    children: [new TextRun({ text: 'Sao Paulo - SP  |  +55 (11) 99454-6931  |  kayhamoliveira98@gmail.com', size: 18, color: 'B0BDD0', font: 'Calibri' })],
                                    spacing: { after: 40 },
                                }),
                                new Paragraph({
                                    children: [new TextRun({ text: 'linkedin.com/in/kayhamcristoffer  |  github.com/KayhamCristoffer  |  wa.me/5511994546931', size: 17, color: '8FA3C0', font: 'Calibri' })],
                                    spacing: { after: 0 },
                                }),
                            ]
                        })
                    ]
                })
            ],
        });
    }

    // ── Corpo do documento ──
    const children = [];

    // Cabeçalho
    children.push(buildHeader());
    children.push(spacer(100));

    // ── Perfil Profissional ──
    const perfilSection = document.querySelector('.perfil-profissional');
    if (perfilSection) {
        children.push(...sectionHeader('Perfil Profissional'));
        const allP = perfilSection.querySelectorAll('p');
        let count = 0;
        allP.forEach(p => {
            if (p.closest('.sobre-vagas') || p.closest('.sobre-pcd') ||
                p.closest('.sobre-stats') || p.closest('.sobre-ctas') ||
                p.classList.contains('pcd-titulo') || p.classList.contains('pcd-desc')) return;
            const t = clean(p);
            if (!t) return;
            if (mode === 'resumido' && count >= 1) return; // só 1 parágrafo no resumido
            children.push(bodyText(t));
            count++;
        });

        // PCD — breve linha
        const pcdDesc = perfilSection.querySelector('.pcd-desc');
        if (pcdDesc) {
            const pcdTxt = clean(pcdDesc);
            if (pcdTxt) children.push(bodyText('PCD: ' + pcdTxt, false));
        }

        // Vagas — só completo
        if (mode === 'completo') {
            const tags = document.querySelectorAll('.vaga-tag');
            if (tags.length) {
                const tagTexts = Array.from(tags).map(t => clean(t)).filter(Boolean);
                if (tagTexts.length) {
                    children.push(new Paragraph({
                        children: [new TextRun({ text: 'Aberto a: ' + tagTexts.join('  |  '), italics: true, size: 19, color: COR_ACCENT, font: 'Calibri' })],
                        spacing: { before: 60, after: 60 },
                    }));
                }
            }
        }
    }

    // ── Experiências Profissionais ──
    const expSection = document.getElementById('experiencias');
    if (expSection) {
        children.push(...sectionHeader('Experiencias Profissionais'));

        const allTrabalhos = expSection.querySelectorAll('.trabalho-item');

        // Loop profissional (não voluntário)
        allTrabalhos.forEach(t => {
            const sectionParent = t.closest('.trabalhos-detalhados');
            const subtitleEl = sectionParent && sectionParent.querySelector('.section-subtitle');
            const subtitleTxt = subtitleEl ? clean(subtitleEl) : '';
            const isVol = subtitleTxt.toLowerCase().includes('voluntario') ||
                          subtitleTxt.toLowerCase().includes('voluntário') ||
                          subtitleTxt.toLowerCase().includes('lideranca') ||
                          subtitleTxt.toLowerCase().includes('liderança');
            if (isVol) return; // separado abaixo

            const h4 = t.querySelector('h4');
            if (h4) children.push(jobTitle(clean(h4)));

            const cargo = t.querySelector('.cargo');
            if (cargo) children.push(bodyText(clean(cargo), true));

            const dept = t.querySelector('.departamento');
            if (dept) children.push(jobMeta(clean(dept)));

            const localEl   = t.querySelector('.badge-local');
            const periodoEl = t.querySelector('.badge-periodo');
            const parts     = [];
            if (localEl)   parts.push(clean(localEl));
            if (periodoEl) parts.push(clean(periodoEl));
            if (parts.length) children.push(jobMeta(parts.join('  |  ')));

            if (mode === 'completo') {
                const descP = t.querySelector('.trabalho-descricao');
                if (descP) children.push(bodyText(clean(descP)));
            }

            const atividades = t.querySelectorAll('.trabalho-atividades li');
            const maxItems = mode === 'resumido' ? Math.min(4, atividades.length) : atividades.length;
            for (let i = 0; i < maxItems; i++) {
                children.push(bulletPara(clean(atividades[i])));
            }
            children.push(spacer(40));
        });

        // Voluntário — apenas no completo
        if (mode === 'completo') {
            let hasVol = false;
            allTrabalhos.forEach(t => {
                const sp = t.closest('.trabalhos-detalhados');
                const subtitleEl = sp && sp.querySelector('.section-subtitle');
                const subtitleTxt = subtitleEl ? clean(subtitleEl) : '';
                const isVol = subtitleTxt.toLowerCase().includes('voluntario') ||
                              subtitleTxt.toLowerCase().includes('voluntário') ||
                              subtitleTxt.toLowerCase().includes('lideranca') ||
                              subtitleTxt.toLowerCase().includes('liderança');
                if (!isVol) return;

                if (!hasVol) {
                    children.push(new Paragraph({
                        children: [new TextRun({ text: 'Voluntario & Lideranca', bold: true, size: 22, color: COR_ACCENT, font: 'Calibri' })],
                        spacing: { before: 200, after: 60 },
                    }));
                    hasVol = true;
                }

                const h4 = t.querySelector('h4');
                if (h4) children.push(jobTitle(clean(h4)));

                const cargo = t.querySelector('.cargo');
                if (cargo) children.push(jobMeta(clean(cargo)));

                const deptEl = t.querySelector('.departamento');
                if (deptEl) children.push(jobMeta(clean(deptEl)));

                const localEl   = t.querySelector('.badge-local');
                const periodoEl = t.querySelector('.badge-periodo');
                const parts     = [];
                if (localEl)   parts.push(clean(localEl));
                if (periodoEl) parts.push(clean(periodoEl));
                if (parts.length) children.push(jobMeta(parts.join('  |  ')));

                const atividades = t.querySelectorAll('.trabalho-atividades li');
                atividades.forEach(li => children.push(bulletPara(clean(li))));
                children.push(spacer(40));
            });
        }
    }

    // ── Formação Acadêmica ──
    const formacaoSection = document.getElementById('formacao');
    if (formacaoSection) {
        children.push(...sectionHeader('Formacao Academica'));

        const skipInResumo = ['Cadista', 'Audiovisual', 'Contrarregra', 'Ensino Fundamental', 'Ensino Medio', 'Ensino Médio'];
        const items = formacaoSection.querySelectorAll('.formacao-item');

        items.forEach(item => {
            const h3 = item.querySelector('h3');
            const h3txt = h3 ? clean(h3) : '';

            if (mode === 'resumido') {
                if (skipInResumo.some(s => h3txt.toLowerCase().includes(s.toLowerCase()))) return;
            }

            children.push(jobTitle(h3txt));

            const inst    = item.querySelector('.formacao-instituicao');
            const periodo = item.querySelector('.formacao-periodo');
            const instTxt = inst    ? clean(inst)    : '';
            const perTxt  = periodo ? clean(periodo) : '';
            const meta    = [instTxt, perTxt].filter(Boolean).join('  |  ');
            if (meta) children.push(jobMeta(meta));

            if (mode === 'completo') {
                const certs = item.querySelectorAll('.formacao-certificacoes li');
                if (certs.length) {
                    children.push(bodyText('Certificacoes: ' + Array.from(certs).map(c => clean(c)).join('; ')));
                }
            }
            children.push(spacer(30));
        });
    }

    // ── Habilidades & Competências ──
    const habSection = document.getElementById('habilidades');
    if (habSection) {
        children.push(...sectionHeader('Habilidades & Competencias'));

        const cards = habSection.querySelectorAll('.card');
        cards.forEach(card => {
            const h3 = card.querySelector('h3');
            if (h3) {
                children.push(new Paragraph({
                    children: [new TextRun({ text: clean(h3), bold: true, size: 20, color: COR_TITULO, font: 'Calibri' })],
                    spacing: { before: 120, after: 30 },
                }));
            }
            const liItems = card.querySelectorAll('li');
            liItems.forEach(li => {
                const t = clean(li);
                if (t) children.push(bulletPara(t));
            });
        });
    }

    // ── Projetos — apenas completo ──
    if (mode === 'completo') {
        const projSection = document.getElementById('projetos');
        if (projSection) {
            children.push(...sectionHeader('Projetos Destacados'));
            const projetos = projSection.querySelectorAll('.projeto-item');
            projetos.forEach(proj => {
                const toggleBtn = proj.querySelector('.toggle');
                const tituloEl  = proj.querySelector('h3');
                const tituloTxt = toggleBtn
                    ? clean(toggleBtn).replace(/[🔽▼▸]/g, '').trim()
                    : (tituloEl ? clean(tituloEl) : '');
                if (tituloTxt) children.push(jobTitle(tituloTxt));

                const content = proj.querySelector('.content');
                if (content) {
                    const descP = content.querySelector('p[data-descricao], p:not(.projeto-info)');
                    if (descP) children.push(bodyText(clean(descP)));
                }
                children.push(spacer(30));
            });
        }
    }

    // ── Idiomas & Soft Skills / Competências ──
    if (mode === 'resumido') {
        children.push(...sectionHeader('Idiomas & Competencias'));
        children.push(bulletPara('Portugues (Nativo)  |  Ingles Tecnico Intermediario (Wise Up)'));
        children.push(bulletPara('Proatividade, Lideranca, Comunicacao, Resolucao de problemas, Trabalho em equipe'));
    }

    // ── Rodapé de página ──
    const footer = new Footer({
        children: [
            new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                    new TextRun({ text: 'Kayham Cristoffer  |  ', size: 16, color: COR_CINZA, font: 'Calibri' }),
                    new TextRun({ children: [PageNumber.CURRENT], size: 16, color: COR_CINZA, font: 'Calibri' }),
                    new TextRun({ text: ' / ', size: 16, color: COR_CINZA, font: 'Calibri' }),
                    new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: COR_CINZA, font: 'Calibri' }),
                ],
            }),
        ],
    });

    // ── Criar documento ──
    const doc = new Document({
        creator: 'Kayham Cristoffer',
        title: 'Curriculo Kayham Cristoffer',
        description: 'Curriculo gerado automaticamente pelo portfolio',
        styles: {
            default: {
                document: {
                    run: { font: 'Calibri', size: 20 },
                    paragraph: { spacing: { line: 276 } }
                }
            }
        },
        sections: [{
            properties: {
                page: {
                    margin: {
                        top:    convertMillimetersToTwip(18),
                        bottom: convertMillimetersToTwip(18),
                        left:   convertMillimetersToTwip(20),
                        right:  convertMillimetersToTwip(20),
                    }
                }
            },
            footers: { default: footer },
            children,
        }]
    });

    // ── Salvar ──
    const label    = mode === 'completo' ? 'Completo' : 'Resumido';
    const fileName = `Kayham_Cristoffer_CV_${label}_${new Date().toISOString().split('T')[0]}.docx`;

    const blob = await Packer.toBlob(doc);
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return fileName;
}

// ── Setup dos botões Word ──────────────────────────────────────
function setupWordButton(buttonId, mode = 'resumido') {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalHTML = button.innerHTML;
        button.innerHTML   = '⏳ Gerando Word...';
        button.disabled    = true;

        try {
            await new Promise(r => setTimeout(r, 400));
            const fileName = await generateCVDocx(mode);
            button.innerHTML = '✅ Word Gerado!';
            console.log('Word gerado:', fileName);
        } catch (err) {
            console.error('Erro ao gerar Word:', err);
            button.innerHTML = '❌ Erro ao gerar';
            alert('Erro ao gerar Word: ' + err.message + '\nVerifique se o carregamento da página foi concluído.');
        } finally {
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.disabled  = false;
            }, 2500);
        }
    });
}

// ── Inicialização ─────────────────────────────────────────────
function initWordButtons() {
    setupWordButton('generateCVWordResumo',   'resumido');
    setupWordButton('generateCVWordCompleto', 'completo');
}

document.addEventListener('DOMContentLoaded', initWordButtons);
document.addEventListener('sectionsLoaded',   initWordButtons);
