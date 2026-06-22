"""
Currículo compacto 2 páginas — Kayham Cristoffer
Focado em vagas de TI (infra, redes, análise de dados, dev)
Compatível com perfil da Lanlink (distribuidor/integrador de TI)
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet

PAGE_W, PAGE_H = A4
MARGIN_L = 14 * mm
MARGIN_R = 14 * mm
MARGIN_T = 12 * mm
MARGIN_B = 12 * mm

# ── Paleta ────────────────────────────────────────────────────
C_HEADER_BG  = colors.HexColor('#2c3e50')
C_ACCENT     = colors.HexColor('#6366f1')
C_SECONDARY  = colors.HexColor('#3b82f6')
C_TEXT       = colors.HexColor('#1e1e1e')
C_MUTED      = colors.HexColor('#555555')
C_WHITE      = colors.white
C_RULE       = colors.HexColor('#6366f1')

# ── Estilos ───────────────────────────────────────────────────
def styles():
    s = {}
    base = ParagraphStyle

    s['name'] = base('name',
        fontName='Helvetica-Bold', fontSize=17, textColor=C_WHITE,
        leading=20, spaceBefore=0, spaceAfter=2)

    s['sub'] = base('sub',
        fontName='Helvetica', fontSize=9.5, textColor=C_WHITE,
        leading=13, spaceBefore=0, spaceAfter=1)

    s['contact'] = base('contact',
        fontName='Helvetica', fontSize=8, textColor=C_WHITE,
        leading=11, spaceBefore=0, spaceAfter=0)

    s['section'] = base('section',
        fontName='Helvetica-Bold', fontSize=10.5, textColor=C_ACCENT,
        leading=14, spaceBefore=8, spaceAfter=2)

    s['job_title'] = base('job_title',
        fontName='Helvetica-Bold', fontSize=10, textColor=C_HEADER_BG,
        leading=13, spaceBefore=5, spaceAfter=1)

    s['job_sub'] = base('job_sub',
        fontName='Helvetica-BoldOblique', fontSize=9, textColor=C_SECONDARY,
        leading=12, spaceBefore=0, spaceAfter=1)

    s['meta'] = base('meta',
        fontName='Helvetica-Oblique', fontSize=8.5, textColor=C_MUTED,
        leading=11, spaceBefore=0, spaceAfter=2)

    s['body'] = base('body',
        fontName='Helvetica', fontSize=9, textColor=C_TEXT,
        leading=13, spaceBefore=1, spaceAfter=2)

    s['body_small'] = base('body_small',
        fontName='Helvetica', fontSize=8.5, textColor=C_TEXT,
        leading=12, spaceBefore=1, spaceAfter=1)

    s['bullet'] = base('bullet',
        fontName='Helvetica', fontSize=8.5, textColor=C_TEXT,
        leading=12, leftIndent=10, firstLineIndent=-8,
        spaceBefore=1, spaceAfter=1)

    s['skill_cat'] = base('skill_cat',
        fontName='Helvetica-Bold', fontSize=8.5, textColor=C_HEADER_BG,
        leading=12, spaceBefore=3, spaceAfter=1)

    s['skill_item'] = base('skill_item',
        fontName='Helvetica', fontSize=8, textColor=C_TEXT,
        leading=11, leftIndent=6, firstLineIndent=-6,
        spaceBefore=0, spaceAfter=0)

    s['pcd'] = base('pcd',
        fontName='Helvetica-Oblique', fontSize=8, textColor=C_MUTED,
        leading=11, spaceBefore=3, spaceAfter=0)

    s['footer'] = base('footer',
        fontName='Helvetica', fontSize=7, textColor=colors.HexColor('#aaaaaa'),
        leading=9, alignment=TA_CENTER)

    return s

ST = styles()

def rule():
    return HRFlowable(width='100%', thickness=0.5, color=C_RULE, spaceAfter=4)

def section(title):
    return [Paragraph(title.upper(), ST['section']), rule()]

def bul(text):
    return Paragraph(f'• {text}', ST['bullet'])

# ── Conteúdo ──────────────────────────────────────────────────
story = []

# ──── CABEÇALHO como tabela com fundo escuro ────────────────
header_data = [[
    Paragraph('Kayham Cristoffer Guilhermino de Oliveira', ST['name']),
]]
header_sub = [[
    Paragraph('Analista de TI em Formação  ·  Estagiário TCE-SP  ·  Ciência da Computação — UniDrummond', ST['sub']),
]]
header_contact = [[
    Paragraph(
        'São Paulo – SP  ·  (11) 99454-6931  ·  kayhamoliveira98@gmail.com  ·  '
        'linkedin.com/in/kayhamcristoffer  ·  github.com/KayhamCristoffer  ·  '
        'kayhamcristoffer.github.io/portfolio',
        ST['contact']
    ),
]]

header_tbl = Table(
    header_data + header_sub + header_contact,
    colWidths=[PAGE_W - MARGIN_L - MARGIN_R]
)
header_tbl.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), C_HEADER_BG),
    ('TOPPADDING',    (0,0), (-1,0), 8),
    ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ('LEFTPADDING',   (0,0), (-1,-1), 10),
    ('RIGHTPADDING',  (0,0), (-1,-1), 10),
    ('ROWBACKGROUNDS', (0,0), (-1,-1), [C_HEADER_BG]),
]))
story.append(header_tbl)
story.append(Spacer(1, 5))

# ──── PERFIL ─────────────────────────────────────────────────
story += section('Perfil Profissional')
story.append(Paragraph(
    'Analista de TI em formação com <b>2+ anos de experiência profissional</b> (TCE-SP e projetos '
    'freelancer) e <b>6+ anos de aprendizagem contínua</b> em redes, infraestrutura e desenvolvimento. '
    'Estagiário no <b>Tribunal de Contas do Estado de São Paulo</b> desde ago/2024, atuando com '
    'infraestrutura, automação (VBA, PowerShell) e gestão de contratos de TI. Cursando <b>Bacharelado '
    'em Ciência da Computação</b> na UniDrummond (6º sem.). Perfil transversal: une redes Cisco, '
    'servidores Linux/Windows, desenvolvimento web (HTML/CSS/JS/Python) e análise de dados. '
    'Candidato PCD — deficiência visual monocular (CID H54.4), apto a todas as funções.',
    ST['body']
))

# ──── EXPERIÊNCIA ─────────────────────────────────────────────
story += section('Experiência Profissional')

# TCE-SP
story.append(Paragraph('Tribunal de Contas do Estado de São Paulo — TCE-SP', ST['job_title']))
story.append(Paragraph('Estagiário em Tecnologia da Informação', ST['job_sub']))
story.append(Paragraph('São Paulo, SP  ·  Ago 2024 – 31 Jul 2026  ·  GDTEC / DTEC-1 / DTEC-3', ST['meta']))
for item in [
    'Elaboração de editais e termos de referência para licitações de TI via PNCP',
    'Análise técnica de equipamentos (computadores, notebooks, servidores, impressoras)',
    'Automação de instalação/remoção de softwares com macros VBA e scripts PowerShell/VBScript',
    'Criação e restauração de imagens Windows 10/11 com Clonezilla; gestão de estoque de TI',
    'Suporte a projetos de backup (Commvault, Bareos) e iniciativas de virtualização',
]:
    story.append(bul(item))

story.append(Spacer(1, 4))

# Inter Produções
story.append(Paragraph('Inter Produções — Técnico de Redes (Freelancer)', ST['job_title']))
story.append(Paragraph('Santo André, SP  ·  Nov 2024 – Fev 2025', ST['meta']))
for item in [
    'Projeto completo de infraestrutura de rede em galpão industrial (planejamento → produção)',
    'Topologias no Cisco Packet Tracer e AutoCAD; cabeamento CAT5e; configuração TP-Link',
]:
    story.append(bul(item))

story.append(Spacer(1, 4))

# Representante de Turma
story.append(Paragraph('Representante de Turma — UniDrummond (Voluntário)', ST['job_title']))
story.append(Paragraph('Bacharelado em Ciência da Computação  ·  2023 – Presente (1° ao 6° semestre)', ST['meta']))
story.append(Paragraph(
    'Eleito consecutivamente desde o 1º semestre. Intermediação entre alunos e coordenação; '
    'organização de grupos de estudo e atividades acadêmicas.',
    ST['body_small']
))

# ──── FORMAÇÃO ────────────────────────────────────────────────
story += section('Formação Acadêmica')

formacao_data = [
    ['Bacharelado em Ciência da Computação', 'UniDrummond — Tatuapé, SP', '2023 – 2027 (6º sem.)'],
    ['Inglês Técnico — Wise Up Online',       'Wise Up',                   '2025 – presente'],
    ['Técnico em Redes de Computadores',      'Senac São Miguel Paulista',  '2022 – 2023 · 1.000h'],
    ['Técnico em Informática',                'Senac Santo André',          '2018 – 2019 · 1.200h'],
]
col_w = PAGE_W - MARGIN_L - MARGIN_R
form_tbl = Table(formacao_data, colWidths=[col_w * 0.4, col_w * 0.38, col_w * 0.22])
form_tbl.setStyle(TableStyle([
    ('FONTNAME',  (0,0), (-1,-1), 'Helvetica'),
    ('FONTNAME',  (0,0), (0,-1), 'Helvetica-Bold'),
    ('FONTSIZE',  (0,0), (-1,-1), 8.5),
    ('TEXTCOLOR', (0,0), (0,-1), C_HEADER_BG),
    ('TEXTCOLOR', (1,0), (2,-1), C_MUTED),
    ('TOPPADDING',    (0,0), (-1,-1), 2),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('LEFTPADDING',   (0,0), (-1,-1), 0),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
]))
story.append(form_tbl)

story.append(Paragraph(
    '<i>Certificações Senac: Assistente de Operação de Redes · Assistente de Segurança em Redes · '
    'Assistente de Suporte e Manutenção · Assistente de Implantação de Infraestrutura</i>',
    ST['meta']
))

# ──── HABILIDADES em 2 colunas ────────────────────────────────
story += section('Habilidades & Competências')

skills = {
    'Redes & Infraestrutura':     ['Cisco (CCNA 1-3): roteadores, switches, VLANs, OSPF',
                                   'Servidores Linux (Ubuntu) e Windows Server',
                                   'VMware, VirtualBox, pfSense, Wireshark',
                                   'Packet Tracer, AutoCAD 2D/3D (topologias)'],
    'Programação & Dev Web':      ['HTML5, CSS3, JavaScript ES6+',
                                   'Python (OpenCV, MediaPipe, automação)',
                                   'APIs REST, Firebase, Supabase (PostgreSQL)',
                                   'SQL / Oracle SQL*Plus — Procedures & Triggers'],
    'Sistemas & Automação':       ['Windows 10/11 e Server 2016-2022',
                                   'PowerShell, VBScript, Bash',
                                   'Active Directory, GPO, DHCP, DNS',
                                   'Clonezilla, VBA/Excel, Microsoft 365'],
    'Segurança da Informação':    ['ISO 27001/27002, NIST CSF, LGPD',
                                   'Kali Linux, Wazuh (SIEM), OpenVAS',
                                   'Elaboração de PSI e plano de resposta',
                                   'Análise de riscos — OCTAVE Allegro'],
    'Cloud & Ferramentas':        ['Firebase Auth, Realtime DB, Storage',
                                   'Supabase (PostgreSQL na nuvem)',
                                   'Noções AWS; GLPI; Commvault; Bareos',
                                   'Git/GitHub, Trello, Scrum'],
    'Certificações em Destaque':  ['CCNAv7 — CCNA 1, 2 e 3 (216h, Cisco/Senac)',
                                   'IPv6 Básico — NIC.br (36h, presencial)',
                                   'Inteligência Artificial — Conquer (10h)',
                                   'Inglês Técnico — Wise Up (em andamento)'],
}

categories = list(skills.keys())
half = (len(categories) + 1) // 2
left_cats  = categories[:half]
right_cats = categories[half:]

def skill_block(cats):
    items = []
    for cat in cats:
        items.append(Paragraph(cat, ST['skill_cat']))
        for sk in skills[cat]:
            items.append(Paragraph(f'• {sk}', ST['skill_item']))
        items.append(Spacer(1, 3))
    return items

left_block  = skill_block(left_cats)
right_block = skill_block(right_cats)

col_w_half = (PAGE_W - MARGIN_L - MARGIN_R - 8*mm) / 2

skills_tbl = Table(
    [[left_block, right_block]],
    colWidths=[col_w_half, col_w_half]
)
skills_tbl.setStyle(TableStyle([
    ('VALIGN',       (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING',  (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ('TOPPADDING',   (0,0), (-1,-1), 0),
    ('BOTTOMPADDING',(0,0), (-1,-1), 0),
]))
story.append(skills_tbl)

# ──── PROJETOS DESTAQUES (compacto) ───────────────────────────
story += section('Projetos em Destaque')

projetos_data = [
    ['CRM Agendamentos v4.1',  'Sistema web completo: 11 tabelas Supabase, RLS, dashboard, relatórios',       'JS · Supabase · PostgreSQL'],
    ['Hiper Infra',            'Infra corporativa completa: VLANs, OSPF, VPN site-to-site, AD, DNS',          'Cisco · Linux Server'],
    ['Lousa Mágica',           'App de desenho por rastreamento de mão via webcam',                           'Python · OpenCV · MediaPipe'],
    ['PSI Assaí',              'Política de Segurança da Informação baseada em ISO 27001/NIST CSF',            'Governança TI'],
    ['BSidesSP 2026',          'Voluntário no maior evento independente de segurança do Brasil',               'Segurança'],
]
proj_tbl = Table(projetos_data, colWidths=[col_w * 0.28, col_w * 0.48, col_w * 0.24])
proj_tbl.setStyle(TableStyle([
    ('FONTNAME',  (0,0), (-1,-1), 'Helvetica'),
    ('FONTNAME',  (0,0), (0,-1), 'Helvetica-Bold'),
    ('FONTSIZE',  (0,0), (-1,-1), 8.5),
    ('TEXTCOLOR', (0,0), (0,-1), C_HEADER_BG),
    ('TEXTCOLOR', (1,0), (1,-1), C_TEXT),
    ('TEXTCOLOR', (2,0), (2,-1), C_MUTED),
    ('TOPPADDING',    (0,0), (-1,-1), 2),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('LEFTPADDING',   (0,0), (-1,-1), 0),
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
]))
story.append(proj_tbl)

# ──── IDIOMAS & SOFT SKILLS ───────────────────────────────────
story.append(Spacer(1, 4))
story.append(Paragraph(
    '<b>Idiomas:</b> Português (nativo) · Inglês técnico intermediário (Wise Up, em evolução)  ·  '
    '<b>Soft Skills:</b> Liderança (Representante de Turma), Proatividade, Comunicação clara, '
    'Autonomia, Resiliência.',
    ST['body_small']
))

# ──── BUILD ───────────────────────────────────────────────────
OUT = '/home/user/webapp/Kayham_Cristoffer_CV_Lanlink_2026.pdf'

doc = SimpleDocTemplate(
    OUT,
    pagesize=A4,
    leftMargin=MARGIN_L,
    rightMargin=MARGIN_R,
    topMargin=MARGIN_T,
    bottomMargin=MARGIN_B,
    title='Currículo — Kayham Cristoffer',
    author='Kayham Cristoffer Guilhermino de Oliveira',
)
doc.build(story)
print(f'PDF gerado: {OUT}')
