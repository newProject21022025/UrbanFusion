// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async validateAdmin(login: string, password: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      login,
      password,
      role: 'admin'
    }).exec();
    return !!user;
  }
}

