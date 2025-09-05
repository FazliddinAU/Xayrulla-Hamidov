import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Roles } from 'src/guard/roles.decorator';
import RequestWithUser from 'src/guard/request.user';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @Roles('ADMIN')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/videos',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `video-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Yangi video yuklash uchun forma',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Real Madrid vs Ajax' },
        description: { type: 'string', example: 'Yevropa Chempionlar Ligasi' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Yangi video yuklash (faqat ADMIN)' })
  @ApiResponse({ status: 201, description: 'Video muvaffaqiyatli yuklandi' })
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
    @Req() req: RequestWithUser,
  ) {
    const filePath = file.path; 
    return this.videosService.create({ ...createVideoDto, filePath }, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha videolarni olish' })
  @ApiResponse({ status: 200, description: 'Videolar ro‘yxati' })
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Videoni olish va ko‘rishlar sonini oshirish' })
  @ApiResponse({ status: 200, description: 'Video maʼlumotlari' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.videosService.getVideoAndIncreaseViews(id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Videoni yoqtirish (like)' })
  @ApiResponse({ status: 200, description: 'Like soni oshirildi' })
  like(@Param('id', ParseIntPipe) id: number) {
    return this.videosService.likeVideo(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Videoni yangilash (faqat ADMIN)' })
  @ApiResponse({ status: 200, description: 'Video yangilandi' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVideoDto: UpdateVideoDto
  ) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Videoni o‘chirish (faqat ADMIN)' })
  @ApiResponse({ status: 200, description: 'Video o‘chirildi' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.videosService.remove(id);
  }
}
