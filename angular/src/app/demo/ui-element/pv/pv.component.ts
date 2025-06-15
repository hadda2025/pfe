import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlageDatesService } from 'src/app/services/date.service';
import { SeanceService } from 'src/app/services/seances.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

@Component({
  selector: 'app-pv',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pv.component.html',
  styleUrls: ['./pv.component.scss']
})
export default class PvComponent implements OnInit {
  @ViewChildren('pvContent') pvContentRefs!: QueryList<ElementRef>;
  soutenance: any;
  sujet: any;
  etudiants: any[] = [];
  president: any;
  rapporteur: any;
  examinateur: any;
  seance: any;
  plage: any;
  student: any;
  parcours: string = '';
  classeDepartement: string = '';

  constructor(
    private route: ActivatedRoute,
    private soutenanceService: SoutenancesService,
    private sujetService: SujetFinEtudeService,
    private teacherService: TeachersService,
    private seanceService: SeanceService,
    private studentService: StudentsService,
    private plagesService: PlageDatesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.soutenanceService.getSoutenanceById(id).subscribe((res: any) => {
        this.soutenance = res.data;

        // Charger sujet + étudiants
        this.sujetService.getSujetById(this.soutenance.sujetfinetude).subscribe((sujet: any) => {
          this.sujet = sujet.data;
          this.etudiants = sujet.data.student;
          console.log("Sujet:", this.sujet);

          // Charger info du premier étudiant
          const firstStudent = this.etudiants[0];
          if (firstStudent && firstStudent._id) {
            this.getStudentInfo(firstStudent._id);
          }
        });

        // Charger séance
        this.seanceService.getSeanceById(this.soutenance.seance).subscribe((s: any) => {
          this.seance = s.data;
          console.log("Séance:", this.seance);
        });

        // Charger plage
        this.plagesService.getPlageDateById(this.soutenance.plage).subscribe((s: any) => {
          this.plage = s.data;
          console.log("Date:", this.plage);
        });

        // Charger membres du jury
        this.teacherService.getTeacherById(this.soutenance.president).subscribe((p: any) => {
          this.president = p.data;
          console.log("Président:", this.president);
        });

        this.teacherService.getTeacherById(this.soutenance.rapporteur).subscribe((r: any) => {
          this.rapporteur = r.data;
          console.log("Rapporteur:", this.rapporteur);
        });

        this.teacherService.getTeacherById(this.soutenance.examinateur).subscribe((e: any) => {
          this.examinateur = e.data;
          console.log("Examinateur:", this.examinateur);
        });
      });
    }
  }

  getStudentInfo(id: string): void {
    this.studentService.getStudentById(id).subscribe((response: any) => {
      this.student = response.data;
      this.parcours = this.student.parcours;
      this.classeDepartement = this.student.classeDepartement;

      console.log("Parcours:", this.parcours);
      console.log("classeDepartement:", this.classeDepartement);
    });
  }

  getDecision(): string {
    if (!this.soutenance?.note) return '';
    return this.soutenance.note >= 10 ? 'SUCCÈS' : 'ÉCHEC';
  }
printSection(index: number) {
  const section = this.pvContentRefs.get(index);
  const footer = document.getElementById('pv-footer');

  if (section && footer) {
    const printContent = section.nativeElement.innerHTML;
    const footerContent = footer.innerHTML;

    const WindowPrt = window.open('', '', 'width=900,height=1000');
    if (WindowPrt) {
      WindowPrt.document.write(`
        <html>
          <head>
            <title>Procès-Verbal</title>
            <style>
              * {
                box-sizing: border-box;
              }
              body {
                font-family: Arial, sans-serif;
                font-size: 13px;
                padding: 15px;
                margin: 0;
              }
              .logo {
                width: 100px;
                margin-bottom: 10px;
              }
              h2 {
                font-size: 20px;
                margin: 8px 0;
              }
              h3, h4 {
                font-size: 16px;
                margin: 6px 0;
              }
              p {
                margin: 4px 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                font-size: 13px;
                margin-top: 10px;
              }
              th, td {
                border: 1px solid black;
                padding: 6px;
                text-align: left;
              }
              ul {
                padding-left: 18px;
              }
              .footer {
                width: 100%;
                margin-top: 12px;
                font-size: 11px;
                color: #333;
                text-align: center;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
              }
              .footer img {
                width: 14px;
                vertical-align: middle;
                margin-right: 4px;
              }
              .footer a {
                text-decoration: none;
                color: inherit;
              }
              hr {
                border: none;
                border-top: 1px solid #3f51b5;
                margin: 12px auto;
                width: 50%;
              }
              @media print {
                button {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            ${printContent}
            <hr />
            <div class="footer">
              ${footerContent}
            </div>
          </body>
        </html>
      `);
      WindowPrt.document.close();
      WindowPrt.focus();
      WindowPrt.print();
      WindowPrt.close();
    }
  }
}
}