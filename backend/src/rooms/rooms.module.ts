import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { roomSchema } from './entities/room.entity';
@Module({
  imports:[MongooseModule.forFeature([{name:"rooms",schema:roomSchema}])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
