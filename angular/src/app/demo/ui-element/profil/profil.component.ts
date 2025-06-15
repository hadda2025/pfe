import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export  default class ProfilComponent implements OnInit {


  userString:any= localStorage.getItem("user"); // Get the user string from localStorage
  user:any = JSON.parse(this.userString); // Parse the string if it's not null
  userId:any = this.user._id;
  client: any; // Stocker les données du client
constructor(private clientservice: UsersService ,private router: Router){
}
ngOnInit(): void {
  this.getClientById();
}

getClientById(): void {
  console.log(this.userId)
    this.clientservice.getUserById((this.userId)).subscribe(
      (data) => {
        this.client = data.data;
        console.log('Client récupéré:', this.client);
      },
      (error) => {
        console.error('Erreur lors de la récupération du client:', error);
      }
    );
  }
  updateuser(): void {
    // Vous pouvez rediriger vers un formulaire de mise à jour ou effectuer une action ici
    this.router.navigate(['/update-user', this.user._id]); // Exemple de redirection
  }
  logout(): void {
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }
}









