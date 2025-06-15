import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-update-jury',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-jury.component.html',
  styleUrls: ['./update-jury.component.scss']
})
export default class UpdateJuryComponent implements OnInit {
  sujetId!: string;
  juryForm!: FormGroup;

  teachers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sujetService: SujetFinEtudeService,
    private teachersService: TeachersService
  ) {
     this.sujetId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
 

    this.juryForm = this.fb.group({
      president: [''],
      rapporteur: [''],
      examinateur: ['']
    });

    this.loadSujet();
    this.loadTeachers();
  }
sujet!:any
  private loadSujet(): void {
    this.sujetService.getSujetById(this.sujetId).subscribe({
      next: (response) => {
       this. sujet = response.data;
        console.log(response.data)
        this.juryForm.patchValue({
          president: this.sujet.president?._id || '',
          rapporteur: this.sujet.rapporteur?._id || '',
          examinateur: this.sujet.examinateur?._id || ''
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du sujet :', error);
      }
    });
  }

 
  private loadTeachers(): void {
    this.teachersService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = response.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des enseignants :', error);
      }
    });
  }

  get filteredPresidents() {
    const rapporteurId = this.juryForm.get('rapporteur')?.value;
    const examinateurId = this.juryForm.get('examinateur')?.value;
    return this.teachers.filter(t => t._id !== rapporteurId && t._id !== examinateurId);
  }

  get filteredRapporteurs() {
    const presidentId = this.juryForm.get('president')?.value;
    const examinateurId = this.juryForm.get('examinateur')?.value;
    return this.teachers.filter(t => t._id !== presidentId && t._id !== examinateurId);
  }

  get filteredExaminateurs() {
    const presidentId = this.juryForm.get('president')?.value;
    const rapporteurId = this.juryForm.get('rapporteur')?.value;
    return this.teachers.filter(t => t._id !== presidentId && t._id !== rapporteurId);
  }

  onSubmit(): void {
    if (this.juryForm.valid) {
      const juryData = {
        president: this.juryForm.value.president,
        rapporteur: this.juryForm.value.rapporteur,
        examinateur: this.juryForm.value.examinateur
      };

      this.sujetService.updateSujet(this.sujetId, juryData).subscribe({
        next: (res:any) => {
          console.log(res)
          console.log('Jury mis à jour avec succès');
          this.router.navigate(['/component/liste-Affectation-jury']);
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du jury :', err);
        }
      });
    }
  }
}
