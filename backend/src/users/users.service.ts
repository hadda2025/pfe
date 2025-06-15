import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { throws } from 'assert';
import { ObjectUnsubscribedError } from 'rxjs';
import { ISoutenance } from 'src/soutenances/interfaces/soutenance.interface';
import { ISujetfinetude } from 'src/sujetfinetudes/interfaces/sujetfinetude.interface';
@Injectable()
export class UsersService {
  //Inject Model
  constructor(@InjectModel('users') private userModel: Model<IUser>,


  ) { }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto)
    newUser.role = "Admin"
    return await newUser.save()
  }

  async createAgent(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto)
    newUser.role = "Agent"
    return await newUser.save()
  } 


  async findAll(): Promise<IUser[]> {
    const allUsers = await this.userModel.find()
    if (!allUsers || allUsers.length === 0) {
      throw new NotFoundException("there is no user")
    }
    return allUsers



  }

  async findOne(id: string): Promise<IUser> {
    const oneUser = await this.userModel.findById(id)
    if (!oneUser)
      throw new NotFoundException(" User does not found with this id")
    return oneUser
  }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const userUp = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    if (!userUp) {
      throw new NotFoundException("User does not found with this id")
    }
    return userUp
  }

  async remove(id: string): Promise<IUser> {
    const userRemove = await this.userModel.findByIdAndDelete(id)
    if (!userRemove) {
      throw new NotFoundException("User does not found with this id")
    }





    return userRemove
  }
  async findUserByEmail(email: string): Promise<IUser> {
    const userbyemail = await this.userModel.findOne({ email: email })
    if (!userbyemail) {
      throw new NotFoundException("User does not found with this email")
    }
    return userbyemail
  }

  async findUserByEmailForRegister(email: string): Promise<IUser> {
    const userbyemail = await this.userModel.findOne({ email: email })
   
    return userbyemail!
  } 

  async findUserByEmailForLogin(email: string): Promise<IUser> {
    const userbyemail = await this.userModel.findOne({ email: email })
    
    return userbyemail!
  } 
  
  async findUserByRole(role: string): Promise<IUser> {
    const userbyrole = await this.userModel.findOne({ role: role })
    if (!userbyrole) {
      throw new NotFoundException("User does not found with this role")
    }
    return userbyrole
  }
  async findUserAndResetPassword(email: any, password: any) {
    return await this.userModel.findOneAndUpdate(email, password)

  }
}
