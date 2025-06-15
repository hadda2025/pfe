import { 
  Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus 
} from '@nestjs/common';
import { PlageDateService } from './plage-dates.service';
import { CreatePlageDateDto } from './dto/create-plage-date.dto';
import { UpdatePlageDateDto } from './dto/update-plage-date.dto';

@Controller('plage-dates')
export class PlageDateController {
  constructor(private readonly plageDateService: PlageDateService) {}

  @Post()
  async create(@Body() dto: CreatePlageDateDto) {
    try {
      const data = await this.plageDateService.create(dto);
      return {
        message: 'Plage de date créée avec succès',
        status: HttpStatus.CREATED,
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    const data = await this.plageDateService.findAll();
    return {
      message: 'Liste des plages de dates récupérée avec succès',
      status: HttpStatus.OK,
      data,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.plageDateService.findOne(id);
      return {
        message: 'Plage de date trouvée avec succès',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePlageDateDto) {
    try {
      const data = await this.plageDateService.update(id, dto);
      return {
        message: 'Plage de date mise à jour avec succès',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const data = await this.plageDateService.remove(id);
      return {
        message: 'Plage de date supprimée avec succès',
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
