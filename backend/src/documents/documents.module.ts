import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { documentSchema } from './entities/document.entity';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"documents",schema:documentSchema}]),
  MongooseModule.forFeature([{name:"soutenances",schema:SoutenanceSchema}])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
