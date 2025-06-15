
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProceDto {
      @ApiProperty({
          type:String,
          description:"this is a required field"
          })
       @IsString()
        @IsNotEmpty()
        encadrant: string;
        @ApiProperty({
                type:String,
                description:"this is a required field"
                })
        @IsString()
        @IsNotEmpty()
      rapporteur: string;
      @ApiProperty({
        type:String,
        description:"this is a required field"
        })
        @IsString()
        @IsNotEmpty()
        presedent: string;
}
