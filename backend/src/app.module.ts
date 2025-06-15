import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
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
import { ConfigModule } from '@nestjs/config';
import { SujetfinetudesModule } from './sujetfinetudes/sujetfinetudes.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AgentsModule } from './agents/agents.module';

import { SeancesModule } from './seances/seances.module';
import { PlageDatesModule } from './plage-dates/plage-dates.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017', { dbName: "soutenance" }), UsersModule, RoomsModule, SoutenancesModule, DocumentsModule, StudentsModule, TeachersModule, EncadrantsModule, ProcesModule, SessionsModule, AuthModule,  
  ConfigModule.forRoot({ isGlobal: true }),
    SujetfinetudesModule,
  MailerModule.forRoot({
    transport: {
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8c1761eb21ec0a",
        pass: "8c7b26c06c5924"
      }
    },
    defaults: {
     
      from: '"Soutenance" <no-reply@soutenance.com>',
    },
    template: {
      dir: join(__dirname, 'templates'),
      /* adapter: new HandlebarsAdapter(), */
      options: {
        strict: true
      }
    }
  }),
  

  AgentsModule,
  


  

  SeancesModule,
  


  

  PlageDatesModule,
  


  

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
