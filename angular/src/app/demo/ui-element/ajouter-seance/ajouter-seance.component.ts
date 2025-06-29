import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Seance, SeanceService } from 'src/app/services/seances.service';
import { PlageDatesService } from 'src/app/services/date.service';
import { RoomsService } from 'src/app/services/rooms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-seance',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './ajouter-seance.component.html',
  styleUrls: ['./ajouter-seance.component.scss']
})
export default class AjouterSeanceComponent implements OnInit {
  seanceForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  existingSeances: Seance[] = [];
 /*  salles: any;
  plagesDates: any; */


  constructor(
    private fb: FormBuilder,
    private seanceService: SeanceService,
    public router: Router,
   
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
 

    this.seanceForm = this.fb.group({
      heureDebut: ['', Validators.required],
      heureFin: ['', Validators.required],
    

    });

    // Charger les séances existantes
    this.seanceService.getAllSeances().subscribe({
      next: (res) => {
        this.existingSeances = res.data;
      },
      error: (err) => {
        console.error('Erreur chargement séances existantes', err);
      }
    });
  }
 

  onSubmit(): void {

    if (this.seanceForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const newSeance: Seance = this.seanceForm.value;


    console.log("form newSeance ", this.seanceForm.value);

    // Vérifier que la nouvelle séance commence au moins 15 min après la dernière séance
    const newStart = this.toMinutes(newSeance.heureDebut);
    const newEnd = this.toMinutes(newSeance.heureFin);

 

    this.seanceService.createSeance(newSeance).subscribe({
      next: (res: any) => {
        this.toastr.success('seance ajouter avec siccés')
        this.successMessage = res.message;
        this.errorMessage = '';
        this.seanceForm.reset();
        this.router.navigate(['/component/liste-seance']);
      },
      error: (err: any) => {
        console.log("error ", err)
        this.errorMessage = err.error?.message || 'Erreur lors de l\'ajout.';
        this.successMessage = '';
      }
    });
  }

  /**
   * Convertit une heure au format "HH:mm" en minutes.
   */
  private toMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
