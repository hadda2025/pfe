import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema } from './entities/agent.entity';
import { UserSchema } from 'src/users/entities/user.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: "users", schema: UserSchema }])],
    
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
