import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Room, RoomsService } from 'src/app/services/rooms.service';


@Component({
  selector: 'app-update-salle',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-salle.component.html',
  styleUrls: ['./update-salle.component.scss']
})
export default class UpdateSalleComponent implements OnInit {
  id!: string;
  salleForm!: FormGroup;

  constructor(
    private ac: ActivatedRoute,
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];

    this.salleForm = this.fb.group({
      nom: ['', Validators.required],
      capacite: [null, [Validators.required, Validators.min(1)]],
      disponibilite: ['', Validators.required],
      bloc: ['', Validators.required],
      dateCreation: ['']
    });

    this.loadSalleData();
  }

  onSubmit(): void {
    if (this.salleForm.valid) {
      const formValue = this.salleForm.value;
  
      const updatedRoom: Room = {
        _id: this.id,
        nom: formValue.nom,
        capacite: formValue.capacite,
        disponibilite: formValue.disponibilite,
        bloc: formValue.bloc,
     
      };
  
      this.roomsService.updateRoom(this.id, updatedRoom).subscribe({
        next: (response) => {
          console.log('Salle mise à jour avec succès :', response.data);
          this.router.navigate(['/component/liste-salles']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la salle', error);
        }
      });
    }
  }

  private loadSalleData(): void {
    this.roomsService.getRoomById(this.id).subscribe({
      next: (response: any) => {
        const salle = response.data;

        const formattedDate = salle.dateCreation
          ? new Date(salle.dateCreation).toISOString().substring(0, 10)
          : '';

        this.salleForm.patchValue({
          nom: salle.nom,
          capacite: salle.capacite,
          disponibilite: salle.disponibilite,
          bloc: salle.bloc,

        });
      },
      error: (err) => {
        console.error("Erreur lors du chargement de la salle", err);
      }
    });
  }
}
