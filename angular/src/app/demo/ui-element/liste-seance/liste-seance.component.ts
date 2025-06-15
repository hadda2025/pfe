import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SeanceService, Seance } from 'src/app/services/seances.service';

import { RoomsService } from 'src/app/services/rooms.service';
import { PlageDatesService } from 'src/app/services/date.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-seance',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './liste-seance.component.html',
  styleUrls: ['./liste-seance.component.scss']
})
export default class ListeSeanceComponent implements OnInit {
seances: any[] = [];
  /* salles: any[] = [];
  plagesDates: any[] = []; */
  errorMessage = '';
  salleService: any;

  constructor(
    private seanceService: SeanceService,
    private roomService: RoomsService,
    private plageDatesService: PlageDatesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSeances();
  /*   this.getSalles();
    this.loadPlagesDates(); */
  }

  // Récupérer les séances
  getSeances(): void {
    this.seanceService.getAllSeances().subscribe({
      next: (res) => {
        this.seances = res.data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des séances.';
      }
    });
  }

 /*  // Récupérer les salles
  getSalles(): void {
    this.roomService.getAllRooms().subscribe({
      next: (res:any) => {
        this.salles = res.data;
      },
      error: (err:any) => {
        this.errorMessage = err.error?.message || 'Erreur lors du chargement des salles.';
      }
    });
  }

  // Récupérer les plages de dates
 
  loadPlagesDates(): void {
    this.plageDatesService.getAllPlageDates().subscribe({
      next: (res: any) => {
        this.plagesDates = res.data;
      },
      error: (err: any) => {
        console.error("Erreur chargement plages de dates :", err);
      }
    });
  } */

  // Modifier une séance
  editSeance(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/component/update-seance', id]);
    }
  }

  // Supprimer une séance
  deleteSeance(id: string | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette séance ?')) {
      this.seanceService.deleteSeance(id).subscribe({
        next: () => this.getSeances(), // recharger la liste après suppression
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur lors de la suppression.';
        }
      });
    }
  }
}
