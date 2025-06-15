import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { ISeance } from './interfaces/seance.interface';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';

import { PlageDate, PlageDateDocument } from 'src/plage-dates/entities/plage-date.entity';

@Injectable()
export class SeancesService {
  constructor(
    @InjectModel('seances') private seanceModel: Model<ISeance>,
    @InjectModel('soutenances') private soutenanceModel: Model<ISoutenance>,
   

  ) { }
  async create(createSeanceDto: CreateSeanceDto): Promise<ISeance> {
    // 1. Création de la séance
    const newSeance = new this.seanceModel(createSeanceDto);
    const savedSeance = await newSeance.save();

  

      

    // 3. Retourne la séance créée
    return savedSeance;
  }


  async findAll(): Promise<ISeance[]> {
    const allSeances = await this.seanceModel.find();

    if (!allSeances || allSeances.length === 0) {
      throw new NotFoundException('Aucune séance trouvée');
    }

   /*  const soutenances = await this.soutenanceModel.find().select('seance');
     const usedSeanceIds = soutenances.map(s => s.seance?.toString());
 
     const availableSeances = allSeances.filter(
       (seance: any) => !usedSeanceIds.includes(seance._id.toString())
     );
 */
   /*  return availableSeances ; */
   return allSeances
  }








  async findOne(id: string): Promise<ISeance> {
    const seance = await this.seanceModel.findById(id);
    if (!seance) {
      throw new NotFoundException('Séance non trouvée avec cet identifiant');
    }
    return seance;
  }

  async update(id: string, updateSeanceDto: UpdateSeanceDto): Promise<ISeance> {
    const updated = await this.seanceModel.findByIdAndUpdate(id, updateSeanceDto, { new: true });
    if (!updated) {
      throw new NotFoundException('Séance non trouvée pour mise à jour');
    }
    return updated;
  }

  async remove(id: string): Promise<ISeance> {
    const deleted = await this.seanceModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Séance non trouvée pour suppression');
    }
    return deleted;
  }

 




}
