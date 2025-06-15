import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SendSoutenanceEmailDto {
  to: string;
  teacherName: string;
  subjectTitle: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
}

export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = 'http://localhost:3000/send-planning'; // URL backend à adapter

  constructor(private http: HttpClient) {}

  // Envoi mail notification soutenance
  sendSoutenanceEmail(payload: any): Observable<any> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, payload);
  }
}
