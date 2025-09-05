import { Controller, Post, Body, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/guard/jwt.auth.guard';
import { CommentsService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Yangi kommentariya qo‘shish' })
  @ApiResponse({ status: 201, description: 'Kommentariya muvaffaqiyatli yaratildi' })
  create(@Body() dto: CreateCommentDto, @Req() req) {
    return this.commentsService.create(dto, req.user);
  }

  @Get('video/:videoId')
  @ApiOperation({ summary: 'Videoga tegishli barcha kommentariyalarni olish' })
  @ApiResponse({ status: 200, description: 'Kommentariyalar ro‘yxati' })
  findByVideo(@Param('videoId') videoId: number) {
    return this.commentsService.findByVideo(videoId);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Kommentariyani o‘chirish' })
  @ApiResponse({ status: 200, description: 'Kommentariya o‘chirildi' })
  delete(@Param('id') id: number, @Req() req) {
    return this.commentsService.remove(id, req.user);
  }
}
