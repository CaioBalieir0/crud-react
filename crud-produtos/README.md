# Projeto de Cadastro de Produtos - Caio Balieiro e Felipe Tavares

Este é um projeto full-stack que permite o cadastro, busca, edição e exclusão de produtos. A aplicação é dividida em duas partes:

- **Backend (API)**: Responsável por gerenciar os dados dos produtos.
- **Frontend**: Interface de usuário para interagir com o sistema.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Sequelize
- **Frontend**: React, React Bootstrap, Vite, Axios
- **Banco de Dados**: MySQL

---

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (Node Package Manager)

## Como Rodar o Projeto

### 1. Clonar o Repositório

```
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositoriocd frontend
npm install
npm run dev
```

### 2. Configurar o Backend (API)

Acesse a pasta `api`, instale as dependências e inicie o servidor:

```
cd api
npm install
node server.js

```

#### Informações Adicionais do Backend

- O servidor será iniciado em: `http://localhost:8800`
- Certifique-se de que a porta `8800` está disponível.
- Você pode testar as rotas usando ferramentas como **Postman** ou **Insomnia** .

### 3. Configurar o Frontend

Abra um novo terminal, acesse a pasta `frontend`, instale as dependências e inicie o servidor de desenvolvimento:

```
cd frontend
npm install
npm run dev

```

#### Informações Adicionais do Frontend

- A aplicação será iniciada em: `http://localhost:5173` (ou outra porta, se a `5173` não estiver disponível).
- Abra seu navegador e acesse `http://localhost:5173`.
