import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { createSecretKey } from 'crypto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('sessions')
//@ApiBearerAuth('access-token') 
//@UseGuards(AuthGuard("jwt"))
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
   async create(@Body() CreateSessionDto: CreateSessionDto ,@Res() res) {
     try {
         const newSession=await this.sessionsService.create(CreateSessionDto)
         return res.status(HttpStatus.CREATED).json({
           message:"Sessions created successfully",
           status:HttpStatus.CREATED,
           data:newSession
         })
        }catch(error){
         return res.status(HttpStatus.BAD_REQUEST).json({
           message:error.message,
           status:HttpStatus.BAD_REQUEST,
           data:null
         })
     
        }
        
      }
     
   @Get()
   async  findAll(@Res()res) {
     try {
       const allSessions=await this.sessionsService.findAll()
       return res.status(HttpStatus.OK).json({
         message:"Data found successfully !",
         status:HttpStatus.OK,
         data:allSessions
       })
     }catch (error){
       return res.status(HttpStatus.BAD_REQUEST).json({
         message:error.message,
         status:HttpStatus.BAD_REQUEST,
         data:null
     })
   }
     }
 
   @Get(':id')
   async findOne(@Param('id') id: string,@Res()res) {
     try{
       const oneSession= await this.sessionsService.findOne(id)
       return res.status(HttpStatus.OK).json({
         message:"Session found by id",
         status:HttpStatus.OK,
         data:oneSession
       })
      } catch (error){
       return res.status(HttpStatus.BAD_REQUEST).json({
         message:error.message,
         status:HttpStatus.BAD_REQUEST,
         data:null
     })
     }
   }
 
   @Patch(':id')
    async update(@Param('id') id: string, @Body() UpdateSessionDto: UpdateSessionDto , @Res() res) {
      try
      {
      const sessionUp= await this.sessionsService.update(id ,UpdateSessionDto)
      return res.status(HttpStatus.OK).json({
        message:"session found by id",
        status:HttpStatus.OK,
        data:sessionUp
      })
     } catch (error){
      return res.status(HttpStatus.BAD_REQUEST).json({
        message:error.message,
        status:HttpStatus.BAD_REQUEST,
        data:null
    })
    }
   }
   @Delete(':id')
   async remove(@Param('id') id: string, @Res() res) {
    try
     {
     const sessionRemove= await this.sessionsService.remove(id)
     return res.status(HttpStatus.OK).json({
       message:"sessions deleted succefully",
       status:HttpStatus.OK,
       data:sessionRemove
     })
    } catch (error){
     return res.status(HttpStatus.BAD_REQUEST).json({
       message:error.message,
       status:HttpStatus.BAD_REQUEST,
       data:null
   })
   }   
    }
  }