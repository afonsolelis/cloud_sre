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
- `rg -n "reveal.js|AWS Student|Exercícios de fixação|index.html" aulas`: verify required patterns

## Coding Style & Naming Conventions

Use HTML/CSS with 2-space indentation. Prefer ASCII unless the file already uses Portuguese accents. Keep names in `snake_case`.

- Lesson folders: `aula_01_nome_da_aula`
- Slides: `slide_aula_01_nome_da_aula.html`
- Materials: `material_aula_01_nome_da_aula.html`

Slides must use `reveal.js` and include: cover, `2026`, agenda, placeholder, material link, and index link. Materials must mirror slide topics, expand them with detailed explanation, include longer reflective text, provide step-by-step guidance where relevant, and end with `Exercícios de fixação`.

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
