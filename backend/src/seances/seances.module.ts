import { Module } from '@nestjs/common';
import { SeancesService } from './seances.service';
import { SeancesController } from './seances.controller';
import { SeanceSchema } from './entities/seance.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';
import { PlageDate, PlageDateSchema } from 'src/plage-dates/entities/plage-date.entity';
import { Room, roomSchema } from 'src/rooms/entities/room.entity';

@Module({

  imports: [
    MongooseModule.forFeature([{ name: "seances", schema: SeanceSchema }]),
    MongooseModule.forFeature([{ name: "soutenances", schema: SoutenanceSchema }]),
     MongooseModule.forFeature([{ name: PlageDate.name, schema: PlageDateSchema }]),
     MongooseModule.forFeature([{  name: Room.name, schema: roomSchema }]),
    
  ],
  controllers: [SeancesController],
  providers: [SeancesService],
})
export class SeancesModule { }
