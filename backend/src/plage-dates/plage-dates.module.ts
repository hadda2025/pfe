import { Module } from '@nestjs/common';
import { PlageDateService } from './plage-dates.service';
import { PlageDateController } from './plage-dates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PlageDate, PlageDateSchema } from './entities/plage-date.entity';
import { Soutenance, SoutenanceSchema } from 'src/soutenances/entities/soutenance.entity';
import { Seance, SeanceSchema } from 'src/seances/entities/seance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlageDate.name, schema: PlageDateSchema }]),

    MongooseModule.forFeature([{ name: Soutenance.name, schema: SoutenanceSchema }]),
     

  ],
  controllers: [PlageDateController],
  providers: [PlageDateService],
})
export class PlageDatesModule { }
