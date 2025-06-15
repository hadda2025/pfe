import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateTeacherDto extends CreateUserDto {

  @ApiProperty({
    type: String,
    description: 'Role assigned to the user',
    example: 'Teacher', // ou 'Rapporteur', 'encadrant', 'president'
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    type: String,
    description: 'Matricule of the user (for internal use)',
    example: 'MAT20250419',
  })
  @IsString()
  @IsNotEmpty()
  matricule: string;

  
}
