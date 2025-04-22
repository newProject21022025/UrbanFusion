import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { CardController } from './start-test-backend/app.controller';
// import { CardService } from './start-test-backend/app.service';
import { BooksModule } from './books/books.module';

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
    BooksModule, // Додаємо модуль для роботи з книгами
  ],
  // controllers: [CardController], // Ваш існуючий контролер
  // providers: [CardService], // Ваш існуючий сервіс
})
export class AppModule {}



// import { Module } from '@nestjs/common';
// import { CardController } from './start-test-backend/app.controller';  // Імпортуємо контролер
// import { CardService } from './start-test-backend/app.service';  // Імпортуємо сервіс

// @Module({
//   imports: [],
//   controllers: [CardController],  // Додаємо контролер у відповідний масив
//   providers: [CardService],       // Реєструємо сервіс як провайдер
// })
// export class AppModule {}

