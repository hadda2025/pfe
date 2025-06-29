import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Room, RoomsService } from 'src/app/services/rooms.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-salle',
  standalone: true,
  imports: [ RouterModule, CommonModule,FormsModule],
  templateUrl: './liste-salle.component.html',
  styleUrls: ['./liste-salle.component.scss']
})
export default class ListeSalleComponent implements OnInit {
  Array = Array;
  rooms: Room[] = [];
  searchText: string = '';

  constructor(private roomService: RoomsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllRooms();
  }

  getAllRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (res: any) => {
        if (res.data && Array.isArray(res.data)) {
          this.rooms = res.data;
        } else if (res.data) {
          this.rooms = [res.data];
        } else {
          this.rooms = [];
        }
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des salles :', err);
      },
    });
  }

  get filteredRooms(): Room[] {
    if (!this.searchText.trim()) return this.rooms;

    const search = this.searchText.toLowerCase();
    return this.rooms.filter((salle) =>
      salle.nom?.toLowerCase().includes(search)
    );
  }

 







   deleteRoom(id: string): void {
        {
          if(id!=undefined && id !=null)
          {
            Swal.fire({
              title: 'Êtes-vous sûr?',
              text: 'Vous ne pourrez pas récupérer entite salle',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui, supprimez-la!',
              cancelButtonText: 'Non, gardez-la'
            }).then((result : any) => {
              if (result.value) {
               // alert(id);
             this.roomService.deleteRoom(id)
                .subscribe(res=>{
                  this.getAllRooms()
                })
              Swal.fire(
                'Supprimé!',
                'Votre salle été supprimée.',
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
  editRoom(id: string): void {
    this.router.navigate(['/modifier-salle', id]);
  }
}
