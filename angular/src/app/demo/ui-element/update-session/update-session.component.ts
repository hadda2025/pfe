import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service'; // Assure-toi que ce service est importé


@Component({
  selector: 'app-update-session',
  standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-session.component.html',
  styleUrls: ['./update-session.component.scss']
})
export default class UpdateSessionComponent implements OnInit {
  
  sessionForm!: FormGroup;
  sessionId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private sessionService: SessionsService,
    private router: Router
  ) {
    this.sessionId = this.route.snapshot.paramMap.get('id')!; // Récupère l'ID de la session depuis la route
  }

  ngOnInit(): void {
    this.sessionForm = this.fb.group({
      namesession: ['', Validators.required],
      Filiere: ['', Validators.required],
      dateD: ['', Validators.required],
      dateF: ['', Validators.required],
    });

    // Charger les données de la session
    this.loadSessionData();
  }

  loadSessionData(): void {
    this.sessionService.getSessionById(this.sessionId).subscribe({
      next: (response: any) => {
        const session = response.data;
        this.sessionForm.patchValue({
          namesession: session.namesession,
          Filiere: session.Filiere,
          dateD: session.dateD.split('T')[0], // Formatage de la date si nécessaire
          dateF: session.dateF.split('T')[0], // Formatage de la date si nécessaire
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la session', error);
      }
    });
  }

  onSubmit(): void {
    if (this.sessionForm.valid) {
      const updatedSession = this.sessionForm.value;

      this.sessionService.updateSession(this.sessionId, updatedSession).subscribe({
        next: (response: any) => {
          console.log('Session mise à jour avec succès:', response.data);
          this.router.navigate(['component/liste-sessions']); // Redirige vers la liste des sessions après la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la session', error);
        }
      });
    } else {
      this.sessionForm.markAllAsTouched();
    }
  }
}
