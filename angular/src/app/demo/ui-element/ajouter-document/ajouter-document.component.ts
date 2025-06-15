import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DocumentsService } from 'src/app/services/documents.service';
import { SujetFinEtude, SujetFinEtudeService } from 'src/app/services/stages.service';


@Component({
  selector: 'app-ajouter-document',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './ajouter-document.component.html',
  styleUrls: ['./ajouter-document.component.scss']
})
export default class AjouterDocumentComponent implements OnInit {

  documentForm!: FormGroup;
  selectedFile: File | null = null;
  fileInvalid = false;

  sujets: SujetFinEtude[] = []; // ✅ propriété pour stocker les sujets
  selectedSujet: string = '';   // ✅ ID du sujet sélectionné

  constructor(
    private fb: FormBuilder,
    private documentsService: DocumentsService,
    private sujetService: SujetFinEtudeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.documentForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      sujetfinetude: [''] // champ lié au sujet (au lieu de "Soutenance")
    });

    // Chargement des sujets depuis le service
    this.sujetService.getAllSujets().subscribe({
      next: (res:any) => {
        this.sujets = res.data;
      },
      error: (err:any) => {
        console.error('Erreur de chargement des sujets :', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileInvalid = false;
    } else {
      this.selectedFile = null;
      this.fileInvalid = true;
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('fileUrl', this.selectedFile);
      formData.append('name', this.documentForm.value.name);
      formData.append('type', this.documentForm.value.type);
      if (this.documentForm.value.sujetfinetude) {
        formData.append('sujetfinetude', this.documentForm.value.sujetfinetude); // 🟢 champs sujet
      }

      this.documentsService.createDocument(formData).subscribe({
        next: (response) => {
          console.log('Document ajouté avec succès:', response);
          this.router.navigate(['/component/liste-document']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout du document', err);
        }
      });
    } else {
      if (!this.selectedFile) this.fileInvalid = true;
      this.documentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/component/liste-document']);
  }
}
