import { Document } from "mongoose"


export interface IRoom extends Document {
    readonly nom: string;
    readonly capacite: number;
    readonly  disponibilite: string;
    readonly  bloc: string;
      
}