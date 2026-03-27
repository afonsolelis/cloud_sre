# GEMINI.md - Diretrizes para o Gemini

Este arquivo fornece as diretrizes para o Gemini ao interagir com o repositório **CLOUD COMPUTING E SRA - VISÃO PRÁTICA COM AWS** (MBA em Engenharia de Dados).

## Visão Geral do Repositório

Trata-se de um repositório web estático contendo o material de 8 aulas (slides e materiais de apoio). O foco da disciplina é a construção de Arquiteturas de Dados, Data Lakes, Modern Data Stack na AWS e Observabilidade de Dados.
Não existem processos de build, gerenciadores de dependências corporativos ou suítes de teste. O repositório usa HTML estático, CSS compartilhado e a biblioteca `reveal.js` para os slides.

### Especificações Autorizativas

Sempre consulte a pasta `specs/` como fonte da verdade:
1. `specs/estrutura_curso.md`: Define a estrutura de pastas e nomenclatura canônica (`snake_case`, prefixo `aula_`).
2. `specs/repositorio_de_aulas.md`: Define as regras de conteúdo e navegação (links obrigatórios, integração com `reveal.js`).
3. `specs/design_system.md`: Define as regras visuais (alto contraste, composição quadrada, coesão entre páginas).

## Estrutura do Projeto

```text
/
├── index.html                          # Índice principal listando as aulas
├── GEMINI.md                           # Você está aqui
├── assets/styles.css                   # CSS global obrigatório
├── specs/                              # Especificações (fonte da verdade)
└── aulas/
    └── aula_xx_nome_da_aula/           # Pastas em snake_case com dois dígitos numéricos
        ├── slides/slide_aula_xx_nome.html
        └── material/material_aula_xx_nome.html
```

## Dinâmica Obrigatória da Aula

- **Horário**: Inicia às 19h00, encerra às 22h00.
- **Teoria**: O bloco inicial deve ser sempre exclusivamente teórico.
- **Prática**: As duas últimas horas (20h00 às 22h00) são sempre reservadas para a prática.
- **Ambiente**: Todo hands-on e prática OBRIGATORIAMENTE utilizará o ambiente `AWS Student`.
- Essa dinâmica deve estar explícita em slides, materiais de aula e cronogramas.

## Regras de Conteúdo e Navegação

**Slides:**
- OBRIGATÓRIO o uso do `reveal.js`.
- Capa com título e ano `2026`.
- Slide 2: agenda. Slide 3: placeholder de conteúdo.
- Links explícitos obrigatórios: P/ `material_aula_XX.html` e P/ `index.html`.

**Materiais de Apoio:**
- Extensão, detalhamento e reflexão do conteúdo abordado no slide correspondente.
- Passo a passo completo para os laboratórios/hands-on da AWS.
- OBRIGATÓRIO contar com a seção `Exercícios de fixação` no final.
- Links explícitos obrigatórios: P/ `slide_aula_XX.html` e P/ `index.html`.

## Regras Visuais (Design System)

- **Cores**: Fundo branco ou muito claro, texto preto ou quase preto. Evite baixo contraste.
- **Formas**: Composição visual mais "quadrada", evite bordas excessivamente arredondadas.
- **Tipografia**: Legível, limpa e técnica, refletindo uma disciplina de Engenharia de Dados.
- **Consistência**: Nenhuma nova página deve introduzir estilos desconexos. Use as classes do `assets/styles.css`.

## Agentes de Atuação (Como o Gemini deve agir)

Dependendo do seu contexto de atuação, adote um dos perfis abaixo para gerar a saída perfeita:

1. **Agente de Estrutura**: Ao criar/renomear pastas e arquivos, garanta o formato `aula_XX_tema_resumido`, valide o `snake_case` e a presença das subpastas `slides/` e `material/`. Consulte `specs/estrutura_curso.md`.
2. **Agente de Conteúdo**: Ao construir slides e materiais, garanta a profundidade analítica de Engenharia de Dados, crie laboratórios claros com um passo a passo objetivo e mantenha sempre os links cruzados de navegação. Consulte `specs/repositorio_de_aulas.md`.
3. **Agente de Design**: Ao escrever HTML/CSS, utilize os padrões arquiteturais de design estabelecidos. Garanta responsividade básica para Desktop e Mobile, e a reutilização do `assets/styles.css`. Consulte `specs/design_system.md`.

## Cronograma (Abril-Junho 2026)
1. `aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos` (16/04/2026)
2. `aula_02_a_fundacao_do_data_lake_armazenamento_escalavel_s3_e_athena` (23/04/2026)
3. `aula_03_fontes_de_dados_bancos_relacionais_e_nosql` (30/04/2026)
4. `aula_04_ingestao_e_processamento_near_real_time_streaming` (07/05/2026)
5. `aula_05_integracao_etl_serverless_e_catalogo_de_dados` (14/05/2026)
6. `aula_06_data_warehousing_na_nuvem_de_alta_performance` (21/05/2026)
7. `aula_07_data_reliability_e_sre_aplicados_a_pipelines_de_dados` (28/05/2026)
8. `aula_08_seguranca_de_dados_finops_e_projeto_final_integrado` (11/06/2026)
