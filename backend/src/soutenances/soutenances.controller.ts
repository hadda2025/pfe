import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  HttpException,
  NotFoundException,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SoutenancesService } from './soutenances.service';
import { CreateSoutenanceDto } from './dto/create-soutenance.dto';
import { UpdateSoutenanceDto } from './dto/update-soutenance.dto';
import { ISoutenance } from './interfaces/soutenance.interface';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('soutenances')
// @ApiBearerAuth('access-token')
// @UseGuards(AuthGuard("jwt"))
export class SoutenancesController {
  constructor(private readonly soutenancesService: SoutenancesService) { }

  @Post()
  async create(@Body() createDto: CreateSoutenanceDto) {
    try {
      const newSoutenance = await this.soutenancesService.create(createDto);
      return {
        message: 'Soutenance created successfully',
        status: HttpStatus.CREATED,
        data: newSoutenance,
      };
    } catch (error) {

      console.log("error in create soutenance ", error)
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const allSoutenances = await this.soutenancesService.findAll();
      return {
        message: 'Soutenances retrieved successfully',
        status: HttpStatus.OK,
        data: allSoutenances,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, status: 400, data: [] },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('findBySession/:id')
  async findBySession(@Param('id') id: string) {
    try {
      const results = await this.soutenancesService.findSoutenanceBySession(id);
      return {
        message: 'Soutenances found by session',
        status: HttpStatus.OK,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  


  @Get('available/:date/:roomId/:presidentId/:rapporteurId/:examinateurId')
async findAvailable(
  @Param('date') date: string,
  @Param('roomId') roomId: string,
   @Param('presidentId') presidentId: string,
  @Param('rapporteurId') rapporteurId: string,
   @Param('examinateurId') examinateurId: string
) {
  return this.soutenancesService.findAvailableSeances(date, roomId,presidentId,rapporteurId,examinateurId);
}











  @Get('findBySeance/:id')
  async findBySeance(@Param('id') id: string) {
    try {
      const results = await this.soutenancesService.findSoutenanceBySeance(id);
      return {
        message: 'Soutenances found by seance',
        status: HttpStatus.OK,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('findByRoom/:id')
  async findByRoom(@Param('id') id: string) {
    try {
      const results = await this.soutenancesService.findSoutenanceByRoom(id);
      return {
        message: 'Soutenances found by room',
        status: HttpStatus.OK,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('findByDate')
  async findByDate(@Query('date') date: string) {
    try {
      const results = await this.soutenancesService.findSoutenanceByDate(date);
      return {
        message: 'Soutenances found by date',
        status: HttpStatus.OK,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('findByStudent/:id')
  async findByStudent(@Param('id') id: string) {
    try {
      const results = await this.soutenancesService.findSoutenanceByStudent(id);
      return {
        message: 'Soutenances found by student',
        status: HttpStatus.OK,
        data: results,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('by-teacher')
  async findByTeacherName(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
  ) {
    return await this.soutenancesService.findSoutenanceByTeacherName(firstName, lastName);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const soutenance = await this.soutenancesService.findOne(id);
      return {
        message: 'Soutenance found',
        status: HttpStatus.OK,
        data: soutenance,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSoutenanceDto,
  ) {
    try {
      const updated = await this.soutenancesService.update(id, updateDto);
      return {
        message: 'Soutenance updated successfully',
        status: HttpStatus.OK,
        data: updated,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const removed = await this.soutenancesService.remove(id);
      return {
        message: 'Soutenance deleted successfully',
        status: HttpStatus.OK,
        data: removed,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message, data: null },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('enseignant/:id')
  getSoutenancesByEnseignant(@Param('id') id: string) {
    return this.soutenancesService.getByEnseignantId(id);
  }

 @Get('by-room/:roomName')
  async getBySalle(@Param('roomName') roomName: string) {
    if (!roomName) {
      throw new NotFoundException('Le nom de la salle est requis.');
    }

    const result = await this.soutenancesService.getBySalle(roomName);
    return result;
  }




  @Post('send-pdf')
  @UseInterceptors(
    FileInterceptor('pdf', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Seuls les fichiers PDF sont autorisés'),
            false,
          );
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  )

   @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string' },
       
          pdf: { type: 'string', format: 'binary' },
        
        },
      },
    })
  
  async sendPdf(
    @UploadedFile() pdf,
    @Body('email') email: string,
  ) {
    if (!pdf) {
      throw new BadRequestException('Aucun fichier PDF fourni');
    }
    if (!email) {
      throw new BadRequestException('Email manquant');
    }
    const pdfBuffer = fs.readFileSync(pdf.path);
    console.log('PDF path:', pdf.path);
    console.log('PDF size:', pdfBuffer.length); // Vérifie qu’il n’est pas 0
    fs.unlinkSync(pdf.path); // Après la lecture
    await this.soutenancesService.sendPdfToTeacherEmail(
      email,
      pdfBuffer,
      pdf.originalname,
    );
    return { message: 'PDF envoyé avec succès' };
  }









}


