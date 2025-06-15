import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"


@Schema({timestamps:true})
export class Room {


    @Prop ({required:true})
    nom:string;

    @Prop ({required:true})
    capacite:number;

    @Prop ({required:true})
    disponibilite:string;

    @Prop ({required:true})
    bloc:string;

    

}
export const roomSchema=SchemaFactory.createForClass(Room)
