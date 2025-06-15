import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionsService } from 'src/app/services/sessions.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';

@Component({
  selector: 'app-liste-etudiantbysoutenance',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './liste-etudiantbysoutenance.component.html',
  styleUrls: ['./liste-etudiantbysoutenance.component.scss']
})
export default class ListeEtudiantbysoutenanceComponent implements OnInit {
  earchForm: FormGroup;
  allSoutenances: any[] = [];
  resultatsFiltres: any[] = [];
  sessions: any[] = [];
  fullNames: string[] = [];

  constructor(
    private fb: FormBuilder,
    private soutenanceService: SoutenancesService,
    private sessionService: SessionsService
  ) {
    this.earchForm = this.fb.group({
      fullName: [''],
      session: ['']
    });
  }

  ngOnInit(): void {
    this.sessionService.getAllSessions().subscribe({
      next: (res: any) => {
        console.log(res)
        this.sessions = res.data || [];
      },
      error: err => console.error('Erreur lors du chargement des sessions', err)
    });

    this.soutenanceService.getAllSoutenances().subscribe({
      next: (res: any) => {
        console.log(res)
        this.allSoutenances = res.data || [];
        this.extractFullNames();
        this.initSearch();
      },
      error: err => console.error('Erreur lors du chargement des soutenances', err)
    });
  }

  extractFullNames(): void {
    const namesSet = new Set<string>();
    for (const soutenance of this.allSoutenances) {
      const students = soutenance.sujetfinetude?.student;
      if (!Array.isArray(students)) continue;
      for (const student of students) {
        if (student.firstName && student.lastName) {
          const fullName = `${student.firstName} ${student.lastName}`;
          namesSet.add(fullName);
        }
      }
    }
    this.fullNames = Array.from(namesSet).sort();
  }

  initSearch(): void {
    this.earchForm.valueChanges.subscribe((val: any) => {
      const fullName = val.fullName?.toLowerCase() || '';
      const selectedSessionId = val.session;
      this.resultatsFiltres = [];

      for (const soutenance of this.allSoutenances) {
        const matchSession = selectedSessionId ? soutenance.session?._id === selectedSessionId : true;
        const students = soutenance.sujetfinetude?.student;

        if (!Array.isArray(students)) continue;

        for (const student of students) {
          const studentFullName = `${student.firstName} ${student.lastName}`.toLowerCase();
          const matchName = fullName ? studentFullName === fullName : true;

          if (matchName && matchSession) {
            this.resultatsFiltres.push({
              etudiant: student,
              soutenance: soutenance
            });
          }
        }
      }
    });
  }
}
