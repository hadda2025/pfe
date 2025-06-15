import { Document } from "mongoose"

export interface ITeacher extends Document {
  readonly matricule:string;
     readonly role: string;

}