import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateStudentDto extends CreateUserDto {

  @ApiProperty({
    type: String,
    description: 'Role assigned to the user',
    example: 'Student', // ou 'admin', 'jury', 'saisie'
  })
  @IsString()
  @IsNotEmpty()
  role: string; 

  
  @ApiProperty({
    type: String,
    description: 'Registration number of the student',
    example: '2022ISAM0456',
  })
  @IsString()
  @IsNotEmpty()
  numInscription: string;
    @ApiProperty({
    type: String,
    description: 'Registration number of the student',
    example: '2022ISAM0456',
  })
  @IsString()
  @IsNotEmpty()
  parcours: string;

  
}
