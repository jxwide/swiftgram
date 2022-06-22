import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService)
  const port = config.get<number>('API_PORT') || 3000
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()
  await app.listen(port, () => console.log(`server started. port - ${port}`));
}
bootstrap();
