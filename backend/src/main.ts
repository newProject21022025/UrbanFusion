// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('uk');
  
  // Список дозволених доменів
  const allowedOrigins = [
    'https://urban-fusion-5fee.vercel.app',
    'https://urban-fusion-amber.vercel.app',
    'http://localhost:3000'
  ];

  // Налаштування CORS через middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    
    // Перевірка чи origin є в списку дозволених
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Max-Age', '86400');
      res.setHeader('Vary', 'Origin');
    }

    // Обробка preflight запитів
    if (req.method === 'OPTIONS') {
      return res.status(204).send();
    }

    next();
  });

  // Додаткове вмикання CORS для NestJS
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
    maxAge: 86400
  });

  await app.listen(process.env.PORT || 3000);
}

bootstrap();





// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   app.setGlobalPrefix('uk');
//   // Додайте цей блок
//   app.enableCors({

//     origin: ['https://urban-fusion-amber.vercel.app', 'http://localhost:3001', 'http://localhost:3000','https://urban-fusion-5fee.vercel.app'], // Адреса вашого Next.js додатку

//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: 'Content-Type,Authorization',
//     credentials: true,
//   });
  
//   await app.listen(3000);
// }
// bootstrap();




