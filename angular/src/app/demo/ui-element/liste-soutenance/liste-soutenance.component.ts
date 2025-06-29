import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlageDatesService } from 'src/app/services/date.service';
import { SeanceService } from 'src/app/services/seances.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-soutenance',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './liste-soutenance.component.html',
  styleUrls: ['./liste-soutenance.component.scss']
})
export default class ListeSoutenanceComponent {
  soutenances: any[] = [];

  constructor(
    private seanceService: SeanceService,
    private plagesService: PlageDatesService,
    private soutenanceService: SoutenancesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSoutenances();
  }

  getSoutenances(): void {
    this.soutenanceService.getAllSoutenances().subscribe({
      next: async (data: any) => {
        console.log(data);
        const rawSoutenances = data.data;
        this.soutenances = [];

        for (const soutenance of rawSoutenances) {
          let heureDebut: string | null = null;
          let heureFin: string | null = null;
          let dateDebut: string | null = null;

          const seanceId =
            typeof soutenance.seance === 'string'
              ? soutenance.seance
              : soutenance.seance?._id;

          const plageId =
            typeof soutenance.plage === 'string'
              ? soutenance.plage
              : soutenance.plage?._id;

          try {
            const [seanceData, plageData] = await Promise.all([
              seanceId ? this.seanceService.getSeanceById(seanceId).toPromise() : Promise.resolve(null),
              plageId ? this.plagesService.getPlageDateById(plageId).toPromise() : Promise.resolve(null)
            ]);

            if (seanceData?.data) {
              heureDebut = seanceData.data.heureDebut;
              heureFin = seanceData.data.heureFin;
            }

            if (plageData?.data) {
              dateDebut = plageData.data.dateDebut;
            }

            this.soutenances.push({
              ...soutenance,
              heureDebut,
              heureFin,
              dateDebut
            });

          } catch (err) {
            console.error('Erreur lors de la récupération des données associées :', err);
            this.soutenances.push(soutenance);
          }
        }
      },
      error: (err: any) => {
        console.error('Erreur chargement des soutenances', err);
      }
    });
  }

  aDepot(soutenance: any): boolean {
    return !!soutenance?.documents;
  }

  onEditSoutenance(soutenance: any): void {
    this.router.navigate(['/soutenances/edit', soutenance._id]);
  }

       onDeleteSoutenance(id: string): void {
        {
          if(id!=undefined && id !=null)
          {
            Swal.fire({
              title: 'Êtes-vous sûr?',
              text: 'Vous ne pourrez pas récupérer entite soutenance',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui, supprimez-la!',
              cancelButtonText: 'Non, gardez-la'
            }).then((result : any) => {
              if (result.value) {
               // alert(id);
               this.soutenanceService.deleteSoutenance(id)
                .subscribe(res=>{
                 this.getSoutenances();
                })
              Swal.fire(
                'Supprimé!',
                'Votre soutenance été supprimée.',
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
