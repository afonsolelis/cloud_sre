# Aulas da Disciplina: CLOUD COMPUTING E SRA - VISÃO PRÁTICA COM AWS (MBA em Engenharia de Dados)

Este repositório contém o material e as diretrizes das aulas da disciplina, com foco na construção de Arquiteturas de Dados, Data Lakes, Modern Data Stack na AWS e Observabilidade de Dados.

## 📅 Cronograma das Aulas (19h00 às 22h00)

### Aula 1: 16/04/2026 - Fundamentos de Cloud para Dados e Governança de Acessos
*   **19h00 - 20h00:** O papel da Cloud na Engenharia de Dados (Data Lake vs Data Warehouse vs Data Mesh). Zonas de Disponibilidade e conceitos essenciais da AWS.
*   **20h00 - 20h45:** Segurança de Dados e Identidade: Explorando o AWS IAM (Grupos, Roles para serviços, Princípio do Menor Privilégio).
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on: Configuração segura da conta, criação de usuários IAM e mapeamento de Roles restritas para os futuros componentes do nosso Data Lake.

### Aula 2: 23/04/2026 - A Fundação do Data Lake: Armazenamento Escalável (S3 & Athena)
*   **19h00 - 20h00:** Amazon S3 Profundo (Buckets, Camadas do Data Lake: Raw/Bronze, Trusted/Silver, Refined/Gold), Particionamento estratégico e Lifecycle Policies.
*   **20h00 - 20h45:** Presto na AWS: Introdução ao Amazon Athena para consultas SQL Serverless diretamente em arquivos do S3 (Parquet, CSV, JSON).
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on: Estruturação das camadas do Data Lake no S3. Upload de raw data e primeira exploração em tempo real com Amazon Athena.

### Aula 3: 30/04/2026 - Fontes de Dados: Bancos Relacionais e NoSQL
*   **19h00 - 20h00:** O ecossistema transacional: Amazon RDS (Motores, Multi-AZ) e casos de uso de extração via CDC (Change Data Capture).
*   **20h00 - 20h45:** Bancos NoSQL na AWS: Entendendo o Amazon DynamoDB (Partition Keys, GSIs) e seus casos de uso para alto throughput.
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on: Modelagem rápida no DynamoDB e importação/exportação de dados transacionais para o Data Lake.

### Aula 4: 07/05/2026 - Ingestão e Processamento Near Real-time (Streaming)
*   **19h00 - 20h00:** Ingestão de logs e eventos em tempo real com Amazon Kinesis (Data Streams vs Data Firehose).
*   **20h00 - 20h45:** Introdução ao Big Data Distribuído: Visão geral de como rodar Spark/Hadoop através do Amazon EMR.
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on: Configurando um fluxo com Amazon Kinesis Data Firehose para receber JSONs de eventos e entregá-los na camada "Raw" do S3 com particionamento automático.

### Aula 5: 14/05/2026 - Integração, ETL Serverless e Catálogo de Dados
*   **19h00 - 20h00:** O coração do ETL da AWS: Conhecendo o AWS Glue (Data Catalog, Crawlers). O conceito de Metastore.
*   **20h00 - 20h45:** Processamento Serverless de Dados: AWS Glue Jobs (PySpark vs Ray) e preparação visual (DataBrew).
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on: Rodando um Glue Crawler sobre os dados "Raw", criando o catálogo e executando um job de ETL simples que converte dados para Parquet na camada "Trusted".

### Aula 6: 21/05/2026 - Data Warehousing na Nuvem de Alta Performance
*   **19h00 - 20h00:** Introdução ao Amazon Redshift. Arquitetura MPP (Massively Parallel Processing), Distribution Styles e Sort Keys.
*   **20h00 - 20h45:** Integrando o Data Lake com o Data Warehouse via Amazon Redshift Spectrum (Lendo diretamente do S3).
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on: Carga de tabelas dimensão/fato (Star Schema) via COPY Command para o Redshift e consultas analíticas de alta performance.

### Aula 7: 28/05/2026 - Data Reliability & SRE aplicados a Pipelines de Dados
*   **19h00 - 20h00:** Observabilidade de Dados: Como monitorar saúde dos pipelines? Métricas, SLOs para entrega de dados e Logs via Amazon CloudWatch.
*   **20h00 - 20h45:** Orquestração de Jobs de Dados: Amazon MWAA (Managed Apache Airflow) vs AWS Step Functions. Construindo DAGs resilientes.
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Hands-on SRE: Configurando uma AWS Step Function básica para coordenar tarefas (Crawler -> ETL -> Notificação SNS) com retry automatizado (Tratamento de Falhas).

### Aula 8: 11/06/2026 - Segurança de Dados, FinOps e Projeto Final Integrado
*   **19h00 - 20h00:** Governança Escalável com AWS Lake Formation (Segurança em nível de coluna/linha). Discussão de Custos (FinOps para Analytics).
*   **20h00 - 20h45:** Otimização de consultas, resumo da arquitetura Lambda vs Kappa na AWS e Boas Práticas.
*   *20h45 - 21h00: Intervalo*
*   **21h00 - 22h00:** Lab Final: Execução e Troubleshooting do Pipeline End-to-End. Encerramento.
