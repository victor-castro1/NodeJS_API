# NodeJS API
_Desenvolvimento de uma API com NodeJS, TypeScript e Express_ 

## Requisitos

* Node.js 22 ou superior - Conferir a versão: `node -v`
* MySQL 8 ou superior - Conferir a versão: `mysql --version`

## Como rodar o projeto

1. Duplique o arquivo `.env.example` e renomeie para `.env`, ajustando as credenciais do banco de dados.

2. Instale as dependências indicadas pelo `package.json`:
   ```bash
   npm install
   ```

3. Compile e execute o projeto em modo watch:
   ```bash
   npm run start:watch
   ```

4. Execute as migrations para criar as tabelas no banco de dados:
   ```bash
   npx typeorm migration:run -d dist/data-source.js
   ```

5. Execute as seeds para cadastrar registros de teste nas tabelas:
   ```bash
   node dist/run-seeds.js
   ```