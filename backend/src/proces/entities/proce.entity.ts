import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"


@Schema({timestamps:true})
export class Proce {
  
        @Prop ({required:true})
        presedent:string
        @Prop ({required:true})
        rapporteur:string
        @Prop ({required:true})
        encadrant:string
    
    }
    export const proceSchema=SchemaFactory.createForClass(Proce)