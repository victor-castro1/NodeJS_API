import { DataSource } from "typeorm"
import { ProductCategory } from "../entity/Product_categories"

export default class CreateProductCategoriesSeeds {

    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'ProductCategory'...")

        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        const existingCount = await productCategoryRepository.count()

        if (existingCount >= 1) {
            console.log("A tabela 'product_categories' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const productCategories = [
            {name: "Eletrônicos"},
            {name: "Acessórios"},
            {name: "Móveis"},
        ]

        await productCategoryRepository.save(productCategories)

        console.log("Seed concluído com sucesso: Categorias de produtos foram cadastradas!!")
    }
}