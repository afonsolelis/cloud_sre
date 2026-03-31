# Especificacao de Assets Cloudinary (Logos)

## Objetivo

Definir onde e como os logos institucionais do Mackenzie devem aparecer nas paginas do repositorio, garantindo presenca consistente e nao intrusiva em todas as superficies.

## Referencia de assets

Os URLs dos logos estao centralizados em `assets/cloudinary.json`.

| Asset | Chave JSON | Descricao |
|-------|-----------|-----------|
| Logo completo | `logo_full` | M + texto "Mackenzie". Usado em superficies de destaque. |
| Logo mini | `logo_mini` | Apenas o M. Usado de forma discreta nos slides. |

## Regras de posicionamento

### index.html

- Deve exibir o **logo completo** (`logo_full`) na area visivel da pagina (hero/cabecalho).
- O logo deve usar a URL definida em `assets/cloudinary.json`.
- O logo deve ter atributo `alt` descritivo.
- O logo deve ter a classe CSS `logo-full`.

### Slides (todas as aulas)

#### Primeiro slide (capa)

- Deve exibir o **logo completo** (`logo_full`).
- O logo deve aparecer dentro da primeira `<section>` do reveal.js.
- O logo deve usar a classe CSS `deck-logo-full`.
- O logo deve ter atributo `alt` descritivo.

#### Todos os slides (persistente)

- Deve exibir o **logo mini** (`logo_mini`) em posicao fixa no canto inferior esquerdo.
- O logo mini deve ficar dentro de `.reveal` mas fora de `.slides`, para persistir entre transicoes.
- O logo mini deve usar a classe CSS `slide-logo-mini`.
- O logo mini nao deve interferir na navegacao do reveal.js.
- O logo mini deve ter atributo `alt` descritivo.
- O logo mini deve ser discreto (opacidade reduzida, tamanho pequeno).

## Regras visuais

- Logos nao devem distorcer proporcoes (usar `height` fixa e `width: auto`).
- Logo completo no index: altura compativel com o cabecalho.
- Logo completo na capa do slide: altura moderada, antes do titulo.
- Logo mini nos slides: altura pequena, opacidade reduzida, sem atrapalhar leitura.

## Consistencia

- Todas as 8 aulas devem seguir o mesmo padrao de posicionamento.
- A URL dos logos deve vir de `assets/cloudinary.json` como referencia canonica.
- As classes CSS devem ser definidas nos arquivos de assets compartilhados.
