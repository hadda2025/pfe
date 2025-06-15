import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { catchError } from 'rxjs';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('rooms')
//@ApiBearerAuth('access-token') 
//@UseGuards(AuthGuard("jwt"))
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto ,@Res() res) {
    try {
        const newRoom=await this.roomsService.create(createRoomDto)
        return res.status(HttpStatus.CREATED).json({
          message:"Romm created successfully",
          status:HttpStatus.CREATED,
          data:newRoom
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
      const allRooms=await this.roomsService.findAll()
      return res.status(HttpStatus.OK).json({
        message:"Data found successfully !",
        status:HttpStatus.OK,
        data:allRooms
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
      const oneRoom= await this.roomsService.findOne(id)
      return res.status(HttpStatus.OK).json({
        message:"Romm found by id",
        status:HttpStatus.OK,
        data:oneRoom
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
   async update(@Param('id') id: string, @Body() UpdateRoomDto: UpdateRoomDto , @Res() res) {
     try
     {
     const roomUp= await this.roomsService.update(id ,UpdateRoomDto)
     return res.status(HttpStatus.OK).json({
       message:"room found by id",
       status:HttpStatus.OK,
       data:roomUp
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
    const roomRemove= await this.roomsService.remove(id)
    return res.status(HttpStatus.OK).json({
      message:"room deleted succefully",
      status:HttpStatus.OK,
      data:roomRemove
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