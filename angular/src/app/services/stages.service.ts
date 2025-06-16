import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

// Interface générique pour toutes les réponses API
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

// Interface pour le modèle Sujet de Fin d'Études
export interface SujetFinEtude {
_id?:string ;
  namesujet: string;
  entreprise: string;
  DateD: string; // exemple: "2025-02-01"
  DateF: string; // exemple: "2025-06-30"
  encadrant_externe: string;
  student: string; // ou objet si peuplé
  teacher: string;
   president?: any;
  rapporteur?: any;
  examinateur?: any; // ou objet si peuplé
}

@Injectable({
  providedIn: 'root'
})
export class SujetFinEtudeService {
  private apiUrl = 'http://localhost:3000/sujetfinetudes';

  constructor(private http: HttpClient) {}

  // Créer un sujet
  createSujet(sujet: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, sujet);
  }

  // Récupérer tous les sujets
  getAllSujets(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiUrl);
  }

   getAlllistSujets(): Observable<ApiResponse<any>> {
  return this.http.get<ApiResponse<any>>(`${this.apiUrl}/all`);
}

  // Récupérer un sujet par ID
  getSujetById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un sujet
  updateSujet(id: string, sujet: any): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, sujet);
  }

  // Supprimer un sujet
  deleteSujet(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
  // ✅ Affecter un jury à un sujet
  affecterJury(
    id: string,
    presidentId: string,
    rapporteurId: string,
    examinateurId: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/affecter-jury`, {
      presidentId,
      rapporteurId,
      examinateurId,
    }).pipe(
      catchError(this.handleError)
    );
  }
   // 🔧 Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    const message =
      error.error?.message || 'Une erreur est survenue, veuillez réessayer.';
    return throwError(() => new Error(message));
  }

  
   getAllJury(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jury`);
  }
}

