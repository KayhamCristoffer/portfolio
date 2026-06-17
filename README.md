# Portfólio — Kayham Cristoffer

Portfólio pessoal desenvolvido com HTML5, CSS3 e JavaScript puro — sem frameworks, sem bundler.  
Hospedado via **GitHub Pages**: [kayhamcristoffer.github.io/portfolio](https://kayhamcristoffer.github.io/portfolio/)

---

## Sobre

Analista de TI em formação, estagiário no **Tribunal de Contas do Estado de São Paulo (TCE-SP)** e bacharel em andamento em **Ciência da Computação** (UniDrummond, 6º semestre). Este portfólio reúne experiências profissionais, projetos acadêmicos, habilidades técnicas, formação e certificados.

Aberto a oportunidades em: **Análise de Dados · Infraestrutura de TI · Redes de Computadores · Desenvolvimento Web**

> 🟢 **Candidato PCD** — CID H54.4 (Perda não qualificada da visão em um olho · Monocular). Apto para vagas inclusivas conforme Lei nº 8.213/91.

---

## Tecnologias do Portfólio

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico (sections dinâmicas via `fetch()`) |
| Estilo | CSS3 com Custom Properties (design system completo) |
| Comportamento | JavaScript ES6+ vanilla (sem frameworks) |
| Carregamento | `fetch()` + `IntersectionObserver` (lazy sections) |
| SEO | JSON-LD Schema.org · Open Graph · Twitter Card · canonical |
| Acessibilidade | ARIA labels · skip-link · teclado nav · `aria-expanded` |
| Performance | Font Awesome non-blocking · `defer` scripts · `passive` listeners |
| PDF | `jsPDF` — geração de CV Resumido e Completo no browser |
| Hospedagem | GitHub Pages |

---

## Estrutura do Projeto

```
portfolio/
├── index.html                  # Entry point — carrega as seções dinamicamente
├── css/
│   └── styles.css              # Design system completo (~1500 linhas)
├── js/
│   ├── main.js                 # Scroll spy, animações, dark mode, modal
│   ├── section-loader.js       # Carrega seções via fetch(), emite sectionsLoaded
│   └── cv-generator.js         # Gerador de PDF v2 (CV resumido e completo)
├── sections/
│   ├── header.html             # Navegação + dark mode toggle
│   ├── sobre.html              # Bio, vagas desejadas, PCD, stats, CTAs
│   ├── experiencias.html       # Cards de competências + histórico profissional + voluntário
│   ├── projetos.html           # Projetos acadêmicos e profissionais (accordion)
│   ├── habilidades.html        # Cards de habilidades por categoria
│   ├── formacao.html           # Formação acadêmica (card layout)
│   ├── certificados.html       # Certificados por semestre (accordion + visualizador PDF)
│   └── footer.html             # Rodapé com contatos
├── fotos/                      # Foto de perfil
└── img/certificados/           # PDFs dos certificados por semestre
    ├── 1_SEM/ … 6_SEM/
```

---

## Seções do Portfólio

| Seção | Conteúdo |
|---|---|
| **Sobre** | Bio profissional, áreas de interesse, informação PCD, estatísticas (8+ anos TI, 10+ projetos, 2 técnicos + bacharelado), CTAs LinkedIn / GitHub / Contato / WhatsApp |
| **Experiências** | Cards de competências (Redes, Dev Web, BD, Segurança, Gestão TI, IA & Prompts) + Histórico Profissional (TCE-SP, Inter Produções) + **Voluntário & Liderança** (Representante de Turma) |
| **Projetos** | 10 projetos com accordion: CRM Agendamentos v4.1, BSidesSP 2026, SustAmbiTech, Hiper Infra, Lousa Mágica (Python), PSI Assaí, Clínica Odontológica, MadeTech, Projeto Conexão, AlfaTech/BetaTech |
| **Habilidades** | 9 cards: Redes, Programação, Segurança, Sistemas & Automação, Cloud, Design & Produtividade, IA & Prompts, Formação Técnica em Destaque, Idiomas & Soft Skills |
| **Formação** | Bacharelado CC (UniDrummond) · Wise Up · Técnico em Redes Senac (+ 3 certs intermediárias) · Técnico em Informática Senac (+ 3 certs intermediárias) · Cadista AutoCAD 2D/3D · Audiovisual · Ensino Médio · Ensino Fundamental |
| **Certificados** | Organizados por semestre (1º–6º) com visualizador de PDF embutido em modal |

---

## Como rodar localmente

```bash
git clone https://github.com/KayhamCristoffer/portfolio.git
cd portfolio

# Opção 1 — Node.js
npx serve .

# Opção 2 — Python
python3 -m http.server 8080
```

> **Importante:** As seções são carregadas via `fetch()`, portanto abrir `index.html` diretamente via `file://` não funciona. Use um servidor local.

---

## Features

- **Dark Mode** — toggle persistido em `localStorage`
- **Scroll Spy** — link ativo na nav conforme seção visível
- **Acordeão** — expansão/colapso de projetos e certificados com animação CSS
- **Visualizador de PDF** — certificados abertos em modal embutido
- **Gerador de CV em PDF** — versão resumida e completa, geradas via `jsPDF` direto no browser
- **Animações de entrada** — via `IntersectionObserver` (sem biblioteca externa)
- **Responsivo** — breakpoints em 1024px, 768px e 480px
- **Acessibilidade** — ARIA, skip-link, navegação por teclado, `prefers-reduced-motion`

---

## Histórico de versões

| Data | Round | Descrição |
|---|---|---|
| Jun 2026 | Round 6 | Vagas desejadas + bloco PCD (CID H54.4) na seção Sobre; seção Voluntário & Liderança (Representante de Turma); README profile GitHub |
| Jun 2026 | Round 5 | Ensino Fundamental adicionado; AutoCAD 2D e 3D; formação redesenhada em cards (espelha Histórico Profissional) |
| Jun 2026 | Round 4 | Stats 4 colunas com dividers; botão WhatsApp; certificações Senac; cv-generator.js v2 (seletores corrigidos) |
| Jun 2026 | Round 3 | Cisco cert fix; semestres corrigidos; card IA & Prompts; badge Concluído Inter Produções; README reescrito |
| Jun 2026 | Round 2 | Conteúdo real CRM v4.1; BSidesSP 2026; Banco de Dados; validação RH |
| Jun 2026 | Round 1 | Refatoração completa — design system, SEO, acessibilidade, JS sem duplicações |

---

## Contato

| Canal | Link |
|---|---|
| E-mail | kayhamoliveira98@gmail.com |
| LinkedIn | [linkedin.com/in/kayhamcristoffer](https://www.linkedin.com/in/kayhamcristoffer) |
| GitHub | [github.com/KayhamCristoffer](https://github.com/KayhamCristoffer) |
| WhatsApp | [wa.me/5511994546931](https://wa.me/5511994546931) |
| Portfólio | [kayhamcristoffer.github.io/portfolio](https://kayhamcristoffer.github.io/portfolio/) |
</content>
</invoke>