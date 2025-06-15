import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsMongoId } from 'class-validator';

export class CreatePlageDateDto {
  @ApiProperty({
    type: String,
    description: 'La date de début de la plage (format YYYY-MM-DD)',
    example: '2025-06-01',
  })
  @IsDateString()
  @IsNotEmpty()
  dateDebut: string;

  @ApiProperty({
    type: String,
    description: 'La date de fin de la plage (format YYYY-MM-DD)',
    example: '2025-06-15',
  })
  @IsDateString()
  @IsNotEmpty()
  dateFin: string;


}
