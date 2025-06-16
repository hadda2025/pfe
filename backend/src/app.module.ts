import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

// Modules
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { SoutenancesModule } from './soutenances/soutenances.module';
import { DocumentsModule } from './documents/documents.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { EncadrantsModule } from './encadrants/encadrants.module';
import { ProcesModule } from './proces/proces.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';
import { SujetfinetudesModule } from './sujetfinetudes/sujetfinetudes.module';
import { AgentsModule } from './agents/agents.module';
import { SeancesModule } from './seances/seances.module';
import { PlageDatesModule } from './plage-dates/plage-dates.module';

// Mailer
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    // Global Configuration Module
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: ['.env', '.env.local']
    }),

    // Mongoose Configuration with Dynamic Connection
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://mongodb:27017/soutenance'),
        dbName: 'soutenance',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB connected successfully');
          });
          connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
          });
          connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
          });
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    // Mailer Configuration
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTP_HOST', "sandbox.smtp.mailtrap.io"),
          port: configService.get('SMTP_PORT', 2525),
          auth: {
            user: configService.get('SMTP_USER', "8c1761eb21ec0a"),
            pass: configService.get('SMTP_PASS', "8c7b26c06c5924")
          }
        },
        defaults: {
          from: '"Soutenance" <no-reply@soutenance.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService],
    }),

    // Application Modules
    UsersModule,
    RoomsModule,
    SoutenancesModule,
    DocumentsModule,
    StudentsModule,
    TeachersModule,
    EncadrantsModule,
    ProcesModule,
    SessionsModule,
    AuthModule,
    SujetfinetudesModule,
    AgentsModule,
    SeancesModule,
    PlageDatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}