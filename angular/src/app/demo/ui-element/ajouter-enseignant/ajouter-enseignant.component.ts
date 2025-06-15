import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher, TeachersService } from 'src/app/services/teachers.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-enseignant',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-enseignant.component.html',
  styleUrls: ['./ajouter-enseignant.component.scss']
})
export default class AjouterEnseignantComponent implements OnInit {

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teachersService: TeachersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], // Tunisian phone number format
      classeDepartement: ['', Validators.required],
      adress: ['', Validators.required],
      
      dateCreation: ['', Validators.required]
     
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      
      // Map form values to Teacher object
      const newTeacher:any = {
        firstName: formValue.nom,
        lastName: formValue.prenom,
        role: "Teacher", // Always 'Teacher' based on the current form
        email: formValue.email,
        phone: formValue.telephone,
        classeDepartement: formValue.classeDepartement,
        password: "zzzzzzzzzzzzzzzzz", // peut être généré aléatoirement plus tard
        adress: formValue.adress,
       
        dateCreation: new Date(formValue.dateCreation) // Make sure to convert the string date to Date object
      };

      // Call service to create the teacher
      this.teachersService.createTeacher(newTeacher).subscribe({
        next: (response) => {
          console.log('Enseignant ajouté avec succès:', response);
          // Uncomment the following line if you want to redirect after success
           this.router.navigate(['component/liste-enseignant']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'enseignant', error);
        }
      });
    } else {
      this.userForm.markAllAsTouched(); // Mark all form fields as touched to show validation messages
    }
  }

  onCancel(): void {
    this.router.navigate(['/component/liste-enseignant']); // Navigate to the list of teachers on cancel
  }
}
