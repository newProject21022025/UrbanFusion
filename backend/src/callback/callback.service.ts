// src/callback/callback.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Callback } from './schemas/callback.schema';
import { CreateCallbackDto } from './dto/create-callback.dto';
import { MailerService } from '../mailer/mailer.service';
import { PaginationQueryDto } from '../callback/dto/pagination-query.dto';

@Injectable()
export class CallbackService {
  constructor(
    @InjectModel(Callback.name) private callbackModel: Model<Callback>,
    private readonly mailerService: MailerService
  ) {}

  async create(createCallbackDto: CreateCallbackDto): Promise<Callback> {
    const createdCallback = new this.callbackModel(createCallbackDto);
    const savedCallback = await createdCallback.save();
    
    // Відправляємо лист про отримання звернення
    try {
      await this.mailerService.sendCallbackReceivedEmail({
        email: createCallbackDto.email,
        firstName: createCallbackDto.firstName,
        lastName: createCallbackDto.lastName,
        orderNumber: createCallbackDto.orderNumber,
      });
    } catch (emailError) {
      console.error('Failed to send callback confirmation email:', emailError);
      // Помилка відправки листа не повинна впливати на основний потік
    }
    
    return savedCallback;
  }
  // async findAll(): Promise<Callback[]> {
  //   return this.callbackModel.find().exec();
  // }

  async findById(id: string): Promise<Callback> {
    const callback = await this.callbackModel.findById(id).exec();
    if (!callback) {
      throw new NotFoundException(`Callback with ID ${id} not found`);
    }
    return callback;
  }

  async updateStatus(id: string, isProcessed: boolean): Promise<Callback> {
    const updatedCallback = await this.callbackModel
      .findByIdAndUpdate(id, { isProcessed }, { new: true })
      .exec();
    
    if (!updatedCallback) {
      throw new NotFoundException(`Callback with ID ${id} not found`);
    }
    return updatedCallback;
  }

  async delete(id: string): Promise<Callback> {
    const deletedCallback = await this.callbackModel.findByIdAndDelete(id).exec();
    if (!deletedCallback) {
      throw new NotFoundException(`Callback with ID ${id} not found`);
    }
    return deletedCallback;
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<any> {
    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;
  
    const [items, total] = await Promise.all([
      this.callbackModel
        .find()
        .sort({ createdAt: -1 }) // опціонально: новіші спочатку
        .skip(skip)
        .limit(limit)
        .exec(),
  
      this.callbackModel.countDocuments(),
    ]);
  
    return {
      data: items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}