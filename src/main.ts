import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs, RpcCustomExceptionFilter } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.PORT);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  console.log(`Server is running on: ${envs.PORT}`);
}
bootstrap();
