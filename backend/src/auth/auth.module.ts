import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategiy } from './strategies/accesToken.strategy';

@Module({
  imports:[JwtModule.register({}),UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategiy],
})
export class AuthModule {}
