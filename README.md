# Tech Challenge Fase 3 - Blog FIAP

Front-end React da aplicação de blog desenvolvida como parte do Tech Challenge da Pós-Graduação Full Stack Development da FIAP.

## 🚀 Tecnologias

- React 19 + Vite
- React Router DOM
- Axios
- Styled Components

## 📋 Pré-requisitos

- Node.js 20+
- API da Fase 2 rodando em http://localhost:3000
- Docker (opcional)

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/AndreBorges-Git/fiap-tech-challenge-fase3.git
cd fiap-tech-challenge-fase3
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

## 🐳 Como rodar com Docker

```bash
docker-compose up
```

Acesse: http://localhost:5173

## 🔐 Autenticação

A área administrativa é protegida por login. Use as credenciais:

- **Usuário:** admin
- **Senha:** fiap2024

## 📄 Páginas

- **Home** — listagem de posts com busca
- **Ler Post** — visualização completa de um post
- **Novo Post** — formulário para criar post
- **Admin** — painel para editar e excluir posts (requer login)

## 🔗 Repositório da API (Fase 2)

https://github.com/AndreBorges-Git/fiap-tech-challenge-fase2
