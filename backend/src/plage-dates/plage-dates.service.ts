import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlageDateDto } from './dto/create-plage-date.dto';
import { UpdatePlageDateDto } from './dto/update-plage-date.dto';
import { PlageDate, PlageDateDocument } from './entities/plage-date.entity';

@Injectable()
export class PlageDateService {
  constructor(
    @InjectModel(PlageDate.name) private plageDateModel: Model<PlageDateDocument>,
  ) { }

  async create(dto: CreatePlageDateDto): Promise<PlageDate> {
    const newPlage = new this.plageDateModel(dto);
    return await newPlage.save();
  }

  async findAll(): Promise<PlageDate[]> {
    return await this.plageDateModel.find().exec();
  }

  async findOne(id: string): Promise<PlageDate> {
    const found = await this.plageDateModel.findById(id);
    if (!found) throw new NotFoundException('PlageDate not found');
    return found;
  }

  async update(id: string, dto: UpdatePlageDateDto): Promise<PlageDate> {
    const updated = await this.plageDateModel.findByIdAndUpdate(id, dto, { new: true });
    if (!updated) throw new NotFoundException('PlageDate not found');
    return updated;
  }

  async remove(id: string): Promise<PlageDate> {
    const removed = await this.plageDateModel.findByIdAndDelete(id);
    if (!removed) throw new NotFoundException('PlageDate not found');
    return removed;
  }

  
}
