import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity
} from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique: true})    
    user: string
    
    @Column()
    name: string

    @Column()
    password: string

    @Column({default: true})
    active: Boolean

}