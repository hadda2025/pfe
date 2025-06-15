import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateRoomDto {


  @ApiProperty({
          type:String,
          description:"this is a required field",
          example: "salle1",
          })
    @IsString()
    @IsNotEmpty()
    nom: string;

    @ApiProperty({
            type:String,
            description:"this is a required field",
            example: "20",

            })
    @IsNumber()
    @IsNotEmpty()
  capacite: Number;
  @ApiProperty({
    type:String,
    description:"this is a required field",
    example: "🕘 Matin (08:00 - 12:00)",
    })
@IsString()
@IsNotEmpty()
disponibilite: string;
@ApiProperty({
  type:String,
  description:"this is a required field",
  example: "Bloc C - 1er étage",
  })
 @IsString()
@IsNotEmpty()
bloc: string;



}
