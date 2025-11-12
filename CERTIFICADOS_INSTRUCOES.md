# 📜 Instruções para Adicionar Certificados

## 🎯 Estrutura de Pastas

Organize seus certificados PDF nas seguintes pastas:

```
img/certificados/
├── 1/          (1º Semestre)
├── 2/          (2º Semestre)
├── 3/          (3º Semestre)
└── 4/          (4º Semestre)
```

## ✨ Funcionalidades Implementadas

### 1. **Ícones Dinâmicos** ✅
- **Fechado**: `fa-chevron-down` (▼)
- **Aberto**: `fa-chevron-up` (▲)
- Muda automaticamente ao clicar no card

### 2. **Suporte a PDF e Imagens** ✅
- Arquivos `.jpg`, `.png` → Mostrados como imagem
- Arquivos `.pdf` → Mostrados em iframe

### 3. **Modal com Navegação** ✅
- Setas para navegar entre certificados
- Contador (X / Total)
- Fecha com ESC ou clique fora
- Suporte a teclado (← →)

## 📝 Como Adicionar Novos Certificados

### Template para Imagem (JPG/PNG):

```html
<div class="card">
    <h3 class="toggle">
        <i class="fa-solid fa-chevron-down"></i> Nome do Certificado
    </h3>
    <ul class="content">
        <li><strong>Curso:</strong> Nome Completo do Curso</li>
        <li><strong>Data:</strong> DD de mês de AAAA</li>
        <li><strong>Carga horária:</strong> XXh</li>
        <li><strong>Organização:</strong> Nome da Instituição</li>
        <br>
        <button class="view-cert" data-image="./img/certificados/arquivo.jpg">
            <i class="fa-solid fa-image"></i> Ver Certificado
        </button>
    </ul>
</div>
```

### Template para PDF:

```html
<div class="card">
    <h3 class="toggle">
        <i class="fa-solid fa-chevron-down"></i> Nome do Certificado
    </h3>
    <ul class="content">
        <li><strong>Curso:</strong> Nome Completo do Curso</li>
        <li><strong>Data:</strong> DD de mês de AAAA</li>
        <li><strong>Carga horária:</strong> XXh</li>
        <li><strong>Organização:</strong> Nome da Instituição</li>
        <br>
        <button class="view-cert" data-image="./img/certificados/1/certificado.pdf">
            <i class="fa-solid fa-file-pdf"></i> Ver Certificado
        </button>
    </ul>
</div>
```

## 📍 Localização no Código

Edite o arquivo: `sections/certificados.html`

### Estrutura por Semestre:

1. **1º Semestre** - Linha ~6
2. **2º Semestre** - Linha ~57
3. **3º Semestre** - Linha ~114
4. **4º Semestre** - Linha ~202

## 🔧 Personalização dos Ícones

### Ícones do Botão:
- **Imagem**: `<i class="fa-solid fa-image"></i>`
- **PDF**: `<i class="fa-solid fa-file-pdf"></i>`
- **Certificado Genérico**: `<i class="fa-solid fa-certificate"></i>`
- **Diploma**: `<i class="fa-solid fa-award"></i>`

### Ícones dos Semestres:
- **Calendário**: `<i class="fa-solid fa-calendar-days"></i>`
- **Livro**: `<i class="fa-solid fa-book"></i>`
- **Graduação**: `<i class="fa-solid fa-graduation-cap"></i>`

## 🎨 Comportamento Visual

### Cards Fechados:
- Ícone: ▼ (fa-chevron-down)
- Conteúdo: Escondido

### Cards Abertos:
- Ícone: ▲ (fa-chevron-up)
- Conteúdo: Visível com animação

### Hover nos Cards:
- Borda animada com gradiente de 5 cores
- Elevação com sombra colorida
- Transform translateY(-5px)

## 📦 Exemplo Completo

```html
<!-- 1º SEMESTRE -->
<h3 style="margin-top: 30px; margin-bottom: 20px; color: var(--primary-color);">
    <i class="fa-solid fa-calendar-days"></i> 1º Semestre
</h3>
<div class="grid-container">
    <div class="card">
        <h3 class="toggle">
            <i class="fa-solid fa-chevron-down"></i> Introdução à Programação
        </h3>
        <ul class="content">
            <li><strong>Curso:</strong> Fundamentos de Python</li>
            <li><strong>Data:</strong> 15 de março de 2024</li>
            <li><strong>Carga horária:</strong> 40h</li>
            <li><strong>Organização:</strong> Universidade XYZ</li>
            <br>
            <button class="view-cert" data-image="./img/certificados/1/python.pdf">
                <i class="fa-solid fa-file-pdf"></i> Ver Certificado
            </button>
        </ul>
    </div>
    
    <div class="card">
        <h3 class="toggle">
            <i class="fa-solid fa-chevron-down"></i> Banco de Dados
        </h3>
        <ul class="content">
            <li><strong>Curso:</strong> SQL para Iniciantes</li>
            <li><strong>Data:</strong> 20 de abril de 2024</li>
            <li><strong>Carga horária:</strong> 30h</li>
            <li><strong>Organização:</strong> Universidade XYZ</li>
            <br>
            <button class="view-cert" data-image="./img/certificados/1/sql.jpg">
                <i class="fa-solid fa-image"></i> Ver Certificado
            </button>
        </ul>
    </div>
</div>
```

## 🚀 Após Adicionar Certificados

1. Salve o arquivo `sections/certificados.html`
2. Teste no navegador (Ctrl+F5 para limpar cache)
3. Verifique se:
   - ✅ Ícones mudam ao clicar
   - ✅ PDFs abrem no modal
   - ✅ Imagens são exibidas corretamente
   - ✅ Navegação funciona

## 💡 Dicas

1. **Nome dos arquivos**: Use nomes descritivos sem espaços
   - ✅ `python_basico.pdf`
   - ❌ `Certificado Python.pdf`

2. **Organização**: Mantenha um certificado por card

3. **Informações**: Seja consistente nos dados:
   - Nome do curso completo
   - Data por extenso
   - Carga horária em horas
   - Nome oficial da instituição

4. **Testes**: Sempre teste após adicionar novos certificados

## 📞 Suporte

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Confirme que os caminhos dos arquivos estão corretos
3. Certifique-se de que os PDFs estão nas pastas corretas

---

**Última atualização**: 2025-11-12
**Versão**: 2.0 com suporte a PDF
