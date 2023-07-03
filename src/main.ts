import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions={
    origin: true,
    methods: 'GET, PATCH, DELETE, POST',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }

  app.enableCors(corsOptions)

  app.setGlobalPrefix('api')  

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  await app.listen(+process.env.NEST_PORT);
}
bootstrap();
