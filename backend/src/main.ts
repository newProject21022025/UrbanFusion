// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('uk');
  
  // Додайте middleware для ручного додавання CORS заголовків
  app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [
      'https://urban-fusion-5fee.vercel.app',
      'https://urban-fusion-amber.vercel.app',
      'http://localhost:3000'
    ];
    
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400');
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    
    next();
  });

  await app.listen(3000);
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




