import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { teacherSchema } from './entities/teacher.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';


@Module({

  imports:[MongooseModule.forFeature([{name:"teachers",schema:teacherSchema }]),
     
        MongooseModule.forFeature([{name:"soutenances",schema:SoutenanceSchema}]),
      ],
        
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
