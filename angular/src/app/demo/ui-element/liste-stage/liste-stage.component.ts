import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SujetFinEtudeService } from 'src/app/services/stages.service';  // Vérifie le chemin du service
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-stage',
  imports: [ReactiveFormsModule, CommonModule,RouterModule,FormsModule],
  templateUrl: './liste-stage.component.html',
  styleUrls: ['./liste-stage.component.scss']
})
export  default class ListeStageComponent implements OnInit {
  Array = Array;
  stages!:any[] ;  // Remplace 'stages' pour la consistance avec la réponse de ton backend
  searchText: string = '';  // Pour la recherche (optionnel)

  constructor(
    private sujetFinEtudeService : SujetFinEtudeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStages();  // Changer 'getAllSujets' en 'getAllStages' si nécessaire
  }

  getAllStages(): void {
    this.sujetFinEtudeService.getAlllistSujets().subscribe(
      (response:any) => {
        console.log(response);  // Vérifie la structure des données
        if (response.data && Array.isArray(response.data)) {
          this.stages = response.data;
        } else {
          // Si response.data n'est pas un tableau, on peut ajouter cet objet à un tableau
          this.stages = [response.data];
        }
      },
      (error:any) => {
        console.error("Erreur lors de la récupération des stages", error);
      }
    );
  }
  

  editStage(id: string): void {
    this.router.navigate(['/modifier-stage', id]);
  }




  get filteredStages() {
    if (!this.searchText.trim()) {
      return this.stages;
    }
  
    const lowerSearch = this.searchText.toLowerCase();
  
    return this.stages.filter(stage =>
      stage.namesujet?.toLowerCase().includes(lowerSearch) ||
      stage.entreprise?.toLowerCase().includes(lowerSearch) ||
      (typeof stage.student === 'object' &&
        `${stage.student.firstName} ${stage.student.lastName}`.toLowerCase().includes(lowerSearch)) ||
      stage.statut?.toLowerCase().includes(lowerSearch)
    );
  }
  deleteStage(id:string)
        {
          if(id!=undefined && id !=null)
          {
            Swal.fire({
              title: 'Êtes-vous sûr?',
              text: 'Vous ne pourrez pas récupérer entite sujet',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui, supprimez-la!',
              cancelButtonText: 'Non, gardez-la'
            }).then((result : any) => {
              if (result.value) {
               // alert(id);
               this.sujetFinEtudeService.deleteSujet(id)
                .subscribe(res=>{
                  this.getAllStages()
                })
              Swal.fire(
                'Supprimé!',
                'Votre sujet été supprimée.',
                'success'
              )
  
  
              } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Annulé',
                'Votre niveau est en sécurité 🙂',
                'error'
              )
              }
            })
          }
        }
}
