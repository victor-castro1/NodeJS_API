import { DataSource } from "typeorm"
import { Product } from "../entity/Products"
import { ProductCategory } from "../entity/Product_categories"
import { ProductSituation } from "../entity/Products_situations"

export default class CreateProductsSeeds {

    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'Product'...")

        const productRepository = dataSource.getRepository(Product);
        const productCategoryRepository = dataSource.getRepository(ProductCategory);
        const productSituationRepository = dataSource.getRepository(ProductSituation);

        const existingCount = await productRepository.count()

        if (existingCount >= 1) {
            console.log("A tabela 'products' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const products = [
            {name: "Notebook", categoryName: "Eletrônicos", situationName: "Disponível"},
            {name: "Mouse", categoryName: "Acessórios", situationName: "Disponível"},
            {name: "Mesa", categoryName: "Móveis", situationName: "Disponível"},
        ]

        for (const productData of products) {
            const category = await productCategoryRepository.findOneBy({ name: productData.categoryName });
            const situation = await productSituationRepository.findOneBy({ name: productData.situationName });

            if (!category || !situation) {
                console.log(`Produto "${productData.name}" não cadastrado: categoria "${productData.categoryName}" ou situação "${productData.situationName}" não encontrada.`);
                continue;
            }

            const product = productRepository.create({
                name: productData.name,
                category,
                situation,
            });

            await productRepository.save(product);
        }

        console.log("Seed concluído: Produtos foram cadastrados quando suas referências estavam disponíveis!!")
    }
}