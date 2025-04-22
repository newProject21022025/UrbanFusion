// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Додаємо конфігураційний модуль
    MongooseModule.forRootAsync({ // Асинхронне підключення MongoDB
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Отримуємо URI з .env
      }),
      inject: [ConfigService],
    }),
    BooksModule,
    AuthModule, // Додаємо модуль для роботи з книгами
  ],
 
})
export class AppModule {}


