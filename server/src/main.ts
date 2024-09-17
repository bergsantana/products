import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // permitir solicitações de todas as origens
    credentials: true, // permitir solicitações com credenciais
  });
  await app.listen(process.env.BACKEND_PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
