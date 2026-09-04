import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductsTable1788474461756
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "productSituationId",
            type: "int"
          },
          {
            name: "productCategoryId",
            type: "int"
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP"
          }
        ]
      })
    );

    // Chave estrangeira para product_situations
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "FK_products_product_situation",
        columnNames: ["productSituationId"],
        referencedTableName: "product_situations",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );

    // Chave estrangeira para product_categories
    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        name: "FK_products_product_category",
        columnNames: ["productCategoryId"],
        referencedTableName: "product_categories",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("products");

    if (table) {
      const situationForeignKey = table.foreignKeys.find(
        (foreignKey) =>
          foreignKey.name === "FK_products_product_situation"
      );

      const categoryForeignKey = table.foreignKeys.find(
        (foreignKey) =>
          foreignKey.name === "FK_products_product_category"
      );

      if (situationForeignKey) {
        await queryRunner.dropForeignKey(
          "products",
          situationForeignKey
        );
      }

      if (categoryForeignKey) {
        await queryRunner.dropForeignKey(
          "products",
          categoryForeignKey
        );
      }
    }

    await queryRunner.dropTable("products");
  }
}
