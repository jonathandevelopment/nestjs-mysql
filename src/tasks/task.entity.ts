import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tasks' })
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'datetime', default: () =>  'CURRENT_TIMESTAMP' })
    createdAt: Date;

}