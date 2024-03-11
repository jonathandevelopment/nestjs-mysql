import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Task } from "src/tasks/task.entity";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'datetime', default: () =>  'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({nullable: true})
    authStrategy : boolean;

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Task,  task => task.author)
    tasks: Task[]

}