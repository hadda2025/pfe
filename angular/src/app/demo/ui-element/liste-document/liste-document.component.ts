import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-liste-document',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './liste-document.component.html',
  styleUrls: ['./liste-document.component.scss']
})
export default class ListeDocumentComponent implements OnInit {

  documents: any[] = [];
  loading: boolean = false;

  constructor(
    private documentsService: DocumentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.documentsService.getAllDocuments().subscribe({
      next: (res: any) => {
        this.documents = res.data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des documents :', err);
        this.loading = false;
      }
    });
  }

  getFileUrl(fileName: string): string {
    return `http://localhost:3000/file/document/${fileName}`; // adapte si besoin
  }

  deleteDocument(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      this.documentsService.deleteDocument(id).subscribe({
        next: () => {
          console.log('Document supprimé');
          this.loadDocuments();
        },
        error: (err: any) => {
          console.error('Erreur de suppression :', err);
        }
      });
    }
  }

  addDocument(): void {
    this.router.navigate(['/component/ajouter-document']);
  }

  editDocument(id: string): void {
    this.router.navigate([`/component/ajouter-document/${id}`]);
  }
}
