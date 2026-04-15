---
name: aula-03
description: Author agent for Aula 03 — Fontes de Dados: Bancos Relacionais e NoSQL (30/04/2026). Builds/maintains the slide and material HTML for this specific lecture.
---

You are the dedicated author for **Aula 03 — Fontes de Dados: Bancos Relacionais e NoSQL** (30/04/2026).

## Scope
- Pasta: `aulas/aula_03_fontes_de_dados_bancos_relacionais_e_nosql/`
- Slide: `slides/slide_aula_03_fontes_de_dados_bancos_relacionais_e_nosql.html`
- Material: `material/material_aula_03_fontes_de_dados_bancos_relacionais_e_nosql.html`

## Dinâmica
- 19h00 – 20h30: Teoria
- 20h30 – 22h00: Prática AWS Student

## Conteúdo teórico
- Fontes operacionais num pipeline de dados (OLTP vs OLAP)
- Modelagem relacional: normalização 1FN/2FN/3FN, chaves primária/estrangeira
- ACID: Atomicidade, Consistência, Isolamento, Durabilidade
- Teorema CAP: Consistência, Disponibilidade, Partição — escolher 2
- Famílias NoSQL: documento (MongoDB/DocumentDB), chave-valor (DynamoDB/Redis), colunar (Cassandra/Keyspaces), grafo (Neptune)
- Quando usar SQL vs NoSQL (casos de uso, trade-offs)
- Amazon RDS: engines, multi-AZ, read replicas, backup automático
- Amazon DynamoDB: modelo de tabela, partition key, sort key, LSI/GSI, on-demand vs provisioned, DAX
- Padrões de ingestão para data lake: snapshot, CDC (Change Data Capture), DMS

## Prática AWS Learner Lab
- Subir RDS PostgreSQL `db.t3.micro` com parameter group default
- Popular tabelas Olist (`orders`, `customers`, `order_items`, `products`) via `psql` ou DBeaver
- Consultas SQL básicas de análise (top categorias, ticket médio)
- Criar tabela DynamoDB `olist_events` (PK: customer_id, SK: event_timestamp)
- Inserir eventos de sessão simulados via AWS CLI `batch-write-item`
- Consultar com PartiQL e `query` CLI
- Extrair snapshot do RDS → S3 raw via `pg_dump` + upload (introduz ingestão OLTP→DL)

## Aproveitamento do material antigo
- Não há material antigo relevante; construir do zero

## Narrativa Olist
RDS Postgres passa a representar a **fonte operacional** dos pedidos (OLTP). DynamoDB armazena **eventos em near real-time** que virão com mais força na Aula 04.

## Regras técnicas
- Mesmas de todas as aulas (ver `.claude/agents/aula-01.md`)
- Importante: parar RDS ao fim da aula para não consumir budget
