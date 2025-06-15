import { Document, Types } from 'mongoose';

export interface ISeance extends Document {
  readonly heureDebut: string; // Format "HH:mm"
  readonly heureFin: string;   // Format "HH:mm"

  _id: Types.ObjectId; 
}
