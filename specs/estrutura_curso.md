# Especificação da Estrutura do Repositório de Aulas

## Visão Geral

Este documento define a estrutura canônica de pastas e convenções de nomenclatura para o repositório da disciplina **Cloud Computing e SRA - Visão Prática com AWS**.

## Referências obrigatórias

- Este documento define a estrutura, nomenclatura e contratos de conteúdo.
- O alinhamento visual do projeto deve seguir `specs/design_system.md`.

## Estrutura de Diretórios

```text
ccsre_pratica/
├── README.md
├── index.html
├── assets/
│   └── styles.css
├── specs/
│   ├── estrutura_curso.md
│   └── repositorio_de_aulas.md
└── aulas/
    └── aula_xx_nome_da_aula/
        ├── slides/
        │   └── slide_aula_xx_nome_da_aula.html
        └── material/
            └── material_aula_xx_nome_da_aula.html
```

## Convenções de Nomenclatura

### Pastas

- As pastas de aula devem usar `snake_case`.
- Cada pasta de aula deve começar com `aula_`.
- O nome da pasta deve incluir o número com dois dígitos e o tema resumido da aula.
- Exemplo: `aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos`

### Arquivos

- Slides devem iniciar com `slide_`.
- Materiais devem iniciar com `material_`.
- Todos os arquivos devem usar `snake_case`.
- O nome do arquivo deve refletir a pasta da aula.
- Exemplos:
  - `slide_aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos.html`
  - `material_aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos.html`

### Estilo dos Arquivos

- Fundo branco (`#FFFFFF`).
- Texto preto (`#000000`).
- Formato HTML.
- Layout responsivo básico.
- O design dos slides deve ser mais atual.
- Elementos visuais principais devem privilegiar composição mais quadrada.
- Bordas muito arredondadas devem ser evitadas.

### Padrão dos Slides

- Todos os slides devem usar o sistema de slides HTML nativo, sem dependência de frameworks externos.
- Cada slide é um `<div class="slide">` dentro de um `<div class="slide-container">`. Apenas o slide com a classe `.slide.active` é visível por vez.
- Um `<div class="slide-footer">` fixo no rodapé fornece navegação: botões anterior/próximo, contador de slides, alternância de tela cheia e links de navegação (Home/Material).
- A navegação por teclado é obrigatória: `ArrowRight`/`Space` = próximo, `ArrowLeft` = anterior, `F` = tela cheia.
- O CSS compartilhado dos slides deve estar em `assets/slides.css`.
- Qualquer slide novo ou refatorado fora do sistema HTML nativo é considerado fora do padrão.
- Todo slide deve começar com uma capa.
- A capa deve exibir o título da aula e o ano `2026`.
- O segundo slide deve ser uma agenda da aula.
- O terceiro slide deve ser um slide inicial de placeholder para o conteúdo.
- Todo slide deve conter link explícito para o material da mesma aula.
- Todo slide deve conter link explícito de volta para `index.html`.
- Os links de navegação do slide são obrigatórios em todas as aulas.
- Cada slide deve comunicar uma ideia principal por vez.
- Cada slide deve usar apenas os elementos necessários para essa ideia.
- Deve-se evitar excesso simultâneo de cards, tabelas, listas e blocos visuais na mesma tela.
- Não devem ser adicionados controles duplicados de navegação além do `.slide-footer` padrão.
- Conteúdo extenso e explicações detalhadas devem ficar no material, não no slide.

### Padrão dos Materiais

- Todo material deve seguir o mesmo tema, sequência e tópicos do slide correspondente.
- O material deve expandir o conteúdo do slide com explicações detalhadas e melhor contextualização.
- O material deve usar textos mais longos para reflexão, interpretação e consolidação do aprendizado.
- O material deve apresentar passo a passo claro quando houver laboratório, configuração, processo técnico ou execução prática.
- O material deve servir como referência de estudo posterior à aula.
- Todo material deve conter link explícito para o slide da mesma aula.
- Todo material deve conter link explícito de volta para `index.html`.
- Os links de navegação do material são obrigatórios em todas as aulas.
- O curso é 100% prático — o material encerra com orientação para a atividade hands-on da aula (Codespace, IA, AWS Student Lab), não com exercícios escritos.

## Regras de Conteúdo

- `index.html` deve listar todas as aulas com links para slide e material.
- Cada slide deve conter título, data, resumo, link para o material e retorno ao índice.
- Cada material deve conter título, data, resumo, link para o slide e retorno ao índice.

## Dinâmica obrigatória da aula

- Toda aula deve iniciar às `19h00` e encerrar às `22h00`.
- O bloco inicial da aula deve ser sempre teórico.
- As duas últimas horas devem ser reservadas para prática.
- A prática deve ocorrer com `AWS Student`.
- O cronograma, os slides e os materiais devem explicitar essa dinâmica de forma consistente.

## Cronograma de Aulas

| Aula | Data | Tema Principal |
|------|------|----------------|
| 01 | 16/04/2026 | Fundamentos de Cloud para Dados e Governança de Acessos |
| 02 | 23/04/2026 | A Fundação do Data Lake: Armazenamento Escalável (S3 & Athena) |
| 03 | 30/04/2026 | Fontes de Dados: Bancos Relacionais e NoSQL |
| 04 | 07/05/2026 | Ingestão e Processamento Near Real-time (Streaming) |
| 05 | 14/05/2026 | Integração, ETL Serverless e Catálogo de Dados |
| 06 | 21/05/2026 | Data Warehousing na Nuvem de Alta Performance |
| 07 | 28/05/2026 | Data Reliability & SRE aplicados a Pipelines de Dados |
| 08 | 11/06/2026 | Segurança de Dados, FinOps e Projeto Final Integrado |

## Observação de Migração

- Estruturas legadas como `aula_1/`, `aula_2/` e nomes antigos de arquivos podem coexistir temporariamente.
- A convenção canônica para novos arquivos e futuras revisões é a definida neste documento e em `specs/repositorio_de_aulas.md`.
