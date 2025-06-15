import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Teacher, teacherSchema } from 'src/teachers/entities/teacher.entity';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';
import { Student, StudentSchema } from 'src/students/entities/student.entity';
import { SujetfinetudeSchema } from 'src/sujetfinetudes/entities/sujetfinetude.entity';
import { UserSchema } from './entities/user.entity';
import { Agent, AgentSchema } from 'src/agents/entities/agent.entity';

@Module({
  imports: [MongooseModule.forFeature([{
    name: "users", schema: UserSchema,
    discriminators: [
      { name: Student.name, schema: StudentSchema },
      { name: Teacher.name, schema: teacherSchema },
      { name: Agent.name, schema: AgentSchema }
    ]
  }]), MongooseModule.forFeature([{ name: "soutenances", schema: SoutenanceSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
