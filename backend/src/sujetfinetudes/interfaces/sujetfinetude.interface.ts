import { Document } from 'mongoose';

export interface ISujetfinetude extends Document {
  readonly namesujet: string;
  readonly entreprise: string;
  readonly DateD: string;
  readonly DateF: string;
  readonly encadrant_externe: string;
  readonly teacher: string;
  readonly student: string[];
  president: string;
  examinateur: string;
  rapporteur: string;
}
