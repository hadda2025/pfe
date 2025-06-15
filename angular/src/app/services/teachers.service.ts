import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

export interface Teacher {
  _id: string;
  firstName: string;           // Prénom de l'enseignant
  lastName: string;            // Nom de l'enseignant
  email: string;               // Email de l'enseignant
  phone: string;               // Numéro de téléphone
  role: string;                // Rôle de l'enseignant (ex: "Teacher")
  classeDepartement: string;          // Département ou classe
  adress: string;             // Adresse de l'enseignant
  dateCreation: Date;          // Date de création du compte de l'enseignant
  statut: string;              // Statut de l'enseignant (ex: "Active")
  matricule: string;           // Matricule unique de l'enseignant (ex: MAT20250419)
  password:string; 
}

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'http://localhost:3000/teachers';  

  constructor(private http: HttpClient) {}

  // Créer un enseignant
  createTeacher(teacher: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, teacher);
  }

  // Récupérer tous les enseignants
  getAllTeachers(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiUrl);
  }

  // Récupérer un enseignant par ID
  getTeacherById(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un enseignant
  updateTeacher(id: string, teacher: any): Observable<ApiResponse<any>> {
    return this.http.patch<ApiResponse<any>>(`${this.apiUrl}/${id}`, teacher);
  }

  // Supprimer un enseignant
  deleteTeacher(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
