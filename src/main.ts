import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { adminSeed } from './utils/seeding/admin.seeding';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Farmácia API')
    .setDescription(
      'Adicição de medicamentos e controle de estoque de uma farmácia.',
    )
    .setVersion('1.0')
    .addTag('Farmacia')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await adminSeed(new PrismaClient());
  await app.listen(3000);
}
bootstrap();
