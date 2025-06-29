import { CommonModule } from '@angular/common';
import { CommaExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TeachersService } from 'src/app/services/teachers.service'; // adapte le chemin
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listenseignants',
  imports: [ RouterModule,CommonModule,FormsModule],
  templateUrl: './liste-enseignant.component.html',
  styleUrls: ['./liste-enseignant.component.scss']
})
export default class ListenseignantsComponent implements OnInit {

  teachers: any[] = []; // liste des enseignants
  searchText: string = ''; // pour la recherche (optionnel)

  constructor(private teachersService: TeachersService) { }

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers(): void {
    this.teachersService.getAllTeachers().subscribe({
      next: (response:any) => {
        this.teachers = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des enseignants', error);
      }
    });
  }

  // Optionnel : méthode pour filtrer la liste
  get filteredTeachers() {
    if (!this.searchText.trim()) {
      return this.teachers;
    }
    return this.teachers.filter(teacher =>
      `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(this.searchText.toLowerCase()) ||
      teacher.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      teacher.phone.includes(this.searchText)
    );
  }

  deleteTeacher(id:string)
        {
          if(id!=undefined && id !=null)
          {
            Swal.fire({
              title: 'Êtes-vous sûr?',
              text: 'Vous ne pourrez pas récupérer entite teacher',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Oui, supprimez-la!',
              cancelButtonText: 'Non, gardez-la'
            }).then((result : any) => {
              if (result.value) {
               // alert(id);
               this.teachersService.deleteTeacher(id)
                .subscribe(res=>{
                  this.getAllTeachers()
                })
              Swal.fire(
                'Supprimé!',
                'Votre teacher été supprimée.',
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
        }
}
