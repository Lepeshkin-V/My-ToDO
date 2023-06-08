import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const useSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('My-ToDo')
    .setDescription('Pet project ToDo')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const env = configService.get<string>('env');
  const port = configService.get<number>('port');

  app.useGlobalPipes(new ValidationPipe());

  if (env === 'development') {
    useSwagger(app);
  }
  await app.listen(port, () => {
    Logger.log(`Running on port ${port}`, 'NestApplication');
    Logger.log(`Environment ${env}`, 'NestApplication');
  });
}
bootstrap();
