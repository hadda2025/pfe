import { Body, Controller, Get, Param, Post, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import {
  ApiTags,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { SendMailDto } from './dto/send-mail.dto';
import { SendMailStudentDto } from './dto/CreatePlanningDto';
import { SendAllPlanningDto } from './dto/send-all-planning.dto';

@ApiTags('Mailing') // <-- Catégorie pour Swagger UI
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/file/:folder/:img')
  @ApiOperation({ summary: 'Lire un fichier depuis le dossier upload' })
  @ApiParam({ name: 'folder', description: 'Nom du dossier', example: 'pv' })
  @ApiParam({ name: 'img', description: 'Nom du fichier image/pdf', example: 'rapport.pdf' })
  readFile(
    @Param('folder') folder: string,
    @Param('img') img: string
  ): StreamableFile {
    const file = createReadStream(join(process.cwd(), '/upload/' + folder + '/' + img));
    return new StreamableFile(file);
  }

  @Post('send')
  @ApiOperation({ summary: 'Envoyer un mail de planification à un enseignant' })
  @ApiBody({ type: SendMailDto })
  async sendMailToTeacher(@Body() body: SendMailDto) {
    const {
      to,
      teacherName,
      subjectTitle,
      date,
      heureDebut,
      heureFin,
      salle,
    } = body;

    await this.appService.sendPlanningMail(
      to,
      teacherName,
      subjectTitle,
      date,
      heureDebut,
      heureFin,
      salle
    );

    return { message: 'Mail envoyé avec succès' };
  }
@Post('send-planning')
@ApiOperation({ summary: 'Envoyer le planning à tous les membres du jury et aux étudiants' })
@ApiBody({ type: SendAllPlanningDto })
async sendPlanningToAll(@Body() body: SendAllPlanningDto) {
  const { soutenances } = body;

  const teacherMap = new Map<
    string,
    {
      name: string;
      role: string;
      plannings: {
        subjectTitle: string;
        date: string;
        heureDebut: string;
        heureFin: string;
        salle: string;
      }[];
    }
  >();

  // Stocker les fonctions d'envoi d'emails (pas encore lancées)
  const studentMailSenders: (() => Promise<any>)[] = [];
  const teacherMailSenders: (() => Promise<any>)[] = [];

  for (const soutenance of soutenances) {
    for (const member of soutenance.members) {
      if (!teacherMap.has(member.to)) {
        teacherMap.set(member.to, {
          name: member.name,
          role: member.role,
          plannings: [],
        });
      }

      const teacher = teacherMap.get(member.to);
      if (teacher) {
        teacher.plannings.push({
          subjectTitle: soutenance.subjectTitle,
          date: soutenance.date,
          heureDebut: soutenance.heureDebut,
          heureFin: soutenance.heureFin,
          salle: soutenance.salle,
        });
      }
    }

    // Préparer l'envoi mail à l'étudiant (fonction sans lancer)
    const { to, name } = soutenance.student;
    const encadrant = soutenance.members.find(m => m.role === 'examinateur')?.name || '';
    const rapporteur = soutenance.members.find(m => m.role === 'rapporteur')?.name || '';
    const president = soutenance.members.find(m => m.role === 'président')?.name || '';

    studentMailSenders.push(() => 
      this.appService.sendPlanningMailToStudent(
        to,
        name,
        soutenance.subjectTitle,
        soutenance.date,
        soutenance.heureDebut,
        soutenance.heureFin,
        soutenance.salle,
        encadrant,
        rapporteur,
        president,
      )
    );
  }

  // Préparer l'envoi mail à tous les enseignants (fonction sans lancer)
  for (const [email, data] of teacherMap.entries()) {
    teacherMailSenders.push(() =>
      this.appService.sendMultiplePlanningMail(
        email,
        data.name,
        data.role,
        data.plannings,
      )
    );
  }

  // Fonction utilitaire pour envoyer les emails avec délai entre chaque envoi
  async function sendEmailsWithDelay(sendFunctions: (() => Promise<any>)[], delayMs: number) {
    for (const sendFn of sendFunctions) {
      try {
        await sendFn();
      } catch (error) {
        console.error('Erreur en envoyant un email:', error);
        // Optionnel : continuer l'envoi même en cas d'erreur
      }
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  // Envoi des emails un par un avec un délai (exemple 1200 ms)
  await sendEmailsWithDelay(studentMailSenders, 1200);
  await sendEmailsWithDelay(teacherMailSenders, 1200);

  return { message: 'Plannings envoyés à tous les enseignants et étudiants.' };
}
}