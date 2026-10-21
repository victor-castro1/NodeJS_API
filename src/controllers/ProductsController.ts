import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Products";
import { PaginationService } from "../services/PaginationService";
import { DeepPartial } from "typeorm";

const router = express();

router.get("/products", async(req:Request, res:Response) => {
    try{
        const productRepository = AppDataSource.getRepository(Product);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(productRepository, page, limit, {id: "DESC"});

        res.status(200).json(result);
        return;

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar produto",
        })
        return;
    }
})

router.get("/products/:id", async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id })

        if (!product) {
            res.status(404).json({
                messagem: "Produto não encontrado!",
            });
            return
        }

        res.status(200).json(product);
        return

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao visualizar produto",
        })
        return
    }
})

router.post("/products", async(req:Request, res:Response) => {
    try{
        const { name, productCategoryId, productSituationId } = req.body;

        const productRepository = AppDataSource.getRepository(Product);
        const newProduct = productRepository.create({
            name,
            category: { id: productCategoryId },
            situation: { id: productSituationId },
        });

        await productRepository.save(newProduct);

        res.status(201).json({
            messagem: "Produto cadastrado com sucesso!!",
            product: newProduct,
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao cadastrar produto!!",
        });
    }
})

router.put("/products/:id", async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const { name, productCategoryId, productSituationId } = req.body;

        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            res.status(404).json({
                messagem: "Produto não encontrado!",
            });
            return
        }

        const updateData: DeepPartial<Product> = {};

        if (name !== undefined) {
            updateData.name = name;
        }
        if (productCategoryId !== undefined) {
            updateData.category = { id: Number(productCategoryId) };
        }
        if (productSituationId !== undefined) {
            updateData.situation = { id: Number(productSituationId) };
        }

        productRepository.merge(product, updateData);
        const updatedProduct = await productRepository.save(product);

        res.status(201).json({
            messagem: "Produto atualizado com sucesso!!",
            product: updatedProduct,
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar produto",
        });
        return
    }
})

router.delete("/products/:id", async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const productRepository = AppDataSource.getRepository(Product);
        const product = await productRepository.findOneBy({ id });

        if (!product) {
            res.status(404).json({
                messagem: "Produto não encontrado!",
            });
            return
        }

        await productRepository.remove(product);

        res.status(201).json({
            messagem: "Produto removido com sucesso!!",
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao excluir produto",
        });
        return
    }
})

export default router