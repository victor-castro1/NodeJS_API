import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";                             // Decorators

import { ProductCategory } from "./Product_categories";                                                             // Localiza -> categoria (produtos)
import { ProductSituation } from "./Products_situations";                                                           // Localiza -> situação (produtos)

@Entity("products")                                                                                                 // Classe -> Product <> Tabela (sql )-> "produtcs"
export class Product {                                                                                              
  @PrimaryGeneratedColumn()                                                                                         // PK para id -> como identificação
  id!: number;                                                                                                      

  @Column()
  name!: string;

  @ManyToOne(() => ProductSituation,(situation) => situation.products)                                              // Relação: vários produto -> única situação
  @JoinColumn({ name: "productSituationId" })                                                                       // Chave FK -> referencia outra tabela
  situation!: ProductSituation;                                                                                     // Exibe -> situação do produto

  @ManyToOne(() => ProductCategory,(category) => category.products)                                                 // Relação: vários produto -> única categoria
  @JoinColumn({ name: "productCategoryId" })                                                                        // Chave FK -> referencia outra tabela
  category!: ProductCategory;                                                                                       // Exibe categoria do produto

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP"})
  createdAt!: Date;

  @Column({type: "timestamp",default: () => "CURRENT_TIMESTAMP",onUpdate: "CURRENT_TIMESTAMP"})
  updatedAt!: Date;
}