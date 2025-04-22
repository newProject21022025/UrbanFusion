// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    const isValid = await this.authService.validateAdmin(body.login, body.password);

    if (!isValid) {
      throw new UnauthorizedException('Невірні дані');
    }

    return { message: 'Авторизація успішна' };
  }
}
