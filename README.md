# Pede Já  
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/MatheusWDB/pede-ja/blob/main/LICENSE)

# Sobre o projeto  
**Pede Já** é um aplicativo de cardápio digital desenvolvido para facilitar a interação entre restaurantes e clientes. Através de um QR Code exclusivo, o cliente acessa o cardápio, informa seus dados e realiza pedidos diretamente pelo celular. O restaurante, por sua vez, pode gerenciar o cardápio e acompanhar os pedidos.

## Funcionalidades:

### Restaurante:
- Cadastro e login.
- Gerar QR Code para acesso do cliente.
- Cadastrar, atualizar e excluir pratos (incluindo imagens).
- Visualizar pedidos recebidos.

### Cliente:
- Escanear QR Code do restaurante.
- Preencher informações para identificação (nome, mesa e telefone).
- Realizar pedido diretamente pelo app.

# Tecnologias utilizadas  
## Frontend
- React Native
- JavaScript

## Backend
- Node.js
- Express
- JavaScript

## Banco de dados
- Sequelize (ORM)
- MySQL

<!--
# Implantação em produção
- Backend: [Em breve]()
- Frontend: [Em breve]()
- Banco de dados: [Em breve]()
-->

# Como executar o projeto  
## Frontend  
Pré-requisitos: Node.js e ambiente React Native configurado

```bash
# clonar repositório
git clone https://github.com/MatheusWDB/pede-ja.git

# entrar na pasta do projeto frontend
cd pede-ja/frontend

# instalar dependências
npm install

# executar o projeto
npx react-native run-android
```
## Backend
Pré-requisitos: Node.js e configurar o banco de dados
```bash
# clonar repositório
git clone https://github.com/MatheusWDB/pede-ja.git

# entrar na pasta do projeto backend
cd pede-ja/backend

# instalar dependências
npm install

# executar o projeto
npm run dev
```

# Autor
Matheus Wendell Dantas Bezerra

- [LinkedIn](https://www.linkedin.com/in/mwdb1703)
- [Portfólio](https://portfolio-vwy3.onrender.com/)
