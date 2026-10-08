// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ProductSituation } from "../entity/Products_situations";
import { PaginationService } from "../services/PaginationService";

// Criando aplicação Express -> ROTAS
const router = express();

// Criar a Lista
router.get("/product-situations", async(req:Request, res:Response) => {
    try{

        // Obter o repositório da entidade ProductSituation
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // Definir o limite de registros 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(productSituationRepository, page, limit, {id: "DESC"});

        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return;

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar situação",
        })
        return;
    }
})

// Criar a Visualização do item cadastrado em situação
router.get("/product-situations/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const productSituation = await productSituationRepository.findOneBy({ id }) 

        if (!productSituation) {
            res.status(404).json({ 
                messagem: "Situação não encontrada!",
            });
            return
        }

        res.status(200).json(productSituation);
        return

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao visualizar situação",
        })
        return
    }
})

// Cadastro do item no banco de dados
router.post("/product-situations", async(req:Request, res: Response) => {
    
    try{
        var data = req.body;

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        const newProductSituation = productSituationRepository.create(data);

        await productSituationRepository.save(newProductSituation);

        res.status(201).json({
            messagem: "Situação cadastrada com sucesso!!",
            productSituation: newProductSituation,
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao cadastrar situação!!",
        });
    }
})

// Faz a atualização do item cadastrado
router.put("/product-situations/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        var data = req.body;

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const productSituation = await productSituationRepository.findOneBy({ id }) 

        if (!productSituation) {
            res.status(404).json({ 
                messagem: "Situação não encontrada!",
            });
            return
        }

        // Atualiza dados da situação
        productSituationRepository.merge(productSituation, data)

        // Salvar as alterções dos dados
        const updateProductSituation = await productSituationRepository.save(productSituation)

        res.status(201).json({
            messagem: "Situação atualizada com sucesso!!",
            productSituation: updateProductSituation,
        });

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao atualizar a situação",
        })
        return
    }
})

// Remove o item cadastrado no Banco de Dados
router.delete("/product-situations/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const productSituation = await productSituationRepository.findOneBy({ id }) 

        if (!productSituation) {
            res.status(404).json({ 
                messagem: "Situação não encontrada!",
            });
            return
        }

        // Remover os dados direto do Banco de dados
        await productSituationRepository.remove(productSituation)

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
