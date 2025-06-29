import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgentsService } from 'src/app/services/agents.service'; // adapte le chemin si besoin
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-agent',
  standalone: true,
  imports: [ RouterModule,CommonModule],
 templateUrl: './liste-agent.component.html',
  styleUrls: ['./liste-agent.component.scss']
})
export default class ListeAgentComponent implements OnInit {

  agents: any[] = []; // Liste des agents
  searchText: string = ''; // Pour la recherche (optionnel)

  constructor(private agentsService: AgentsService) { }

  ngOnInit(): void {
    this.getAllAgents();
  }

  getAllAgents(): void {
    this.agentsService.getAllAgents().subscribe({
      next: (response) => {
        this.agents = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des agents', error);
      }
    });
  }

  // Optionnel : méthode pour filtrer la liste
  get filteredAgents() {
    if (!this.searchText.trim()) {
      return this.agents;
    }
    return this.agents.filter(agent =>
      `${agent.firstName} ${agent.lastName}`.toLowerCase().includes(this.searchText.toLowerCase()) ||
      agent.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }




  deleteAgent(id: string): void {
        {
          if(id!=undefined && id !=null)
          {
            Swal.fire({
              title: 'Êtes-vous sûr?',
              text: 'Vous ne pourrez pas récupérer entite jury',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui, supprimez-la!',
              cancelButtonText: 'Non, gardez-la'
            }).then((result : any) => {
              if (result.value) {
               // alert(id);
             this.agentsService.deleteAgent(id)
                .subscribe(res=>{
                  this.getAllAgents()
                })
              Swal.fire(
                'Supprimé!',
                'Votre jury été supprimée.',
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
        }}




}
