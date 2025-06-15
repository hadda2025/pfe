import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDocumentDto {
        @ApiProperty({
                type: String,
                description: "this is a required field"
        })
        @IsString()
        @IsNotEmpty()
        name: string;



        @ApiProperty({
                type: String,
                description: "this is a required field"
        })
        @IsString()
        @IsNotEmpty()
        type: string;




        @ApiProperty({
                type: String,
                description: "this is a required field"
        })
        @IsString()
        @IsNotEmpty()
        sujet: string;

        @ApiProperty({
                type: String,
                description: "this is a required field"
        })
        @IsString()
        @IsNotEmpty()
        fileUrl: string;


        @ApiProperty({
                type: String,
                description: "this is a required field"
        })
        @IsString()
        @IsNotEmpty()
        sujetfinetude: string;


}
