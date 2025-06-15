import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'First name of the user',
    example: 'Ahmed',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last name of the user',
    example: 'Ben Ali',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email address of the user',
    example: 'ahmed.benali@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Phone number of the user',
    example: '+21698765432',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: String,
    description: 'Address of the user',
    example: 'Rue de l’indépendance, Tunis',
  })
  @IsString()
  @IsNotEmpty()
  adress: string;

  @ApiProperty({
    type: String,
    description: 'Password for the user account',
    example: 'P@ssw0rd123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'CIN (National Identity Card number) of the user',
    example: '09876543',
  })
  @IsString()
  @IsNotEmpty()
  cin: string;

  @ApiProperty({
    type: String,
    description: 'Account creation date (ISO format)',
    example: '2025-05-12T09:00:00Z',
  })
  @IsString()
  @IsNotEmpty()
  dateCreation: string;

  @ApiProperty({
    type: String,
    description: 'Department or class the user belongs to',
    example: 'GL3-Informatique',
  })
  @IsString()
  @IsNotEmpty()
  classeDepartement: string;

  @ApiProperty({
    type: String,
    description: 'Current status of the user',
    example: 'active',
  })
  @IsString()
  @IsNotEmpty()
  statut: string;
  
}
