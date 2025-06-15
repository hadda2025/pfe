import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle("Plunnig soutenance")
    .setDescription("projet pfe")
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization'
    }, 'access-token')


    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, document)
  app.enableCors({
    origin: 'http://localhost:4200', // autoriser seulement Angular en dev
    credentials: true, // si tu envoies des cookies ou des headers d'authentification
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
