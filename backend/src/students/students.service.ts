import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';

@Injectable()
export class StudentsService {
  //Inject Model
  constructor(@InjectModel('students') private studentModel ) { }
  
  async create(CreateStudentDto: CreateStudentDto) {
    const newstudent = new this.studentModel(CreateStudentDto)
    return await newstudent.save()
  }


  async findAll() {
    const allStudents = await this.studentModel.find()
    if (!allStudents || allStudents.length === 0) {
      throw new NotFoundException("there is no students")
    }
    return allStudents

  }

  async findOne(id: string) {
    const oneStudent = await this.studentModel.findById(id)
    if (!oneStudent)
      throw new NotFoundException(" Student does not found with this id")
    return oneStudent
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const studentUp = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true })
    if (!studentUp) {
      throw new NotFoundException("Student does not found with this id")
    }
    return studentUp
  }

  async remove(id: string) {
    const studentRemove = await this.studentModel.findByIdAndDelete(id)
    if (!studentRemove) {
      throw new NotFoundException("Student does not found with this id")
    }
    return studentRemove
  }
}