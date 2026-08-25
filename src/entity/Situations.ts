import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity('situations')
export class Situation {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nameSituation!: string;

    @Column({type: "timestamp", default:() => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({type: "timestamp", default:() => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt!: Date;

    @OneToMany(() => User, (user) => user.situation)
    users!: User[]
}