import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () =>  'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @Column()
    authorId:number;

    @ManyToOne(() => User)
    author: User;
}
