import { FindOptionsOrder, ObjectLiteral, Repository } from "typeorm";

// Resultado da paginação
interface PaginationResult<T> {                         // <T> -> Resultado genérico
    error: boolean;                                     // caso tenha um erro
    data: T[]                                           // Array de dados -> genérico
    currentPage: number;                                // Primeira Página
    lastPage: number;                                   // Última Página
    totalRecords: number;                               // Total de registros
}

// Funcionalidade da Paginação
export class PaginationService {
    static async paginate<T extends ObjectLiteral>(
        repository:Repository<T>, 
        page: number = 1 ,
        limit: number  = 10,
        order: FindOptionsOrder<T> = {}

    ): Promise<PaginationResult<T>> {

        const totalRecords = await repository.count()

        const lastPage = Math.ceil(totalRecords / limit)

        if (page > lastPage && lastPage > 0) {
            throw new Error(`Página inválida. Total de páginas: ${lastPage}`)
        }

        const offset = (page - 1) * limit;

        const data = await repository.find({
            take: limit,
            skip: offset, 
            order,
        });

        return{
            error: false,
            data,
            currentPage: page,
            lastPage,
            totalRecords
        }
    } 
}