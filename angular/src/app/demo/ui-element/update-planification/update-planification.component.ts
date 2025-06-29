import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

import { PlageDatesService } from 'src/app/services/date.service';
import { ErrorService } from 'src/app/services/error.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { SeanceService } from 'src/app/services/seances.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-update-planification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-planification.component.html',
  styleUrls: ['./update-planification.component.scss']
})
export default class UpdatePlanificationComponent implements OnInit {

  form!: FormGroup;
  soutenanceId: string = '';
  sujets: any[] = [];
  students: any[] = [];
  teachers: any[] = [];
  salles: any[] = [];
  sessions: any[] = [];
  plagesDates: any[] = [];
  seancesDisponibles: any[] = [];
  alertMessage: string | null = null;
  subject: any;
idsujet:any;
  presidentId: string = '';
  rapporteurId: string = '';
  examinateurId: string = '';
   president:any;
rapporteur:any;
 examinateur:any;
  dateDebut: string = '';
  salle: any = { _id: "", nom: "" };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sujetService: SujetFinEtudeService,
    private soutenanceService: SoutenancesService,
    private teachersService: TeachersService,
    private roomsService: RoomsService,
    private sessionsService: SessionsService,
    private plageDatesService: PlageDatesService,
    private seanceService: SeanceService,
    private toastr: ToastrService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
   
    this.soutenanceId = this.route.snapshot.paramMap.get('id') || '';
    this.initializeForm();
    

    forkJoin([
     
      this.sujetService.getAlllistSujets(),
      this.teachersService.getAllTeachers(),
      this.roomsService.getAllRooms(),
      this.sessionsService.getAllSessions(),
      this.plageDatesService.getAllPlageDates(),
      this.seanceService.getAllSeances(),
      this.soutenanceService.getSoutenanceById(this.soutenanceId)
    ]).subscribe({
      next: ([sujets, teachers, rooms, sessions, plages, seances, soutenance]) => {
        this.sujets = sujets.data || [];
      
        
        this.teachers= teachers.data || [];
        this.salles = rooms.data || [];
        this.sessions = sessions.data || [];
        this.plagesDates = plages.data || [];
        this.seancesDisponibles = seances.data || [];
             console.log(soutenance)
        const s:any = soutenance.data;
           this.onSujetSelect(s.sujetfinetude)
        this.subject = s.sujetfinetude;
        this.students = s.sujetfinetude?.student || [];

        const studentIds = this.students.map((etudiant: any) => etudiant._id);
        this.form.patchValue({
          sujetfinetude: s.sujetfinetude || '',
          plage: s.plage || '',
          seance: s.seance || '',
          room: (typeof s.room === 'string') ? s.room : (s.room?._id || ''),
          etat: s.etat || 'prévue',
          president: s.president?._id || '',
          rapporteur: s.rapporteur?._id || '',
          session: s.session || '',
          examinateur: s.examinateur?._id || '',
          student: studentIds
        });

        this.presidentId = s.president;
  
        this.rapporteurId = s.rapporteur;
        this.examinateurId = s.examinateur;

  this.loadPresident();
  this.loadRapporteur();
  this.loadExaminateur();
        this.rechercherSeancesDisponibles();
      },
      error: () => this.toastr.error("Erreur chargement des données initiales.")
    });

    this.errorService.errorMessage$.subscribe(msg => {
      if (msg) {
        this.toastr.error(msg, 'Erreur');
        this.alertMessage = msg;
      }
    });
  }
loadPresident(): void {
  this.teachersService.getTeacherById(this.presidentId).subscribe({
    next: (res: any) => {
      this.president = res.data;
      console.log("President :", this.president);
    },
    error: (err:any) => console.error(err)
  });
}

loadRapporteur(): void {
  this.teachersService.getTeacherById(this.rapporteurId).subscribe({
    next: (res: any) => {
      this.rapporteur = res.data;
      console.log("Rapporteur :", this.rapporteur);
    },
    error: (err) => console.error(err)
  });
}

loadExaminateur(): void {
  this.teachersService.getTeacherById(this.examinateurId).subscribe({
    next: (res: any) => {
      this.examinateur = res.data;
      console.log("Examinateur :", this.examinateur);
    },
    error: (err) => console.error(err)
  });
}

  initializeForm(): void {
    this.form = this.fb.group({
     
      plage: [''],
      seance: [''],
      room: [''],
      etat: ['prévue'],
     
      session: [''],
     
    });
  }

  onSujetSelect(id:any) {

    

    this.sujetService.getSujetById(id).subscribe({
      next: (res: any) => {
        console.log(res.data,"sujet")
        const sujet = res.data;
        this.subject = sujet;
        this.students = sujet.student || [];

        const studentIds = this.students.map((etudiant: any) => etudiant._id);

        this.form.patchValue({
          examinateur: sujet.examinateur?._id || '',
          president: sujet.president?._id || '',
          rapporteur: sujet.rapporteur?._id || '',
          student: studentIds
        });

        this.presidentId = sujet.president?._id || '';
        this.rapporteurId = sujet.rapporteur?._id || '';
        this.examinateurId = sujet.examinateur?._id || '';
      },
      error: () => this.toastr.error("Erreur chargement du sujet.")
    });
  }

  onSubmit(): void {
    const formValue = this.form.value;
    const { plage, president, rapporteur, examinateur, sujetfinetude, room } = formValue;

    this.soutenanceService.getAllSoutenances().subscribe({
      next: (res: any) => {
        const soutenances = res.data;
        const sujetExiste = soutenances.some((s: any) => s.sujetfinetude?._id === sujetfinetude && s._id !== this.soutenanceId);

        if (sujetExiste) {
          const msg = "Ce sujet est déjà associé à une autre soutenance.";
          this.toastr.error(msg, 'Erreur');
          this.alertMessage = msg;
          return;
        }

        const conflitsEnseignants = soutenances.some((s: any) =>
          s.plage === plage &&
          ([s.president?._id, s.rapporteur?._id, s.examinateur?._id].includes(president) ||
            [s.president?._id, s.rapporteur?._id, s.examinateur?._id].includes(rapporteur) ||
            [s.president?._id, s.rapporteur?._id, s.examinateur?._id].includes(examinateur))
        );

        if (conflitsEnseignants) {
          const msg = "Conflit de planning : un ou plusieurs enseignants sont déjà planifiés à cette date.";
          this.toastr.error(msg, 'Erreur');
          this.alertMessage = msg;
          return;
        }

        const conflitsSalle = soutenances.some((s: any) =>
          s.plage === plage && s.room?._id === room && s._id !== this.soutenanceId
        );

        if (conflitsSalle) {
          const msg = "La salle est déjà réservée à cette date.";
          this.toastr.error(msg, 'Erreur');
          this.alertMessage = msg;
          return;
        }

        this.soutenanceService.updateSoutenance(this.soutenanceId, formValue).subscribe({
          next: () => {
            this.toastr.success("Soutenance mise à jour avec succès");
            this.router.navigate(['/component/liste-soutenances']);
          },
          error: () => this.toastr.error("Erreur lors de la mise à jour.")
        });
      },
      error: () => this.toastr.error("Erreur chargement des soutenances pour vérification.")
    });
  }

  rechercherSeancesDisponibles(plageIdx?: number, roomIdx?: number): void {
    if (plageIdx === undefined) {
      const plageId = this.form.get('plage')?.value;
      plageIdx = this.plagesDates.findIndex(p => p._id === plageId);
    }
    if (roomIdx === undefined) {
      const roomId = this.form.get('room')?.value;
      roomIdx = this.salles.findIndex(r => r._id === roomId);
    }

    if (!this.presidentId || !this.rapporteurId || !this.examinateurId) {
      this.toastr.warning('Veuillez renseigner les membres du jury.');
      return;
    }

    const plage = this.plagesDates[plageIdx];
    const salle = this.salles[roomIdx];

    this.soutenanceService.findAvailableSeances(
      plage.dateDebut, salle._id, this.presidentId, this.rapporteurId, this.examinateurId
    ).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.seancesDisponibles = res;
          this.dateDebut = plage.dateDebut;
          this.salle = salle;
          this.form.patchValue({ plage: plage._id, room: salle._id ,});
        } else {
          if (roomIdx + 1 < this.salles.length) {
            this.rechercherSeancesDisponibles(plageIdx, roomIdx + 1);
          } else if (plageIdx + 1 < this.plagesDates.length) {
            this.rechercherSeancesDisponibles(plageIdx + 1, 0);
          } else {
            this.toastr.error('Aucune séance disponible pour les dates et salles proposées.');
            this.seancesDisponibles = [];
          }
        }
      },
      error: () => {
        this.toastr.error(
          'Aucune séance disponible. Salle complète ou conflit de jury. Choisir une autre date ou salle.'
        );
      }
    });
  }

  rechercherSeancesDisponiblesDate(): void {
    const seanceId = this.form.get('seance')?.value;
    const seance = this.seancesDisponibles.find(s => s._id === seanceId);

    if (!seance) {
      this.toastr.warning('Séance non trouvée.');
      return;
    }

    if (seance.room?._id) {
      this.form.get('room')?.setValue(seance.room._id);
    }
  }
}


