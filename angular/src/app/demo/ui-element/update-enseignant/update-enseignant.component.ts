import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher, TeachersService } from 'src/app/services/teachers.service';


@Component({
  selector: 'app-update-enseignant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-enseignant.component.html',
  styleUrls: ['./update-enseignant.component.scss']
})
export default class UpdateEnseignantComponent implements OnInit {
  id!: string;
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teacherService: TeachersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Getting the ID of the teacher to be updated
    this.id = this.route.snapshot.params['id'];

    // Initializing the form group with validation
    this.userForm = this.fb.group({
      nom: ['', ],
      prenom: ['', ],
      adress: ['', ],
      email: ['', ],
      telephone: ['', ],
      classeDepartement: ['', ],
    
    });

    // Loading the teacher data to fill the form
    this.loadTeacherData();
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      // Creating the teacher object to be updated
      const newTeacher:any = {
        firstName: formValue.nom,
        lastName: formValue.prenom,
        role: "Teacher", // Always 'Teacher' based on the current form
        email: formValue.email,
        phone: formValue.telephone,
        classeDepartement: formValue.classeDepartement,
        password: "zzzzzzzzzzzzzzzzz", // peut être généré aléatoirement plus tard
        adress: formValue.adress,
        statut: formValue.statut,
        dateCreation: formValue.dateCreation // Make sure to convert the string date to Date object
      };

      // Calling the service to update the teacher
      this.teacherService.updateTeacher(this.id,newTeacher).subscribe({
        next: (res:any) => {
          console.log(res)

          alert('✅ Enseignant mis à jour avec succès.');
          this.router.navigate(['/component/liste-enseignant']); // Navigating after successful update
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          alert("❌ Échec de la mise à jour de l'enseignant.");
        }
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires.'); // Informing the user if the form is invalid
    }
  }

  // Method to load teacher data for the given ID
  private loadTeacherData(): void {
    this.teacherService.getTeacherById(this.id).subscribe({
      next: (response: any) => {
        const teacher = response.data;
        const formattedDate = teacher.dateCreation
          ? new Date(teacher.dateCreation).toISOString().substring(0, 10)
          : ''; // Formatting the date

        // Patching the form with existing data
        this.userForm.patchValue({
          nom: teacher.firstName,
          prenom: teacher.lastName,
          adress: teacher.adress,
          email: teacher.email,
          telephone: teacher.phone,
          classeDepartement: teacher.classeDepartement,
          statut: teacher.statut,
          dateCreation: formattedDate
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l\'enseignant :', err);
      }
    });
  }
}
