import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SujetFinEtudeService } from 'src/app/services/stages.service';

import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';


@Component({
  selector: 'app-update-stage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-stage.component.html',
  styleUrls: ['./update-stage.component.scss']
})
export default class UpdateStageComponent implements OnInit {
  id!: string;
  stageForm!: FormGroup;
  teachers: any[] = [];
  students: any[] = [];

  constructor(
    private ac: ActivatedRoute,
    private fb: FormBuilder,
    private sujetFinEtudeService: SujetFinEtudeService,
    private teacherService: TeachersService,
    private studentService: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];

    this.stageForm = this.fb.group({
      namesujet: ['', ],
      entreprise: ['', ],
       teacher: [''], // <-- attend un ID (string)
      encadrant_externe: [''],
     student1: [null,],
     student2: [null],

      DateD: ['',],
      DateF: ['', ]
    });

    this.loadTeachers();
    this.loadStudents();
    this.loadStageData();
  }

  private loadTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = response.data;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des enseignants", error);
      }
    });
  }

  private loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (response: any) => {
        this.students = response.data;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des étudiants", error);
      }
    });
  }

  private loadStageData(): void {
    this.sujetFinEtudeService.getSujetById(this.id).subscribe({
      next: (response: any) => {
        console.log(response.data)
        const stage = response.data;
        this.stageForm.patchValue({
          namesujet: stage.namesujet,
          entreprise: stage.entreprise,
       

          teacher: stage.teacher?._id || '', // <-- ID attendu
      encadrant_externe: stage.encadrant_externe,
      student1: stage.student?.[0]?._id || '', // <-- ID attendu
      student2: stage.student?.[1]?._id || '',
        
       
         
          DateD: stage.DateD,
          DateF: stage.DateF
        });
      },
      error: (err:any) => {
        console.error("Erreur lors du chargement du stage", err);
      }
    });
  }

  onSubmit(): void {
    if (this.stageForm.valid) {
      const updatedStage = this.stageForm.value;

      this.sujetFinEtudeService.updateSujet(this.id, updatedStage).subscribe({
        next: (response:any) => {
          console.log('Stage mis à jour avec succès:', response.data);
          this.router.navigate(['/component/liste-stage']);
        },
        error: (error:any) => {
          console.error("Erreur lors de la mise à jour du stage", error);
        }
      });
    }
  }
}
