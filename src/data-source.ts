import "reflect-metadata";
import { DataSource } from "typeorm";

import { Situation } from "./entity/Situations";
import { Product } from "./entity/Products";
import { User } from "./entity/Users";
import { ProductCategory } from "./entity/Product_categories";
import { ProductSituation } from "./entity/Products_situations";

// Importar variáveis de ambiente
import dotenv from "dotenv";

// Configurar as variáveis do .env
dotenv.config()

    const dialect = process.env.DB_DIALECT ?? "mysql"

export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb" | "oracle",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,                 // Torna-se flexível -> o código já irá fazer automaticamente
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Situation, User, Product, ProductCategory, ProductSituation],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});

// Inicialização da Conexão com o Banco de Dados
AppDataSource.initialize().then(() => {
    console.log("Conexão do Banco de Dados concluída!!! ")
}).catch((error) => {
    console.log ("Erro na conexão com o Banco de Dados!", error)
})