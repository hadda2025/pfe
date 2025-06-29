import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

// ✅ Validateur personnalisé placé EN DEHORS de la classe
export const dateRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const start = group.get('DateD')?.value;
  const end = group.get('DateF')?.value;

  if (start && end && new Date(start) >= new Date(end)) {
    return { dateRangeInvalid: true };
  }

  return null;
};

@Component({
  selector: 'app-ajouter-stage',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './ajouter-stage.component.html',
})
export default class AjouterStageComponent implements OnInit {
  stageForm!: FormGroup;
  teachers: any[] = [];
  students: any[] = [];
  selectedStudent1Id: string | null = null;
selectedStudent2Id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private stageService: SujetFinEtudeService,
    private teacherService: TeachersService,
    private studentService: StudentsService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.stageForm = this.fb.group(
      {
        namesujet: ['', Validators.required],
        entreprise: ['', Validators.required],
        teacher: ['', Validators.required],
        encadrant_externe: [''],
        student1: ['', Validators.required],
        student2: [''],
        DateD: ['', Validators.required],
        DateF: ['', Validators.required],
      },
      { validators: dateRangeValidator } // ✅ Ici le validateur est appliqué au groupe
    );

    this.getAllTeachers();
    this.getAllStudents();

    this.stageForm.get('DateD')?.valueChanges.subscribe(() => {
      this.stageForm.updateValueAndValidity();
    });
    this.stageForm.get('DateF')?.valueChanges.subscribe(() => {
      this.stageForm.updateValueAndValidity();
    });

     this.stageForm.get('student1')?.valueChanges.subscribe((student: any) => {
    this.selectedStudent1Id = student?._id || null;
  });

  this.stageForm.get('student2')?.valueChanges.subscribe((student: any) => {
    this.selectedStudent2Id = student?._id || null;
  });
  }

  getAllTeachers(): void {
    this.teacherService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des enseignants', error);
      },
    });
  }


 getAllStudents(): void {
  this.studentService.getAllStudents().subscribe({
    next: (response: any) => {
      // ✅ Filtrer uniquement ceux qui ont affecter = false
      this.students = response.data.filter((student: any) => student.affecter === false);
    },
    error: (error) => {
      console.error('Erreur lors de la récupération des étudiants', error);
    },
  });
}


  onSubmit(): void {
    if (this.stageForm.invalid) {
      this.stageForm.markAllAsTouched();
      return;
    }

    const etudiant1 = this.stageForm.value.student1;
    const etudiant2 = this.stageForm.value.student2;

    //const studentIds = [etudiant1, etudiant2].map((s: any) => s._id);
    const studentIds = [etudiant1, etudiant2]
  .filter(s => s !== null && s !== undefined)
  .map((s: any) => s._id);

    const stageData = {
      ...this.stageForm.value,
      student: studentIds,
    };

    this.stageService.createSujet(stageData).subscribe({
      next: () => {
      
        this.toastr.success("sujet ajouté avec succés.")
        this.router.navigate(['./component/liste-stage']);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout du stage", err);
        alert("Échec de l'ajout du stage.");
      },
    });
  }
}
