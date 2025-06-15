import {Controller,Get,Post,Body, Patch, Param, Delete, Res, HttpStatus, UseGuards,} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth,} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Students')
@Controller('students')
/*@ApiBearerAuth('access-token') 
@UseGuards(AuthGuard("jwt"))*/
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { 
    
  }

  @Post()
  @ApiOperation({ summary: 'Create a new student' })
  @ApiBody({ type: CreateStudentDto })
  @ApiResponse({ status: 201, description: 'Student created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createStudentDto: CreateStudentDto, @Res() res) {
    try {
      const newStudent = await this.studentsService.create(createStudentDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Student created successfully',
        status: HttpStatus.CREATED,
        data: newStudent,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Students retrieved successfully.' })
  async findAll(@Res() res) {
    try {
      const allStudent = await this.studentsService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Data found successfully !',
        status: HttpStatus.OK,
        data: allStudent,
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
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const oneStudent = await this.studentsService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Student found by id',
        status: HttpStatus.OK,
        data: oneStudent,
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
  @ApiOperation({ summary: 'Update a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiBody({ type: UpdateStudentDto })
  @ApiResponse({ status: 200, description: 'Student updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res,
  ) {
    try {
      const studentUp = await this.studentsService.update(id, updateStudentDto);
      return res.status(HttpStatus.OK).json({
        message: 'Student updated successfully',
        status: HttpStatus.OK,
        data: studentUp,
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
  @ApiOperation({ summary: 'Delete a student by ID' })
  @ApiParam({ name: 'id', description: 'Student ID' })
  @ApiResponse({ status: 200, description: 'Student deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const studentRemove = await this.studentsService.remove(id);
      return res.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        status: HttpStatus.OK,
        data: studentRemove,
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
