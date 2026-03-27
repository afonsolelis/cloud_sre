# QWEN.md - Contexto do Projeto

## Visão Geral

Repositório de aulas da disciplina **CLOUD COMPUTING E SRA - VISÃO PRÁTICA COM AWS** (MBA em Engenharia de Dados).

O foco é a construção de Arquiteturas de Dados, Data Lakes, Modern Data Stack na AWS e Observabilidade de Dados.

## Estrutura do Projeto

```
ccsre_pratica/
├── README.md
├── QWEN.md
├── package.json
├── playwright.config.ts
├── index.html
├── assets/
│   ├── styles.css
│   └── reveal_custom.css
├── specs/
│   ├── estrutura_curso.md
│   ├── design_system.md
│   └── repositorio_de_aulas.md
├── tests/
│   ├── README.md
│   ├── fixtures/
│   │   └── helpers.ts
│   └── specs/
│       ├── estrutura_curso.spec.ts
│       ├── design_system.spec.ts
│       └── repositorio_de_aulas.spec.ts
└── aulas/
    └── aula_xx_nome_da_aula/
        ├── slides/
        │   └── slide_aula_xx_nome_da_aula.html
        └── material/
            └── material_aula_xx_nome_da_aula.html
```

## Especificações do Projeto

O projeto é regido por 3 documentos de especificação na pasta `specs/`:

### 1. Estrutura do Curso (`specs/estrutura_curso.md`)

Define a estrutura canônica de pastas, convenções de nomenclatura e contratos de conteúdo.

**Principais regras:**
- Pastas de aula: `aula_XX_tema_resumido/` (snake_case, dois dígitos)
- Slides: `slide_aula_XX_tema.html`
- Materiais: `material_aula_XX_tema.html`
- Fundo branco (`#FFFFFF`), texto preto (`#000000`)
- Dinâmica: 19h00 às 22h00 (teoria + prática com AWS Student)

### 2. Design System (`specs/design_system.md`)

Define o sistema visual para manter consistência entre index, slides e materiais.

**Princípios:**
- Clareza antes de ornamentação
- Contraste alto e leitura simples
- Composição visual mais quadrada do que arredondada
- Consistência entre todas as superfícies

**Tokens visuais:**
- Fundo: branco ou variação muito clara
- Texto: preto ou quase preto
- Destaque: tons neutros de alto contraste
- Tipografia: hierarquia clara, boa legibilidade
- Espaçamento: ritmo consistente entre blocos
- Bordas: discretas, evitar excesso de arredondamento (máx 16px)
- Sombras: sutis para organização visual

### 3. Repositório de Aulas (`repositorio_de_aulas.md`)

Define regras de conteúdo e navegação obrigatória.

**Regras para slides (reveal.js):**
- Slide 1: Capa com título e ano (2026)
- Slide 2: Agenda da aula
- Slide 3: Placeholder de conteúdo
- Links obrigatórios: material da aula + index.html
- Foco único por tela, evitar poluição visual
- Texto breve, detalhes longos vão para o material

**Regras para materiais:**
- Devem espelhar tópicos do slide correspondente
- Textos mais longos para reflexão e contextualização
- Passo a passo para laboratórios e processos práticos
- Seção obrigatória: "Exercícios de fixação"
- Links obrigatórios: slide da aula + index.html

## Cronograma das Aulas

| Aula | Data       | Tema Principal                                              |
|------|------------|-------------------------------------------------------------|
| 01   | 16/04/2026 | Fundamentos de Cloud para Dados e Governança de Acessos     |
| 02   | 23/04/2026 | A Fundação do Data Lake: Armazenamento Escalável (S3 & Athena) |
| 03   | 30/04/2026 | Fontes de Dados: Bancos Relacionais e NoSQL                 |
| 04   | 07/05/2026 | Ingestão e Processamento Near Real-time (Streaming)         |
| 05   | 14/05/2026 | Integração, ETL Serverless e Catálogo de Dados              |
| 06   | 21/05/2026 | Data Warehousing na Nuvem de Alta Performance               |
| 07   | 28/05/2026 | Data Reliability & SRE aplicados a Pipelines de Dados       |
| 08   | 11/06/2026 | Segurança de Dados, FinOps e Projeto Final Integrado        |

## Serviços AWS Abordados

- **IAM** - Identidade e Acesso
- **S3** - Armazenamento de objetos / Data Lake
- **Athena** - Consultas SQL serverless
- **RDS** - Bancos relacionais
- **DynamoDB** - Banco NoSQL
- **Kinesis** - Streaming de dados
- **EMR** - Big Data distribuído (Spark/Hadoop)
- **Glue** - ETL serverless e Data Catalog
- **Redshift** - Data Warehouse
- **CloudWatch** - Monitoramento e logs
- **Step Functions** - Orquestração
- **SNS** - Notificações
- **Lake Formation** - Governança de dados

## Agentes Especializados por Tipo de Spec

### Agente de Estrutura (`estrutura_curso.md`)

**Quando acionar:** Para tarefas relacionadas à organização de pastas, nomenclatura de arquivos, migração de estrutura legada ou criação de novas aulas.

**Responsabilidades:**
- Validar conformidade com convenções de nomenclatura (snake_case, prefixos)
- Criar estrutura de diretórios para novas aulas
- Gerenciar migração de estrutura legada para canônica
- Verificar integridade da árvore de arquivos

**Comando sugerido:**
```
Agente, verifique se a estrutura de pastas está conforme specs/estrutura_curso.md
```

### Agente de Design System (`design_system.md`)

**Quando acionar:** Para tarefas relacionadas à criação ou modificação de estilos, componentes visuais, temas, responsividade ou consistência visual.

**Responsabilidades:**
- Aplicar tokens visuais (cores, tipografia, espaçamento, bordas)
- Criar componentes reutilizáveis (botões, cards, navegação)
- Garantir consistência visual entre index, slides e materiais
- Implementar responsividade para desktop e mobile
- Validar contraste e acessibilidade

**Comando sugerido:**
```
Agente, aplique o design system de specs/design_system.md neste componente
```

### Agente de Conteúdo de Aula (`repositorio_de_aulas.md`)

**Quando acionar:** Para criação de slides, materiais de aula, conteúdo de laboratório, exercícios de fixação ou navegação entre páginas.

**Responsabilidades:**
- Criar slides com estrutura reveal.js (capa, agenda, placeholder)
- Desenvolver materiais com texto expandido e passo a passo de labs
- Incluir seção "Exercícios de fixação" em todos os materiais
- Adicionar links de navegação obrigatórios (slide ↔ material ↔ index)
- Garantir que material espelhe e expanda o conteúdo do slide

**Comando sugerido:**
```
Agente, crie o slide e material para a aula X conforme specs/repositorio_de_aulas.md
```

### Agente de Testes (`tests/`)

**Quando acionar:** Para validar conformidade com as specs, executar testes automatizados, adicionar novos casos de teste ou investigar falhas de validação.

**Responsabilidades:**
- Executar testes de validação das 3 specs
- Criar novos testes para requisitos das specs
- Validar estrutura de pastas e nomenclatura
- Validar regras visuais do design system
- Validar conteúdo e navegação de slides e materiais
- Reportar violações de conformidade

**Arquivos de teste:**

| Arquivo | Spec Validada | Tests para |
|---------|---------------|------------|
| `tests/specs/estrutura_curso.spec.ts` | `estrutura_curso.md` | Pastas (aula_, snake_case, 2 dígitos), Arquivos (slide_, material_, snake_case), Estrutura (slides/, material/), Estilo (fundo branco, texto preto) |
| `tests/specs/design_system.spec.ts` | `design_system.md` | Cores (contraste, destaque), Tipografia (hierarquia, legibilidade), Espaçamento (padding uniforme), Bordas (máx 16px), Sombras (sutis), Navegação (hover, focus), Responsividade (viewport, mobile) |
| `tests/specs/repositorio_de_aulas.spec.ts` | `repositorio_de_aulas.md` | **Slides:** reveal.js, capa (título+2026), agenda, placeholder, links (material, index), foco único, sem poluição |
| | | **Materiais:** título, data, resumo, Exercícios de fixação, links (slide, index), passo a passo, textos longos |

**Comandos disponíveis:**
```bash
# Executar todos os testes
npm test

# Executar testes com UI
npm run test:ui

# Executar testes visivelmente (headed)
npm run test:headed

# Ver relatório HTML
npm run test:report
```

**Comando sugerido:**
```
Agente, execute os testes para validar conformidade com as specs
```

## Como Usar

1. Abra `index.html` no navegador para visualizar o índice de aulas
2. Cada aula possui:
   - `slides/` - Apresentação em reveal.js
   - `material/` - Conteúdo expandido para estudo
3. Consulte a pasta `specs/` para detalhes das especificações
4. Use os agentes especializados conforme o tipo de tarefa
5. Execute `npm test` para validar conformidade com as specs

## Próximos Passos

- [ ] Refatorar estrutura de pastas para convenção canônica (`aula_XX_tema/`)
- [ ] Migrar slides para reveal.js
- [ ] Preencher conteúdo completo dos slides (capa, agenda, conteúdo)
- [ ] Desenvolver exercícios dos labs
- [ ] Adicionar exemplos de código e scripts
- [ ] Incluir diagramas de arquitetura
- [ ] Executar testes de validação periodicamente
