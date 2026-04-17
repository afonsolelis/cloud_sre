# Testes de Validação das Specs

Esta pasta contém testes automatizados com Playwright para validar a conformidade do projeto com as especificações definidas na pasta `specs/`.

## Estrutura

```
tests/
├── fixtures/
│   └── helpers.ts              # Funções utilitárias e fixtures compartilhados
└── specs/
    ├── estrutura_curso.spec.ts      # Testes para specs/estrutura_curso.md
    ├── design_system.spec.ts        # Testes para specs/design_system.md
    └── repositorio_de_aulas.spec.ts # Testes para specs/repositorio_de_aulas.md
```

## Comandos Disponíveis

```bash
# Executar todos os testes
npm test

# Executar testes com interface gráfica
npm run test:ui

# Executar testes visivelmente (sem headless)
npm run test:headed

# Gerar e visualizar relatório HTML
npm run test:report
```

## O que é testado

### Estrutura do Curso (`estrutura_curso.spec.ts`)

- ✅ Pastas de aula começam com `aula_`
- ✅ Pastas usam snake_case
- ✅ Cada aula tem subpastas `slides/` e `material/`
- ✅ Slides começam com `slide_`
- ✅ Materiais começam com `material_`
- ✅ Arquivos usam snake_case
- ✅ Arquivos são formato HTML
- ✅ Fundo branco e texto preto

### Design System (`design_system.spec.ts`)

- ✅ Fundo branco ou variação clara
- ✅ Texto preto ou quase preto
- ✅ Sem combinações de baixo contraste
- ✅ Família tipográfica definida
- ✅ Títulos com peso forte
- ✅ Padding consistente
- ✅ Bordas não excessivamente arredondadas
- ✅ Links de navegação presentes
- ✅ Meta viewport configurado
- ✅ Pasta assets/ existe

### Repositório de Aulas (`repositorio_de_aulas.spec.ts`)

- ✅ index.html na raiz
- ✅ Pastas `aulas/` e `specs/` existem
- ✅ Index lista todas as aulas
- ✅ Index tem links para slides e materiais
- ✅ Slides têm título, data, resumo
- ✅ Slides têm link para material e index
- ✅ Slides usam reveal.js
- ✅ Slides têm capa e agenda
- ✅ Materiais têm título, data, resumo
- ✅ Materiais têm link para slide e index
- ✅ Nomes sem espaços ou hífens

## Helpers Disponíveis

O arquivo `fixtures/helpers.ts` exporta utilitários que podem ser reutilizados em novos testes:

```typescript
import { test, expect, fsHelpers, htmlHelpers, specValidators } from '../fixtures/helpers';

// fsHelpers - Operações de arquivo
fsHelpers.readFileSync(path)
fsHelpers.fileExists(path)
fsHelpers.readDir(path)
fsHelpers.getAllFiles(path, pattern)

// htmlHelpers - Parsing de HTML
htmlHelpers.hasElement(html, 'div')
htmlHelpers.hasLink(html, /index\.html/)
htmlHelpers.hasText(html, /texto/)
htmlHelpers.getLinks(html)
htmlHelpers.hasRevealJs(html)

// specValidators - Validações de spec
specValidators.isSnakeCase('nome_valido')
specValidators.hasPrefix('slide_x.html', 'slide_')
specValidators.validateSlideStructure(html)
specValidators.validateMaterialStructure(html)
specValidators.validateColors(html)
```

## Adicionando Novos Testes

1. Crie um novo arquivo `.spec.ts` em `tests/specs/`
2. Importe os helpers necessários
3. Use `test.describe()` para agrupar testes logicamente
4. Use `test()` para casos individuais
5. Execute `npm test` para validar

## Interpretação dos Resultados

- ✅ **Pass**: O teste passou, conformidade validada
- ✘ **Fail**: O teste falhou, há violação da spec

As falhas indicam o que precisa ser corrigido para atingir conformidade total com as especificações.
