import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import du Router
import { PlageDate, PlageDatesService } from 'src/app/services/date.service';

@Component({
  selector: 'app-ajouter-date',
  standalone: true,
   imports: [ ReactiveFormsModule,CommonModule],
  templateUrl: './ajouter-date.component.html',
  styleUrls: ['./ajouter-date.component.scss']
})
export  default class AjouterDateComponent implements OnInit {
  plageDateForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,  // 'router' commence par une minuscule
    private fb: FormBuilder,
    private plageDatesService: PlageDatesService
  ) {}

  ngOnInit(): void {
    this.plageDateForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  
  onSubmit(): void {
    if (this.plageDateForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    const newDate: PlageDate = this.plageDateForm.value;

    this.plageDatesService.createPlageDate(newDate).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.plageDateForm.reset();

        // Redirection vers la page des listes de dates après une soumission réussie
        this.router.navigate(['/component/liste-dates']);
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Erreur lors de l\'ajout';
        this.successMessage = '';
      }
    });
  }
}
