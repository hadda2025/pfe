import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}
export interface Room {
  _id: string;  
  nom: string;           // Nom de la salle (ex: "Salle A1")
  capacite: number;      // Capacité d'accueil de la salle (ex: 40)
  disponibilite: string; // Disponibilité de la salle (ex: "Matin (08:00 - 12:00)")
  bloc: string;          // Bloc ou étage de la salle (ex: "Bloc B - 2e étage")
 
}

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'http://localhost:3000/rooms';  // L'URL de ton API backend

  constructor(private http: HttpClient) {}

  // Créer une nouvelle salle
  createRoom(roomData: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, roomData);
  }

  // Récupérer toutes les salles
  getAllRooms(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiUrl);
  }

  // Récupérer une salle par son ID
  getRoomById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une salle
  updateRoom(id: string, roomData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, roomData);
  }

  // Supprimer une salle
  deleteRoom(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
