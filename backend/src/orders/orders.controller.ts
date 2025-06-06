// src/orders/orders.controller.ts
import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Get, Query } from '@nestjs/common';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Delete } from '@nestjs/common';

@Controller('orders') //
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.ordersService.confirmOrder(id);
  }

  @Get()
  findAll() {
    return this.ordersService.getAllOrders();
  }

  @Get('user/:userId')
  getOrdersByUser(@Param('userId') userId: string) {
    return this.ordersService.getOrdersByUser(userId);
  }

  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateStatusDto,
  ) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
