// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";

// Criando aplicação Express -> ROTAS
const router = express();

// Criar a rota GET - Principal
router.get("/", (req:Request, res:Response) => {
    res.send("Bem-Vindo a Todos!!!! Tela de login está funcionando")
})

// Exportar a instrução da rota

export default router 