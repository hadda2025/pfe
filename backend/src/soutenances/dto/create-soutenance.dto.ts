import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsArray,
  IsMongoId,
  ArrayNotEmpty
} from "class-validator";

export class CreateSoutenanceDto {
  

  @ApiProperty({
    description: "État de la soutenance (ex: prévue, validée)",
    example: "prévue"
  })
  @IsNotEmpty()
  @IsString()
  etat: string;

  @ApiProperty({
    description: "ID de la session",
    example: "6633abcd1234ef5678901234"
  })
  @IsNotEmpty()
  @IsMongoId()
  session: string;

  @ApiProperty({
    description: "ID de la salle",
    example: "6633abcd1234ef5678905678"
  })
  @IsNotEmpty()
  @IsMongoId()
  room: string;

  @ApiProperty({
    description: "ID du président du jury",
    example: "6633abcd1234ef567890aaa1"
  })
  @IsNotEmpty()
  @IsMongoId()
  president: string;

  @ApiProperty({
    description: "ID du rapporteur du jury",
    example: "6633abcd1234ef567890aaa2"
  })
  @IsNotEmpty()
  @IsMongoId()
  rapporteur: string;

  @ApiProperty({
    description: "ID de l'examinateur du jury",
    example: "6633abcd1234ef567890aaa3"
  })
  @IsNotEmpty()
  @IsMongoId()
  examinateur: string;



  @ApiProperty({
    description: "ID du sujet de fin d'étude",
    example: "6633abcd1234ef567890bbbb"
  })
  @IsNotEmpty()
  @IsMongoId()
  sujetfinetude: string;

  
  @ApiProperty({
    description: "ID de la session",
    example: "6633abcd1234ef5678901234"
  })
  @IsNotEmpty()
  @IsMongoId()
  seance: string;
  
   @ApiProperty({
    description: "ID de la session",
    example: "6633abcd1234ef5678901234"
  })
  @IsNotEmpty()
  @IsMongoId()
  plage: string;

 @ApiProperty({
    description: "ID de la session",
    example: "6633abcd1234ef5678901234"
  })
@IsArray()
@ArrayNotEmpty()
@IsMongoId({ each: true })
readonly student: string[];
  
}
