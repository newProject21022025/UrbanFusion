// app.module.ts

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothesModule } from './clothes/clothes.module';
import { AuthModule } from './auth/auth.module';
import { LocaleMiddleware } from './common/middleware/locale.middleware';
import { RequestMethod } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { MailerModule } from './mailer/mailer.module';
import { CallbackModule } from './callback/callback.module'; 
import { VisitsModule } from './visits/visits.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // Додано явне вказання файлу .env
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI_1'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryAttempts: 5, // Додано параметри для стабільності підключення
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ClothesModule,
    OrdersModule,
    MailerModule,
    CallbackModule,
    VisitsModule, // Додано модуль для відстеження відвідувань
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LocaleMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}


