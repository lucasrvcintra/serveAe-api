# serveAe-api
# API de Gestão de Pedidos - Falaê

Esta API foi desenvolvida como parte do desafio técnico para o processo seletivo de estágio na Falaê. Ela é responsável pela gestão de pedidos de um restaurante, permitindo a criação de clientes, CRUD completo de produtos e criação e visualização depedidos. A API foi estruturada com foco em boas práticas de desenvolvimento, utilizando os conceitos da arquitetura **SOLID**, como **Responsabilidade Única** e **Inversão de Dependências**.

## 🚀 Tecnologias Utilizadas

- **Node.js com Express**: Framework para construir APIs em Node.js.
- **Prisma**: ORM para interagir com o banco de dados PostgreSQL de forma eficiente e segura.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar os dados da aplicação.
- **Docker**: Utilizado para rodar o PostgreSQL em um contêiner, facilitando a configuração e a portabilidade do ambiente.
- **Jest**: Framework de testes utilizado para realizar testes unitários e garantir a qualidade do código. 
- **Arquitetura SOLID**: Aplicação dos princípios de design de software para garantir código mais modular, testável e fácil de manter.
  - **Responsabilidade Única**: Cada classe ou módulo possui uma única responsabilidade.
  - **Inversão de Dependências**: Dependências são injetadas, ao invés de criadas diretamente pelos módulos.

## 💻 Como Rodar o Projeto

### 1. Clonar o Repositório
    ```bash
    git clone https://github.com/lucasrvcintra/serveAe-api.git
    cd serveAe-api

### 2. Instalar as Dependências
    ```bash
    npm install

### 3. Configurar o Banco de Dados com Docker
    ```bash
    docker-compose up -d

### 4. Rodar a API
    ```bash
    npm run dev

### 5. Script de testes
    ```bash
    npm run test
**Se estiver no linux abrirá o coverage automaticamente no navegador**


## 6. Variáveis de ambiente
**Basta seguir o .env.example**

## A API estará disponível na porta indicada no terminal
