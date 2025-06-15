import { Document, Types } from 'mongoose';

export interface IPlageDate extends Document {
  readonly dateDebut: string;
  readonly dateFin: string;

}
