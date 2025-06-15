
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaTypes, Types } from "mongoose"


@Schema({timestamps:true})
export class Session {
    @Prop ({required:true})
    namesession:string
    @Prop ({required:true})
    dateD:Date
    @Prop ({required:true})
    dateF:Date
    @Prop ({required:true})
    Filiere:string

    @Prop ([{required:true,type:SchemaTypes.ObjectId, ref:"soutenances"}])
    soutenances:Types.ObjectId[]

}
export const sessionSchema=SchemaFactory.createForClass(Session)