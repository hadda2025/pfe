import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { PlageDatesService } from 'src/app/services/date.service';
import { SeanceService } from 'src/app/services/seances.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import { RoomsService } from 'src/app/services/rooms.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-listesoutenancebysalle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listesoutenancebysalle.component.html',
  styleUrls: ['./listesoutenancebysalle.component.scss']
})
export default class ListesoutenancebysalleComponent implements OnInit {
  soutenances: any[] = [];
  salles: any[] = [];
  rawSoutenances:any[] = [];
  selectedRoomId: string = '';
  roomName: string = '';

  constructor(
    private seanceService: SeanceService,
    private plagesService: PlageDatesService,
    private soutenanceService: SoutenancesService,
    private sallesService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSalles();
  }
  exportToPDF(): void {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // En-tête du tableau identique à ta table HTML
  const head = [[
    'Salle', 'Sujet', 'Étudiants', 'Date', 'Heure', 'Jury'
  ]];

  const body: any[] = [];

  this.soutenances.forEach((soutenance: any) => {
    // Liste des étudiants en chaîne de caractères
    const etudiants = (soutenance.sujetfinetude?.student || [])
      .map((etu: any) => `${etu.firstName} ${etu.lastName}`)
      .join(', ');

    // Formatage date (ex: 27/05/2025)
    const date = soutenance.plage?.dateDebut
      ? new Date(soutenance.plage.dateDebut).toLocaleDateString('fr-FR')
      : '';

    // Formatage heure (ex: 08:00 - 10:00)
    const heure = soutenance.seance
      ? `${soutenance.seance.heureDebut} - ${soutenance.seance.heureFin}`
      : '';

    // Liste des membres du jury en une seule chaîne
    const jury = [
      soutenance.president ? `${soutenance.president.firstName} ${soutenance.president.lastName} (Président)` : '',
      soutenance.rapporteur ? `${soutenance.rapporteur.firstName} ${soutenance.rapporteur.lastName} (Rapporteur)` : '',
      soutenance.examinateur ? `${soutenance.examinateur.firstName} ${soutenance.examinateur.lastName} (Examinateur)` : ''
    ].filter(name => name !== '').join('\n');

    const row = [
      soutenance.room ? `${soutenance.room.nom} (${soutenance.room.bloc || ''})` : '',
      soutenance.sujetfinetude?.namesujet || '',
      etudiants,
      date,
      heure,
      jury
    ];

    body.push(row);
  });

  pdf.text('Planning par salle', 14, 10);

  autoTable(pdf, {
    head,
    body,
    startY: 20,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 20 },
    theme: 'grid',
    // Pour gérer les retours à la ligne dans une cellule (jury)
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 5) { // colonne jury
        data.cell.styles.cellPadding = 2;
        data.cell.styles.minCellHeight = 10;
      }
    }
  });

  pdf.save('planning-par-salle.pdf');
}


  loadSalles(): void {
    this.sallesService.getAllRooms().subscribe({
      next: (res: any) => this.salles = res.data,
      error: (err: any) => console.error('Erreur chargement des salles', err)
    });
  }

  onSearchByRoomId(): void {
    const salle = this.salles.find(s => s._id === this.selectedRoomId);
    if (salle) {
      this.roomName = salle.nom;
      this.getSoutenancesParSalle(this.roomName);
    } else {
      alert('Veuillez sélectionner une salle.');
    }
  }

  getSoutenancesParSalle(roomName: string): void {
    this.soutenanceService.getsoutenanceBySalle(roomName).subscribe({
      next: async (response: any) => {
        console.log(response.data)
        this.rawSoutenances = response.data;
        this.soutenances = [];

        for (const soutenance of this.rawSoutenances) {
          let heureDebut: string | null = null;
          let heureFin: string | null = null;
          let dateDebut: string | null = null;

          const seanceId = soutenance.seance?._id || soutenance.seance;
          const plageId = soutenance.plage?._id || soutenance.plage;

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
            console.error('Erreur récupération données associées :', err);
          }
        }
      },
      error: (err: any) => {
        console.error('Erreur chargement soutenances par salle :', err);
      }
    });
  }

  aDepot(soutenance: any): boolean {
    return !!soutenance?.documents?.length;
  }

  onEditSoutenance(soutenance: any): void {
    this.router.navigate(['/soutenances/edit', soutenance._id]);
  }

  onDeleteSoutenance(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette soutenance ?')) {
      this.soutenanceService.deleteSoutenance(id).subscribe({
        next: () => this.getSoutenancesParSalle(this.roomName),
        error: (err) => console.error('Erreur suppression soutenance :', err)
      });
    }
  }
}
