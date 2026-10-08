// Importando a Biblioteca Express
import express from "express";

// Importar variáveis de ambiente
import dotenv from "dotenv";

// Carregando as variáveis do .env
dotenv.config()

// Inicializa a conexão com o banco de dados
import "./data-source";

// Criando Aplicação Express
const app = express()

// Criação do Middleware -> para receber dados -> no corpo da requisição
// Começa a receber -> requisições externas.
app.use(express.json());

// Incluir os controller
import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import ProductCategoriesController from "./controllers/ProductCategoriesController";
import ProductSituationsController from "./controllers/ProductSituationsController";


// Criando as rotas
app.use ('/', AuthController)
app.use ('/', SituationsController)
app.use ('/', ProductCategoriesController)
app.use ('/', ProductSituationsController)

// Iniciar o servidor -> porta: 8080 (é uma porta padrão)
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`) 
    
});