// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

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

    console.log('Successful login for:', user.login);
    
    return {
      success: true,
      user: {
        login: user.login,
        role: user.role,
        _id: user._id
      }
    };
  }
}