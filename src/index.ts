// Importando a Biblioteca Express
import express, {Request, Response} from "express";

// Criando Aplicação Express
const app = express()

// Criar a rota GET - Principal
app.get("/", (req:Request, res:Response) => {
    res.send("Bem-Vindo a Todos!!!!")
})

// Iniciar o servidor -> porta: 8080 (é uma porta padrão)
app.listen(8080, () => {
    console.log(" Vendo se a aplicação deu a vida \n Servidor iniciado na porta 8080: http://localhost:8080") 
    
});