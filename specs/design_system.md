# Especificação de Design System

## Objetivo

Definir um sistema visual único para manter `index.html`, slides e materiais com identidade consistente, navegação previsível e aparência alinhada em toda a disciplina.

## Princípios de design

- Clareza antes de ornamentação.
- Contraste alto e leitura simples.
- Aparência atual, limpa e técnica.
- Composição visual mais quadrada do que arredondada.
- Consistência entre páginas, slides e materiais.

## Tokens visuais obrigatórios

### Cores

- Fundo principal: branco ou variação muito clara.
- Texto principal: preto ou quase preto.
- Cor de apoio: tons neutros de cinza claro para superfícies secundárias.
- Cor de destaque: preto, cinza muito escuro ou outra cor neutra de alto contraste.
- Não usar combinações de baixo contraste.

### Tipografia

- A tipografia deve priorizar leitura e aparência profissional.
- Títulos devem ter peso forte e hierarquia clara.
- Textos corridos devem manter boa legibilidade em desktop e mobile.
- A mesma família tipográfica ou famílias compatíveis devem ser reutilizadas em todo o projeto.

### Espaçamento

- Espaçamentos devem seguir ritmo consistente entre blocos.
- Cards, painéis, seções e footers devem manter padding uniforme.
- Não usar páginas com elementos visualmente soltos ou comprimidos.

### Bordas e raios

- O sistema visual deve priorizar formas mais quadradas.
- Bordas arredondadas, quando usadas, devem ser discretas.
- Evitar visual excessivamente orgânico ou com cantos muito arredondados.

### Sombras e profundidade

- Sombras devem ser sutis e usadas para organização visual.
- O objetivo da profundidade é separar áreas de conteúdo, não criar efeito decorativo exagerado.

## Componentes obrigatórios

### Botões e links de navegação

- Botões e links principais devem ter aparência consistente em `index`, slides e materiais.
- Slides devem sempre exibir link para o material e link para o índice.
- Materiais devem sempre exibir link para o slide e link para o índice.
- Os estados de foco e hover devem preservar contraste e legibilidade.

### Cards e painéis

- Cards devem compartilhar o mesmo padrão de borda, cor de fundo, espaçamento e hierarquia tipográfica.
- Painéis de destaque devem seguir a mesma linguagem visual em todo o projeto.

### Cabeçalhos e rodapés

- Cabeçalhos devem apresentar claramente título, contexto e hierarquia da aula.
- Rodapés devem manter o mesmo padrão de navegação e apoio visual.

## Regras específicas por superfície

### Index

- Deve usar a mesma identidade visual dos demais artefatos.
- A listagem das aulas deve ter padrão consistente de card, título, data e ações.

### Slides

- Devem usar o sistema de slides HTML nativo com `assets/slides.css`.
- Devem manter a mesma linguagem visual entre todas as aulas.
- Capa, agenda e placeholder inicial devem seguir o mesmo sistema visual.
- Áreas de conteúdo dentro dos slides devem usar grids, cards e painéis consistentes.
- Cada slide deve ter foco visual único e fácil de escanear.
- O slide deve evitar poluição: não misturar elementos demais na mesma tela.
- Em geral, usar uma estrutura principal por slide:
  - lista;
  - grid de cards;
  - tabela;
  - callout com apoio visual;
  - ou duas colunas simples.
- Evitar combinar muitas estruturas complexas ao mesmo tempo.
- Evitar rodapés fixos extras, barras redundantes e componentes que disputem atenção com o conteúdo.
- O texto do slide deve ser breve, com leitura rápida e alta legibilidade.

### Materiais

- Devem refletir visualmente a mesma identidade dos slides e do índice.
- Textos longos devem ser organizados com boa hierarquia visual.
- Seções extensas devem usar títulos, subtítulos, blocos de destaque e espaçamento previsível.

## Responsividade

- O design deve funcionar bem em desktop e mobile.
- Grids devem colapsar sem quebrar leitura.
- Tipografia e espaçamento devem permanecer legíveis em telas menores.
- Navegação nunca deve desaparecer em telas pequenas.

## Consistência obrigatória

- Nenhuma nova página deve introduzir um estilo desconectado do restante do projeto.
- Toda mudança visual deve preservar os mesmos tokens, componentes e padrões de navegação.
- Quando houver dúvida entre inovação visual e consistência, a consistência do sistema deve prevalecer.

## Implementação

- Estilos compartilhados devem ser centralizados em arquivos de `assets/` sempre que possível.
- Novos componentes visuais devem ser reaproveitáveis.
- Antes de criar novas classes, deve-se verificar se o padrão já existe no projeto.
