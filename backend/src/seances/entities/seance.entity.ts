import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, SchemaTypes } from 'mongoose';

export type SeanceDocument = Seance & Document;

@Schema({ timestamps: true })
export class Seance {
  _id: Types.ObjectId;

  @Prop({ required: true })
  heureDebut: string; // format "HH:mm"

  @Prop({ required: true })
  heureFin: string; // format "HH:mm"

}

export const SeanceSchema = SchemaFactory.createForClass(Seance);
