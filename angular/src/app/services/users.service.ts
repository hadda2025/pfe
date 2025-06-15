import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  message: string;
  data: T;
  status?: number; // Optionnel si ton backend ne renvoie pas ce champ
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: 'Admin' | 'Agent' | 'Encadrant' | 'Etudiant' | string;
  classeDepartement?: string;
  adress?: string;
  dateCreation?: string;
  statut?: string;
  cin?: string;
  password?: string;
  soutenance?: any[];
  createdAt?: string;
  updatedAt?: string;
  refreshToken?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // ✅ Créer un utilisateur générique
  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user);
  }

  // ✅ Créer un agent
  createAgent(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/create-agent`, user);
  }

  // ✅ Récupérer tous les utilisateurs
  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl);
  }

  // ✅ Récupérer un utilisateur par ID
  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`);
  }

  // ✅ Rechercher un utilisateur par email
  getUserByEmail(email: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/find/email?email=${email}`);
  }

  // ✅ Rechercher des utilisateurs par rôle
  getUsersByRole(role: string): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/find/role?role=${role}`);
  }

  // ✅ Mettre à jour un utilisateur
  updateUser(id: string, user: Partial<User>): Observable<ApiResponse<User>> {
    return this.http.patch<ApiResponse<User>>(`${this.apiUrl}/${id}`, user);
  }

  // ✅ Supprimer un utilisateur
  deleteUser(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
