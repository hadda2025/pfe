import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { IDocument } from './interfaces/document.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel('documents') private documentModel: Model<IDocument>,
    @InjectModel('soutenances') private soutenanceModel: Model<ISoutenance>
  ) { }

  async create(createDocumentDto: CreateDocumentDto): Promise<IDocument> {
    const newDocument = new this.documentModel(createDocumentDto);

    return await newDocument.save();
  }

  async findAll(): Promise<IDocument[]> {
    const allDocuments = await this.documentModel.find().populate("sujetfinetude");
    if (!allDocuments || allDocuments.length === 0) {
      throw new NotFoundException('There is no document');
    }
    return allDocuments;
  }

  async findOne(id: string): Promise<IDocument> {
    const oneDocument = await this.documentModel.findById(id);
    if (!oneDocument) {
      throw new NotFoundException('Document not found with this id');
    }
    return oneDocument;
  }

  async update(id: string, updateDocumentDto: UpdateDocumentDto): Promise<IDocument> {
    const documentUp = await this.documentModel.findByIdAndUpdate(id, updateDocumentDto, { new: true });
    if (!documentUp) {
      throw new NotFoundException('Document not found with this id');
    }
    return documentUp;
  }

  async remove(id: string): Promise<IDocument> {
    const documentRemove = await this.documentModel.findByIdAndDelete(id);
    if (!documentRemove) {
      throw new NotFoundException('Document not found with this id');
    }

    // Mise à jour de la soutenance pour retirer le document supprimé
    await this.soutenanceModel.updateOne(
      { _id: documentRemove.soutenance },
      { $pull: { documents: documentRemove._id } }
    );

    return documentRemove;
  }

  async findDocumentsBySujet(sujetfinetudeId: string) {
    return await this.documentModel
      .find({ sujetfinetude: sujetfinetudeId })  // Recherche par l'ID du sujetfinetude
      .select('fileUrl')  // Sélectionne uniquement le champ fileUrl
      .exec();
  }
  // Méthode pour récupérer les documents par sujetfinetude
  async findBySujet(sujetId: string)  {

    return await this.documentModel.find({ sujetfinetude: sujetId }).exec();
  }

  
}
