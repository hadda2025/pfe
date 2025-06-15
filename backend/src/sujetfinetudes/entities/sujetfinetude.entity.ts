import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Sujetfinetude {

  @Prop({ required: true })
  namesujet: string;
  @Prop({ required: true })
  entreprise: string;
  @Prop({ required: true })
  DateD: string;
  @Prop({ required: true })
  DateF: string;

  @Prop({ required: false })
  encadrant_externe: string;



  @Prop({ type: [SchemaTypes.ObjectId], ref: "students" })
  student: Types.ObjectId[];

  @Prop({ type: SchemaTypes.ObjectId, ref: "teachers" })
  teacher: Types.ObjectId

  
  @Prop({ type: Types.ObjectId, ref: 'teachers' })
president: Types.ObjectId;

@Prop({ type: Types.ObjectId, ref: 'teachers' })
rapporteur: Types.ObjectId;

@Prop({ type: Types.ObjectId, ref: 'teachers' })
examinateur: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: "documents" })
  
  documents: Types.ObjectId



}
export const SujetfinetudeSchema = SchemaFactory.createForClass(Sujetfinetude)
