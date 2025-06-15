import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import { ErrorService } from 'src/app/services/error.service';
import { PlageDatesService } from 'src/app/services/date.service';
import { SeanceService } from 'src/app/services/seances.service';

@Component({
  selector: 'app-planification-soutenance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './planification-soutenance.component.html',
  styleUrls: ['./planification-soutenance.component.scss']
})
export default class PlanificationSoutenanceComponent implements OnInit {
  form!: FormGroup;

  sujets: any[] = [];
  students: any[] = [];
  teachers: any[] = [];
  salles: any[] = [];
  sessions: any[] = [];
  subject: any;
  plagesDates: any[] = [];
  seances: any[] = [];
  juryList: any[] = [];
  selectedStudentsIds: string[] = [];

  alertMessage: string | null = null;
  rapporteurId = '';
  presidentId = '';
  examinateurId = '';
  dateDebut = '';
  seancesDisponibles: any[] = [];
  salle: any = { _id: "", nom: "" };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sujetService: SujetFinEtudeService,
    private soutenanceService: SoutenancesService,
    private teachersService: TeachersService,
    private roomsService: RoomsService,
    private sessionsService: SessionsService,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private plageDatesService: PlageDatesService,
    private seanceService: SeanceService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadSujets();
    this.loadTeachers();
    this.loadRooms();
    this.loadSessions();
    this.loadPlagesDates();
    this.loadSeances();

    this.errorService.errorMessage$.subscribe(msg => {
      if (msg) {
        this.toastr.error(msg, 'Erreur');
        this.alertMessage = msg;
      }
    });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      sujetfinetude: ['',],
      plage: ['',],
      seance: ['',],
      room: [{ value: '', disabled: false }],
      etat: ['prévue'],
      president: ['',],
      rapporteur: ['',],
      session: ['',],
      examinateur: ['',],
      student: ['',]
    });
  }

  loadSujets(): void {
    this.sujetService.getAllSujets().subscribe({
      next: res => {this.sujets = res.data || [],
      console.log(res.data)},
      error: err => {
        console.error('Erreur chargement sujets :', err);
        this.toastr.error("Erreur de chargement des sujets.");
      }
    });
  }
  
  loadTeachers(): void {
    this.teachersService.getAllTeachers().subscribe({
      next: (res: any) => this.teachers = res.data || [],
      error: err => {
        console.error('Erreur chargement enseignants :', err);
        this.toastr.error("Erreur de chargement des enseignants.");
      }
    });
  }

  loadPlagesDates(): void {
    this.plageDatesService.getAllPlageDates().subscribe({
      next: (res: any) => {
        this.plagesDates = res.data;
      },
      error: (err: any) => {
        console.error("Erreur chargement plages de dates :", err);
      }
    });
  }

  loadSeances(): void {
    this.seanceService.getAllSeances().subscribe({
      next: (res) => this.seances = res.data || [],
      error: (err) => {
        console.error('Erreur chargement séances :', err);
        this.toastr.error("Erreur de chargement des séances.");
      }
    });
  }


  loadRooms(): void {
    this.roomsService.getAllRooms().subscribe({
      next: res => this.salles = res.data || [],
      error: err => {
        console.error('Erreur chargement salles :', err);
        this.toastr.error("Erreur de chargement des salles.");
      }
    });
  }

  loadSessions(): void {
    this.sessionsService.getAllSessions().subscribe({
      next: (res: any) => this.sessions = res.data || [],
      error: err => {
        console.error('Erreur chargement sessions :', err);
        this.toastr.error("Erreur de chargement des sessions.");
      }
    });

  }





  onSujetSelect(): void {
  const sujetId = this.form.get('sujetfinetude')?.value;
  if (sujetId) {
    this.sujetService.getSujetById(sujetId).subscribe({
      next: (res: any) => {
        const sujet = res.data;
        this.subject = sujet;

        this.students = sujet.student || [];
        const studentIds = this.students.map((etudiant: any) => etudiant._id); // <-- ici on récupère les IDs

        // Patch tous les champs du formulaire
        this.form.patchValue({
          examinateur: sujet.examinateur?._id || '',
          president: sujet.president?._id || '',
          rapporteur: sujet.rapporteur?._id || '',
          student: studentIds // <-- ici on applique la sélection des étudiants
        });

        // Stocker les IDs si tu veux les réutiliser dans le HTML
        this.rapporteurId = sujet.rapporteur?._id || '';
        this.presidentId = sujet.president?._id || '';
        this.examinateurId = sujet.examinateur?._id || '';
      },
      error: err => {
        console.error('Erreur chargement sujet par ID :', err);
        this.toastr.error("Erreur de chargement du sujet sélectionné.");
        this.students = [];
        this.form.patchValue({ student: [] });
      }
    });
  } else {
    this.students = [];
    this.form.patchValue({ student: [] });
  }
}

  onSubmit(): void {


    const { plage, president, rapporteur, examinateur, sujetfinetude, room, seance } = this.form.value;

    console.log("form of value ",this.form.value )
    // Charger toutes les soutenances pour vérifier les conflits
    this.soutenanceService.getAllSoutenances().subscribe({
      next: (res: any) => {

        console.log("res of get all soutenances ", res)
        const soutenances = res.data;
        if (res.data.length > 0) {


          // Vérifie si le sujet est déjà planifié
          const sujetExiste = soutenances.some((s: any) => s.sujetfinetude?._id === sujetfinetude);
          if (sujetExiste) {
            const msg = "Ce sujet est déjà associé à une autre soutenance.";
            this.toastr.error(msg, 'Erreur');
            this.alertMessage = msg;
            return;
          }

          // TODO: Ajouter logique de vérification du créneau dans la séance (heureDebut / heureFin si nécessaire)

          // Conflit enseignants
          const conflitsEnseignants = soutenances.filter((s: any) =>
            s.date === plage &&
            ([s.president?._id, s.rapporteur?._id, s.examinateur?._id].includes(president) ||
              [s.president?._id, s.rapporteur?._id, s.examinateur?._id].includes(rapporteur) ||
              [s.president?._id, s.rapporteur?._id, s.examinateur?._id].includes(examinateur))
          );

          if (conflitsEnseignants.length > 0) {
            const msg = "Conflit de planning : un ou plusieurs enseignants sont déjà planifiés à cette date.";
            this.toastr.error(msg, 'Erreur');
            this.alertMessage = msg;
            return;
          }

          // Conflit salle
          const conflitsSalle = soutenances.filter((s: any) =>
            s.plage === plage &&
            s.room?._id === room
          );

          if (conflitsSalle.length > 0) {
            const msg = "La salle est déjà réservée à cette date.";
            this.toastr.error(msg, 'Erreur');
            this.alertMessage = msg;
            return;
          }
        }

        // Création de la soutenance
        this.soutenanceService.createSoutenance(this.form.value).subscribe({
          next: (res: any) => {
            console.log(res)
            const msg = 'Soutenance planifiée avec succès';
            this.toastr.success(msg, 'Succès');
            this.alertMessage = msg;
            this.goToListe();
          },
          error: () => {
            const msg = "Erreur lors de la création de la soutenance.";
            this.toastr.error(msg, 'Erreur');
            this.alertMessage = msg;
          }
        });
      },
      error: (error) => {
        console.log("error of create soutenance ", error)
        const msg = "Erreur lors du chargement des soutenances.";
        this.toastr.error(msg, 'Erreur');
        this.alertMessage = msg;
      }
    });
  }

  goToListe(): void {
    this.router.navigate(['/component/liste-soutenances']);
  }

  loadAffectations(): void {
    this.sujetService.getAllSujets().subscribe({
      next: (res: any) => {
        console.log(res)
        this.sujets = res.data?.map((sujet: any) => {
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
 rechercherSeancesDisponibles(
    plageIdx?: number,
    roomIdx?: number
  ): void {
    // 1. Déterminer les indices (premier appel = lecture du formulaire)
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

    // 3. Appel du backend
    this.soutenanceService
      .findAvailableSeances(
        plage.dateDebut,
        salle._id,
        this.presidentId,
        this.rapporteurId,
        this.examinateurId
      )
      .subscribe({
        next: (res: any) => {
          if (res && res.length > 0) {
            // Succès : on garde le résultat
            this.seancesDisponibles = res;
            this.dateDebut = plage.dateDebut;
            this.salle = salle;

            // Met à jour le formulaire pour refléter les sélections finales
            this.form.patchValue({
              plage: plage._id,
              room: salle._id,
            });
          } else {
            // Échec : essayer la salle suivante
            if (roomIdx + 1 < this.salles.length) {
              this.rechercherSeancesDisponibles(plageIdx, roomIdx + 1);
            } else if (plageIdx + 1 < this.plagesDates.length) {
              // Plus de salles -> date suivante, salle 0
              this.rechercherSeancesDisponibles(plageIdx + 1, 0);
            } else {
              // Plus rien à tester
              this.toastr.error(
                'Aucune séance disponible pour les dates et salles proposées.'
              );
              this.seancesDisponibles = [];
            }
          }
        },
        error: () => {
          this.toastr.error(
            'Aucune séances disponibles,salle déja complet , ou conflit de membre de jury choisir une autre date,salle.'
          );
        },
      });
  }

  /** Quand l’utilisateur choisit une séance, on affiche sa salle associée. */
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