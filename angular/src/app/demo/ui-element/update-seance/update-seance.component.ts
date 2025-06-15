import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seance, SeanceService } from 'src/app/services/seances.service';

@Component({
  selector: 'app-update-seance',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-seance.component.html',
  styleUrls: ['./update-seance.component.scss']
})
export default class UpdateSeanceComponent implements OnInit {
  id!: string;
  seanceForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
   loading = false;  // Propriété pour gérer l'état de chargement
  existingSeances: Seance[] = [];  // Stocker les séances existantes



  constructor(
    private ac: ActivatedRoute,
    private fb: FormBuilder,
    private seanceService: SeanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];

    this.seanceForm = this.fb.group({
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required]
    });

    this.loadSeanceData();
    this.loadExistingSeances();  // Charger toutes les séances existantes
  }

  private loadSeanceData(): void {
    this.seanceService.getSeanceById(this.id).subscribe({
      next: (response) => {
        const seance = response.data;
        this.seanceForm.patchValue({
          heureDebut: seance.heureDebut,
          heureFin: seance.heureFin
        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement de la séance", err);
        this.errorMessage = 'Erreur lors du chargement de la séance.';
      }
    });
  }

  private loadExistingSeances(): void {
    this.seanceService.getAllSeances().subscribe({
      next: (res) => {
        this.existingSeances = res.data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des séances existantes", err);
      }
    });
  }

  onSubmit(): void {
    if (this.seanceForm.valid) {
      const updatedSeance: Seance = this.seanceForm.value;

      // Vérifier les conflits avec les séances existantes
      const newStart = this.toMinutes(updatedSeance.heureDebut);
      const newEnd = this.toMinutes(updatedSeance.heureFin);

      for (const s of this.existingSeances) {
        // On évite de comparer la séance actuelle qui est en cours de modification
        if (s._id !== this.id) {
          const existingStart = this.toMinutes(s.heureDebut);
          const existingEnd = this.toMinutes(s.heureFin);

          // Vérifier le chevauchement + pause de 15 minutes
          if (newStart < existingEnd + 15 && newEnd > existingStart) {
            this.errorMessage = `Conflit avec une séance existante (${s.heureDebut} - ${s.heureFin}). Une pause de 15 minutes est requise.`;
            this.successMessage = '';
            return;
          }
        }
      }

      // Si aucune erreur, procéder à la mise à jour de la séance
      this.seanceService.updateSeance(this.id, updatedSeance).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.router.navigate(['/component/liste-seance']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur lors de la mise à jour.';
          this.successMessage = '';
        }
      });
    }
  }

  /**
   * Convertit une heure au format "HH:mm" en minutes.
   */
  private toMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
