import { Document } from "mongoose"

  
  
  export interface IProce extends Document {
    readonly  encadrant: string
    readonly  rapporteur : string
    readonly presedent: string
    
}