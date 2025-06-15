import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-liste-affectation-jury',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule],
  templateUrl: './liste-affectation-jury.component.html',
  styleUrls: ['./liste-affectation-jury.component.scss']
})
export default class ListeAffectationJuryComponent implements OnInit {
  sujets: any[] = [];
  juryList: any[] = [];

  constructor(
    private sujetService: SujetFinEtudeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAffectations();
    this.loadJuryList();
  }

  // Récupère tous les sujets
  loadAffectations(): void {
    this.sujetService.getAllSujets().subscribe({
      next: (res: any) => {
        console.log(res);
        this.sujets = res.data?.map((sujet: any) => {
          // Sécurise le champ student : s'il est null ou pas un tableau, transforme-le en tableau vide
          if (!Array.isArray(sujet.student)) {
            sujet.student = [];
          }
          return sujet;
        }) || [];
      },
      error: (err) => {
        console.error("Erreur lors du chargement des sujets :", err);
      }
    });
  }

  // Récupère tous les sujets avec leur jury affecté
  loadJuryList(): void {
    this.sujetService.getAllJury().subscribe({
      next: (data) => {
        console.log(data)
        this.juryList = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des jurys :', err);
      }
    });
  }

  // Redirige vers la page de modification d’une affectation

  onEditAffectation(sujet: any): void {
    this.router.navigate(['/component/affectation-jury'], {
      queryParams: { id: sujet._id }
    });
  }

  // Supprime une affectation
  onDeleteAffectation(sujetId: string): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette affectation ?")) {
      this.sujetService.deleteSujet(sujetId).subscribe({
        next: () => {this.loadAffectations(),
        this.loadJuryList()},
        error: (err) => {
          console.error("Erreur lors de la suppression de l'affectation :", err);
        }
      });
    }
  }
}
