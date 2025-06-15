import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService, User } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-user',
  imports:[ReactiveFormsModule,],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export  default class UpdateUserComponent implements OnInit {
  userId!: string;
  userForm: FormGroup;

  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      firstName: ['',],
      lastName: ['', ],
      email: ['', ],
      phone: ['', ],
      adress: ['',],
      password: ['', ],
      cin: ['', ],

    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.getUserById(id);
    }
  }

  getUserById(id: string): void {
    this.userService.getUserById(id).subscribe({
      next: (response) => {
        const user = response.data;
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          adress: user.adress,
          password: user.password,
          cin: user.cin,
        
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const updatedUser: Partial<User> = this.userForm.value;
      this.userService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          console.log('Utilisateur mis à jour avec succès');
          this.router.navigate(['/users']); // ou autre route après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l’utilisateur :', error);
        }
      });
    } else {
      console.warn('Formulaire invalide');
    }
  }
}
