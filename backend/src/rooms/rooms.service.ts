import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { IRoom } from './interfaces/room.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomsService {
  //Inject Model
  constructor(@InjectModel('rooms') private roomModel:Model<IRoom>){}

 async create(createRoomDto: CreateRoomDto):Promise<IRoom> {
      const newRoom=new this.roomModel(createRoomDto)
      return await newRoom.save()
  }

  async findAll() :Promise<IRoom[]>{
    const allRooms=await this.roomModel.find()
        if(!allRooms|| allRooms.length ===0){
          throw new NotFoundException("there is no room")
        }
        return allRooms
    
      }
  

  async findOne(id: string):Promise<IRoom> {
    const oneRoom=await this.roomModel.findById(id)
    if(!oneRoom)
      throw new NotFoundException(" Room does not found with this id")
    return oneRoom
    } 

  async update(id: string, updateRoomDto: UpdateRoomDto) :Promise <IRoom> {
      const roomUp=await this.roomModel.findByIdAndUpdate(id ,updateRoomDto ,{new:true})
    if(!roomUp){
      throw new NotFoundException("Room does not found with this id")
    }
    return roomUp
    }

 async remove(id: string):Promise <IRoom>  {
     const roomRemove=await this.roomModel.findByIdAndDelete(id)
     if(!roomRemove){
       throw new NotFoundException("Romm  does not found with this id")
     }
     return roomRemove
     }
   }