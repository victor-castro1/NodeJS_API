import { DataSource } from "typeorm"
import { ProductSituation } from "../entity/Products_situations"

export default class CreateProductSituationsSeeds {

    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'ProductSituation'...")

        const productSituationRepository = dataSource.getRepository(ProductSituation);

        const existingCount = await productSituationRepository.count()

        if (existingCount >= 1) {
            console.log("A tabela 'product_situations' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const productSituations = [
            {name: "Disponível"},
            {name: "Indisponível"},
            {name: "Descontinuado"},
        ]

        await productSituationRepository.save(productSituations)

        console.log("Seed concluído com sucesso: Situações de produtos foram cadastradas!!")
    }
}