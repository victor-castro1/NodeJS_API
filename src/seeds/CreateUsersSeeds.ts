import { DataSource } from "typeorm"
import { User } from "../entity/Users"
import { Situation } from "../entity/Situations"

export default class CreateUsersSeeds {

    public async run (dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela 'User'...")

        const userRepository = dataSource.getRepository(User);
        const situationRepository = dataSource.getRepository(Situation);

        const existingCount = await userRepository.count()

        if (existingCount >= 1) {
            console.log("A tabela 'users' já possui dados. Nenhuma alteração foi realizada!");
            return;
        }

        const users = [
            {name: "Ana Exemplo", email: "ana@example.com", situationName: "Ativo"},
            {name: "Bruno Exemplo", email: "bruno@example.com", situationName: "Pendente"},
        ]

        for (const userData of users) {
            const situation = await situationRepository.findOneBy({ nameSituation: userData.situationName });

            if (!situation) {
                console.log(`Usuário "${userData.name}" não cadastrado: situação "${userData.situationName}" não encontrada.`);
                continue;
            }

            const user = userRepository.create({
                name: userData.name,
                email: userData.email,
                situation,
            });

            await userRepository.save(user);
        }

        console.log("Seed concluído: Usuários foram cadastrados quando suas situações estavam disponíveis!!")
    }
}