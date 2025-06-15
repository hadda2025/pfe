import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProceDto } from './dto/create-proce.dto';
import { UpdateProceDto } from './dto/update-proce.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProce } from './interfaces/proce.interface';

@Injectable()
export class ProcesService {
  //Inject Model
     constructor(@InjectModel('proces') private proceModel:Model<IProce>){}
   
    async create(CreateProceDto: CreateProceDto):Promise<IProce> {
         const newProce=new this.proceModel(CreateProceDto)
         return await newProce.save()
     }
   async findAll() :Promise<IProce[]>{
      const allProces=await this.proceModel.find()
          if(!allProces|| allProces.length ===0){
            throw new NotFoundException("there is no proces")
          }
          return allProces
      
        }
    

   async findOne(id: string):Promise<IProce> {
      const oneProce=await this.proceModel.findById(id)
      if(!oneProce)
        throw new NotFoundException(" Proces does not found with this id")
      return oneProce
      } 
  async update(id: string, updateProceDto: UpdateProceDto) :Promise <IProce> {
        const proceUp=await this.proceModel.findByIdAndUpdate(id ,updateProceDto ,{new:true})
      if(!proceUp){
        throw new NotFoundException("Proces does not found with this id")
      }
      return proceUp
      }
  
   async remove(id: string):Promise <IProce>  {
       const ProceRemove=await this.proceModel.findByIdAndDelete(id)
       if(!ProceRemove){
         throw new NotFoundException("Proces does not found with this id")
       }
       return ProceRemove
       }
     }