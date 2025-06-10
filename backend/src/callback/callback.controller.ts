// src/callback/callback.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CallbackService } from './callback.service';
import { CreateCallbackDto } from './dto/create-callback.dto';

@Controller('callback')
export class CallbackController {
  constructor(private readonly callbackService: CallbackService) {}

  @Post()
  async create(@Body() createCallbackDto: CreateCallbackDto) {   
      return await this.callbackService.create(createCallbackDto);   
  }

  @Get()
  async findAll() {
    return this.callbackService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {   
      return await this.callbackService.findById(id);
  
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('isProcessed') isProcessed: boolean,
  ) {    
      return await this.callbackService.updateStatus(id, isProcessed);
 
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {    
      return await this.callbackService.delete(id);   
    }
  }
