// Importando a Biblioteca Express
import express from "express";



// Criando Aplicação Express
const app = express()



// Incluir os controller
import  login from "./controllers/login";



// Criando as rotas
app.use ('/', login)



// Iniciar o servidor -> porta: 8080 (é uma porta padrão)
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080") 
    
});