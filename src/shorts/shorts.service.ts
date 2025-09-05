import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Short } from './entities/short.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShortsService {
  constructor(@InjectRepository(Short)
  private shortRepo : Repository<Short>){}
  
  async create(createShortDto: CreateShortDto & { filePath: string }, userId : number) : Promise<Short>{
    const newShort = this.shortRepo.create(createShortDto)
    await this.shortRepo.save(newShort)
    return newShort
  }

  async findAll() : Promise<Short[]>{
    return this.shortRepo.find();
  }

  async findOne(id: number) : Promise<Short | null>{
    return this.shortRepo.findOne({where : {id}});
  }

  async update(id: number, updateShortDto: UpdateShortDto): Promise<Short> {
    const short = await this.shortRepo.findOne({ where: { id } });

    if (!short) {
      throw new NotFoundException(`Short with ID ${id} not found`);
    }

    const updatedShort = await this.shortRepo.preload({
      id,
      ...updateShortDto,
    });

    if (!updatedShort) {
      throw new NotFoundException(`Short with ID ${id} could not be preloaded`);
    }

    return await this.shortRepo.save(updatedShort);
  }


  async remove(id: number) : Promise<void>{
    await this.shortRepo.delete(id);
  }

    async getVideoAndIncreaseViews(id: number): Promise<Short> {
      const short = await this.shortRepo.findOneBy({ id });
      if (!short) throw new NotFoundException('Short not found');
  
      short.views += 1;
      return await this.shortRepo.save(short);
    }
  
    async likeVideo(id: number): Promise<Short> {
      const short = await this.shortRepo.findOneBy({ id });
      if (!short) throw new NotFoundException('Short not found');
  
      short.likes += 1;
      return await this.shortRepo.save(short);
    }
}
