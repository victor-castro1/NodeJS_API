// Importando as bibliotecas do Express 
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/Product_categories";
import { PaginationService } from "../services/PaginationService";

// Criando aplicação Express -> ROTAS
const router = express();

// Criar a Lista
router.get("/product-categories", async(req:Request, res:Response) => {
    try{

        // Obter o repositório da entidade ProductCategory
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;

        // Definir o limite de registros 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(productCategoryRepository, page, limit, {id: "DESC"});

        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return;

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar categoria",
        })
        return;
    }
})

// Criar a Visualização do item cadastrado em categoria
router.get("/product-categories/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const productCategory = await productCategoryRepository.findOneBy({ id }) 

        if (!productCategory) {
            res.status(404).json({ 
                messagem: "Categoria não encontrada!",
            });
            return
        }

        res.status(200).json(productCategory);
        return

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao visualizar categoria",
        })
        return
    }
})

// Cadastro do item no banco de dados
router.post("/product-categories", async(req:Request, res: Response) => {
    
    try{
        var data = req.body;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        const newProductCategory = productCategoryRepository.create(data);

        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            messagem: "Categoria cadastrada com sucesso!!",
            productCategory: newProductCategory,
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao cadastrar categoria!!",
        });
    }
})

// Faz a atualização do item cadastrado
router.put("/product-categories/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        var data = req.body;

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const productCategory = await productCategoryRepository.findOneBy({ id }) 

        if (!productCategory) {
            res.status(404).json({ 
                messagem: "Categoria não encontrada!",
            });
            return
        }

        // Atualiza dados da categoria
        productCategoryRepository.merge(productCategory, data)

        // Salvar as alterções dos dados
        const updateProductCategory = await productCategoryRepository.save(productCategory)

        res.status(201).json({
            messagem: "Categoria atualizada com sucesso!!",
            productCategory: updateProductCategory,
        });

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao atualizar a categoria",
        })
        return
    }
})

// Remove o item cadastrado no Banco de Dados
router.delete("/product-categories/:id", async(req:Request, res:Response) => {
    try{

        const id = Number(req.params.id); // Converte um "texto" -> para um valor NUMÉRICO real

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const productCategory = await productCategoryRepository.findOneBy({ id }) 

        if (!productCategory) {
            res.status(404).json({ 
                messagem: "Categoria não encontrada!",
            });
            return
        }

        // Remover os dados direto do Banco de dados
        await productCategoryRepository.remove(productCategory)

        res.status(201).json({
            messagem: "Categoria removida com sucesso!!",
        });

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao atualizar a categoria",
        })
        return
    }
})

// Exportar a instrução da rota
export default router 
