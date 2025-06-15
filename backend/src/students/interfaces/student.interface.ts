import { Document } from "mongoose"

export interface IStudent extends Document {
    
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly cin: string;
    readonly  role: string;
    readonly  adress: string;
    readonly  password: string;
    readonly  numInscription: string;
    readonly  classeDepartement :string;
      readonly parcours: string;
}