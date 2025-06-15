import { PartialType } from '@nestjs/swagger';
import { CreateSujetfinetudeDto } from './create-sujetfinetude.dto';

export class UpdateSujetfinetudeDto extends PartialType(CreateSujetfinetudeDto) {}
