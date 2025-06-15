import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMailStudentDto {
  @ApiProperty({
    example: 'etudiant@example.com',
    description: 'Email du destinataire',
  })
  @IsEmail()
  to: string;

  @ApiProperty({
    example: 'Jean Dupont',
    description: "Nom de l'étudiant",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Présentation de la soutenance de stage',
    description: 'Titre du sujet ou de la soutenance',
  })
  @IsNotEmpty()
  @IsString()
  subjectTitle: string;

  @ApiProperty({
    example: '2025-06-01',
    description: 'Date de la soutenance (format YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({
    example: '14:00',
    description: 'Heure de début (format HH:mm)',
  })
  @IsNotEmpty()
  @IsString()
  heureDebut: string;

  @ApiProperty({
    example: '15:30',
    description: 'Heure de fin (format HH:mm)',
  })
  @IsNotEmpty()
  @IsString()
  heureFin: string;

  @ApiProperty({
    example: 'Salle B102',
    description: 'Salle où la soutenance a lieu',
  })
  @IsNotEmpty()
  @IsString()
  salle: string;

  @ApiProperty({
    example: 'Dr. Alice Martin',
    description: 'Encadrant interne',
    required: false,
  })
  @IsOptional()
  @IsString()
  encadrant?: string;

  @ApiProperty({
    example: 'Dr. Bob Durand',
    description: 'Rapporteur',
    required: false,
  })
  @IsOptional()
  @IsString()
  rapporteur?: string;

  @ApiProperty({
    example: 'Pr. Claire Bernard',
    description: 'Président',
    required: false,
  })
  @IsOptional()
  @IsString()
  president?: string;
}
