import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgentsService } from 'src/app/services/agents.service'; // adapte le chemin si besoin
import { SharedModule } from 'src/app/theme/shared/shared.module';

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
    if (confirm('Voulez-vous vraiment supprimer cet agent ?')) {
      this.agentsService.deleteAgent(id).subscribe({
        next: () => {
          this.agents = this.agents.filter(agent => agent._id !== id);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'agent', err);
        }
      });
    }
  }}
