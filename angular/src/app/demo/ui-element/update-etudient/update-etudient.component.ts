import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-update-etudient',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-etudient.component.html',
  styleUrls: ['./update-etudient.component.scss']
})
export default class UpdateEtudientComponent implements OnInit {
  id!: string;
  userForm!: FormGroup;

  constructor(
    private ac: ActivatedRoute,
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];

    this.userForm = this.fb.group({
      nom: [''],
      prenom: [''],
      adress: [''],
      email: [''],
      telephone: [''],
      numInscription: [''],
      cin: [''],
      classeDepartement: [''],
      parcours: [''],
      dateCreation: ['']
    });

    this.loadStudentData();
  }

  private loadStudentData(): void {
    this.studentsService.getStudentById(this.id).subscribe({
      next: (response: any) => {
        const student = response.data;
        console.log('Étudiant récupéré :', student); // pour déboguer

        const formattedDate = student.createdAt
          ? new Date(student.createdAt).toISOString().substring(0, 10)
          : '';

        this.userForm.patchValue({
          nom: student.firstName ?? '',
          prenom: student.lastName ?? '',
          adress: student.adress ?? '',
          email: student.email ?? '',
          telephone: student.phone ?? '',
          numInscription: student.numInscription ?? '',
          cin: student.cin ?? '',
          classeDepartement: student.classeDepartement ?? '',
          parcours: student.parcours ?? '',
          dateCreation: formattedDate
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement de l'étudiant", err);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const newStudent: any = {
        firstName: formValue.nom,
        lastName: formValue.prenom,
        email: formValue.email,
        phone: formValue.telephone,
        cin: formValue.cin,
        role: 'Student',
        adress: formValue.adress,
        password: 'zzzzzzzzzzzzzzzzz',
        numInscription: formValue.numInscription,
        classeDepartement: formValue.classeDepartement,
        parcours: formValue.parcours,
        dateCreation: formValue.dateCreation
      };

      this.studentsService.updateStudent(this.id, newStudent).subscribe({
        next: (response) => {
          console.log('Étudiant mis à jour avec succès:', response.data);
          this.router.navigate(['/component/liste-etudiant']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de l\'étudiant', error);
        }
      });
    }
  }
}
