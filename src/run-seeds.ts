import { AppDataSource } from "./data-source"
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";

const runSeeds = async() => {
    console.log("Conectando ao banco de dados...")

    await AppDataSource.initialize();

    console.log("Banco de Dados conectado!!")

    try {
        // Cria a instância da classe de seed
        const situationsSeeds = new CreateSituationsSeeds();
        
        // Executa os seeds
        await situationsSeeds.run(AppDataSource);



    } catch (error) {

        console.log("Erro ao executar o seed:", error);

    } finally {

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada")

    }
};

runSeeds();