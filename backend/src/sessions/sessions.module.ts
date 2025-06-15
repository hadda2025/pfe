import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { sessionSchema } from './entities/session.entity';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"sessions",schema:sessionSchema}])],

 
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
