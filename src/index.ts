// Importando a Biblioteca Express
import express from "express";

// Importar variáveis de ambiente
import dotenv from "dotenv";

// Carregando as variáveis do .env
dotenv.config()


// Criando Aplicação Express
const app = express()


// Incluir os controller
import  login from "./controllers/login";


// Criando as rotas
app.use ('/', login)


// Iniciar o servidor -> porta: 8080 (é uma porta padrão)
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`) 
    
});