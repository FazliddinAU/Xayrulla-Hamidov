import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(@InjectRepository(Video) private videoRepo : Repository<Video>){}
  async create(createVideoDto: CreateVideoDto & { filePath: string }, userId : number) : Promise<Video>{
    const newVideo = this.videoRepo.create(createVideoDto);
    await this.videoRepo.save(newVideo);
    return newVideo;
  }

  async findAll() : Promise<Video[]>{
    return this.videoRepo.find();
  }

  async findOne(id: number) : Promise<Video | null >{
    return this.videoRepo.findOne({where : {id}});
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) : Promise<Video>{
    const video = await this.videoRepo.findOne({where : {id}})
    if(!video){
      throw new NotFoundException('video topilmadi')
    }
    const updateVideo = await this.videoRepo.preload({
      id,
      ...updateVideoDto
    })
    if(!updateVideo){
       throw new NotFoundException('video yangilashda xatolik')
    }
    return await this.videoRepo.save(updateVideo)
  }

  async remove(id: number) : Promise<void>{
    await this.videoRepo.delete(id);
  }

  async getVideoAndIncreaseViews(id: number): Promise<Video> {
    const video = await this.videoRepo.findOneBy({ id });
    if (!video) throw new NotFoundException('Video not found');

    video.views += 1;
    return await this.videoRepo.save(video);
  }

  async likeVideo(id: number): Promise<Video> {
    const video = await this.videoRepo.findOneBy({ id });
    if (!video) throw new NotFoundException('Video not found');

    video.likes += 1;
    return await this.videoRepo.save(video);
  }

}
