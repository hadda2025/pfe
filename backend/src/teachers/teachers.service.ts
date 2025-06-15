import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ITeacher } from './interfaces/teacher.interface';
import { Model } from 'mongoose';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';

@Injectable()
export class TeachersService {
  //Inject Model
  constructor(@InjectModel('teachers') private teacherModel:Model<ITeacher>,
  @InjectModel('soutenances') private soutenanceModel: Model<ISoutenance>
) {}
  
   async create(createTeacherDto: CreateTeacherDto):Promise<ITeacher> {
         const newTeacher=new this.teacherModel(createTeacherDto)
         return await newTeacher.save()
     }
   
     async findAll() :Promise<ITeacher[]>{
       const allTeachers=await this.teacherModel.find()
           if(! allTeachers||  allTeachers.length ===0){
             throw new NotFoundException("there is no Teacher")
           }
           return  allTeachers
       
         }
     
   
     async findOne(id: string):Promise<ITeacher> {
       const oneTeacher=await this.teacherModel.findById(id)
       if(!oneTeacher)
         throw new NotFoundException(" Teacher does not found with this id")
       return oneTeacher
       } 
   
     async update(id: string, UpdateTeacherDto: UpdateTeacherDto) :Promise <ITeacher> {
         const TeacherUp=await this.teacherModel.findByIdAndUpdate(id ,UpdateTeacherDto ,{new:true})
       if(!TeacherUp){
         throw new NotFoundException("Teacher does not found with this id")
       }
       return TeacherUp
       }
   
    async remove(id: string):Promise <ITeacher>  {
        const teacherRemove=await this.teacherModel.findByIdAndDelete(id)
        if(!teacherRemove){
          throw new NotFoundException("Teacher does not found with this id")
        }
        return teacherRemove
        }



}
      