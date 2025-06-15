import { Document } from "mongoose"

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
 
  readonly etat: string;
  readonly session: any;
  readonly room: any;
 readonly student: string[];
  readonly president: any;
  readonly examinateur: any;
  readonly rapporteur: any;
  readonly seance: any;
  readonly plage: any;
  readonly documents: any[];
  readonly sujetfinetude: ISujetFinEtude;
}
