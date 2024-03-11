import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_profile')
export class Profile {
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    lastname: string;
    
    @Column({nullable: true})
    age:number;

}