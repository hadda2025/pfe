import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLoginDto {

    @ApiProperty({
        type: String,
        description: 'Email address of the user',
        example: 'ahmed.benali@example.com',
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;


    @ApiProperty({
        type: String,
        description: 'Password for the user account',
        example: 'P@ssw0rd123',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
