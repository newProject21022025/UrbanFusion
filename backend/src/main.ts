import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

const allowedOrigins = [
  'https://urban-fusion-5fee.vercel.app',
  'https://urban-fusion-amber.vercel.app',
  'http://localhost:3000'
];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('uk');

  app.enableCors({
    origin: (origin, callback) => {
      // Дозволити запити без origin (наприклад, з Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,Accept',
    exposedHeaders: 'Content-Length,X-Request-ID',
    maxAge: 86400
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`✅ Server is running on: ${await app.getUrl()}`);
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




