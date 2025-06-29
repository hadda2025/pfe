////////////////////////////////////
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student, StudentsService } from 'src/app/services/students.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-etudiant',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-etudiant.component.html',
  styleUrls: ['./ajouter-etudiant.component.scss']
})
export default class AjouterEtudiantComponent implements OnInit {
  userForm!: FormGroup;
  showAutreDepartementInput = false;
  showAutreParcoursInput = false;

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adress: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      numInscription: ['', Validators.required],
      cin: ['', Validators.required],
      classeDepartement: ['', Validators.required],
      autreDepartement: [''],
        parcours: ['', Validators.required],
      autreparcours: [''],
      dateCreation: ['', Validators.required]
    });
  }

  onDepartementChange(event: any): void {
    const selected = event.target.value;
    this.showAutreDepartementInput = selected === 'autre';

    if (this.showAutreDepartementInput ) {
      this.userForm.get('autreDepartement')?.setValidators(Validators.required);
    } else {
      this.userForm.get('autreDepartement')?.clearValidators();
      this.userForm.get('autreDepartement')?.setValue('');
    }

    this.userForm.get('autreDepartement')?.updateValueAndValidity();
  }

  getDepartementFinal(): string {
    const selected = this.userForm.get('classeDepartement')?.value;
    return selected === 'autre'
      ? this.userForm.get('autreDepartement')?.value
      : selected;
  }
  onparcoursChange(event: any): void {
    const selected = event.target.value;
    this.showAutreParcoursInput = selected === 'autre';

    if (this.showAutreParcoursInput) {
      this.userForm.get('autreparcours')?.setValidators(Validators.required);
    } else {
      this.userForm.get('autreparcours')?.clearValidators();
      this.userForm.get('autreparcours')?.setValue('');
    }

    this.userForm.get('autreparcours')?.updateValueAndValidity();
  }
  getParcoursFinal(): string {
    const selected = this.userForm.get('parcours')?.value;
    return selected === 'autre'
      ? this.userForm.get('autreparcours')?.value
      : selected;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const newStudent: any = {
        firstName: formValue.nom,
        lastName: formValue.prenom,
        email: formValue.email,
        phone: formValue.telephone,
        cin: formValue.cin,
        role: "Student",
        adress: formValue.adress,
        password: "zzzzzzzzzzzzzzzzz",
        numInscription: formValue.numInscription,
        dateCreation: formValue.dateCreation,
        classeDepartement: this.getDepartementFinal(), // Ajout du champ correct ici
          parcours: this.getParcoursFinal() // Ajout du champ correct ici

      };

      this.studentsService.createStudent(newStudent).subscribe({
        next: (response) => {
          
          this.toastr.success('Étudiant ajouté avec succès:');
          this.router.navigate(['/component/liste-etudiant']);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'étudiant', error);
        }
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/component/liste-etudiant']);
  }
}
