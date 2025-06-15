import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export  default class UpdatePasswordComponent implements OnInit {

    userString: any = localStorage.getItem("user"); // Récupère les infos utilisateur
  user: any = this.userString ? JSON.parse(this.userString) : null; // Parse les données
  userId: any = this.user ? this.user.id : null;
  client:any;


  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private clientservice: UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
     
    });
  }
  ngOnInit(): void {
     this.getClientById();
    throw new Error('Method not implemented.');
   
  }
getClientById(): void {
  console.log(this.userId)
    this.clientservice.getUserById((this.userId)).subscribe(
      (data) => {
        this.client = data.data;
        console.log('Client récupéré:', this.client);
      },
      (error) => {
        console.error('Erreur lors de la récupération du client:', error);
      }
    );
  }
  login(): void {
  if (this.loginForm.valid) {
    this.authService.resetPassword(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        // Afficher le snack bar pendant 2 minutes
        this.snackBar.open('Vérifiez votre email pour consulter le nouveau mot de passe.', '', {
          duration: 7000, // 2 minutes
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-succes']
        });

        // Redirection après 2 minutes
        setTimeout(() => {
          this.router.navigate(['/auth/signin']);
        }, 7000);
      },
      error: () => {
        this.snackBar.open('Email incorrect', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}