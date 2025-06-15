import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsDateString, IsMongoId } from "class-validator"

export class CreateSujetfinetudeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Nom du sujet de fin d'étude",
        example: "Conception et développement d'une application de gestion des soutenances",
    })
    namesujet: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Nom de l'entreprise où le sujet sera réalisé",
        example: "Tech Solutions S.A.R.L",
    })
    entreprise: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Date de début du sujet (format: YYYY-MM-DD)",
        example: "2025-02-01",
    })
    DateD: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "Date de fin du sujet (format: YYYY-MM-DD)",
        example: "2025-06-30",
    })
    DateF: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "ID de l'encadrant externe",
        example: "6605f52eabf2a7b79cf23a6c",
    })
    encadrant_externe?: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "ID de l'encadrant externe",
        example: "6605f52eabf2a7b79cf23a6c",
    })
    teacher: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: "ID de l'encadrant externe",
        example: "6605f52eabf2a7b79cf23a6c",
    })
    student: string;

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
  


    
  
}