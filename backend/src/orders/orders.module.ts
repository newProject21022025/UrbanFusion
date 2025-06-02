// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { OrdersService } from './orders.service';
import { MailerService } from '../mailer/mailer.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), // 👈 обов'язково
  ],
  controllers: [OrdersController],
  providers: [OrdersService, MailerService],
  exports: [OrdersService],
})
export class OrdersModule {}
