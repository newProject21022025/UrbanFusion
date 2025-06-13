// src/orders/orders.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { MailerService } from '../mailer/mailer.service';
import { CounterService } from '../counters/counter.service';
import { PaginationDto } from '../orders/dto/pagination.dto';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private readonly mailerService: MailerService,
    private readonly counterService: CounterService,
  ) {}

  // Створення замовлення з генерацією номера + надсиланням листа
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const nextSeq = await this.counterService.getNextSequence('order');
    const orderNumber = `ORD-${String(nextSeq).padStart(6, '0')}`;

    const order = await this.orderModel.create({
      ...dto,
      orderNumber,
    });

    this.logger.log(`Створено замовлення ${orderNumber} для email: ${dto.userEmail}`);

    // Тепер передаємо весь об'єкт замовлення
    await this.mailerService.sendOrderReceivedEmail(order);

    return order;
  }
  

  // Підтвердження замовлення
  async confirmOrder(id: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status: OrderStatus.Confirmed },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException(`Замовлення з ID ${id} не знайдено`);
    }

    this.logger.log(`Підтверджено замовлення: ${order.orderNumber}`);
    await this.mailerService.sendOrderConfirmedEmail(order.userEmail);

    return order;
  }

  // Отримання всіх замовлень
  async getAllOrders() {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  // Отримання замовлень конкретного користувача
  async getOrdersByUser(userId: string) {
    return this.orderModel.find({ userId }).exec();
  }

  // Оновлення статусу замовлення
  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!order) {
      throw new NotFoundException(`Замовлення з ID ${id} не знайдено`);
    }

    this.logger.log(`Оновлено статус замовлення ${order.orderNumber} на ${status}`);

    if (status === OrderStatus.Shipped) {
      await this.mailerService.sendOrderShippedEmail(order.userEmail);
    }

    return order;
  }

  // Видалення замовлення
  async deleteOrder(id: string): Promise<{ message: string }> {
    const result = await this.orderModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException(`Замовлення з ID ${id} не знайдено`);
    }

    this.logger.warn(`Видалено замовлення з ID ${id} (номер: ${result.orderNumber})`);
    return { message: `Замовлення з ID ${id} було видалено` };
  }

  async getPaginatedOrders(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
  
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.orderModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec(),
      this.orderModel.countDocuments().exec(),
    ]);
  
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: items,
    };
  }
}

