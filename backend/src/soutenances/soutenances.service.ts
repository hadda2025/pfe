import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ISoutenance } from './interfaces/soutenance.interface';
import { IRoom } from 'src/rooms/interfaces/room.interface';
import { ITeacher } from 'src/teachers/interfaces/teacher.interface';
import { IStudent } from 'src/students/interfaces/student.interface';

import { ISeance } from 'src/seances/interfaces/seance.interface';

import { CreateSoutenanceDto } from './dto/create-soutenance.dto';
import { UpdateSoutenanceDto } from './dto/update-soutenance.dto';
import { ISession } from 'src/sessions/interfaces/session .interface';
import { Seance } from 'src/seances/entities/seance.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { IPlageDate } from 'src/plage-dates/interfaces/plageDate.interface';
import { PlageDate } from 'src/plage-dates/entities/plage-date.entity';

@Injectable()
export class SoutenancesService {
  constructor(
    @InjectModel('soutenances') private soutenanceModel: Model<ISoutenance>,
    @InjectModel('sessions') private sessionModel: Model<ISession>,
    @InjectModel('rooms') private roomModel: Model<IRoom>,
    @InjectModel('teachers') private teacherModel: Model<ITeacher>,
    @InjectModel('students') private studentModel: Model<IStudent>,
    @InjectModel('seances') private seanceModel: Model<ISeance>,
    @InjectModel(PlageDate.name) private plageDateModel: Model<IPlageDate>,
    private mailerService:MailerService,
  ) {}

  async create(dto: CreateSoutenanceDto): Promise<ISoutenance> {
    const juryIds = [dto.president, dto.rapporteur, dto.examinateur];

    const seance = await this.seanceModel.findById(dto.seance);
    if (!seance) {
      throw new NotFoundException('Séance introuvable');
    }

    const dateSoutenance = seance;

    const conflits = await this.soutenanceModel.find({
      plage: dto.plage,
      date: dateSoutenance,
      $or: [
        { president: { $in: juryIds } },
        { rapporteur: { $in: juryIds } },
        { examinateur: { $in: juryIds } },
      ],
    });

    if (conflits.length > 0) {
      throw new BadRequestException(
        'Conflit détecté : un membre du jury est déjà affecté à cette date et plage horaire.',
      );
    }

    const newSoutenance = new this.soutenanceModel({
      ...dto,
      date: dateSoutenance,
    });
    await newSoutenance.save();

    await this.sessionModel.updateOne(
      { _id: dto.session },
      { $push: { soutenances: newSoutenance._id } },
    );

    await this.roomModel.updateOne(
      { _id: dto.room },
      { $push: { soutenance: newSoutenance._id } },
    );

    return newSoutenance;
  }

  async findAll(): Promise<any[]> {
    const result = await this.soutenanceModel
      .find()
      .populate('documents')
      .populate({
        path: 'sujetfinetude',
        populate: { path: 'student' },
      })
      .populate('president')
      .populate('examinateur')
      .populate('rapporteur')
      .populate('seance')
      .populate('plage')
      .populate('session')
      .populate('room');


    return result;
  }

  async findOne(id: string): Promise<ISoutenance> {
    
    const found = await this.soutenanceModel.findById(id)
      
    
  

      
     
   
;

    if (!found)
      throw new NotFoundException('Soutenance introuvable avec cet ID');
    return found;
  }

  async update(
    id: string,
    updateDto: UpdateSoutenanceDto,
  ): Promise<ISoutenance> {
    const updated = await this.soutenanceModel.findByIdAndUpdate(
      id,
      updateDto,
      { new: true },
    );
    if (!updated)
      throw new NotFoundException('Soutenance introuvable avec cet ID');
    return updated;
  }

  async remove(id: string): Promise<ISoutenance> {
    const removed = await this.soutenanceModel.findByIdAndDelete(id);
    if (!removed)
      throw new NotFoundException('Soutenance introuvable avec cet ID');

    await this.sessionModel.updateOne(
      { _id: removed.session },
      { $pull: { soutenances: removed._id } },
    );
    await this.roomModel.updateOne(
      { _id: removed.room },
      { $pull: { soutenance: removed._id } },
    );

    return removed;
  }

  async findSoutenanceBySession(session: string): Promise<ISoutenance[]> {
    const list = await this.soutenanceModel.find({ session });
    if (!list.length) {
      throw new NotFoundException(
        'Aucune soutenance trouvée pour cette session',
      );
    }
    return list;
  }

  async findSoutenanceByRoom(room: string): Promise<ISoutenance[]> {
    const list = await this.soutenanceModel.find({ room });
    if (!list.length) {
      throw new NotFoundException('Aucune soutenance trouvée pour cette salle');
    }
    return list;
  }


  async findSoutenanceBySeance(seance: string): Promise<ISoutenance[]> {
  const list = await this.soutenanceModel.find({ seance});
  if (!list.length) {
    throw new NotFoundException('Aucune soutenance trouvée pour cette séance');
  }
  return list;
}

  async findSoutenanceByDate(date: string): Promise<ISoutenance[]> {
    const list = await this.soutenanceModel.find({ date });
    if (!list.length) {
      throw new NotFoundException('Aucune soutenance trouvée pour cette date');
    }
    return list;
  }

  async findSoutenanceByStudent(student: string): Promise<ISoutenance[]> {
    const list = await this.soutenanceModel.find({ student });
    if (!list.length) {
      throw new NotFoundException(
        'Aucune soutenance trouvée pour cet étudiant',
      );
    }
    return list;
  }

  async getByEnseignantId(id: string): Promise<ISoutenance[]> {
    return this.soutenanceModel
      .find({
        $or: [
          { president: id },
          { rapporteur: id },
          { examinateur: id },
        ],
      })
      .populate(['sujetfinetude', 'room', 'session']);
  }

  async findSoutenanceByTeacherName(
    firstName: string,
    lastName: string,
  ): Promise<ISoutenance[]> {
    const teacher = await this.teacherModel.findOne({ firstName, lastName });

    if (!teacher) {
      throw new NotFoundException(
        `Enseignant ${firstName} ${lastName} introuvable`,
      );
    }

    return this.soutenanceModel.find({
      $or: [
        { president: teacher._id },
        { rapporteur: teacher._id },
        { examinateur: teacher._id },
      ],
    });
  }


async findAvailableSeances(
  date: string,
  roomId: string,
  presidentId: string,
  rapporteurId: string,
  examinateurId: string
): Promise<ISeance[]> {
  // 2. Trouver toutes les plages de dates qui incluent la date spécifiée
  const plages = await this.plageDateModel.find({
 dateDebut: { $lte: date },
    dateFin: { $gte: date }
  }).lean();
  if (plages.length === 0) {
    throw new NotFoundException('Aucune plage de date trouvée pour cette date');
  }
  const plageIds = plages.map(plage => plage._id);
  // 3. Trouver toutes les soutenances qui ont une plage correspondante
  const soutenances = await this.soutenanceModel.find({
    plage: { $in: plageIds }
  })
  .populate('seance')
  .populate('room')
  .populate('president')
  .populate('rapporteur')
  .populate('examinateur')
  .lean();
  // 4. Récupérer toutes les séances existantes
  const allSeances = await this.seanceModel.find().lean();
  // 5. Créer un Set des IDs des membres du jury à vérifier (en éliminant les doublons)
  const juryMembers = new Set<string>([
    presidentId,
    rapporteurId,
    examinateurId
  ].filter(id => id));
  // 6. Filtrer les séances disponibles
  const availableSeances = allSeances.filter(seance => {
    // Trouver les soutenances qui utilisent cette séance
    const seanceSoutenances = soutenances.filter(s =>
      s.seance && s.seance._id.toString() === seance._id.toString()
    );
    // Vérifier si la salle est déjà occupée pour cette séance
    const isRoomOccupied = seanceSoutenances.some(s =>
      s.room && s.room._id.toString() === roomId
    );
    // Vérifier si un membre du jury est déjà occupé pour cette séance (quel que soit son rôle)
    const isJuryBusy = seanceSoutenances.some(s => {
      return (
        (s.president && juryMembers.has(s.president._id.toString())) ||
        (s.rapporteur && juryMembers.has(s.rapporteur._id.toString())) ||
        (s.examinateur && juryMembers.has(s.examinateur._id.toString()))
      );
    });
    // La séance est disponible si:
    // 1. La salle n'est pas occupée pour cette séance
    // 2. Aucun membre du jury n'est déjà occupé pour cette séance (quel que soit son rôle)
    return !isRoomOccupied && !isJuryBusy;
  });
  // 7. Logs pour le débogage
  console.log('=== DEBUG ===');
  console.log('Membres du jury à vérifier:', Array.from(juryMembers));
  console.log('Séances disponibles:', availableSeances.map(s => `${s.heureDebut} - ${s.heureFin}`));
  if (availableSeances.length === 0) {
    throw new NotFoundException('Aucune séance disponible trouvée pour les critères spécifiés');
  }
  return availableSeances;
}









































































































async getBySalle(roomName: string): Promise<any> {
  try {
    // 1. Trouver la salle par son nom
    const room = await this.roomModel.findOne({ nom: roomName }).exec();
    if (!room) {
      throw new NotFoundException(`Salle avec le nom "${roomName}" non trouvée.`);
    }

    // 2. Chercher les soutenances par l'id de la salle
    const soutenances = await this.soutenanceModel
      .find({ room: room._id })
      .populate('documents')
      .populate({
        path: 'sujetfinetude',
        populate: { path: 'student' }
      })
      .populate('president')
      .populate('examinateur')
      .populate('rapporteur')
      .populate('seance')
      .populate('plage')
      .populate('session')
      .populate('room')
      .exec();

    return { data: soutenances };
  } catch (error) {
    console.error('Erreur dans getBySalle:', error.message, error.stack);
    throw new InternalServerErrorException('Erreur lors de la récupération des soutenances.');
  }
}



async sendPdfToEmail(
    email: string,
    subject: string,
    text: string,
    pdfBuffer: Buffer,
    filename: string,
  ): Promise<void> {
    // Convertir le PDF en base64
    const base64Pdf = pdfBuffer.toString('base64');
    // Préparer l’URL de téléchargement inline
    const pdfDataUrl = `data:application/pdf;base64,${base64Pdf}`;
    const html = `
      <p>${text}</p>
      <p>
        <a href="${pdfDataUrl}" download="${filename}">
           Télécharger le document PDF
        </a>
      </p>
    `;
    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
      text,
    });
  }
  async sendPdfToTeacherEmail(
    email: string,
    pdfBuffer: Buffer,
    filename: string,
  ): Promise<void> {
    // Validation de l'email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      throw new BadRequestException('Email invalide');
    }
    await this.sendPdfToEmail(
      email,
      'Document PDF important',
      'Veuillez trouver ci-joint le document PDF demandé.\n\nCordialement,',
      pdfBuffer,
      filename,
    );
  }
}
