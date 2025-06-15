import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface pour la réponse API générique
export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

// Interface Document
export interface Document {
  
  name: string;
  type: string;
  fileUrl: string;         // juste le nom du fichier (ex: "1746274692737-avantage.docx")
  
}

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiUrl = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) { }

  // Upload et création d’un document
  createDocument(formData: FormData): Observable<ApiResponse<Document>> {
    return this.http.post<ApiResponse<Document>>(this.apiUrl, formData);
  }

  // Obtenir tous les documents
  getAllDocuments(): Observable<ApiResponse<Document[]>> {
    return this.http.get<ApiResponse<Document[]>>(this.apiUrl);
  }

  // Obtenir un document par ID
  getDocumentById(id: string): Observable<ApiResponse<Document>> {
    return this.http.get<ApiResponse<Document>>(`${this.apiUrl}/${id}`);
  }

  // Mise à jour d’un document (avec fichier)
  updateDocument(id: string, formData: FormData): Observable<ApiResponse<Document>> {
    return this.http.patch<ApiResponse<Document>>(`${this.apiUrl}/${id}`, formData);
  }

  // Suppression d’un document
  deleteDocument(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
