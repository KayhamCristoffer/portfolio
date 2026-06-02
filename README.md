# Portfólio — Kayham Cristoffer

Portfólio pessoal desenvolvido com HTML5, CSS3 e JavaScript puro — sem frameworks, sem bundler.
Hospedado via **GitHub Pages**: [kayhamcristoffer.github.io/portfolio](https://kayhamcristoffer.github.io/portfolio/)

---

## Sobre

Analista de TI em formação, estagiário no **Tribunal de Contas do Estado de São Paulo (TCE-SP)** e bacharel em andamento em **Ciência da Computação** (UniDrummond, 6º semestre). Este portfólio reúne experiências profissionais, projetos acadêmicos, habilidades técnicas, formação e certificados.

---

## Tecnologias do Portfólio

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico (sections dinâmicas) |
| Estilo | CSS3 com Custom Properties (design system completo) |
| Comportamento | JavaScript ES6+ vanilla (sem frameworks) |
| Carregamento | `fetch()` + `IntersectionObserver` (lazy sections) |
| SEO | JSON-LD Schema.org · Open Graph · Twitter Card · canonical |
| Acessibilidade | ARIA labels · skip-link · teclado nav · `aria-expanded` |
| Performance | Font Awesome non-blocking · `defer` scripts · `passive` listeners |
| Hospedagem | GitHub Pages |

---

## Estrutura do Projeto

```
portfolio/
├── index.html                  # Entry point — carrega as seções dinamicamente
├── css/
│   └── styles.css              # Design system completo (~1200 linhas)
├── js/
│   ├── main.js                 # Scroll spy, animações, dark mode, modal
│   ├── section-loader.js       # Carrega seções via fetch(), emite sectionsLoaded
│   └── cv-generator.js         # Gerador de PDF (CV resumido e completo)
├── sections/
│   ├── header.html             # Navegação + dark mode toggle
│   ├── sobre.html              # Bio, stats, CTAs
│   ├── experiencias.html       # Cards de competências + histórico profissional
│   ├── projetos.html           # Projetos acadêmicos e profissionais (accordion)
│   ├── habilidades.html        # Cards de habilidades por categoria
│   ├── formacao.html           # Formação acadêmica
│   ├── certificados.html       # Certificados por semestre (accordion)
│   └── footer.html             # Rodapé com contatos
├── fotos/                      # Foto de perfil
└── img/certificados/           # PDFs dos certificados por semestre
    ├── 1_SEM/
    ├── 2_SEM/
    ├── 3_SEM/
    ├── 4_SEM/
    └── 5_SEM/
```

---

## Seções do Portfólio

- **Sobre** — Bio profissional, estatísticas rápidas (8+ anos em TI, 10+ projetos, 2 técnicos + bacharelado) e links para LinkedIn, GitHub e contato
- **Experiências** — Cards de competências (Redes, Dev Web, BD, Segurança, Gestão TI, IA & Prompts) + histórico profissional detalhado (TCE-SP e Inter Produções)
- **Projetos** — 10 projetos com accordion: CRM Agendamentos v4.1, BSidesSP 2026, SustAmbiTech, Hiper Infra, Lousa Mágica (Python), PSI Assaí, Clínica Odontológica, MadeTech, Projeto Conexão, AlfaTech/BetaTech
- **Habilidades** — 9 cards: Redes, Programação, Segurança, Sistemas & Automação, Cloud, Design, IA & Prompts, Formação Técnica, Idiomas & Soft Skills
- **Formação** — Bacharelado CC (UniDrummond), Wise Up, Técnico em Redes (Senac), Técnico em Informática (Senac), Cadista, Audiovisual, Ensino Médio
- **Certificados** — Organizados por semestre (1º–6º) com visualizador de PDF embutido

---

## Como rodar localmente

```bash
git clone https://github.com/KayhamCristoffer/portfolio.git
cd portfolio
# Abra index.html num servidor local (necessário para fetch() funcionar)
npx serve .
# ou
python3 -m http.server 8080
```

> **Importante:** As seções são carregadas via `fetch()`, portanto abrir `index.html` diretamente pelo sistema de arquivos (`file://`) não funciona. Use um servidor local.

---

## Features

- **Dark Mode** — toggle persistido em `localStorage`
- **Scroll Spy** — link ativo na nav conforme a seção visível
- **Acordeão** — expansão/colapso de projetos e certificados com animação CSS
- **Visualizador de PDF** — certificados abertos em modal
- **Gerador de CV em PDF** — versão resumida e versão completa, geradas via `jsPDF`
- **Animações de entrada** — via `IntersectionObserver` (sem dependência de biblioteca)
- **Responsivo** — breakpoints em 1024px, 768px e 480px

---

## Histórico de versões

| Data | Descrição |
|---|---|
| Jun 2026 | Round 2: conteúdo real CRM v4.1, BSidesSP 2026, Banco de Dados; card IA & Prompts; correções semestre; badge Concluído |
| Jun 2026 | Round 1: Refatoração completa — design system, SEO, acessibilidade, JS sem duplicações |
| Anterior | Versão original do portfólio |

---

## Contato

- **E-mail:** kayhamoliveira98@gmail.com
- **LinkedIn:** [linkedin.com/in/kayhamcristoffer](https://www.linkedin.com/in/kayhamcristoffer)
- **GitHub:** [github.com/KayhamCristoffer](https://github.com/KayhamCristoffer)
