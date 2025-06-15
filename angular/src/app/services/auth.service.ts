import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // remplace par ton vrai URL backend

  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload);
  }
  changepassword(userId: string, data: any): Observable<any> {
  return this.http.patch(`http://localhost:3000/auth/updatepassword/${userId}`, data);
}
  resetPassword(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/resetpassword`, payload);
  }
  updateProfil(id:string,payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateProfile/${id}`, payload);
  }
   // changepassword(id:string,payload: any): Observable<any> {
   // return this.http.post(`${this.apiUrl}/updatepassword/${id}`, payload);
 // }
  

}
