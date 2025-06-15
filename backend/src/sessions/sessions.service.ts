import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISession } from './interfaces/session .interface';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';

@Injectable()
export class SessionsService {
  //Inject Model
    constructor(@InjectModel('sessions') private sessionModel:Model<ISession>
      
  ){}

 async create(createSessionDto: CreateSessionDto):Promise<ISession> {
       const newSession=new this.sessionModel(createSessionDto)
       
       return await newSession.save()
   }
 
   async findAll() :Promise<ISession[]>{
     const allSessions=await this.sessionModel.find()
         if(!allSessions|| allSessions.length ===0){
           throw new NotFoundException("there is no session")
         }
         return allSessions
     
       }
   
 
   async findOne(id: string):Promise<ISession> {
     const oneSession=await this.sessionModel.findById(id)
     if(!oneSession)
       throw new NotFoundException(" Session does not found with this id")
     return oneSession
     } 
 
   async update(id: string, updateSessionDto: UpdateSessionDto) :Promise <ISession> {
       const sessionUp=await this.sessionModel.findByIdAndUpdate(id ,updateSessionDto ,{new:true})
     if(!sessionUp){
       throw new NotFoundException("Session does not found with this id")
     }
     return sessionUp
     }
 
  async remove(id: string):Promise <ISession>  {
      const sessionRemove=await this.sessionModel.findByIdAndDelete(id)
      if(!sessionRemove){
        throw new NotFoundException("Session  does not found with this id")
      }
      return sessionRemove
      }
    }