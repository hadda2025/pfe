import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAgentDto {
     @ApiProperty({
            type: String,
            description: 'Role assigned to the user',
            example: 'Agent', // 
          })
          @IsString()
          @IsNotEmpty()
          role: string; 
       
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
            description: 'Email address of the agent',
            example: 'ahmed.benali@example.com',
          })
          @IsString()
          @IsNotEmpty()
          @IsEmail()
          email: string;
        
          @ApiProperty({
            type: String,
            description: 'First phone of the user',
            example: '98526312',
          })
          @IsString()
          @IsNotEmpty()
          phone: string;
        
          @ApiProperty({
            type: String,
            description: 'adress agent',
            example: 'sousse',
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
            description: 'First name of the user',
            example: '04256398',
          })
          @IsString()
          @IsNotEmpty()
          cin: string;
    
    
    }
    

