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
} from '@nestjs/common';
import { SujetfinetudesService } from './sujetfinetudes.service';
import { CreateSujetfinetudeDto } from './dto/create-sujetfinetude.dto';
import { UpdateSujetfinetudeDto } from './dto/update-sujetfinetude.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags("Sujets de fin d'études")
@Controller('sujetfinetudes')
export class SujetfinetudesController {
  constructor(private readonly sujetfinetudesService: SujetfinetudesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un sujet de fin d\'études' })
  @ApiBody({ type: CreateSujetfinetudeDto })
  @ApiResponse({ status: 201, description: 'Sujet créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  async create(@Body() createSujetDto: CreateSujetfinetudeDto, @Res() res) {
    try {
      const newSujet = await this.sujetfinetudesService.create(createSujetDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Sujet créé avec succès',
        data: newSujet,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les sujets (avec relations)' })
  @ApiResponse({ status: 200, description: 'Liste des sujets récupérée avec succès.' })
  async findAll(@Res() res) {
    try {
      const sujets = await this.sujetfinetudesService.findAllWithPopulate();
      return res.status(HttpStatus.OK).json({
        message: 'Liste des sujets récupérée avec succès',
        data: sujets,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }
   @Get('all')
  @ApiOperation({ summary: 'Récupérer tous les sujets (affectuer et non affectuer)' })
  @ApiResponse({ status: 200, description: 'Liste des sujets récupérée avec succès.' })
  async findAllsuejt(@Res() res) {
    try {
      const sujets = await this.sujetfinetudesService.findAllsujet();
      return res.status(HttpStatus.OK).json({
        message: 'Liste des sujets récupérée avec succès',
        data: sujets,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }

   @Get('jury')
  async getAllJury() {
    return await this.sujetfinetudesService.getAllJury();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un sujet par ID (avec relations)' })
  @ApiParam({ name: 'id', description: 'ID du sujet' })
  @ApiResponse({ status: 200, description: 'Sujet trouvé.' })
  @ApiResponse({ status: 404, description: 'Sujet non trouvé.' })
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const sujet = await this.sujetfinetudesService.findOneWithPopulate(id);
      return res.status(HttpStatus.OK).json({
        message: 'Sujet trouvé',
        data: sujet,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un sujet' })
  @ApiParam({ name: 'id', description: 'ID du sujet à mettre à jour' })
  @ApiBody({ type: UpdateSujetfinetudeDto })
  @ApiResponse({ status: 200, description: 'Sujet mis à jour.' })
  async update(
    @Param('id') id: string,
    @Body() updateSujetDto: UpdateSujetfinetudeDto,
    @Res() res,
  ) {
    try {
      const updated = await this.sujetfinetudesService.update(id, updateSujetDto);
      return res.status(HttpStatus.OK).json({
        message: 'Sujet mis à jour avec succès',
        data: updated,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un sujet' })
  @ApiParam({ name: 'id', description: 'ID du sujet à supprimer' })
  @ApiResponse({ status: 200, description: 'Sujet supprimé avec succès.' })
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const removed = await this.sujetfinetudesService.remove(id);
      return res.status(HttpStatus.OK).json({
        message: 'Sujet supprimé avec succès',
        data: removed,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }

  @Post(':id/affecter-jury')
  @ApiOperation({ summary: 'Affecter un jury à un sujet' })
  @ApiParam({ name: 'id', description: 'ID du sujet de fin d\'étude' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        presidentId: { type: 'string' },
        rapporteurId: { type: 'string' },
        examinateurId: { type: 'string' },
      },
      required: ['presidentId', 'rapporteurId', 'examinateurId'],
    },
  })
  @ApiResponse({ status: 200, description: 'Jury affecté avec succès.' })
  async affecterJury(
    @Param('id') id: string,
    @Body() body: { presidentId: string; rapporteurId: string; examinateurId: string },
    @Res() res,
  ) {
    try {
      const updated = await this.sujetfinetudesService.affecterJury(
        id,
        body.presidentId,
        body.rapporteurId,
        body.examinateurId,
      );
      return res.status(HttpStatus.OK).json({
        message: 'Jury affecté avec succès',
        data: updated,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        data: null,
      });
    }
  }
}
