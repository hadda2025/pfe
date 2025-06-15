import { Module } from '@nestjs/common';
import { ProcesService } from './proces.service';
import { ProcesController } from './proces.controller';
import { proceSchema } from './entities/proce.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports:[MongooseModule.forFeature([{name:"proces",schema:proceSchema}])],
  controllers: [ProcesController],
  providers: [ProcesService],
})
export class ProcesModule {}
