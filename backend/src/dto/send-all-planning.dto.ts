import { ApiProperty } from '@nestjs/swagger';

export class JuryMember {
  @ApiProperty({ example: 'rapporteur@example.com' })
  to: string;

  @ApiProperty({ example: 'Mme Rania' })
  name: string;

  @ApiProperty({ example: 'rapporteur', enum: ['rapporteur', 'examinateur', 'président'] })
  role: 'rapporteur' | 'examinateur' | 'président';
}

export class StudentInfo {
  @ApiProperty({ example: 'etudiant@example.com' })
  to: string;

  @ApiProperty({ example: 'Ali Ben Salah' })
  name: string;
}

export class SoutenancePlanning {
  @ApiProperty({ example: 'Application Web de gestion' })
  subjectTitle: string;

  @ApiProperty({ example: '2025-06-15' })
  date: string;

  @ApiProperty({ example: '09:00' })
  heureDebut: string;

  @ApiProperty({ example: '10:00' })
  heureFin: string;

  @ApiProperty({ example: 'Salle 101' })
  salle: string;

  @ApiProperty({ type: StudentInfo })
  student: StudentInfo;

  @ApiProperty({ type: [JuryMember] })
  members: JuryMember[];
}

export class SendAllPlanningDto {
  @ApiProperty({ type: [SoutenancePlanning] })
  soutenances: SoutenancePlanning[];
}
