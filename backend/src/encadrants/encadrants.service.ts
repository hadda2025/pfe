import { Injectable } from '@nestjs/common';
import { CreateEncadrantDto } from './dto/create-encadrant.dto';
import { UpdateEncadrantDto } from './dto/update-encadrant.dto';

@Injectable()
export class EncadrantsService {
  create(createEncadrantDto: CreateEncadrantDto) {
    return 'This action adds a new encadrant';
  }

  findAll() {
    return `This action returns all encadrants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encadrant`;
  }

  update(id: number, updateEncadrantDto: UpdateEncadrantDto) {
    return `This action updates a #${id} encadrant`;
  }

  remove(id: number) {
    return `This action removes a #${id} encadrant`;
  }
}
