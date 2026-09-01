import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";                                // Decorators -> remetem a uma tabela
import { Product } from "./Products";                                                                       // A entidade precisa conhecer Product -> já que com ele criará uma Lista de produtos

@Entity("product_categories")                                                                               // liga classe "ProductCategory" -> a tabela SQL -> "product_categories"
export class ProductCategory {
  @PrimaryGeneratedColumn()                                                                                 // Cria PK (Primary Key) -> ÚNICO
  id!: number;                                                                                              // coluna parecida -> id INT AUTO-INCREMENT PRIMARY KEY

  @Column()                                                                                                 // Cria Coluna  
  name!: string;                                                                                            // coluna: name VARCHAR(255)

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })                                        // Cria data de criação
  createdAt!: Date;                                                                                         // Quando coluna -> for inserida

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })         // Coluna atualizada quando
  updatedAt!: Date;                                                                                         // registro for alterado 

  @OneToMany(() => Product, (product) => product.category)                                                  // categoria -> relaciona-se c/ -> "Product"
  products!: Product[];                                                                                     // Categoria -> arrays de produtos
}                                                                                                           // Categoria pode -> possuir -> muitos produtos
