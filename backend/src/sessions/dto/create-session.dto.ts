
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateSessionDto {

  @ApiProperty({
          type:String,
          description:"this is a required field"
          })
    @IsString()
    @IsNotEmpty()
    namesession: string;


    @ApiProperty({
            type:Date,
            description:"this is a required field"
            })
    @IsDate()
    @IsNotEmpty()
  dateD: Date;



  @ApiProperty({
    type:Date,
    description:"this is a required field"
    })
@IsDate()
@IsNotEmpty()
dateF: Date;


 @ApiProperty({
          type:String,
          description:"this is a required field"
          })
    @IsString()
    @IsNotEmpty()
Filiere: string;

  
}
