import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

import { MongooseModule } from '@nestjs/mongoose';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';
import { StudentSchema } from './entities/student.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: "students", schema: StudentSchema }]),
  MongooseModule.forFeature([{ name: "soutenances", schema: SoutenanceSchema }])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule { }
