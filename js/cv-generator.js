// ========================================
// CV Generator - Gera PDF dinâmico do HTML
// ========================================

// Função principal para gerar o CV em PDF
async function generateCV() {
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
    function addText(text, fontSize, fontStyle = 'normal', color = [0, 0, 0]) {
        doc.setFontSize(fontSize);
        doc.setFont('helvetica', fontStyle);
        doc.setTextColor(color[0], color[1], color[2]);
        
        const lines = doc.splitTextToSize(text, contentWidth);
        lines.forEach(line => {
            checkPageBreak();
            doc.text(line, marginLeft, yPosition);
            yPosition += fontSize * 0.5;
        });
        yPosition += 2;
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
    doc.text('📧 kayham98.1@hotmail.com', marginLeft, 33);
    doc.text('🔗 linkedin.com/in/kayhamcristoffer', marginLeft + 80, 33);
    
    yPosition = 50;
    
    // ===== PERFIL PROFISSIONAL =====
    addText('PERFIL PROFISSIONAL', 14, 'bold', [44, 62, 80]);
    addLine();
    addText('Estudante de Ciência da Computação na Faculdade UniDrummond, com experiência prática no Tribunal de Contas do Estado de São Paulo (TCESP), onde atua como estagiário na área de tecnologia. Participa de atividades no Gabinete de Tecnologia (GDTEC) e na Seção Técnica de Operações de TI (DTEC-1), contribuindo com análise de equipamentos, prospecção de novas tecnologias, infraestrutura, desenvolvimento de ferramentas com Microsoft 365 e suporte técnico. Está em constante desenvolvimento profissional e linguístico, cursando inglês na Wise Up. Possui deficiência visual no olho direito (CID H54-4).', 10);
    yPosition += 3;
    
    // ===== FORMAÇÃO ACADÊMICA =====
    addText('FORMAÇÃO ACADÊMICA', 14, 'bold', [44, 62, 80]);
    addLine();
    
    const formacoes = [
        'Curso de Inglês - Wise Up - Online (2025 - Presente)',
        'Bacharelado em Ciência da Computação - UniDrummond - Tatuapé (2023 - Presente)',
        'Curso Técnico em Redes de Computadores - Senac São Miguel Paulista (2022 - 2023)',
        'Curso Técnico em Informática - Senac Santo André (2018 - 2019)',
        'Curso Público Cadista para a Construção Civil - Senac Penha (2017)',
        'E.E. Prof. Issac Schraiber - Ensino Médio: Completo (2013 - 2015)'
    ];
    
    formacoes.forEach(formacao => {
        checkPageBreak();
        doc.setFontSize(10);
        doc.text('• ' + formacao, marginLeft + 3, yPosition);
        yPosition += 6;
    });
    yPosition += 2;
    
    // ===== EXPERIÊNCIAS PROFISSIONAIS =====
    addText('EXPERIÊNCIAS PROFISSIONAIS', 14, 'bold', [44, 62, 80]);
    addLine();
    
    // TCE-SP
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    checkPageBreak();
    doc.text('Tribunal de Contas do Estado de São Paulo (TCE-SP)', marginLeft, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Estágio em TI - Agosto 2024 a Julho 2026', marginLeft, yPosition);
    yPosition += 6;
    
    doc.setFont('helvetica', 'normal');
    addText('Atuação multifuncional nas áreas de Gestão, Administração, Redes e Suporte em TI. Participação na elaboração de editais e termos de referência, análises técnicas de equipamentos, automação com PowerShell e VBScript, gestão de estoque, backup com Bareos e estudos de infraestrutura hiperconvergente.', 9);
    yPosition += 2;
    
    // Inter Produções
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    checkPageBreak();
    doc.text('Inter Produções - Freelancer', marginLeft, yPosition);
    yPosition += 5;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Auxiliar de Rede/Internet - Novembro 2024 a Fevereiro 2025', marginLeft, yPosition);
    yPosition += 6;
    
    doc.setFont('helvetica', 'normal');
    addText('Planejamento e implementação de infraestrutura de rede em galpão industrial. Montagem de cabeamento estruturado CAT5, configuração de equipamentos TP-Link e implementação de roteador balanceador de carga.', 9);
    yPosition += 3;
    
    // ===== PROJETOS PRINCIPAIS =====
    checkPageBreak(20);
    addText('PROJETOS DESTACADOS', 14, 'bold', [44, 62, 80]);
    addLine();
    
    // Projeto SustAmbiTech
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    checkPageBreak();
    doc.text('Projeto SustAmbiTech - Web Designer & APIs', marginLeft, yPosition);
    yPosition += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('UniDrummond - Agosto 2025 a Outubro 2025', marginLeft, yPosition);
    yPosition += 5;
    
    doc.setFont('helvetica', 'normal');
    addText('Plataforma web interativa focada em sustentabilidade. Mapeamento de Ecopontos e Eletropostos, integração com OpenWeather API, OpenStreetMap/Leaflet.js e Firebase para autenticação.', 9);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('🌐 https://kayhamcristoffer.github.io/SustAmbiTech/', marginLeft, yPosition);
    yPosition += 6;
    
    // Projeto Hiper Infra
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    checkPageBreak();
    doc.text('Projeto Hiper Infra - Infraestrutura Hiperconvergente', marginLeft, yPosition);
    yPosition += 5;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('UniDrummond - Fevereiro 2025 a Maio 2025', marginLeft, yPosition);
    yPosition += 5;
    
    doc.setFont('helvetica', 'normal');
    addText('Website informativo sobre HCI com quiz interativo. Pesquisa técnica aprofundada e análise de soluções (Nutanix, VMware, Microsoft).', 9);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('🌐 https://kayhamcristoffer.github.io/Hiper-Infra/', marginLeft, yPosition);
    yPosition += 8;
    
    // ===== HABILIDADES TÉCNICAS =====
    checkPageBreak(20);
    addText('HABILIDADES TÉCNICAS', 14, 'bold', [44, 62, 80]);
    addLine();
    
    const habilidades = {
        'Redes & Infraestrutura': 'Windows/Linux Server, Cisco CCNA, VirtualBox, VMware, Packet Tracer, Cabeamento estruturado',
        'Programação & Web': 'Python, Java, HTML, CSS, JavaScript, WordPress, Wix, APIs REST',
        'Automação': 'PowerShell, VBScript, Bash, Microsoft 365 Integration',
        'Cloud & Virtualização': 'AWS (noções), Hiperconvergência, Docker (noções)',
        'Ferramentas': 'Microsoft 365, AutoCAD, Visio, Canva, FilmoraPro, Git/GitHub'
    };
    
    Object.entries(habilidades).forEach(([categoria, skills]) => {
        checkPageBreak(8);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(categoria + ':', marginLeft, yPosition);
        yPosition += 5;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(skills, contentWidth - 5);
        lines.forEach(line => {
            checkPageBreak();
            doc.text(line, marginLeft + 5, yPosition);
            yPosition += 4;
        });
        yPosition += 2;
    });
    
    // ===== COMPETÊNCIAS COMPORTAMENTAIS =====
    checkPageBreak(15);
    addText('COMPETÊNCIAS COMPORTAMENTAIS', 14, 'bold', [44, 62, 80]);
    addLine();
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    addText('Proatividade e iniciativa • Liderança e comunicação • Comprometimento • Organização • Trabalho em equipe • Foco em resultados • Ética profissional', 9);
    yPosition += 3;
    
    // ===== IDIOMAS =====
    addText('IDIOMAS', 14, 'bold', [44, 62, 80]);
    addLine();
    doc.setFontSize(10);
    doc.text('• Português - Nativo', marginLeft + 3, yPosition);
    yPosition += 5;
    doc.text('• Inglês Técnico - Intermediário (em aperfeiçoamento)', marginLeft + 3, yPosition);
    yPosition += 8;
    
    // ===== RODAPÉ =====
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(`Currículo gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')} - Página ${i} de ${totalPages}`, 
                 marginLeft, pageHeight - 10);
    }
    
    // Salvar PDF
    const fileName = `Kayham_Cristoffer_CV_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    return fileName;
}

// Inicialização do gerador quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateCV');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            // Adiciona animação de loading
            const originalText = generateBtn.innerHTML;
            generateBtn.innerHTML = '⏳ Gerando CV...';
            generateBtn.disabled = true;
            
            try {
                // Aguarda um momento para mostrar o loading
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Gera o PDF
                const fileName = await generateCV();
                
                // Feedback de sucesso
                generateBtn.innerHTML = '✅ CV Gerado!';
                setTimeout(() => {
                    generateBtn.innerHTML = originalText;
                    generateBtn.disabled = false;
                }, 2000);
                
                console.log(`CV gerado com sucesso: ${fileName}`);
            } catch (error) {
                console.error('Erro ao gerar CV:', error);
                generateBtn.innerHTML = '❌ Erro ao gerar';
                setTimeout(() => {
                    generateBtn.innerHTML = originalText;
                    generateBtn.disabled = false;
                }, 2000);
            }
        });
    }
});
