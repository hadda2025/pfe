import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { SchemaType, SchemaTypes, Types } from "mongoose"


@Schema({ timestamps: true })
export class Document {

    @Prop({ required: true })
    name: string
    @Prop({ required: true })
    type: string
    @Prop({ required: true })
    fileUrl: string
    @Prop({ type: Types.ObjectId, ref: "sujetfinetudes", required: true })
    sujetfinetude: Types.ObjectId;

}
export const documentSchema = SchemaFactory.createForClass(Document)

