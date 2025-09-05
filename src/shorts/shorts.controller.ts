import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Req
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

import { ShortsService } from './shorts.service';
import { CreateShortDto } from './dto/create-short.dto';
import { UpdateShortDto } from './dto/update-short.dto';
import { Roles } from 'src/guard/roles.decorator';
import RequestWithUser from 'src/guard/request.user';

@ApiTags('Shorts')
@Controller('shorts')
export class ShortsController {
  constructor(private readonly shortsService: ShortsService) {}

  @Post()
  @Roles('ADMIN')
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/shorts',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `short-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Yangi short video yuklash',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Best saves by Yashin' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Yangi short video yaratish (faqat ADMIN)' })
  @ApiResponse({ status: 201, description: 'Short video yaratildi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q' })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createShortDto: CreateShortDto,
    @Req() req: RequestWithUser,
  ) {
    const filePath = file.path;
    return this.shortsService.create({ ...createShortDto, filePath }, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha short videolarni olish' })
  @ApiResponse({ status: 200, description: 'Shortlar ro‘yxati' })
  findAll() {
    return this.shortsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Shorts olish va ko‘rishlar sonini oshirish' })
  @ApiResponse({ status: 200, description: 'Shorts maʼlumotlari' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.shortsService.getVideoAndIncreaseViews(id);
  }

  @Post(':id/like')
  @ApiOperation({ summary: 'Shortsni yoqtirish (like)' })
  @ApiResponse({ status: 200, description: 'Like soni oshirildi' })
  like(@Param('id', ParseIntPipe) id: number) {
    return this.shortsService.likeVideo(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Short videoni yangilash (faqat ADMIN)' })
  @ApiResponse({ status: 200, description: 'Short yangilandi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateShortDto: UpdateShortDto,
  ) {
    return this.shortsService.update(id, updateShortDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Short videoni o‘chirish (faqat ADMIN)' })
  @ApiResponse({ status: 200, description: 'Short o‘chirildi' })
  @ApiResponse({ status: 403, description: 'Ruxsat yo‘q' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shortsService.remove(id);
  }
}
