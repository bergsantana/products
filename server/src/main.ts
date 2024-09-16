import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // permitir solicitações de todas as origens
    credentials: true, // permitir solicitações com credenciais
  });
  await app.listen(3000);
}
bootstrap();
