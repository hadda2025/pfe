import { Document, Types } from "mongoose"

export interface IStudent {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface ITeacher {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface ISujetFinEtude {
  _id: string;
  title: string;
  description?: string;
  student: IStudent[]; // Liste des étudiants
  teacher: ITeacher;   // L'encadrant
}

export interface ISoutenance extends Document {
 
   etat: string;
  documents?: Types.ObjectId;
  sujetfinetude: Types.ObjectId;
  session: Types.ObjectId;
  room: Types.ObjectId;
  president: Types.ObjectId;
  rapporteur: Types.ObjectId;
  examinateur: Types.ObjectId;
  seance: Types.ObjectId;
  plage: Types.ObjectId;
  student: Types.ObjectId[];
}
