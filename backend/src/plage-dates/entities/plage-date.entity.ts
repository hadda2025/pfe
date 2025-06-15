import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';


export type PlageDateDocument = PlageDate & Document;

@Schema({ timestamps: true })
export class PlageDate {
  _id: Types.ObjectId;

  @Prop({ required: true })
  dateDebut: string; // format "YYYY-MM-DD"

  @Prop({ required: true })
  dateFin: string; // format "YYYY-MM-DD"


}

export const PlageDateSchema = SchemaFactory.createForClass(PlageDate);
