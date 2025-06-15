import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-profil',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss']
})
export default class UpdateProfilComponent implements OnInit {

  user: any = JSON.parse(localStorage.getItem("user") || '{}');
  userId: string = this.user?._id || '';

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userservice: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      firstName: ['', ],
      lastName: ['', ],
      phone: ['',],
      adress: ['', ],
      cin: ['', ]
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.userservice.getUserById(this.userId).subscribe({
        next: (data: any) => {
          console.log(data.data)
          this.loginForm.patchValue({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            phone: data.data.phone,
            adress: data.data.adress,
            cin: data.data.cin
          });
        },
        error: () => {
          this.snackBar.open("Erreur lors du chargement du profil", '', {
            duration: 3000
          });
        }
      });
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.userservice.updateUser(this.userId, this.loginForm.value).subscribe({
        next: (response: any) => {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.snackBar.open('Profil mis à jour avec succès', '', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.router.navigate(['/analytics']);
        },
        error: () => {
          this.snackBar.open('Erreur lors de la mise à jour', '', {
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
