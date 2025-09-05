import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Bu video juda zo‘r!',
    description: 'Foydalanuvchining yozgan kommentariyasi',
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: 42,
    description: 'Kommentariya qo‘shilayotgan video ID raqami',
  })
  @IsNotEmpty()
  videoId: number;
}
