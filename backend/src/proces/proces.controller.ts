import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProcesService } from './proces.service';
import { CreateProceDto } from './dto/create-proce.dto';
import { UpdateProceDto } from './dto/update-proce.dto';

@Controller('proces')
export class ProcesController {
  constructor(private readonly procesService: ProcesService) {}

  @Post()
   async create(@Body() CreateProceDto: CreateProceDto ,@Res() res) {
     try {
         const newProce=await this.procesService.create(CreateProceDto)
         return res.status(HttpStatus.CREATED).json({
           message:"Proces created successfully",
           status:HttpStatus.CREATED,
           data:newProce
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
          const allProces=await this.procesService.findAll()
          return res.status(HttpStatus.OK).json({
            message:"Data found successfully !",
            status:HttpStatus.OK,
            data:allProces
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
            const oneProce= await this.procesService.findOne(id)
            return res.status(HttpStatus.OK).json({
              message:"Proces found by id",
              status:HttpStatus.OK,
              data:oneProce
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
    async update(@Param('id') id: string, @Body() UpdateProceDto: UpdateProceDto , @Res() res) {
      try
      {
      const ProceUp= await this.procesService.update(id ,UpdateProceDto)
      return res.status(HttpStatus.OK).json({
        message:"Proces found by id",
        status:HttpStatus.OK,
        data:ProceUp
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
     const proceRemove= await this.procesService.remove(id)
     return res.status(HttpStatus.OK).json({
       message:"Proces deleted succefully",
       status:HttpStatus.OK,
       data:proceRemove
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
