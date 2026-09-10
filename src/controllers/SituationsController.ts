// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

// Criando aplicação Express -> ROTAS
const router = express();

// Criar a rota GET - Principal
router.get("/situations", (req:Request, res:Response) => {
    res.send("Rota da situações está funcionando")
})

// Criar a rota POST 
router.post("/situations", async(req:Request, res: Response) => {
    
    try{
        var data = req.body;

        const situationRepository = AppDataSource.getRepository(Situation);
        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!!",
            situation: newSituation,
        });

    }catch(error){
        
            res.status(500).json({
                messagem: "Erro ao cadastrar situação!!",
            });

    }
})

// Exportar a instrução da rota

export default router 