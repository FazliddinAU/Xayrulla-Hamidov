import { Module } from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { ShortsController } from './shorts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Short } from './entities/short.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guard/roles.guard';

@Module({
  imports : [TypeOrmModule.forFeature([Short, Comment])],
  controllers: [ShortsController],
  providers: [{provide : APP_GUARD, useClass : RolesGuard},ShortsService],
})
export class ShortsModule {}
