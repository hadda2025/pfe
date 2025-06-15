import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // 
import { Room, RoomsService } from 'src/app/services/rooms.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ajouter-salle',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-salle.component.html',
  styleUrls: ['./ajouter-salle.component.scss'] // ✅ "styleUrls" au pluriel
})
export default class AjouterSalleComponent implements OnInit {

  roomForm!: FormGroup;

  disponibilites: string[] = [
    '🕘 Matin (08:00 - 12:00)',
    '🕒 Après-midi (13:00 - 17:00)',
    '📅 Toute la journée'
  ];

  blocs: string[] = [
    'Bloc A - RDC',
    'Bloc B - 1er étage',
    'Bloc C - 2e étage',
    'Bloc D - 3e étage'
  ];

  constructor(
    private fb: FormBuilder,
    private roomService: RoomsService,
    private router: Router // ✅ Correction ici
  ) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      nom: ['', Validators.required],
      capacite: [null, [Validators.required, Validators.min(1)]],
      disponibilite: ['', Validators.required],
      bloc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const nouvelleSalle = this.roomForm.value;

      this.roomService.createRoom(nouvelleSalle).subscribe({
        next: () => {
          alert('✅ Salle ajoutée avec succès !');
          this.router.navigate(['/component/liste-salles']); // ✅ Redirection
        },
        error: (error) => {
          console.error('❌ Erreur lors de l\'ajout de la salle :', error);
          alert('Une erreur est survenue lors de l\'ajout de la salle.');
        }
      });
    } else {
      this.roomForm.markAllAsTouched(); // ✅ Affiche les erreurs
    }
  }

  onCancel(): void {
    this.router.navigate(['/component/liste-salle']);
  }
}
