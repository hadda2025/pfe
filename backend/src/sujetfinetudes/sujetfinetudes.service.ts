import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSujetfinetudeDto } from './dto/create-sujetfinetude.dto';
import { UpdateSujetfinetudeDto } from './dto/update-sujetfinetude.dto';
import { ISujetfinetude } from './interfaces/sujetfinetude.interface';
import { ITeacher } from 'src/teachers/interfaces/teacher.interface';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';

@Injectable()
export class SujetfinetudesService {
  constructor(
    @InjectModel('sujetfinetudes')
    private readonly sujetfinetudeModel: Model<ISujetfinetude>,
        @InjectModel('soutenances') private soutenanceModel: Model<ISoutenance>,
    

    @InjectModel('teachers')
    private readonly teacherModel: Model<ITeacher>,
  ) { }

  // ✅ Création d’un sujet
  async create(
    createSujetDto: CreateSujetfinetudeDto,
  ): Promise<ISujetfinetude> {


    // Création et sauvegarde du sujet
    const newSujet = new this.sujetfinetudeModel(createSujetDto);
    const savedSujet = await newSujet.save();


    return savedSujet;
  }

  async findAll(): Promise<ISujetfinetude[]> {
    // Étape 1 : récupérer les sujets déjà utilisés dans les soutenances
    const soutenances = await this.soutenanceModel.find().select('sujetfinetude'); // sujet: ObjectId

    const sujetsAffectesIds = soutenances.map((s:any) => s.sujet);

    // Étape 2 : retourner uniquement les sujets NON affectés
    const sujets = await this.sujetfinetudeModel.find({ _id: { $nin: sujetsAffectesIds } });

    if (!sujets || sujets.length === 0) {
      throw new NotFoundException('Aucun sujet non affecté trouvé');
    }

    return sujets;
  }


  // ✅ Version filtrée même si le champ "soutenance" n'est pas dans SujetFinEtude
async findAllWithPopulate(): Promise<ISujetfinetude[]> {
  // Étape 1 : trouver tous les sujets déjà associés à une soutenance
  const soutenances = await this.soutenanceModel.find().select('sujetfinetude'); // récupère les ObjectId de sujets

  const sujetsAffectesIds = soutenances.map((s:any) => s.sujetfinetude._id); 

  // Étape 2 : filtrer les sujets qui ne sont pas dans cette liste
  const sujets = await this.sujetfinetudeModel
   .find({ _id: { $nin: sujetsAffectesIds } }) 
  
    .populate('teacher')
    .populate('student');

  if (!sujets || sujets.length === 0) {
    throw new NotFoundException('Aucun sujet non affecté trouvé');
  }

  return sujets;
}


async findAllsujet(): Promise<ISujetfinetude[]> {
  // Étape 1 : trouver tous les sujets déjà associés à une soutenance
/*   const soutenances = await this.soutenanceModel.find().select('sujetfinetude'); // récupère les ObjectId de sujets

  const sujetsAffectesIds = soutenances.map((s:any) => s.sujetfinetude._id); */

  // Étape 2 : filtrer les sujets qui ne sont pas dans cette liste
  const sujets = await this.sujetfinetudeModel
   /*  .find({ _id: { $nin: sujetsAffectesIds } }) */
   .find()
    .populate('teacher')
    .populate('student');

  if (!sujets || sujets.length === 0) {
    throw new NotFoundException('Aucun sujet non affecté trouvé');
  }

  return sujets;
}






  // Récupération de la liste des jurys affectés à chaque sujet

  async getAllJury(): Promise<any[]> {
    try {
      const sujets = await this.sujetfinetudeModel
        .find()
        .populate('president', 'lastName firstName')
        .populate('rapporteur', 'lastName firstName')
        .populate('examinateur', 'lastName firstName')
        .populate('student', 'firstName lastName'); // 👈 Ajout ici

      if (!sujets || sujets.length === 0) {
        throw new NotFoundException('Aucun sujet avec jury trouvé');
      }

      return sujets.map((sujet) => ({
        sujetId: sujet._id,
        titre: sujet.namesujet,
        president: sujet.president,
        rapporteur: sujet.rapporteur,
        examinateur: sujet.examinateur,
        student: sujet.student, // 👈 Et ici on le renvoie
      }));
    } catch (error) {
      console.error('Erreur dans getAllJury:', error);
      throw new Error('Erreur interne lors de la récupération du jury');
    }
  }









  // ✅ Récupérer un seul sujet
  async findOne(id: string): Promise<ISujetfinetude> {
    const sujet = await this.sujetfinetudeModel.findById(id);
    if (!sujet) {
      throw new NotFoundException('Sujet non trouvé');
    }
    return sujet;
  }

  // ✅ Récupérer un sujet avec relations
  async findOneWithPopulate(id: string): Promise<ISujetfinetude> {
    const sujet = await this.sujetfinetudeModel
      .findById(id)
      .populate('president', 'lastName firstName')
      .populate('rapporteur', 'lastName firstName')
      .populate('examinateur', 'lastName firstName')
      .populate('student', 'firstName lastName')
      .populate('teacher', 'firstName lastName'); // 👈 Ajout ici

    if (!sujet) {
      throw new NotFoundException('Sujet non trouvé');
    }
    return sujet;
  }

  // ✅ Mise à jour d’un sujet
  async update(
    id: string,
    updateSujetDto: UpdateSujetfinetudeDto,
  ): Promise<ISujetfinetude> {
    const updated = await this.sujetfinetudeModel.findByIdAndUpdate(
      id,
      updateSujetDto,
      { new: true },
    );
    if (!updated) {
      throw new NotFoundException('Sujet non trouvé');
    }
    return updated;
  }

  // ✅ Suppression d’un sujet
  async remove(id: string): Promise<ISujetfinetude> {
    const sujet = await this.sujetfinetudeModel.findByIdAndDelete(id);
    if (!sujet) {
      throw new NotFoundException('Sujet non trouvé');
    }
    return sujet.toObject();
  }
  // Affectation du jury à un sujet
  async affecterJury(
    sujetId: string,
    presidentId: string,
    rapporteurId: string,
    examinateurId: string,
  ): Promise<ISujetfinetude> {
    const sujet = await this.sujetfinetudeModel.findById(sujetId);
    if (!sujet) {
      throw new NotFoundException('Sujet non trouvé');
    }

    // Vérification de l'existence des enseignants
    const president = await this.teacherModel.findById(presidentId);
    const rapporteur = await this.teacherModel.findById(rapporteurId);
    const examinateur = await this.teacherModel.findById(examinateurId);

    if (!president || !rapporteur || !examinateur) {
      throw new BadRequestException('Un ou plusieurs enseignants n\'existent pas');
    }

    // Mise à jour des rôles du jury dans le sujet
    sujet.president = presidentId;
    sujet.rapporteur = rapporteurId;
    sujet.examinateur = examinateurId;

    return await sujet.save();
  }


}
