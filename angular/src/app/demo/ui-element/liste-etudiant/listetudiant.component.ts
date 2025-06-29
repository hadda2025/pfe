import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service'; // adapte le chemin
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listetudiant',
  imports: [ RouterModule,FormsModule,CommonModule],
  templateUrl: './listetudiant.component.html',
  styleUrls: ['./listetudiant.component.scss']
})
export default class ListetudiantComponent implements OnInit {

  students: any[] = []; // liste des étudiants
  searchText: string = ''; // pour la recherche (optionnel)

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents(): void {
    this.studentsService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response.data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des étudiants', error);
      }
    });
  }

  // Optionnel : méthode pour filtrer la liste
  get filteredStudents() {
    if (!this.searchText.trim()) {
      return this.students;
    }
    return this.students.filter(student =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

   

     deleteStudent(id:string)
      {
        if(id!=undefined && id !=null)
        {
          Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas récupérer entite student',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-la!',
            cancelButtonText: 'Non, gardez-la'
          }).then((result : any) => {
            if (result.value) {
             // alert(id);
             this.studentsService.deleteStudent(id)
              .subscribe(res=>{
                this.getAllStudents()
              })
            Swal.fire(
              'Supprimé!',
              'Votre student été supprimée.',
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
