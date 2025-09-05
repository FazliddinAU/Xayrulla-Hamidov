import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guard/roles.guard';

@Module({
  imports : [TypeOrmModule.forFeature([Video])],
  controllers: [VideosController],
  providers: [{provide : APP_GUARD, useClass : RolesGuard},VideosService],
})
export class VideosModule {}
