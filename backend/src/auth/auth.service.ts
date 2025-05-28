// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ login }).exec();
  
    if (!user) return null;
  
    const isMatch = await bcrypt.compare(password, user.password); // ✅ порівняння хешу
  
    if (!isMatch) return null;
  
    const { password: _, ...result } = user.toObject();
    return result;
  }
  async register(userDto: RegisterUserDto): Promise<any> {
    const existing = await this.userModel.findOne({ login: userDto.login }).exec();
    if (existing) {
      throw new Error('User with this email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const createdUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
    });
  
    const savedUser = await createdUser.save();
    const { password, ...result } = savedUser.toObject();
    return result;
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<any> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // повернути вже оновлений документ
    );
  
    if (!updatedUser) {
      throw new Error('User not found');
    }
  
    const { password, ...result } = updatedUser.toObject();
    return result;
  }

  async updateUserPassword(userId: string, data: UpdatePasswordDto): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const isMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }
  
    const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
    user.password = hashedNewPassword;
  
    const savedUser = await user.save();
    const { password, ...result } = savedUser.toObject();
    return result;
  }
  
}