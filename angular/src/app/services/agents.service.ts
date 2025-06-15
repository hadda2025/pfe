import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface de réponse générique
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

// Interface Agent
export interface Agent {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  adress: string;
  password: string;
  cin: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private apiUrl = 'http://localhost:3000/agents'; // URL backend agents

  constructor(private http: HttpClient) { }

  // Créer un agent
  createAgent(agent: Agent): Observable<ApiResponse<Agent>> {
    return this.http.post<ApiResponse<Agent>>(this.apiUrl, agent);
  }

  // Récupérer tous les agents
  getAllAgents(): Observable<ApiResponse<Agent[]>> {
    return this.http.get<ApiResponse<Agent[]>>(this.apiUrl);
  }

  // Récupérer un agent par ID
  getAgentById(id: string): Observable<ApiResponse<Agent>> {
    return this.http.get<ApiResponse<Agent>>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un agent
  updateAgent(id: string, agent: Agent): Observable<ApiResponse<Agent>> {
    return this.http.patch<ApiResponse<Agent>>(`${this.apiUrl}/${id}`, agent);
  }

  // Supprimer un agent
  deleteAgent(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
