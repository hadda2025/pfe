import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export  default class ChangePasswordComponent implements OnInit {

    userString: any = localStorage.getItem('user'); // Récupère les infos utilisateur
  user: any = this.userString ? JSON.parse(this.userString) : null; // Parse les données
  userId: any = this.user ? this.user._id : null;
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
      password: ['', [Validators.required,]],
     
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
        console.log('client récupéré:', this.client);
      },
      (error) => {
        console.error('Erreur lors de la récupération du client:', error);
      }
    );
  }
  login(): void {
  if (this.loginForm.valid) {
    this.authService.changepassword(this.userId,this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);

        // Afficher le snack bar pendant 2 minutes
        this.snackBar.open('Vérifiez votre email pour consulter le nouveau mot de passe.', '', {
  duration: 5000,
  panelClass: ['snackbar-succes', 'custom-snackbar-position'], // Ajoute les deux classes
  horizontalPosition: undefined, // Ne pas utiliser les positions prédéfinies
  verticalPosition: undefined
        });

        // Redirection après 2 minutes
        setTimeout(() => {
          this.router.navigate(['/analytics']);
        }, 7000);
      },
      error: () => {
        this.snackBar.open('Email incorrect', '', {
           duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snackbar-succes']
        });
      }
    });
  } else {
    this.loginForm.markAllAsTouched();
  }
}
}