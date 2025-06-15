import { Document } from "mongoose"

export interface IAgent extends Document {
    
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly cin: string;
    readonly  role: string;
    readonly  adress: string;
    readonly  password: string;
   
}