import { PartialType } from '@nestjs/swagger';
import { CreateShortDto } from './create-short.dto';

export class UpdateShortDto extends PartialType(CreateShortDto) {}
