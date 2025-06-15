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
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  @ApiBody({ type: CreateAgentDto })
  @ApiResponse({ status: 201, description: 'Agent created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createAgentDto: CreateAgentDto, @Res() res) {
    try {
      const newAgent = await this.agentsService.create(createAgentDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'Agent created successfully',
        status: HttpStatus.CREATED,
        data: newAgent,
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
  @ApiOperation({ summary: 'Get all agents' })
  @ApiResponse({ status: 200, description: 'Agents retrieved successfully.' })
  async findAll(@Res() res) {
    try {
      const agents = await this.agentsService.findAll();
      return res.status(HttpStatus.OK).json({
        message: 'Agents found successfully',
        status: HttpStatus.OK,
        data: agents,
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
  @ApiOperation({ summary: 'Get an agent by ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiResponse({ status: 200, description: 'Agent found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const agent = await this.agentsService.findOne(id);
      return res.status(HttpStatus.OK).json({
        message: 'Agent found',
        status: HttpStatus.OK,
        data: agent,
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
  @ApiOperation({ summary: 'Update an agent by ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiBody({ type: UpdateAgentDto })
  @ApiResponse({ status: 200, description: 'Agent updated.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('id') id: string,
    @Body() updateAgentDto: UpdateAgentDto,
    @Res() res,
  ) {
    try {
      const updated = await this.agentsService.update(id, updateAgentDto);
      return res.status(HttpStatus.OK).json({
        message: 'Agent updated successfully',
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
  @ApiOperation({ summary: 'Delete an agent by ID' })
  @ApiParam({ name: 'id', description: 'Agent ID' })
  @ApiResponse({ status: 200, description: 'Agent deleted.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async remove(@Param('id') id: string, @Res() res) {
    try {
      const deleted = await this.agentsService.remove(id);
      return res.status(HttpStatus.OK).json({
        message: 'Agent deleted successfully',
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
