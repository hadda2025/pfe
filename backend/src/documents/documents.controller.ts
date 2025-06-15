import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  // --- POST /documents ---
  @Post()
  @UseInterceptors(
    FileInterceptor('fileUrl', {
      storage: diskStorage({
        destination: './upload/document',
        filename: (_request, file, callback) =>
          callback(null, `${Date.now()}-${file.originalname}`),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        fileUrl: { type: 'string', format: 'binary' },
        sujetfinetude: { type: 'string' },
      },
    },
  })
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    try {
      createDocumentDto.fileUrl = file?.filename;
      const newDocument = await this.documentsService.create(createDocumentDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Document created successfully',
        status: HttpStatus.CREATED,
        data: newDocument,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // --- GET /documents ---
  @Get()
  async findAll(@Res() res) {
    try {
      const allDocuments = await this.documentsService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Documents retrieved successfully',
        status: HttpStatus.OK,
        data: allDocuments,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // --- GET /documents/:id ---
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const oneDocument = await this.documentsService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Document found',
        status: HttpStatus.OK,
        data: oneDocument,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // --- PATCH /documents/:id ---
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('fileUrl', {
      storage: diskStorage({
        destination: './upload/document',
        filename: (_request, file, callback) =>
          callback(null, `${Date.now()}-${file.originalname}`),
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        fileUrl: { type: 'string', format: 'binary' },
        Soutenance: { type: 'string' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    try {
      if (file) {
        updateDocumentDto.fileUrl = file.filename;
      }
      const updated = await this.documentsService.update(id, updateDocumentDto);
      return res.status(HttpStatus.OK).json({
        message: 'Document updated successfully',
        status: HttpStatus.OK,
        data: updated,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // --- DELETE /documents/:id ---
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const deleted = await this.documentsService.remove(id);
      return res.status(HttpStatus.OK).json({
        message: 'Document deleted successfully',
        status: HttpStatus.OK,
        data: deleted,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // --- GET /documents/sujetfinetude/:id ---
  @Get('sujetfinetude/:id')
  async findDocumentBySujet(
    @Param('id') sujetfinetudeId: string,
    @Res() res,
  ) {
    try {
      // Recherche des documents associés au sujetfinetudeId
      const documents = await this.documentsService.findDocumentsBySujet(sujetfinetudeId);

      // Vérification qu'il y a des documents pour ce sujetfinetude
      if (!documents || documents.length === 0) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'No documents found for this subject',
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      }

      // Si des documents sont trouvés, renvoie les données
      return res.status(HttpStatus.OK).json({
        message: 'Documents for subject retrieved successfully',
        status: HttpStatus.OK,
        data: documents,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  // --- GET /documents/view/:id --- (Afficher le fichier directement)
  @Get('view/:id')
  async viewDocument(@Param('id') id: string, @Res() res) {
    try {
      const document = await this.documentsService.findOne(id);

      if (!document) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Document not found',
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      }

      // Envoi du fichier directement dans la réponse
      return res.sendFile(document.fileUrl, { root: './upload/document' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

 // --- GET /documents/sujet/:sujetId --- (Afficher les documents associés à un sujet)
 @Get('sujet/:sujetId')
 async getDocumentsBySujet(@Param('sujetId') sujetId: string, @Res() res) {
   try {
     // Récupérer tous les documents associés à ce sujet
     const documents = await this.documentsService.findBySujet(sujetId);

     if (!documents || documents.length === 0) {
       return res.status(HttpStatus.NOT_FOUND).json({
         message: 'No documents found for this subject',
         status: HttpStatus.NOT_FOUND,
         data: null,
       });
     }

     var id:any=documents[0]._id;
     try {
      const document = await this.documentsService.findOne(id);

      if (!document) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Document not found',
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      }

      // Envoi du fichier directement dans la réponse
      return res.sendFile(document.fileUrl, { root: './upload/document' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      }); 
    }
   } catch (error) {
     return res.status(HttpStatus.BAD_REQUEST).json({
       message: error.message,
       status: HttpStatus.BAD_REQUEST,
       data: null,
     });
   }
 }
 
  
}


