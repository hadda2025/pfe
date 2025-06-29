import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  message: string;
  status: number;
  data: T;
}

// Interface Student
export interface Student {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cin: string;
  role: string;
  adress: string;
  password: string;
  numInscription: Number;
  classeDepartement: string; // <--- AJOUTER CECI
     affecter?: boolean;   
  dateCreation: string;  
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) { }

  // Create student
  createStudent(student: Student): Observable<ApiResponse<Student>> {
    return this.http.post<ApiResponse<Student>>(this.apiUrl, student);
  }

  // Get all students
  getAllStudents(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(this.apiUrl);
  }

  // Get student by ID
  getStudentById(id: string): Observable<ApiResponse<Student>> {
    return this.http.get<ApiResponse<Student>>(`${this.apiUrl}/${id}`);
  }

  // Update student
  updateStudent(id: string, student: Student): Observable<ApiResponse<Student>> {
    return this.http.patch<ApiResponse<Student>>(`${this.apiUrl}/${id}`, student);
  }

  // Delete student
  deleteStudent(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${id}`);
  }
}
