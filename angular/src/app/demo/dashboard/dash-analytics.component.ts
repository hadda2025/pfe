import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  NgApexchartsModule, ChartType
} from 'ng-apexcharts';

import { CommonModule } from '@angular/common';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { SujetFinEtudeService } from 'src/app/services/stages.service';
import { SoutenancesService } from 'src/app/services/soutenances.service';
import { RouterLink } from '@angular/router';
import { SeanceService } from 'src/app/services/seances.service';
import { PlageDatesService } from 'src/app/services/date.service';
import { RoomsService } from 'src/app/services/rooms.service';
@Component({
  selector: 'app-dash-analytics',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, RouterLink],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export default class DashAnalyticsComponent implements OnInit {
  students: any[] = [];
  teachers: any[] = [];
  stages: any[] = [];
  soutenances: any[] = [];
  seances: any[] = [];
  plage: any[] = [];
  salles: any[] = [];
  juryList: any[] = [];
  sujets: any[] = [];

 
  chartSoutenancesTeacher: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    title: ApexTitleSubtitle;
  } = {
    chart: { type: 'pie' },
    series: [],
    labels: [],
    title: { text: 'Répartition des soutenances par enseignant' }
  };

 chartSujetJuryDonut = {
  series: [] as number[],
  chart: {
  type: 'donut' as ChartType,
  height: 350
},
  labels: [] as string[],
  title: {
  text: 'Affectation des sujets avec les membres de jury',
  align: 'center' as 'center'

  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: {
            show: true
          },
          value: {
            show: true
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      return val.toFixed(1) + '%';
    }
  },
  legend: {
  show: true,
  position: 'bottom' as 'bottom', // ou 'top', 'left', 'right' selon vos besoins
  horizontalAlign: 'center' as 'center'

  }
};


  constructor(
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private sujetService: SujetFinEtudeService,
    private soutenanceService: SoutenancesService,
    private seanceService: SeanceService,
    private plageDateService: PlageDatesService,
    private roomService: RoomsService
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllTeachers();
    this.loadAffectations();
    this.getSoutenances();

   
    this.loadJuryList();
  }

  
  
 

  getAllStudents(): void {
    this.studentsService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response.data;
      },
      error: (error) => {
        console.error('Erreur récupération étudiants', error);
      }
    });
  }

  getAllTeachers(): void {
    this.teachersService.getAllTeachers().subscribe({
      next: (response: any) => {
        this.teachers = response.data;
      },
      error: (error) => {
        console.error('Erreur récupération enseignants', error);
      }
    });
  }

  loadAffectations(): void {
    this.sujetService.getAllSujets().subscribe({
      next: (res: any) => {
        this.sujets = res.data?.map((sujet: any) => {
          if (!Array.isArray(sujet.student)) {
            sujet.student = [];
          }
          return sujet;
        }) || [];
        this.prepareSujetJuryDonutChart();
      },
      error: (err:any) => {
        console.error("Erreur lors du chargement des sujets :", err);
      }
    });
  }

  loadJuryList(): void {
    this.sujetService.getAllJury().subscribe({
      next: (data) => {
        this.juryList = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des jurys :', err);
      }
    });
  }

  getSoutenances(): void {
    this.soutenanceService.getAllSoutenances().subscribe({
      next: (data: any) => {
        this.soutenances = data.data;
        this.prepareSoutenanceTeacherPieChart();
   
      },
      error: (err) => {
        console.error('Erreur chargement soutenances', err);
      }
    });
  }

  

  prepareSoutenanceTeacherPieChart(): void {
    const teacherCount: Record<string, number> = {};
    this.soutenances.forEach((s) => {
      const teacherNames = [
        s.examinateur?.firstName + ' ' + s.examinateur?.lastName,
        s.president?.firstName + ' ' + s.president?.lastName,
        s.rapporteur?.firstName + ' ' + s.rapporteur?.lastName,
      ];

      teacherNames.forEach((name) => {
        if (name && name.trim() !== 'undefined undefined') {
          teacherCount[name] = (teacherCount[name] || 0) + 1;
        }
      });
    });

    this.chartSoutenancesTeacher.labels = Object.keys(teacherCount);
    this.chartSoutenancesTeacher.series = Object.values(teacherCount);
  }

  prepareSujetJuryDonutChart(): void {
  const juryStats: Record<string, number> = {};

  this.sujets.forEach((sujet: any) => {
    ['president', 'rapporteur', 'examinateur'].forEach(role => {
      const member = sujet[role];
      if (member && member.firstName && member.lastName) {
        const name = `${member.firstName} ${member.lastName}`;
        juryStats[name] = (juryStats[name] || 0) + 1;
      }
    });
  });

  this.chartSujetJuryDonut.labels = Object.keys(juryStats);
  this.chartSujetJuryDonut.series = Object.values(juryStats);
}


  formatStudentsList(students: any[]): string {
    if (!students || students.length === 0) return 'Pas d\'étudiant affecté';
    return students.map(s => `${s.firstName} ${s.lastName}`).join(', ');
  }
}
