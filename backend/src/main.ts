// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('uk');
  
  // Детальніше налаштування CORS
  app.enableCors({
    origin: [
      'https://urban-fusion-amber.vercel.app',
      'https://urban-fusion-5fee.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Request-ID'],
    credentials: true,
    maxAge: 86400, // Кешування CORS на 24 години
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




