import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { SeancesService } from './seances.service';
import { CreateSeanceDto } from './dto/create-seance.dto';
import { UpdateSeanceDto } from './dto/update-seance.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('seances')
// @ApiBearerAuth('access-token')
// @UseGuards(AuthGuard("jwt"))
export class SeancesController {
  constructor(private readonly seancesService: SeancesService) { }

  @Post()
  async create(@Body() createSeanceDto: CreateSeanceDto, @Res() res) {
    try {
      const newSeance = await this.seancesService.create(createSeanceDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Seance created successfully',
        status: HttpStatus.CREATED,
        data: newSeance,
      });
    } catch (error) {

      console.log("error ",error)
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const seances = await this.seancesService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Data found successfully!',
        status: HttpStatus.OK,
        data: seances,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }


  }
  

 

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const seance = await this.seancesService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Seance found by id',
        status: HttpStatus.OK,
        data: seance,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSeanceDto: UpdateSeanceDto, @Res() res) {
    try {
      const updated = await this.seancesService.update(id, updateSeanceDto);
      return res.status(HttpStatus.OK).json({
        message: 'Seance updated successfully',
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

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const deleted = await this.seancesService.remove(id);
      return res.status(HttpStatus.OK).json({
        message: 'Seance deleted successfully',
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

  


}
