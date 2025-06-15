import { PartialType } from '@nestjs/swagger';
import { CreateProceDto } from './create-proce.dto';

export class UpdateProceDto extends PartialType(CreateProceDto) {}
