// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";

// Importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from "../data-source";

// Criando aplicação Express -> ROTAS
const router = express();

// Inicialização da Conexão com o Banco de Dados
AppDataSource.initialize().then(() => {
    console.log("Conexão do Banco de Dados concluída!!! ")
}).catch((error) => {
    console.log ("Erro na conexão com o Banco de Dados!", error)
})

// Criar a rota GET - Principal
router.get("/", (req:Request, res:Response) => {
    res.send("Bem-Vindo a Todos!!!! Tela de login está funcionando")
})

// Exportar a instrução da rota

export default router 