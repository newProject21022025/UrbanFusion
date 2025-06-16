// src/orders/orders.controller.ts
import { Controller, Post, Body, Param, Patch, Get, Query, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { PaginationDto } from '../orders/dto/pagination.dto';

@Controller('orders')
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

  // ✅ Новий ендпоінт з пагінацією
  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.ordersService.getPaginatedOrders(pagination);
  }

  @Get('user/:userId')
getPaginatedOrdersByUser(
  @Param('userId') userId: string,
  @Query() pagination: PaginationDto
) {
  return this.ordersService.getPaginatedOrdersByUser(userId, pagination);
}


  // @Get('user/:userId')
  // getOrdersByUser(@Param('userId') userId: string) {
  //   return this.ordersService.getOrdersByUser(userId);
  // }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: string, @Body() { status }: UpdateStatusDto) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
