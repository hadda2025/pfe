import { PartialType } from '@nestjs/swagger';
import { CreatePlageDateDto } from './create-plage-date.dto';

export class UpdatePlageDateDto extends PartialType(CreatePlageDateDto) {}
