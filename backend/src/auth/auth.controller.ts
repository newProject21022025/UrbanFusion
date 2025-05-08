// src/auth/auth.controller.ts

// import { Controller, Post, Body, Param, Request, HttpException, HttpStatus } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller(':locale/auth')  // Локалізація передається через параметр locale у URL
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(
//     @Param('locale') locale: string,  // Отримуємо locale з параметра URL
//     @Body() body: { login: string; password: string },
//     @Request() req: any  // Отримуємо locale з запиту через middleware
//   ) {
//     const user = await this.authService.validateUser(body.login, body.password);
//     // const user = await this.authService.validateUser(body.login, body.password, locale);
    
//     if (!user) {
//       // Якщо користувач не знайдений, викидаємо помилку з локалізованим повідомленням
//       const errorMessage = locale === 'uk' ? 'Невірні облікові дані' : 'Invalid credentials';
//       throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
//     }

//     console.log('Successful login for:', user.login);
    
//     return {
//       success: true,
//       user: {
//         login: user.login,
//         role: user.role,
//         _id: user._id
//       }
//     };
//   }
// }


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