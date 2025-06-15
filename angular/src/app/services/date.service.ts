import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

 export interface PlageDate {
  _id?: string;
  dateDebut: string; // Format attendu : 'dd/mm/yyyy' ou ISO
  dateFin: string;
  
}

export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}


@Injectable({
  providedIn: 'root'
})
export class PlageDatesService {
  private apiUrl = 'http://localhost:3000/plage-dates'; // Adresse du contrôleur NestJS

  constructor(private http: HttpClient) {}

  // Créer une nouvelle plage de date
  createPlageDate(dateData: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, dateData);
  }

  // Récupérer toutes les plages de dates
  getAllPlageDates(): Observable<ApiResponse<PlageDate[]>> {
    return this.http.get<ApiResponse<PlageDate[]>>(this.apiUrl);
  }

  // Récupérer une plage par ID
  getPlageDateById(id: string): Observable<ApiResponse<PlageDate>> {
    return this.http.get<ApiResponse<PlageDate>>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une plage de date
  updatePlageDate(id: string, dateData: PlageDate): Observable<ApiResponse<PlageDate>> {
    return this.http.patch<ApiResponse<PlageDate>>(`${this.apiUrl}/${id}`, dateData);
  }

  // Supprimer une plage de date
  deletePlageDate(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
