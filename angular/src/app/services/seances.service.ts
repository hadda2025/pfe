import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}
export interface Seance {
  _id?: string;
  room: {
    nom: string;
    bloc: string;
  };
  plage: {
    dateDebut: string;
  };
  heureDebut: string;
  heureFin: string;

  // ajoute d'autres champs selon ton backend
}



@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private apiUrl = 'http://localhost:3000/seances'; // adapte selon ton backend

  constructor(private http: HttpClient) { }

  // 🔸 Créer une séance
  createSeance(seance: Seance): Observable<ApiResponse<Seance>> {
    return this.http.post<ApiResponse<Seance>>(this.apiUrl, seance);
  }

  // 🔸 Récupérer toutes les séances
  getAllSeances(): Observable<ApiResponse<Seance[]>> {
    return this.http.get<ApiResponse<Seance[]>>(this.apiUrl);
  }

  // 🔸 Récupérer une séance par ID
  getSeanceById(id: string): Observable<ApiResponse<Seance>> {
    return this.http.get<ApiResponse<Seance>>(`${this.apiUrl}/${id}`);
  }


  // 🔸 Mettre à jour une séance
  updateSeance(id: string, seance: Partial<Seance>): Observable<ApiResponse<Seance>> {
    return this.http.patch<ApiResponse<Seance>>(`${this.apiUrl}/${id}`, seance);
  }

  // 🔸 Supprimer une séance
  deleteSeance(id: string): Observable<ApiResponse<Seance>> {
    return this.http.delete<ApiResponse<Seance>>(`${this.apiUrl}/${id}`);
  }

 
}
