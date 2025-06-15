import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorSubject.asObservable();

  handleError(error: { message: string }) {
    this.errorSubject.next(error.message);
    console.error(error.message);
    setTimeout(() => this.clearError(), 5000); // Disparaît après 5 secondes
  }

  clearError() {
    this.errorSubject.next(null);
  }
}
