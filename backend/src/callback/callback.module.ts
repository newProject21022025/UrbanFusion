// src/callback/callback.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CallbackController } from './callback.controller';
import { CallbackService } from './callback.service';
import { Callback, CallbackSchema } from './schemas/callback.schema';
import { MailerModule } from '../mailer/mailer.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Callback.name, schema: CallbackSchema }]),
    MailerModule, 
  ],
  controllers: [CallbackController],
  providers: [CallbackService],
})
export class CallbackModule {}