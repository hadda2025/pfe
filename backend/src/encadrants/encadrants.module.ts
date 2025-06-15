import { Module } from '@nestjs/common';
import { EncadrantsService } from './encadrants.service';
import { EncadrantsController } from './encadrants.controller';

@Module({
  controllers: [EncadrantsController],
  providers: [EncadrantsService],
})
export class EncadrantsModule {}
