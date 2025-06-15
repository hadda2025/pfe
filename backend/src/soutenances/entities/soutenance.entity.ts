import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema({ timestamps: true })
export class Soutenance {


  @Prop({ required: true })
  etat: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: "documents", required: false })
  documents: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "sujetfinetudes", required: true })
  sujetfinetude: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "sessions", required: true })
  session: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "rooms", required: true })
  room: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "teachers", required: true })
  president: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "teachers", required: true })
  rapporteur: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "teachers", required: true })
  examinateur: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: "seances", required: true })
  seance: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'PlageDate' }) // ✅ le nom exact du modèle

  plage: Types.ObjectId;
    student: [{ type: Types.ObjectId, ref: 'User' }]

}

export const SoutenanceSchema = SchemaFactory.createForClass(Soutenance);
