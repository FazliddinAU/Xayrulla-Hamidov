import { Comment } from "src/comments/entities/comment.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;
  
  @Column()
  filePath: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @OneToMany(()=> Comment, comment => comment.video)
  comments : Comment[]

  @CreateDateColumn()
  createdAt: Date;
}
