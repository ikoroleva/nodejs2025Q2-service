import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingService } from './common/logging/logging.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Logging config
  const configService = app.get(ConfigService);
  const loggingService = new LoggingService(configService);
  app.useLogger(loggingService);

  app.useGlobalFilters(new HttpExceptionFilter(loggingService));
  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error: Error) => {
    loggingService.error(
      'Uncaught Exception',
      error.stack,
      'UncaughtException',
    );
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: any) => {
    loggingService.error(
      'Unhandled Rejection',
      reason instanceof Error ? reason.stack : String(reason),
      'UnhandledRejection',
    );
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Home Library API')
    .setDescription(
      'A RESTful API service for managing a personal music library with user authentication, CRUD operations for artists, albums, tracks, and favorites management.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  loggingService.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
