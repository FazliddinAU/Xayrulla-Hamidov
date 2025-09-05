import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @ApiProperty({
    example: 'Real Madrid vs Ajax',
    description: 'Videoning nomi',
  })
  @IsNotEmpty()
  @Max(100)
  @Min(1)
  title: string;

  @ApiProperty({
    example: 'Yevropa Chempionlar ligasi',
    description: 'Videoning tavsifi',
  })
  @IsNotEmpty()
  description: string;
}
