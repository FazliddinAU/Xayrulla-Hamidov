import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Video } from 'src/videos/entities/video.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(Video)
    private videoRepo: Repository<Video>,
  ) {}

  async create(dto: CreateCommentDto, user: User): Promise<Comment> {
    const video = await this.videoRepo.findOneBy({ id: dto.videoId });
    if (!video) throw new NotFoundException('Video not found');

    const comment = this.commentRepo.create({
      content: dto.content,
      video,
      user,
    });

    return this.commentRepo.save(comment);
  }

  async findByVideo(videoId: number): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { video: { id: videoId } },
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number, user: { id: number; role: 'USER' | 'ADMIN' }) {
    const comment = await this.commentRepo.findOne({
      where: { id },
      relations: ['user'], 
    });

    if (!comment) {
      throw new NotFoundException('comment topilmadi');
    }

    if (user.role === 'ADMIN') {
      return await this.commentRepo.remove(comment);
    }

    return await this.commentRepo.remove(comment);
  }

}
