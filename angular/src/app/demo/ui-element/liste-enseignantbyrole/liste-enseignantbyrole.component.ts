import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import { MailService } from 'src/app/services/mail.service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas'; 
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-liste-enseignantbyrole',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './liste-enseignantbyrole.component.html',
  styleUrls: ['./liste-enseignantbyrole.component.scss']
})
export default class ListeEnseignantbyroleComponent implements OnInit {
  searchForm: FormGroup;
  allSoutenances: any[] = [];
  resultatsFiltres: { soutenance: any; role: string }[] = [];
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  sendMailForm!: FormGroup;
  selectedFile: File | null = null;
  showSendMail = false;
  isSending = false;


  constructor(
     private fb: FormBuilder,
    private soutenanceService: SoutenancesService,
    private mailService: MailService,
    private http: HttpClient
  ) {
    this.searchForm = this.fb.group({
      firstName: [''],
      lastName: ['']
    });
  
  this.sendMailForm = this.fb.group({
      email: ['']
    });
  }

  ngOnInit(): void {


    this.soutenanceService.getAllSoutenances().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.allSoutenances = res.data || [];


        this.initSearch();
      },
      error: err => console.error('Erreur lors du chargement des soutenances', err)
    });
  }
exportToPDF(): void {
  const pdf = new jsPDF('p', 'mm', 'a4');

  const head = [[
    'Nom Enseignant', 'Rôle', 'Étudiants', 'Date', 'Heure',
    'Sujet', 'Entreprise', 'Session', 'Salle'
  ]];

  const body = this.resultatsFiltres.map(res => {
    const enseignant = res.role === 'Président'
      ? `${res.soutenance.president?.firstName || ''} ${res.soutenance.president?.lastName || ''}`
      : res.role === 'Rapporteur'
      ? `${res.soutenance.rapporteur?.firstName || ''} ${res.soutenance.rapporteur?.lastName || ''}`
      : res.role === 'Examinateur'
      ? `${res.soutenance.examinateur?.firstName || ''} ${res.soutenance.examinateur?.lastName || ''}`
      : 'Inconnu';

    const etudiants = (res.soutenance.sujetfinetude?.student || [])
      .map((etu: any) => `${etu.firstName} ${etu.lastName}`)
      .join(', ');

    return [
      enseignant,
      res.role,
      etudiants,
      new Date(res.soutenance.plage.dateDebut).toLocaleDateString('fr-FR'),
      `${res.soutenance.seance.heureDebut} - ${res.soutenance.seance.heureFin}`,
      res.soutenance.sujetfinetude?.namesujet || '',
      res.soutenance.sujetfinetude?.entreprise || '',
      res.soutenance.session?.namesession || '',
      `${res.soutenance.room?.nom || ''} (${res.soutenance.room?.bloc || ''})`
    ];
  });

  pdf.text('Planning par enseignant', 14, 10);
  autoTable(pdf, {
    head,
    body,
    startY: 20,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [41, 128, 185] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 20 },
  });

  pdf.save('planning-enseignant.pdf');
}

  initSearch(): void {
    this.searchForm.valueChanges.subscribe(val => {
      const f = val.firstName?.toLowerCase() || '';
      const l = val.lastName?.toLowerCase() || '';
      if (!f && !l) {
        this.resultatsFiltres = [];
        return;
      }

      this.resultatsFiltres = [];
      for (let s of this.allSoutenances) {
        if (s.president && s.president.firstName?.toLowerCase().startsWith(f) && s.president.lastName?.toLowerCase().startsWith(l)) {
          this.resultatsFiltres.push({ soutenance: s, role: 'Président' });
        } else if (s.rapporteur && s.rapporteur.firstName?.toLowerCase().startsWith(f) && s.rapporteur.lastName?.toLowerCase().startsWith(l)) {
          this.resultatsFiltres.push({ soutenance: s, role: 'Rapporteur' });
        } else if (s.examinateur && s.examinateur.firstName?.toLowerCase().startsWith(f) && s.examinateur.lastName?.toLowerCase().startsWith(l)) {
          this.resultatsFiltres.push({ soutenance: s, role: 'Examinateur' });
        }
      }
    });
  }




   // Méthodes d'envoi email
  openSendMail(email?: string) {
  this.showSendMail = true;

  if (email) {
    this.sendMailForm.patchValue({
      email: email
    });
  }
}
getEmail(res: { soutenance: any; role: string }): string {
  if (res.role === 'Président') {
    return res.soutenance.president?.email || '';
  } else if (res.role === 'Rapporteur') {
    return res.soutenance.rapporteur?.email || '';
  } else if (res.role === 'Examinateur') {
    return res.soutenance.examinateur?.email || '';
  }
  return '';
}

  closeSendMail() {
    this.showSendMail = false;
    this.sendMailForm.reset();
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Veuillez sélectionner un fichier PDF valide.');
    }
  }

  onSendMail() {
    if (this.sendMailForm.invalid || !this.selectedFile) {
      alert('Veuillez renseigner l\'email et sélectionner un fichier PDF.');
      return;
    }

    const formData = new FormData();
    formData.append('email', this.sendMailForm.get('email')?.value);
    formData.append('pdf', this.selectedFile);

    this.isSending = true;

    this.http.post('http://localhost:3000/soutenances/send-pdf', formData).subscribe({
      next: () => {
        alert('PDF envoyé avec succès.');
        this.closeSendMail();
      },
      error: () => {
        alert('Erreur lors de l\'envoi.');
      },
      complete: () => {
        this.isSending = false;
      }
    });
  }
}

