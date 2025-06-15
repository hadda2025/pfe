import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPlanningMail(
    to: string,
    teacherName: string,
    subjectTitle: string,
    date: string,
    heureDebut: string,
    heureFin: string,
    salle: string,
  ) {
    await this.mailerService.sendMail({
      to,
      subject: 'Planification de votre soutenance',
      template: './planning-teacher',
      context: {
        name: teacherName,
        subjectTitle,
        date,
        heureDebut,
        heureFin,
        salle,
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async sendPlanningMailToStudent(
    to: string,
    name: string,
    subjectTitle: string,
    date: string,
    heureDebut: string,
    heureFin: string,
    salle: string,
    encadrant: string,
    rapporteur: string,
    president: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Convocation à une soutenance',
        template: 'planning-student',
        context: {
          name,
          subjectTitle,
          date,
          heureDebut,
          heureFin,
          salle,
          encadrant,
          rapporteur,
          president,
        },
      });
    } catch (error) {
      console.error('Erreur lors de l’envoi de mail à l’étudiant :', error);
      throw error;
    }
  }

  async sendPlanningsMail(
    to: string,
    teacherName: string,
    subjectTitle: string,
    date: string,
    heureDebut: string,
    heureFin: string,
    salle: string,
    role: string,
  ) {
    await this.mailerService.sendMail({
      to,
      subject: `Convocation en tant que ${role} - ${subjectTitle}`,
      template: 'allplanning-teacher',
      context: {
        teacherName,
        role,
        subjectTitle,
        date,
        heureDebut,
        heureFin,
        salle,
      },
    });
  }

  async sendMultiplePlanningMail(
    to: string,
    name: string,
    role: string,
    plannings: {
      subjectTitle: string;
      date: string;
      heureDebut: string;
      heureFin: string;
      salle: string;
    }[],
  ) {
    try {
      if (!Array.isArray(plannings) || plannings.length === 0) {
        throw new Error('Le tableau de plannings est vide ou invalide.');
      }

      await this.mailerService.sendMail({
        to,
        subject: `Vos soutenances planifiées en tant que ${role}`,
        template: 'multi-planning-teacher',
        context: {
          teacherName: name,
          role,
          plannings,
        },
      });
    } catch (error) {
      console.error(`Erreur lors de l’envoi de mail à ${to} :`, error);
      throw error;
    }
  }
}
