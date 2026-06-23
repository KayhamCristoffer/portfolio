// ========================================
// CV Generator DOCX v2 — Exportação Word editável
// docx.umd.js carregado localmente (sem CDN race condition)
// ========================================

async function generateCVDocx(mode = 'resumido') {
    // docx.umd.js é carregado de forma síncrona (sem defer) — sempre disponível
    if (typeof window.docx === 'undefined') {
        alert('Módulo Word não carregado. Recarregue a página e tente novamente.');
        return;
    }

    const {
        Document, Packer, Paragraph, TextRun,
        AlignmentType, BorderStyle, Table, TableRow, TableCell,
        WidthType, ShadingType, Header, Footer,
        PageNumber, convertInchesToTwip, convertMillimetersToTwip
    } = window.docx;

    // ── Helpers de texto ──────────────────────────────────────
    function clean(el) {
        if (!el) return '';
        if (typeof cleanText === 'function') return cleanText(el);
        const clone = el.cloneNode(true);
        clone.querySelectorAll('i, svg, img').forEach(n => n.remove());
        const raw = clone.innerHTML || '';
        const stripped = raw.replace(/<[^>]+>/g, ' ');
        try {
            const ta = document.createElement('textarea');
            ta.innerHTML = stripped;
            return ta.value.replace(/\s+/g, ' ').trim();
        } catch (e) {
            return stripped.replace(/\s+/g, ' ').trim();
        }
    }

    function s(str) { return (str || '').replace(/\s+/g, ' ').trim(); }

    // ── Paleta ───────────────────────────────────────────────
    const C_HEADER  = '2C3E50';
    const C_ACCENT  = '6366F1';
    const C_GRAY    = '888888';
    const C_WHITE   = 'FFFFFF';
    const C_DARK    = '1E1E2E';
    const C_TEXT    = '333333';

    // ── Fábrica de parágrafos ────────────────────────────────

    function para(runs, opts = {}) {
        return new Paragraph({
            children: Array.isArray(runs) ? runs : [runs],
            spacing: { before: opts.before ?? 60, after: opts.after ?? 60 },
            alignment: opts.align,
            border: opts.border,
            indent: opts.indent,
            bullet: opts.bullet,
        });
    }

    function run(text, opts = {}) {
        return new TextRun({
            text: s(text),
            bold:    opts.bold    ?? false,
            italics: opts.italic  ?? false,
            size:    opts.size    ?? 20,
            color:   opts.color   ?? C_TEXT,
            font:    'Calibri',
        });
    }

    function sectionDivider(label) {
        return para(
            run(label.toUpperCase(), { bold: true, size: 22, color: C_HEADER }),
            {
                before: 240, after: 80,
                border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C_ACCENT, space: 4 } }
            }
        );
    }

    function jobTitle(text) {
        return para(run(text, { bold: true, size: 21, color: C_HEADER }), { before: 160, after: 40 });
    }

    function jobMeta(text) {
        return para(run(text, { italic: true, size: 18, color: C_GRAY }), { before: 20, after: 20 });
    }

    function bodyPara(text, bold = false) {
        return para(run(text, { size: 19, bold, color: C_DARK }), { before: 30, after: 30 });
    }

    function bulletItem(text) {
        return new Paragraph({
            children: [run(text, { size: 18, color: C_TEXT })],
            bullet: { level: 0 },
            spacing: { before: 24, after: 24 },
            indent: { left: convertInchesToTwip(0.25) },
        });
    }

    function spacer(pts = 80) {
        return new Paragraph({ children: [new TextRun('')], spacing: { before: 0, after: pts } });
    }

    // ── Cabeçalho colorido ───────────────────────────────────
    const headerTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [new TableRow({
            children: [new TableCell({
                shading: { type: ShadingType.SOLID, color: C_HEADER, fill: C_HEADER },
                margins: { top: 200, bottom: 200, left: 280, right: 280 },
                borders: {
                    top:    { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left:   { style: BorderStyle.NONE },
                    right:  { style: BorderStyle.NONE },
                },
                children: [
                    para(run('Kayham Cristoffer Guilhermino de Oliveira',
                        { bold: true, size: 34, color: C_WHITE }), { before: 0, after: 60 }),
                    para(run('Analista de TI em Formacao  |  Estagiario  |  Universitario',
                        { size: 19, color: 'C8D8F0' }), { before: 0, after: 40 }),
                    para(run('Sao Paulo - SP  |  kayham98.1@hotmail.com  |  +55 (11) 994546931',
                        { size: 17, color: 'A0B8D8' }), { before: 0, after: 40 }),
                    para(run('linkedin.com/in/kayhamcristoffer  |  github.com/KayhamCristoffer  |  kayhamcristoffer.github.io/portfolio',
                        { size: 16, color: '8090A8' }), { before: 0, after: 0 }),
                ]
            })]
        })],
    });

    // ── Corpo ────────────────────────────────────────────────
    const body = [];
    body.push(headerTable);
    body.push(spacer(100));

    // ── Perfil Profissional ──────────────────────────────────
    const perfilSection = document.querySelector('.perfil-profissional');
    if (perfilSection) {
        body.push(sectionDivider('Perfil Profissional'));

        const allP = perfilSection.querySelectorAll('p');
        let paraCount = 0;
        allP.forEach(p => {
            if (p.closest('.sobre-vagas') || p.closest('.sobre-pcd') ||
                p.closest('.sobre-stats') || p.closest('.sobre-ctas') ||
                p.classList.contains('pcd-titulo') || p.classList.contains('pcd-desc')) return;
            const t = clean(p);
            if (!t) return;
            if (mode === 'resumido' && paraCount >= 2) return;
            body.push(bodyPara(t));
            paraCount++;
        });

        // PCD linha discreta
        const pcdDesc = perfilSection.querySelector('.pcd-desc');
        if (pcdDesc) {
            const t = clean(pcdDesc);
            if (t) body.push(para(run('PCD: ' + t, { size: 17, italic: true, color: C_GRAY }), { before: 20, after: 20 }));
        }

        // Vagas — completo only
        if (mode === 'completo') {
            const tags = Array.from(document.querySelectorAll('.vaga-tag')).map(t => clean(t)).filter(Boolean);
            if (tags.length) {
                body.push(para(run('Aberto a: ' + tags.join('  |  '), { size: 18, italic: true, color: C_ACCENT }), { before: 60, after: 60 }));
            }
        }
    }

    // ── Experiências Profissionais ───────────────────────────
    const expSection = document.getElementById('experiencias');
    if (expSection) {
        body.push(sectionDivider('Experiencias Profissionais'));

        const allTrabalhos = expSection.querySelectorAll('.trabalho-item');

        // Trabalhos remunerados
        allTrabalhos.forEach(t => {
            const sp = t.closest('.trabalhos-detalhados');
            const stEl = sp && sp.querySelector('.section-subtitle');
            const stTxt = stEl ? clean(stEl) : '';
            const isVol = stTxt.toLowerCase().includes('voluntario') ||
                          stTxt.toLowerCase().includes('voluntário') ||
                          stTxt.toLowerCase().includes('lideranca') ||
                          stTxt.toLowerCase().includes('liderança');
            if (isVol) return;

            const h4 = t.querySelector('h4');
            if (h4) body.push(jobTitle(clean(h4)));

            const cargo = t.querySelector('.cargo');
            if (cargo) body.push(bodyPara(clean(cargo), true));

            const dept = t.querySelector('.departamento');
            if (dept) body.push(jobMeta(clean(dept)));

            const localEl   = t.querySelector('.badge-local');
            const periodoEl = t.querySelector('.badge-periodo');
            const parts     = [];
            if (localEl)   parts.push(clean(localEl));
            if (periodoEl) parts.push(clean(periodoEl));
            if (parts.length) body.push(jobMeta(parts.join('  |  ')));

            if (mode === 'completo') {
                const descP = t.querySelector('.trabalho-descricao');
                if (descP) body.push(bodyPara(clean(descP)));
            }

            const atividades = t.querySelectorAll('.trabalho-atividades li');
            const maxItems = mode === 'resumido' ? Math.min(4, atividades.length) : atividades.length;
            for (let i = 0; i < maxItems; i++) body.push(bulletItem(clean(atividades[i])));
            body.push(spacer(40));
        });

        // Voluntário — completo only
        if (mode === 'completo') {
            let hasVol = false;
            allTrabalhos.forEach(t => {
                const sp = t.closest('.trabalhos-detalhados');
                const stEl = sp && sp.querySelector('.section-subtitle');
                const stTxt = stEl ? clean(stEl) : '';
                const isVol = stTxt.toLowerCase().includes('voluntario') ||
                              stTxt.toLowerCase().includes('voluntário') ||
                              stTxt.toLowerCase().includes('lideranca') ||
                              stTxt.toLowerCase().includes('liderança');
                if (!isVol) return;

                if (!hasVol) {
                    body.push(para(run('Voluntario & Lideranca', { bold: true, size: 21, color: C_ACCENT }), { before: 180, after: 60 }));
                    hasVol = true;
                }

                const h4 = t.querySelector('h4');
                if (h4) body.push(jobTitle(clean(h4)));

                const cargo = t.querySelector('.cargo');
                if (cargo) body.push(jobMeta(clean(cargo)));

                const deptEl = t.querySelector('.departamento');
                if (deptEl) body.push(jobMeta(clean(deptEl)));

                const localEl   = t.querySelector('.badge-local');
                const periodoEl = t.querySelector('.badge-periodo');
                const parts     = [];
                if (localEl)   parts.push(clean(localEl));
                if (periodoEl) parts.push(clean(periodoEl));
                if (parts.length) body.push(jobMeta(parts.join('  |  ')));

                t.querySelectorAll('.trabalho-atividades li').forEach(li => body.push(bulletItem(clean(li))));
                body.push(spacer(40));
            });
        }
    }

    // ── Formação Acadêmica ───────────────────────────────────
    const formSection = document.getElementById('formacao');
    if (formSection) {
        body.push(sectionDivider('Formacao Academica'));

        const skip = ['Cadista', 'Audiovisual', 'Contrarregra', 'Ensino Fundamental', 'Ensino Medio', 'Ensino Médio'];

        formSection.querySelectorAll('.formacao-item').forEach(item => {
            const h3 = item.querySelector('h3');
            const h3txt = h3 ? clean(h3) : '';
            if (mode === 'resumido' && skip.some(s => h3txt.toLowerCase().includes(s.toLowerCase()))) return;

            body.push(jobTitle(h3txt));

            const inst = item.querySelector('.formacao-instituicao');
            const per  = item.querySelector('.formacao-periodo');
            const meta = [inst ? clean(inst) : '', per ? clean(per) : ''].filter(Boolean).join('  |  ');
            if (meta) body.push(jobMeta(meta));

            if (mode === 'completo') {
                const certs = item.querySelectorAll('.formacao-certificacoes li');
                if (certs.length) body.push(bodyPara('Certs: ' + Array.from(certs).map(c => clean(c)).join('; ')));
            }
            body.push(spacer(30));
        });
    }

    // ── Habilidades & Competências (tabela 2 colunas) ───────────────────────
    const habSection = document.getElementById('habilidades');
    if (habSection) {
        body.push(sectionDivider('Habilidades & Competencias'));

        const allCards = Array.from(habSection.querySelectorAll('.card'));
        // Filtrar cards para o modo
        const visibleCards = allCards.filter(card => {
            const isComp   = card.classList.contains('card-competencias');
            const isDestaq = card.classList.contains('card-highlight');
            if (mode === 'resumido' && (isComp || isDestaq)) return false;
            return true;
        });

        // Agrupa em pares para tabela de 2 colunas
        for (let i = 0; i < visibleCards.length; i += 2) {
            const left  = visibleCards[i];
            const right = visibleCards[i + 1] || null;

            function cardCellChildren(card) {
                if (!card) return [new Paragraph({ children: [new TextRun('')] })];
                const h3 = card.querySelector('h3');
                const children = [];
                if (h3) {
                    children.push(para(run(clean(h3), { bold: true, size: 19, color: C_HEADER }), { before: 40, after: 30 }));
                }
                const isComp = card.classList.contains('card-competencias');
                const lis = isComp && mode === 'completo'
                    ? Array.from(card.querySelectorAll('li')).slice(0, 25)
                    : Array.from(card.querySelectorAll('li'));
                lis.forEach(li => {
                    const t = clean(li);
                    if (t) children.push(bulletItem(t));
                });
                return children.length ? children : [new Paragraph({ children: [new TextRun('')] })];
            }

            body.push(new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            borders: {
                                top:    { style: BorderStyle.NONE },
                                bottom: { style: BorderStyle.NONE },
                                left:   { style: BorderStyle.NONE },
                                right:  { style: BorderStyle.SINGLE, size: 4, color: 'DDDDDD' },
                            },
                            margins: { top: 60, bottom: 60, left: 0, right: 120 },
                            children: cardCellChildren(left),
                        }),
                        new TableCell({
                            width: { size: 50, type: WidthType.PERCENTAGE },
                            borders: {
                                top:    { style: BorderStyle.NONE },
                                bottom: { style: BorderStyle.NONE },
                                left:   { style: BorderStyle.NONE },
                                right:  { style: BorderStyle.NONE },
                            },
                            margins: { top: 60, bottom: 60, left: 120, right: 0 },
                            children: cardCellChildren(right),
                        }),
                    ]
                })],
            }));
            body.push(spacer(20));
        }
    }

    // ── Portfólio Profissional ──────────────────────────────────────────────
    if (mode === 'completo') {
        body.push(sectionDivider('Portfolio Profissional'));
        body.push(jobTitle('Portfolio Profissional — kayhamcristoffer.github.io/portfolio'));
        body.push(bodyPara('Portfolio desenvolvido com HTML5, CSS3 e JavaScript puro, apresentando experiencias, habilidades, formacao e projetos de forma interativa. Inclui geradores de CV em PDF (jsPDF) e Word (docx.js), modo dark, design responsivo e deploy no GitHub Pages.'));
        [
            'Interface responsiva com dark mode e animacoes CSS3',
            'Gerador de CV em PDF (jsPDF) e Word (docx.js v8.5) — Resumido e Completo',
            'Secoes carregadas dinamicamente via fetch() e section-loader.js',
            'Acessibilidade: ARIA labels, contraste e navegacao por teclado',
            'Deploy automatizado via GitHub Pages'
        ].forEach(b => body.push(bulletItem(b)));
        body.push(spacer(40));
    }
    // ── Idiomas (resumido) ───────────────────────────────────
    if (mode === 'resumido') {
        body.push(sectionDivider('Idiomas & Competencias-chave'));
        body.push(bulletItem('Portugues (Nativo)  |  Ingles Tecnico Intermediario (Wise Up)'));
        body.push(bulletItem('Lideranca, Proatividade, Comunicacao, Resolucao de problemas, Trabalho em equipe'));
    }

    // ── Rodapé de página ─────────────────────────────────────
    const footerEl = new Footer({
        children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
                new TextRun({ text: 'Kayham Cristoffer  |  ', size: 16, color: C_GRAY, font: 'Calibri' }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: C_GRAY, font: 'Calibri' }),
                new TextRun({ text: ' / ', size: 16, color: C_GRAY, font: 'Calibri' }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: C_GRAY, font: 'Calibri' }),
            ],
        })],
    });

    // ── Montar documento ─────────────────────────────────────
    const doc = new Document({
        creator: 'Kayham Cristoffer',
        title:   'Curriculo Kayham Cristoffer ' + (mode === 'completo' ? 'Completo' : 'Resumido'),
        description: 'Curriculo gerado automaticamente pelo portfolio',
        styles: {
            default: {
                document: {
                    run:       { font: 'Calibri', size: 20 },
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
            footers: { default: footerEl },
            children: body,
        }]
    });

    // ── Salvar ────────────────────────────────────────────────
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

// ── Setup botões Word ─────────────────────────────────────────
function setupWordButton(buttonId, mode = 'resumido') {
    const button = document.getElementById(buttonId);
    if (!button) return;

    button.addEventListener('click', async (e) => {
        e.preventDefault();
        const originalHTML = button.innerHTML;
        button.innerHTML   = '⏳ Gerando Word...';
        button.disabled    = true;

        try {
            await new Promise(r => setTimeout(r, 300));
            const fileName = await generateCVDocx(mode);
            button.innerHTML = '✅ Word Gerado!';
            console.log('[DOCX] Gerado:', fileName);
        } catch (err) {
            console.error('[DOCX] Erro:', err);
            button.innerHTML = '❌ Erro ao gerar';
            alert('Erro ao gerar Word:\n' + err.message);
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
