// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { MailerService } from '../mailer/mailer.service'; // модуль пошти
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly mailerService: MailerService,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const order = await this.orderModel.create(dto);
  
    // Надіслати лист користувачу після створення
    await this.mailerService.sendOrderReceivedEmail(order.userEmail); // <-- виправлено
  
    return order;
  }
  

  async confirmOrder(id: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status: OrderStatus.Shipped },
      { new: true },
    );
  
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  
    await this.mailerService.sendOrderShippedEmail(order.userEmail);
    return order;
  }

  async getAllOrders() {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }  

  async getOrdersByUser(userId: string) {
    return this.orderModel.find({ userId });
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  
    // Відправка листа за потреби
    if (status === OrderStatus.Shipped) {
      await this.mailerService.sendOrderShippedEmail(order.userEmail);
    }
  
    return order;
  }
  
  
}
