// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Put, Param } from '@nestjs/common';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    console.log('Login attempt for:', body.login);

    const user = await this.authService.validateUser(body.login, body.password);

    if (!user) {
      console.log('Invalid credentials for:', body.login);
      throw new Error('Invalid credentials');
    }

    return {
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        address: user.address,
        orderHistory: user.orderHistory,
        feedback: user.feedback,
        postOfficeDetails: user.postOfficeDetails,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    const user = await this.authService.register(body);
    return {
      success: true,
      user,
    };
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    const updatedUser = await this.authService.updateUser(id, updateData);
    return {
      success: true,
      user: updatedUser,
    };
  }
}
