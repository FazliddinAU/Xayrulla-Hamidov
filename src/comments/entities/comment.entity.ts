import { Short } from 'src/shorts/entities/short.entity';
import { User } from 'src/users/entities/user.entity';
import { Video } from 'src/videos/entities/video.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';


@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Video, (video) => video.comments, { onDelete: 'CASCADE' })
  video: Video;

  @ManyToOne(() => Short, (short) => short.comments, { onDelete: 'CASCADE' })
  short: Short;

  @CreateDateColumn()
  createdAt: Date;
}
