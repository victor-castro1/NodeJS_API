import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";                                  // Decorators
import { Product } from "./Products";                                                                         // Localiza "Product"

@Entity("product_situations")                                                                                 // Situação do produto
export class ProductSituation {                                                                                   
  @PrimaryGeneratedColumn()                                                                                   // PK
  id!: number;                                                                                                // ! > refere-se -> já pode ser iniciada antes de ser declarada

  @Column()                                                                                                   // Coluna nome
  name!: string;                                                                                              // VARCHAR(255)

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })                                          // Gera: data de criação <> for inserida
  createdAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })           // Gera: data de atualização <> quando for atualizada
  updatedAt!: Date;

  @OneToMany(() => Product, (product) => product.situation)
  products!: Product[];
}