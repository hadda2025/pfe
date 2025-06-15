import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seance } from './seances.service';


export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface Soutenance {
  _id?: string;
  date: string;
 
  etat: 'prévue' | 'réalisée' | 'annulée'; // adapte selon ton backend
  documents: string[];
  sujetfinetude: string;
  session: string;
  room: string;
  seance: string;
  plage: string;
 
}
@Injectable({
  providedIn: 'root'
})
export class SoutenancesService {
  private apiUrl = 'http://localhost:3000/soutenances';

  constructor(private http: HttpClient) {}

  // Create a new soutenance
  createSoutenance(soutenance: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, soutenance);
  }

  // Get all soutenances
  getAllSoutenances(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiUrl);
  }

  // Get soutenance by ID
  getSoutenanceById(id: string): Observable<ApiResponse<Soutenance>> {
    return this.http.get<ApiResponse<Soutenance>>(`${this.apiUrl}/${id}`);
  }

  // Update soutenance
  updateSoutenance(id: string, soutenance: any): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, soutenance);
  }

  // Delete soutenance
  deleteSoutenance(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  // Find soutenances by session
  findBySession(sessionId: string): Observable<ApiResponse<Soutenance[]>> {
    return this.http.get<ApiResponse<Soutenance[]>>(`${this.apiUrl}/session/${sessionId}`);
  }

  // Find soutenances by seance
findBySeance(seanceId: string): Observable<ApiResponse<Soutenance[]>> {
  return this.http.get<ApiResponse<Soutenance[]>>(`${this.apiUrl}/Seance/${seanceId}`);
}

  // Find soutenances by room
  findByRoom(roomId: string): Observable<ApiResponse<Soutenance[]>> {
    return this.http.get<ApiResponse<Soutenance[]>>(`${this.apiUrl}/room/${roomId}`);
  }

  // Find soutenances by date
  findByDate(date: string): Observable<ApiResponse<Soutenance[]>> {
    return this.http.get<ApiResponse<Soutenance[]>>(`${this.apiUrl}/date/${date}`);
  }

  // Find soutenances by student
  findByStudent(studentId: string): Observable<ApiResponse<Soutenance[]>> {
    return this.http.get<ApiResponse<Soutenance[]>>(`${this.apiUrl}/student/${studentId}`);
  }
  getSoutenancesByEnseignant(teacherId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/teacher/${teacherId}`);
  }
  findByTeacherName(firstName: string, lastName: string): Observable<Soutenance[]> {
    const params = new HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName);

    return this.http.get<Soutenance[]>(`${this.apiUrl}/by-teacher`, { params });
  }

  
  findAvailableSeances(date: string, roomId: string, presidentId: string, rapporteurId: string, examinateurId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/available/${date}/${roomId}/${presidentId}/${rapporteurId}/${examinateurId}`);
  }


 // Récupérer les soutenances par nom de salle
  getsoutenanceBySalle(roomName: string): Observable<any> {
    const url = `${this.apiUrl}/by-room/${encodeURIComponent(roomName)}`;
    return this.http.get<any>(url);
  }
 

  
}
