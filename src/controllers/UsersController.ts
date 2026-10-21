import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/Users";
import { PaginationService } from "../services/PaginationService";
import { DeepPartial } from "typeorm";

const router = express();

router.get("/users", async(req:Request, res:Response) => {
    try{
        const userRepository = AppDataSource.getRepository(User);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(userRepository, page, limit, {id: "DESC"});

        res.status(200).json(result);
        return;

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao listar usuário",
        })
        return;
    }
})

router.get("/users/:id", async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado!",
            });
            return
        }

        res.status(200).json(user);
        return

    } catch (error) {
        res.status(500).json({
            messagem : "Erro ao visualizar usuário",
        })
        return
    }
})

router.post("/users", async(req:Request, res:Response) => {
    try{
        const { name, email, situationId } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const newUser = userRepository.create({
            name,
            email,
            situation: { id: Number(situationId) },
        });

        await userRepository.save(newUser);

        res.status(201).json({
            messagem: "Usuário cadastrado com sucesso!!",
            user: newUser,
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            messagem: "Erro ao cadastrar usuário!!",
        });
    }
})

router.put("/users/:id", async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const { name, email, situationId } = req.body;

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado!",
            });
            return
        }

        const updateData: DeepPartial<User> = {};

        if (name !== undefined) {
            updateData.name = name;
        }
        if (email !== undefined) {
            updateData.email = email;
        }
        if (situationId !== undefined) {
            updateData.situation = { id: Number(situationId) };
        }

        userRepository.merge(user, updateData);
        const updatedUser = await userRepository.save(user);

        res.status(201).json({
            messagem: "Usuário atualizado com sucesso!!",
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao atualizar usuário",
        });
        return
    }
})

router.delete("/users/:id", async(req:Request, res:Response) => {
    try{
        const id = Number(req.params.id);
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });

        if (!user) {
            res.status(404).json({
                messagem: "Usuário não encontrado!",
            });
            return
        }

        await userRepository.remove(user);

        res.status(201).json({
            messagem: "Usuário removido com sucesso!!",
        });

    } catch (error) {
        res.status(500).json({
            messagem: "Erro ao excluir usuário",
        });
        return
    }
})

export default router