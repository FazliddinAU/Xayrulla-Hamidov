import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateShortDto {
  @ApiProperty({
    example: 'Yangi short video sarlavhasi',
    description: 'Short videoning sarlavhasi',
  })
  @IsNotEmpty()
  title: string;
}
