import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createSwaggerDucument } from 'config/swagger/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  createSwaggerDucument(app)
  await app.listen(process.env.PORT);
}
bootstrap();
