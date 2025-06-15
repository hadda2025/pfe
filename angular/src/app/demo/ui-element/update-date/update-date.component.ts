import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlageDate, PlageDatesService } from 'src/app/services/date.service';

@Component({
  selector: 'app-update-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './update-date.component.html',
  styleUrls: ['./update-date.component.scss']
})
export default class UpdateDateComponent implements OnInit {
  id!: string;
  plageDateForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private ac: ActivatedRoute,
    private fb: FormBuilder,
    private plageDatesService: PlageDatesService,
  public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];

    this.plageDateForm = this.fb.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });

    this.loadDateData();
  }

  private loadDateData(): void {
    this.plageDatesService.getPlageDateById(this.id).subscribe({
      next: (response: any) => {
        const dateData = response.data;

        this.plageDateForm.patchValue({
          dateDebut: dateData.dateDebut?.substring(0, 10),
          dateFin: dateData.dateFin?.substring(0, 10)
        });
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement de la plage de date';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.plageDateForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement les champs';
      return;
    }

    const updatedDate: PlageDate = this.plageDateForm.value;

    this.plageDatesService.updatePlageDate(this.id, updatedDate).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Mise à jour réussie';
        this.errorMessage = '';
        this.router.navigate(['/component/liste-dates']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Erreur lors de la mise à jour';
        this.successMessage = '';
      }
    });
  }
}
