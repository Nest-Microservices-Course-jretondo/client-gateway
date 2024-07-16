import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs, RpcCustomExceptionFilter } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Gateway-Client-Main');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.PORT);
  logger.log(`Server is running on: ${envs.PORT}`);
}
bootstrap();
