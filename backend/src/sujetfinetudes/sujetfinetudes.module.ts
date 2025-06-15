import { Module } from '@nestjs/common';
import { SujetfinetudesService } from './sujetfinetudes.service';
import { SujetfinetudesController } from './sujetfinetudes.controller';
import { SujetfinetudeSchema } from './entities/sujetfinetude.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { teacherSchema } from 'src/teachers/entities/teacher.entity';
import { StudentSchema } from 'src/students/entities/student.entity';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';

@Module({

  imports: [MongooseModule.forFeature([{ name: "sujetfinetudes", schema: SujetfinetudeSchema }]),
  MongooseModule.forFeature([{ name: "teachers", schema: teacherSchema }]),
  MongooseModule.forFeature([{ name: "students", schema: StudentSchema }]),
  MongooseModule.forFeature([{ name: "soutenances", schema: SoutenanceSchema }])],


  controllers: [SujetfinetudesController],
  providers: [SujetfinetudesService],
})
export class SujetfinetudesModule { }
