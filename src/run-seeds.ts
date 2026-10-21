import { AppDataSource } from "./data-source"
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";
import CreateProductCategoriesSeeds from "./seeds/CreateProductCategoriesSeeds";
import CreateProductSituationsSeeds from "./seeds/CreateProductSituationsSeeds";
import CreateProductsSeeds from "./seeds/CreateProductsSeeds";
import CreateUsersSeeds from "./seeds/CreateUsersSeeds";

const runSeeds = async() => {
    console.log("Conectando ao banco de dados...")

    try {
        await AppDataSource.initialize();
        console.log("Banco de Dados conectado!!")

        await new CreateSituationsSeeds().run(AppDataSource);
        await new CreateProductCategoriesSeeds().run(AppDataSource);
        await new CreateProductSituationsSeeds().run(AppDataSource);
        await new CreateProductsSeeds().run(AppDataSource);
        await new CreateUsersSeeds().run(AppDataSource);

    } catch (error) {
        console.error("Erro ao executar os seeds:", error);
        process.exitCode = 1;
        
    } finally {
        if (AppDataSource.isInitialized) {
            try {
                await AppDataSource.destroy();
                console.log("Conexão com o banco de dados encerrada")
            } catch (error) {
                console.error("Erro ao encerrar a conexão com o banco de dados:", error);
                process.exitCode = 1;
            }
        }
    }
};

runSeeds();