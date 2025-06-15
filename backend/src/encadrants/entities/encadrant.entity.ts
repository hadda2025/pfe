

  import { Schema, SchemaFactory } from "@nestjs/mongoose";
    
    @Schema({timestamps:true})
    export class Encadrant {
        iteams:string
    
    }
    export const encadrantSchema=SchemaFactory.createForClass(Encadrant)

