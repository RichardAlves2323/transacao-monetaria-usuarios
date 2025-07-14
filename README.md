# 💸 API de Transação Monetária entre Usuários

Este projeto é uma API REST desenvolvida com [NestJS](https://nestjs.com/) que permite realizar **transações monetárias entre usuários**, seguindo os princípios da **Arquitetura Limpa**.

O principal objetivo da aplicação é **servir como estudo prático** sobre:
- Separação de responsabilidades em camadas (domínio, aplicação, infraestrutura, apresentação)
- Criação de testes unitários e de integração
- Documentação com Swagger
- Uso de JWT para autenticação
- Integração com banco de dados (SQLite)

---

## 🚀 Funcionalidades

- Criar usuário
- Buscar usuários (por ID, username ou todos)
- Autenticar usuário (login)
- Realizar transferência monetária entre usuários
- Proteção de rotas com JWT

---

## 🧪 Testes

Foram implementados:
- ✅ Testes **unitários** para entidades e casos de uso
- ✅ Testes de **integração** com banco de dados e autenticação

### 🔨 Executar os testes

```bash
# Testes unitários
npm run test

# Testes de integração (E2E)
npm run test:e2e
```

---

## 📦 Tecnologias/Ferramentas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Jest](https://jestjs.io/) (testes unitários e e2e)
- [Swagger](https://swagger.io/) para documentação

---

## 📄 Documentação (Swagger)

A documentação interativa da API está disponível em:

```
/swagger
```

Exemplo: [http://localhost:3000/swagger](http://localhost:3000/swagger)

---

## ▶️ Como rodar o projeto


### 1. Instalar as dependências

```bash
npm install
```

### 2. Criar arquivo `.env`

```env
JWT_SECRET=sua_chave_secreta
JWT_EXPIRATION=1h
```

### 3. Rodar a aplicação

```bash
npm run start:dev
```

A aplicação estará disponível em: `http://localhost:3000`

---

## 🐳 Rodando com Docker

```bash
docker compose up --build
```
