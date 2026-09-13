// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

// Criando aplicação Express -> ROTAS
const router = express();

// Criar a LISTA
router.get("/situations", async(req:Request, res:Response) => {
    try{

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const situations = await situationRepository.find();

        res.status(200).json(situations);
        return

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar situação"
        })
        return;
    }
})

// Criar a Visualização do item cadastrado em situação
router.get("/situations/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const situation = await situationRepository.findOneBy({ id }) 

        if (!situation) {
            res.status(404).json({ 
                messagem: "Situação não encontrada!",
            });
            return
        }

        res.status(200).json(situation);
        return

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar situação"
        })
        return
    }
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
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao cadastrar situação!!",
        });
    }
})

// Exportar a instrução da rota

export default router 