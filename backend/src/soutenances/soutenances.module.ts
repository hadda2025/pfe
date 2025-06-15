import { Module } from '@nestjs/common';
import { SoutenancesService } from './soutenances.service';
import { SoutenancesController } from './soutenances.controller';
import { SoutenanceSchema } from './entities/soutenance.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { sessionSchema } from 'src/sessions/entities/session.entity';
import { roomSchema } from 'src/rooms/entities/room.entity';
import { teacherSchema } from 'src/teachers/entities/teacher.entity';


import { StudentSchema } from 'src/students/entities/student.entity';
import { SeanceSchema } from 'src/seances/entities/seance.entity';
import { PlageDate, PlageDateSchema } from 'src/plage-dates/entities/plage-date.entity';


@Module({
  imports:[
    MongooseModule.forFeature([{name:"soutenances",schema:SoutenanceSchema}]),
  MongooseModule.forFeature([{name:"sessions",schema:sessionSchema}]),
  MongooseModule.forFeature([{name:"teachers",schema:teacherSchema}]),
   MongooseModule.forFeature([{ name: PlageDate.name, schema: PlageDateSchema }]),
  MongooseModule.forFeature([{name:"rooms",schema:roomSchema}]),
  MongooseModule.forFeature([{name:"seances",schema:SeanceSchema}]),
  MongooseModule.forFeature([{name:"students",schema:StudentSchema}])],
    controllers: [SoutenancesController],
    providers: [SoutenancesService],
  })
export class SoutenancesModule {}
