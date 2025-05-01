// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express'; // Додано імпорт типів

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('uk');

  const allowedOrigins = [
    'https://urban-fusion-amber.vercel.app',
    'https://urban-fusion-5fee.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

  // Логування CORS
  app.enableCors({
    origin: (origin, callback) => {
      console.log('Incoming origin:', origin);
      if (!origin || allowedOrigins.includes(origin)) {
        console.log('Allowed origin:', origin);
        callback(null, origin);
      } else {
        console.log('Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: ['Authorization'],
    maxAge: 86400
  });

  // Явна обробка OPTIONS з типами
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(200).end();
    }
    next();
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Server is running on ${await app.getUrl()}`);
}

bootstrap();



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { NestExpressApplication } from '@nestjs/platform-express';

// async function bootstrap() {
//   const app = await NestFactory.create<NestExpressApplication>(AppModule);

//   app.setGlobalPrefix('uk');

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
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//     allowedHeaders: 'Content-Type,Authorization',
//   });

//   await app.listen(process.env.PORT || 3000);
//   console.log(`Server is running on ${await app.getUrl()}`);
// }

// bootstrap();

