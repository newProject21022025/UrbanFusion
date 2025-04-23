// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ login }).exec();
    
    console.log('Found user:', user); // Логування для дебагу
    
    if (user && user.password === password) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}