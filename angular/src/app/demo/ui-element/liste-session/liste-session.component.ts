import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 // Remplace par le chemin correct
import { Router, RouterModule } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-liste-session',
  imports:[ReactiveFormsModule,CommonModule,RouterModule,FormsModule],
  templateUrl: './liste-session.component.html',
  styleUrls: ['./liste-session.component.scss']
})
export default class ListeSessionComponent implements OnInit {
  sessions: any[] = []; // Liste des sessions
 
  searchText: string = ''; // Texte de recherche

  constructor(
    private sessionService: SessionsService, // Service pour récupérer les sessions
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSessions(); // Appel à la méthode pour récupérer les sessions
  }

  // Méthode pour récupérer les sessions via le service
  getSessions(): void {
    this.sessionService.getAllSessions().subscribe({
      next: (response:any) => {
        this.sessions = response.data; // Stocker la liste des sessions
        
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des sessions:', error);
      }
    });
  }

  // Méthode de suppression d'une session
  deleteSession(sessionId: string): void {
    this.sessionService.deleteSession(sessionId).subscribe({
      next: (response) => {
        console.log('Session supprimée:', response);
        this.getSessions(); // Rafraîchir la liste après suppression
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la session:', error);
      }
    });
  }

  

// Optionnel : méthode pour filtrer la liste
get filteredSessions() {
  if (!this.searchText.trim()) {
    return this.sessions;
  }
  return this.sessions.filter(session =>
    `${session.namesession} ${session.Filiere}`.toLowerCase().includes(this.searchText.toLowerCase()) 
   
  );
}}