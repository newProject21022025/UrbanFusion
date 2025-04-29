// main.ts

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';
// import { Logger, ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const logger = new Logger('Bootstrap');
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);
//   const configService = app.get(ConfigService);

//   // Налаштування глобального префіксу
//   app.setGlobalPrefix('uk');

//   // CORS Configuration
//   const allowedOrigins = [
//     'https://urban-fusion-amber.vercel.app',
//     'https://urban-fusion-5fee.vercel.app',
//     'http://localhost:3000',
//     'http://localhost:3001'
//   ];

//   app.enableCors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin);
//       } else {
//         logger.warn(`Blocked by CORS: ${origin}`);
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type,Authorization',
//   });

//   // Глобальний Validation Pipe
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     })
//   );

//   // Обробка необроблених помилок
//   process.on('unhandledRejection', (reason) => {
//     logger.error(`Unhandled Rejection: ${reason}`);
//   });

//   process.on('uncaughtException', (err) => {
//     logger.error(`Uncaught Exception: ${err.message}`, err.stack);
//   });

//   // Запуск сервера
//   const port = configService.get<number>('PORT') || 3000;
//   await app.listen(port, '0.0.0.0');
  
//   logger.log(`Server running on ${await app.getUrl()}`);
//   logger.log(`MongoDB connected: ${configService.get('MONGODB_URI_1')?.includes('cluster0')}`);
// }

// bootstrap().catch(err => {
//   console.error('Failed to start server:', err);
//   process.exit(1);
// });



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('uk');

  const allowedOrigins = [
    'https://urban-fusion-amber.vercel.app',
    'https://urban-fusion-5fee.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap();



























