import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateSeanceDto {
  @ApiProperty({
    type: String,
    description: 'Heure de début de la séance (format HH:mm)',
    example: '09:00',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'heureDebut doit être au format HH:mm',
  })
  heureDebut: string;

  @ApiProperty({
    type: String,
    description: 'Heure de fin de la séance (format HH:mm)',
    example: '10:30',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'heureFin doit être au format HH:mm',
  })
  heureFin: string;


}
