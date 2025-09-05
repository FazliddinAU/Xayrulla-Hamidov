import { Comment } from "src/comments/entities/comment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Short {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string;

    @Column()
    filePath: string;
    
   @Column({ default: 0 })
   views: number;
 
   @Column({ default: 0 })
   likes: number;
 
   @OneToMany(()=> Comment, comment => comment.short)
   comments : Comment[]
 
   @CreateDateColumn()
   createdAt: Date;
}
