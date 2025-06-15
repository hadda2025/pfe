import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { IAgent } from './interfaces/agent.interface';



@Injectable()
export class AgentsService {
  constructor(
    @InjectModel('users') private agentModel:Model<IAgent>
  ) {}
  
  async create(createAgentDto: CreateAgentDto) {
    const newAgent = new this.agentModel({...createAgentDto,role:"Agent"});
    return await newAgent.save();
  }
  async findAll() {
    const agents = await this.agentModel.find({role:"Agent"});
    if (!agents || agents.length === 0) {
      throw new NotFoundException('No agents found');
    }
    return agents;
  }

  async findOne(id: string) {
    const agent = await this.agentModel.findById(id);
    if (!agent) {
      throw new NotFoundException(`Agent not found with id ${id}`);
    }
    return agent;
  }

  async update(id: string, updateAgentDto: UpdateAgentDto) {
    const updatedAgent = await this.agentModel.findByIdAndUpdate(id, updateAgentDto, { new: true });
    if (!updatedAgent) {
      throw new NotFoundException(`Agent not found with id ${id}`);
    }
    return updatedAgent;
  }

  async remove(id: string) {
    const deletedAgent = await this.agentModel.findByIdAndDelete(id);
    if (!deletedAgent) {
      throw new NotFoundException(`Agent not found with id ${id}`);
    }
    return deletedAgent;
  }
}
