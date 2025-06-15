import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-affectation-jury',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './affectation-jury.component.html',
  styleUrls: ['./affectation-jury.component.scss']
})
export default class AffectationJuryComponent implements OnInit {
  form!: FormGroup;

  sujets: any[] = [];
  students: any[] = [];
  teachers: any[] = [];

  alertMessage: string | null = null;
  examinateurName: string = '';
  examinateurId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sujetService: SujetFinEtudeService,
    private teachersService: TeachersService,
    private errorService: ErrorService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSujets();
    this.loadTeachers();

    this.errorService.errorMessage$.subscribe(msg => {
      if (msg) {
        this.toastr.error(msg, 'Erreur');
        this.alertMessage = msg;
      }
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      sujetfinetude: ['', Validators.required],
      president: ['', Validators.required],
      rapporteur: ['', Validators.required],
      examinateur: ['', Validators.required]  // Masqué mais requis
    });
  }

  loadSujets(): void {
    this.sujetService.getAllSujets().subscribe({
      next: res => this.sujets = res.data || [],
      error: err => {
        console.error('Erreur chargement sujets :', err);
        this.toastr.error("Erreur de chargement des sujets.");
      }
    });
  }

  loadTeachers(): void {
    this.teachersService.getAllTeachers().subscribe({
      next: (res: any) => this.teachers = res.data || [],
      error: err => {
        console.error('Erreur chargement enseignants :', err);
        this.toastr.error("Erreur de chargement des enseignants.");
      }
    });
  }

  onSujetSelect(): void {
    const sujetId = this.form.get('sujetfinetude')?.value;
    if (sujetId) {
      this.sujetService.getSujetById(sujetId).subscribe({
        next: (res: any) => {
          const sujet = res.data;
          this.students = sujet.student || [];

          const examinateur = sujet.teacher;
          this.examinateurId = examinateur?._id || '';
          this.examinateurName = `${examinateur?.firstName || ''} ${examinateur?.lastName || ''}`;
          this.form.patchValue({ examinateur: this.examinateurId });
        },
        error: err => {
          console.error('Erreur chargement sujet par ID :', err);
          this.toastr.error("Erreur de chargement du sujet sélectionné.");
        }
      });
    } else {
      this.students = [];
      this.examinateurId = '';
      this.examinateurName = '';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { president, rapporteur, examinateur, sujetfinetude } = this.form.value;

    this.teachersService.getAllTeachers().subscribe({
      next: (res: any) => {
        const teachers = res.data;

        const conflitsEnseignants = teachers.filter((teacher: any) =>
          [teacher.president?._id, teacher.rapporteur?._id, teacher.examinateur?._id].includes(president) ||
          [teacher.president?._id, teacher.rapporteur?._id, teacher.examinateur?._id].includes(rapporteur) ||
          [teacher.president?._id, teacher.rapporteur?._id, teacher.examinateur?._id].includes(examinateur)
        );

        if (conflitsEnseignants.length > 0) {
          const msg = "Conflit de planning : un ou plusieurs enseignants sont déjà planifiés.";
          this.toastr.error(msg, 'Erreur');
          this.alertMessage = msg;
          return;
        }

        this.sujetService.affecterJury(sujetfinetude, president, rapporteur, examinateur).subscribe({
          next: () => {
            const msg = 'Enseignants affectés avec succès';
            this.toastr.success(msg, 'Succès');
            this.alertMessage = msg;
            this.goToListe();
          },
          error: () => {
            const msg = "Erreur lors de l'affectation.";
            this.toastr.error(msg, 'Erreur');
            this.alertMessage = msg;
          }
        });
      },
      error: () => {
        const msg = "Erreur lors du chargement des enseignants.";
        this.toastr.error(msg, 'Erreur');
        this.alertMessage = msg;
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['/component/liste-Affectation-jury']);
  }

  get filteredPresidents() {
    const rapporteurId = this.form.get('rapporteur')?.value;
    const examinateurId = this.form.get('examinateur')?.value;
    return this.teachers.filter(t => t._id !== rapporteurId && t._id !== examinateurId);
  }

  get filteredRapporteurs() {
    const presidentId = this.form.get('president')?.value;
    const examinateurId = this.form.get('examinateur')?.value;
    return this.teachers.filter(t => t._id !== presidentId && t._id !== examinateurId);
  }
}
