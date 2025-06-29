import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SessionsService } from 'src/app/services/sessions.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ajouter-session',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './ajouter-session.component.html',
  styleUrls: ['./ajouter-session.component.scss']
})
export default class AjouterSessionComponent implements OnInit {

  sessionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionsService,
    private router: Router,
    private toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.sessionForm = this.fb.group({
      namesession: ['', Validators.required],
      Filiere: ['', Validators.required],
      dateD: ['', Validators.required],
      dateF: ['', Validators.required],
    });
  }

  onSubmit(): any {
    if (this.sessionForm.valid) {
      const formValue = this.sessionForm.value;

      const newSession: any= {
        namesession: formValue.namesession,
        Filiere: formValue.Filiere,
        dateD: formValue.dateD,
        dateF: formValue.dateF
      };

      this.sessionService.createSession(newSession).subscribe({
        next: (response:any) => {
         
          this.toaster.success('session ajiuter avec succés' )
          this.router.navigate(['/component/liste-sessions']); // Ajuste la route selon ton projet
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la session', error);
        }
      });
    } else {
      this.sessionForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/component/liste-sessions']);
   
  }
}
