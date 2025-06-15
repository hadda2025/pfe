import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMailDto {
  @ApiProperty({ example: 'etudiant@example.com', description: 'Email du destinataire' })
  @IsEmail()
  to: string;

  @ApiProperty({ example: 'Dr. Alice Dupont', description: 'Nom de l\'enseignant' })
  @IsNotEmpty()
  teacherName: string;

  @ApiProperty({ example: 'Présentation de la soutenance de stage', description: 'Titre du sujet ou de la soutenance' })
  @IsNotEmpty()
  subjectTitle: string;

  @ApiProperty({ example: '2025-06-01', description: 'Date de la soutenance (format YYYY-MM-DD)' })
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '14:00', description: 'Heure de début (format HH:mm)' })
  @IsNotEmpty()
  heureDebut: string;

  @ApiProperty({ example: '15:30', description: 'Heure de fin (format HH:mm)' })
  @IsNotEmpty()
  heureFin: string;

  @ApiProperty({ example: 'Salle B102', description: 'Salle où la soutenance a lieu' })
  @IsNotEmpty()
  salle: string;

  
}
