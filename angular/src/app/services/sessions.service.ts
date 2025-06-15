import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// Réponse générique d'API
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

// Interface Session
export interface Session {
  namesession: string;
  dateD: string;
  dateF: string;
  Filiere: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  private apiUrl = 'http://localhost:3000/sessions';

  constructor(private http: HttpClient) {}

  // Créer une session
  createSession(session: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, session);
  }

  // Récupérer toutes les sessions
  getAllSessions(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiUrl );
  }

  // Récupérer une session par ID
  getSessionById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une session
  updateSession(id: string, session: any): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, session);
  }

  // Supprimer une session
  deleteSession(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
