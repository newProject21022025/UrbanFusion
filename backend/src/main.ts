import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.setGlobalPrefix('uk');
  
  // CORS Configuration — дозволити все
  app.enableCors({
    origin: true, // дозволити всі домени
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // дозволити передачу cookie та авторизаційних заголовків
    allowedHeaders: '*', // дозволити всі заголовки
    maxAge: 86400
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
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




