import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ajouter-stage',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './ajouter-stage.component.html',
  //styleUrls: ['./ajouter-stage.component.css']
})
export default class AjouterStageComponent implements OnInit {

  stageForm!: FormGroup;
  teachers: any[] = [];
  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private stageService: SujetFinEtudeService ,
    private teacherService: TeachersService,
    private studentService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stageForm = this.fb.group({
      namesujet: ['', Validators.required],
      entreprise: ['', Validators.required],
      teacher: ['', Validators.required],
      encadrant_externe: [''],
    student1: ['', Validators.required],  // ← ici l'étudiant 1 est requis
     student2: [''],
      DateD: ['', Validators.required],
      DateF: ['', Validators.required]
    });

    this.getAllTeachers();
    this.getAllStudents();
  }

  getAllTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des enseignants', error);
      }
    });
  }

  getAllStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        this.students = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des étudiants', error);
      }
    });
  }

  onSubmit(): void {
    if (this.stageForm.invalid) {
      this.stageForm.markAllAsTouched();
      return;
    }

     // Récupérer les deux étudiants sélectionnés
  const etudiant1 = this.stageForm.value.student1;
  const etudiant2 = this.stageForm.value.student2;

  // Créer un tableau des _id des étudiants
  const studentIds = [etudiant1, etudiant2].map((s: any) => s._id);
    // Extraction des _id des étudiants sélectionnés
    const stageData = {
      ...this.stageForm.value,
      student: studentIds // Conversion des objets en leurs _id
    };

    // Envoi de la requête pour ajouter le stage
    this.stageService.createSujet(stageData).subscribe({
      next: () => {
        alert('Stage ajouté avec succès.');
        this.router.navigate(['./component/liste-stage']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du stage', err);
        alert('Échec de l\'ajout du stage.');
      }
    });
  }
}
