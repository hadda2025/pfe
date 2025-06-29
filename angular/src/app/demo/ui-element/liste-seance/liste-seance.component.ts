import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SeanceService, Seance } from 'src/app/services/seances.service';

import { RoomsService } from 'src/app/services/rooms.service';
import { PlageDatesService } from 'src/app/services/date.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

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

  // Modifier une séance
  editSeance(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/component/update-seance', id]);
    }
  }

  // Supprimer une séance

      deleteSeance(id: string | undefined): void {
            {
              if(id!=undefined && id!=null)
              {
                Swal.fire({
                  title: 'Êtes-vous sûr?',
                  text: 'Vous ne pourrez pas récupérer entite session',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Oui, supprimez-la!',
                  cancelButtonText: 'Non, gardez-la'
                }).then((result : any) => {
                  if (result.value) {
                   // alert(id);
               this.seanceService.deleteSeance(id)
                    .subscribe(res=>{
                      this.getSeances()
                    })
                  Swal.fire(
                    'Supprimé!',
                    'Votre session été supprimée.',
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
