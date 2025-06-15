import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlageDate, PlageDatesService } from 'src/app/services/date.service';  // Assurez-vous d'importer le service correctement
// Assurez-vous d'importer le modèle correctement

@Component({
  selector: 'app-liste-dates',
  imports:[CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './liste-dates.component.html',
  styleUrls: ['./liste-dates.component.scss']
})
export  default class ListeDatesComponent implements OnInit {
  plagesDates: PlageDate[] = [];
  errorMessage = '';
  isLoading = true;

  constructor(private plageDatesService: PlageDatesService) {}

  ngOnInit(): void {
    this.loadPlagesDates();
  }

  // Chargement des plages de dates
  loadPlagesDates(): void {
    this.plageDatesService.getAllPlageDates().subscribe({
      next: (res: any) => {
        console.log(res)
        this.plagesDates = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {

        this.errorMessage = 'Erreur lors du chargement des dates';
        this.isLoading = false;
      }
    });
  }

  // Fonction pour modifier une plage de date
  onEdit(plage: PlageDate): void {
    console.log('Modifier la plage de date:', plage);
    // Implémentez ici la logique pour ouvrir un formulaire de modification
    // ou rediriger vers une page de modification
  }

  // Fonction pour supprimer une plage de date
  onDelete(id: string | undefined): void {
  if (!id) {
    this.errorMessage = 'Identifiant de la plage de date manquant';
    return;
  }

  if (confirm('Êtes-vous sûr de vouloir supprimer cette plage de date ?')) {
    this.plageDatesService.deletePlageDate(id).subscribe({
      next: (res) => {
        this.loadPlagesDates();  // Recharge la liste après suppression
        alert('Plage de date supprimée avec succès');
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la suppression';
      }
    });
  }
}

}
