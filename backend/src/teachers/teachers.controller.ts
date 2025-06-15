import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, BadRequestException, Query } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('teachers')
//@ApiBearerAuth('access-token') 
//@UseGuards(AuthGuard("jwt"))//
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
   async create(@Body() CreateTeacherDto: CreateTeacherDto ,@Res() res) {
     try {
      const newTeacher=await this.teachersService.create(CreateTeacherDto)
      return res.status(HttpStatus.CREATED).json({
        message:"teacher created successfully",
        status:HttpStatus.CREATED,
        data:newTeacher
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
        const allTeachers=await this.teachersService.findAll()
        return res.status(HttpStatus.OK).json({
          message:"Data found successfully !",
          status:HttpStatus.OK,
          data:allTeachers
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
        const oneTeacher= await this.teachersService.findOne(id)
        return res.status(HttpStatus.OK).json({
          message:"Teacher found by id",
          status:HttpStatus.OK,
          data:oneTeacher
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
     async update(@Param('id') id: string, @Body() UpdateTeacherDto: UpdateTeacherDto , @Res() res) {
       try
       {
       const teacherUp= await this.teachersService.update(id ,UpdateTeacherDto)
       return res.status(HttpStatus.OK).json({
         message:"teacher found by id",
         status:HttpStatus.OK,
         data:teacherUp
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
      const teacherRemove= await this.teachersService.remove(id)
      return res.status(HttpStatus.OK).json({
        message:"teacher deleted succefully",
        status:HttpStatus.OK,
        data: teacherRemove
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
   