# Especificação do Repositório de Aulas

## Objetivo

Organizar o conteúdo da disciplina em um repositório estático com uma página inicial `index.html` e uma pasta `aulas/` contendo, para cada aula, um arquivo de slide e um arquivo de material escrito.

## Referências obrigatórias

- A estrutura e a navegação deste repositório devem seguir esta especificação.
- O alinhamento visual entre páginas, slides e materiais deve seguir `specs/design_system.md`.

## Estrutura obrigatória

```text
/
├── index.html
├── assets/
│   └── styles.css
├── specs/
│   └── repositorio_de_aulas.md
└── aulas/
    └── aula_xx_nome_da_aula/
        ├── slides/
        │   └── slide_aula_xx_nome_da_aula.html
        └── material/
            └── material_aula_xx_nome_da_aula.html
```

## Convenções de nomenclatura

- Todo nome de pasta e arquivo deve usar `snake_case`.
- Toda pasta de aula deve começar com `aula_`.
- Todo arquivo de slide deve começar com `slide_`.
- Todo arquivo de material deve começar com `material_`.
- Os nomes devem evitar espaços, hífens e caracteres especiais.

## Regras de conteúdo

- `index.html` deve listar todas as aulas com links para slide e material.
- Cada slide deve conter:
  - título da aula;
  - data da aula;
  - resumo do tema;
  - link para o material escrito;
  - link de volta para `index.html`.
- Cada material deve conter:
  - título da aula;
  - data da aula;
  - resumo do conteúdo;
  - seção final `Exercícios de fixação`;
  - link para o slide;
  - link de volta para `index.html`.

## Regra obrigatória de dinâmica da aula

- Toda aula deve começar às `19h00` e terminar às `22h00`.
- A primeira parte da aula deve ser sempre teórica.
- As duas últimas horas da aula devem ser sempre práticas.
- A parte prática deve usar o ambiente `AWS Student`.
- Slides, materiais e cronograma devem refletir essa divisão de tempo de forma consistente.

## Regra obrigatória para slides

- Todo slide de aula deve ser implementado com `reveal.js`.
- O arquivo HTML do slide deve seguir a estrutura esperada pelo `reveal.js`.
- Novas aulas, revisões e migrações de slides existentes devem adotar `reveal.js` como padrão canônico.
- O uso de HTML estático fora do padrão `reveal.js` deve ser tratado apenas como legado temporário até migração.
- Todo slide deve começar com uma capa.
- A capa deve exibir o título da aula e o ano `2026`.
- O segundo slide deve apresentar a agenda da aula.
- O terceiro slide deve existir como placeholder inicial para a construção do conteúdo.
- Todo slide deve conter link explícito para o material escrito da mesma aula.
- Todo slide deve conter link explícito de volta para `index.html`.
- Esses links de navegação são obrigatórios e não devem ser omitidos em nenhuma aula.
- Cada slide deve ter um foco único e claro.
- Cada slide deve conter somente os elementos necessários para comunicar esse foco com boa leitura.
- Cada slide deve priorizar um título forte e no máximo um bloco principal de conteúdo por vez.
- Quando houver listas, tabelas, cards ou painéis, a quantidade deve ser limitada para evitar poluição visual.
- Não usar rodapés fixos extras, barras redundantes ou controles duplicados quando o `reveal.js` já oferecer a navegação necessária.
- Evitar excesso de texto no slide; detalhes longos devem ir para o material escrito.

## Regra obrigatória para materiais

- Todo material deve espelhar os mesmos tópicos apresentados no slide da aula correspondente.
- O material deve aprofundar cada tópico do slide com explicações mais descritivas e mais completas.
- O material deve conter textos mais longos, voltados à reflexão, contextualização e entendimento conceitual.
- O material deve incluir orientações passo a passo sempre que houver processo, laboratório, configuração ou execução prática.
- O material deve funcionar como apoio de estudo e revisão após a aula, e não apenas como resumo curto.
- Todo material deve conter link explícito para o slide da mesma aula.
- Todo material deve conter link explícito de volta para `index.html`.
- Esses links de navegação são obrigatórios e não devem ser omitidos em nenhuma aula.
- A seção `Exercícios de fixação` continua obrigatória ao final do material.

## Regras visuais iniciais

- Fundo branco.
- Texto preto.
- Contraste alto e leitura simples.
- Layout responsivo básico para desktop e mobile.
- O design dos slides deve seguir uma direção visual mais atual.
- Cards, painéis e áreas de destaque devem priorizar composição mais quadrada.
- Bordas excessivamente arredondadas devem ser evitadas nos elementos principais.

## Lista inicial de aulas

1. `aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos`
2. `aula_02_a_fundacao_do_data_lake_armazenamento_escalavel_s3_e_athena`
3. `aula_03_fontes_de_dados_bancos_relacionais_e_nosql`
4. `aula_04_ingestao_e_processamento_near_real_time_streaming`
5. `aula_05_integracao_etl_serverless_e_catalogo_de_dados`
6. `aula_06_data_warehousing_na_nuvem_de_alta_performance`
7. `aula_07_data_reliability_e_sre_aplicados_a_pipelines_de_dados`
8. `aula_08_seguranca_de_dados_finops_e_projeto_final_integrado`
