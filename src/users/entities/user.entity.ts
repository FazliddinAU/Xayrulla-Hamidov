import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id : number

    @ApiProperty({ example : "Ali", minimum : 3, maximum : 30})
    @Column()
    name : string
    
    @Column({ type:"enum", enum : Roles, default : Roles.USER})
    role : Roles

    @ApiProperty({ example : "ali0110@gmail.com", minimum : 10, maximum : 120})
    @Column()
    email : string

    @ApiProperty({ example : "ali$8347", minimum : 6, maximum : 15})
    @Column()
    password : string

    @Column({ nullable: true })
    fcmToken: string;
}
