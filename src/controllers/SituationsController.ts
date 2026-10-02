// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

// Criando aplicação Express -> ROTAS
const router = express();

// Criar a Lista
router.get("/situations", async(req:Request, res:Response) => {
    try{

        // Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(Situation);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // Definir o limite de registros 
        const limit = 1;

        // Contar o total de registros no banco de dados
        const totalSituation = await situationRepository.count()

        // Verificar se existem registros
        if (totalSituation === 0){
            res.status(400).json({
            message: "Nenhuma situação encontrada",
            })
            return;
        }

        // Calcular a última página 
        const lastPage = Math.ceil(totalSituation / limit)

        // Verificar se a página solicitada é válida 
        if (page > lastPage){
            res.status(400).json({
                message: `Página inválida, O total de páginas é igual a ${lastPage}`,
            });
            return;
        }

        // Calcular o offset(a partir de qual registro começar a busca)
        const offset = (page - 1) * limit;

        // Recuperar as situações do banco de dados com a paginação 
        const situations = await situationRepository.find({
            take: limit,
            skip: offset,
            order: {id: "DESC"}
        });


        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json({
            currentPage: page,
            lastPage,
            totalSituation,
            situations,
        });
        return;

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar situação",
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
            messagem : "Erro ao visualizar situação",
        })
        return
    }
})

// Cadastro do item no banco de dados
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

// Faz a atualização do item cadastrado
router.put("/situations/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        var data = req.body;

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const situation = await situationRepository.findOneBy({ id }) 

        if (!situation) {
            res.status(404).json({ 
                messagem: "Situação não encontrada!",
            });
            return
        }

        // Atualiza dados da situação
        situationRepository.merge(situation, data)

        // Salvar as alterções dos dados
        const updateSituation = await situationRepository.save(situation)

        res.status(201).json({
            messagem: "Situação atualizada com sucesso!!",
            situation: updateSituation,
        });

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao atualizar a situação",
        })
        return
    }
})

// Remove o item cadastrado no Banco de Dados
router.delete("/situations/:id", async(req:Request, res:Response) => {
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

        // Remover os dados direto do Banco de dados
        await situationRepository.remove(situation)

        res.status(201).json({
            messagem: "Situação removida com sucesso!!",
        });

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao atualizar a situação",
        })
        return
    }
})

// Exportar a instrução da rota
export default router 