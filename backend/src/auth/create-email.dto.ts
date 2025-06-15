import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatEmailDto {
    @ApiProperty({
        type: String,
        description: "this is a required field"
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string


}
