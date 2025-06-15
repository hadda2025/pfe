import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EncadrantsService } from './encadrants.service';
import { CreateEncadrantDto } from './dto/create-encadrant.dto';
import { UpdateEncadrantDto } from './dto/update-encadrant.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('encadrants')
@ApiBearerAuth('access-token') 
@UseGuards(AuthGuard("jwt"))
export class EncadrantsController {
  constructor(private readonly encadrantsService: EncadrantsService) {}

  @Post()
  create(@Body() createEncadrantDto: CreateEncadrantDto) {
    return this.encadrantsService.create(createEncadrantDto);
  }

  @Get()
  findAll() {
    return this.encadrantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encadrantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEncadrantDto: UpdateEncadrantDto) {
    return this.encadrantsService.update(+id, updateEncadrantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encadrantsService.remove(+id);
  }
}
