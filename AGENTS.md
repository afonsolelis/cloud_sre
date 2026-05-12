# Repository Guidelines

## Project Structure & Module Organization

This repository is a static course site. The root contains `index.html`, shared styles in `assets/`, lesson content in `aulas/`, and project contracts in `specs/`.

- `assets/styles.css`: shared page/material styles
- `assets/reveal_custom.css`: shared `reveal.js` slide styles
- `aulas/aula_XX.../slides/`: canonical slide files
- `aulas/aula_XX.../material/`: canonical written materials
- `specs/`: source of truth for structure, content, schedule, and design

Legacy folders like `aulas/aula_1/` still exist. New work should follow the canonical `snake_case` pattern, for example `aulas/aula_01_fundamentos.../slides/slide_aula_01_fundamentos....html`.

## Build, Test, and Development Commands

This project has no build pipeline yet. Use simple local preview and validation commands:

- `python3 -m http.server 8000`: serve the repository locally
- `xdg-open http://localhost:8000/index.html` or open it manually in a browser
- `rg --files aulas specs assets`: inspect repository files quickly
- `rg -n "AWS Student|index.html" aulas`: verify required patterns

## Coding Style & Naming Conventions

Use HTML/CSS with 2-space indentation. Prefer ASCII unless the file already uses Portuguese accents. Keep names in `snake_case`.

- Lesson folders: `aula_01_nome_da_aula`
- Slides: `slide_aula_01_nome_da_aula.html`
- Materials: `material_aula_01_nome_da_aula.html`

Slides must use the HTML-native slide system and include: cover, `2026`, agenda, placeholder, material link, and index link. Materials must mirror slide topics, expand them with detailed explanation, include longer reflective text, provide step-by-step guidance where relevant, and close with instructions for the in-class hands-on activity. The course is 100% practical — no written exercises section.

Every lesson runs from `19h00` to `22h00`: an initial theory block, then two practical hours using `AWS Student`.

## Specs First

Read `specs/repositorio_de_aulas.md`, `specs/estrutura_curso.md`, and `specs/design_system.md` before editing. If code and specs disagree, treat the specs as the contract unless the user changes them first.

## Testing Guidelines

There is no automated test suite. Validate changes by:

- opening changed HTML pages in a browser
- checking navigation between `index`, slides, and materials
- confirming required links are always present
- checking that lesson timing and `AWS Student` practice are reflected where relevant
- confirming visual consistency against `specs/design_system.md`

## Commit & Pull Request Guidelines

Git history is not available in this workspace, so use short imperative commits such as `Add reveal.js slide template for lesson 02`. Keep each commit focused.

PRs should include:

- a brief summary of what changed
- affected lesson paths
- screenshots for `index`, slide, and material changes
- note of any spec updates in `specs/`

---

<!-- AIOX-MANAGED SECTIONS -->
<!-- These sections are managed by AIOX. Edit content between markers carefully. -->
<!-- Your custom content above will be preserved during updates. -->

<!-- AIOX-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.aiox-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- AIOX-MANAGED-END: core -->

<!-- AIOX-MANAGED-START: quality -->
## Quality Gates

- Rode `npm run lint`
- Rode `npm run typecheck`
- Rode `npm test`
- Atualize checklist e file list da story antes de concluir
<!-- AIOX-MANAGED-END: quality -->

<!-- AIOX-MANAGED-START: codebase -->
## Project Map

- Core framework: `.aiox-core/`
- CLI entrypoints: `bin/`
- Shared packages: `packages/`
- Tests: `tests/`
- Docs: `docs/`
<!-- AIOX-MANAGED-END: codebase -->

<!-- AIOX-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run sync:skills:codex`
- `npm run sync:skills:codex:global` (opcional; neste repo o padrao e local-first)
- `npm run validate:structure`
- `npm run validate:agents`
<!-- AIOX-MANAGED-END: commands -->

<!-- AIOX-MANAGED-START: shortcuts -->
## Agent Shortcuts

Preferencia de ativacao no Codex CLI:
1. Use `/skills` e selecione `aiox-<agent-id>` vindo de `.codex/skills` (ex.: `aiox-architect`)
2. Se preferir, use os atalhos abaixo (`@architect`, `/architect`, etc.)

Interprete os atalhos abaixo carregando o arquivo correspondente em `.aiox-core/development/agents/` (fallback: `.codex/agents/`), renderize o greeting via `generate-greeting.js` e assuma a persona ate `*exit`:

- `@architect`, `/architect`, `/architect.md` -> `.aiox-core/development/agents/architect.md`
- `@dev`, `/dev`, `/dev.md` -> `.aiox-core/development/agents/dev.md`
- `@qa`, `/qa`, `/qa.md` -> `.aiox-core/development/agents/qa.md`
- `@pm`, `/pm`, `/pm.md` -> `.aiox-core/development/agents/pm.md`
- `@po`, `/po`, `/po.md` -> `.aiox-core/development/agents/po.md`
- `@sm`, `/sm`, `/sm.md` -> `.aiox-core/development/agents/sm.md`
- `@analyst`, `/analyst`, `/analyst.md` -> `.aiox-core/development/agents/analyst.md`
- `@devops`, `/devops`, `/devops.md` -> `.aiox-core/development/agents/devops.md`
- `@data-engineer`, `/data-engineer`, `/data-engineer.md` -> `.aiox-core/development/agents/data-engineer.md`
- `@ux-design-expert`, `/ux-design-expert`, `/ux-design-expert.md` -> `.aiox-core/development/agents/ux-design-expert.md`
- `@squad-creator`, `/squad-creator`, `/squad-creator.md` -> `.aiox-core/development/agents/squad-creator.md`
- `@aiox-master`, `/aiox-master`, `/aiox-master.md` -> `.aiox-core/development/agents/aiox-master.md`
<!-- AIOX-MANAGED-END: shortcuts -->
