// src/auth/auth.controller.ts

import { Controller, Post, Body, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);  // Логгер для контроллера

  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    // Логирование данных запроса
    this.logger.log(`Попытка авторизации с логином: ${body.login}`);

    try {
      const isValid = await this.authService.validateAdmin(body.login, body.password);

      if (!isValid) {
        this.logger.warn(`Неудачная попытка авторизации для логина: ${body.login}`);
        throw new UnauthorizedException('Невірні дані');
      }

      this.logger.log(`Успешная авторизация для логина: ${body.login}`);
      return { message: 'Авторизація успішна' };
    } catch (error) {
      // Логирование ошибки
      this.logger.error(`Ошибка при авторизации для логина: ${body.login}, error.stack`);
      throw new UnauthorizedException('Ошибка при авторизации');
    }
  }
}