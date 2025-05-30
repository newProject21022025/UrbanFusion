// src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
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

  async sendNewPassword(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ login: email }).exec();
    if (!user) {
      throw new Error('Користувача з таким email не знайдено');
    }
  
    const newPassword = this.generatePassword(); // Згенерований новий пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    user.password = hashedPassword;
    await user.save();
  
    // Надіслати лист
    await this.sendEmail(email, newPassword, user.firstName);
  
    return { message: 'Новий пароль надіслано на електронну пошту' };
  }
  
  private generatePassword(): string {
    return randomBytes(6).toString('base64').replace(/[+/=]/g, '').slice(0, 10);
  }
  
  private async sendEmail(email: string, password: string, name?: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,     // Наприклад: 'yourapp@gmail.com'
        pass: process.env.MAIL_PASS,     // Пароль або app password
      },
    });
  
    const html = `
      <div>
        <p>Вітаємо, ${name || 'користувачу'}!</p>
        <p>Ваш новий пароль: <b>${password}</b></p>
        <p>Будь ласка, змініть пароль після входу у ваш акаунт.</p>
      </div>
    `;
  
    await transporter.sendMail({
      from: `"UrbanFusion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Ваш новий пароль',
      html,
    });
  }
  
} 


// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User } from './schemas/user.schema';
// import { RegisterUserDto } from './dto/register-user.dto';
// import { UpdatePasswordDto } from './dto/update-password.dto';
// import * as bcrypt from 'bcryptjs';
// import { ConfigService } from '@nestjs/config';
// import * as crypto from 'crypto';
// import brevo from '@getbrevo/brevo';
// import { RateLimiterMemory } from 'rate-limiter-flexible';

// @Injectable()
// export class AuthService {
//   private brevoApi: brevo.TransactionalEmailsApi;
//   private rateLimiter: RateLimiterMemory;

//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>,
//     private configService: ConfigService,
//   ) {
//     const apiKey = this.configService.get<string>('BREVO_API_KEY');
//     if (!apiKey) {
//       throw new Error('BREVO_API_KEY is not configured');
//     }

//     this.brevoApi = new brevo.TransactionalEmailsApi();
//     this.brevoApi.setApiKey(
//       brevo.TransactionalEmailsApiApiKeys.apiKey,
//       apiKey,
//     );

//     this.rateLimiter = new RateLimiterMemory({
//       points: 3,
//       duration: 3600,
//     });
//   }

//   async validateUser(login: string, password: string): Promise<any> {
//     const user = await this.userModel.findOne({ login }).exec();
//     if (!user) return null;

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return null;

//     const { password: _, ...result } = user.toObject();
//     return result;
//   }

//   async register(userDto: RegisterUserDto): Promise<any> {
//     const existing = await this.userModel.findOne({ login: userDto.login }).exec();
//     if (existing) {
//       throw new Error('User with this email already exists');
//     }

//     const hashedPassword = await bcrypt.hash(userDto.password, 10);
//     const createdUser = new this.userModel({
//       ...userDto,
//       password: hashedPassword,
//     });

//     const savedUser = await createdUser.save();
//     const { password, ...result } = savedUser.toObject();
//     return result;
//   }

//   async updateUser(userId: string, updateData: Partial<User>): Promise<any> {
//     const updatedUser = await this.userModel.findByIdAndUpdate(
//       userId,
//       updateData,
//       { new: true }
//     );

//     if (!updatedUser) {
//       throw new Error('User not found');
//     }

//     const { password, ...result } = updatedUser.toObject();
//     return result;
//   }

//   async updateUserPassword(userId: string, data: UpdatePasswordDto): Promise<any> {
//     const user = await this.userModel.findById(userId).exec();
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const isMatch = await bcrypt.compare(data.currentPassword, user.password);
//     if (!isMatch) {
//       throw new Error('Current password is incorrect');
//     }

//     const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);
//     user.password = hashedNewPassword;

//     const savedUser = await user.save();
//     const { password, ...result } = savedUser.toObject();
//     return result;
//   }

//   async resetPassword(email: string): Promise<{ message: string }> {
//     if (!email || !email.includes('@')) {
//       throw new Error('Invalid email address');
//     }

//     try {
//       await this.rateLimiter.consume(email);
//     } catch (limiterError) {
//       throw new Error('Too many requests. Please try again later');
//     }

//     const user = await this.userModel.findOne({ login: email }).exec();
//     if (!user) {
//       console.log(`Password reset requested for non-existent email: ${email}`);
//       return { message: 'If the email exists, a new password will be sent' };
//     }

//     const newPassword = crypto.randomBytes(4).toString('hex').slice(0, 8);
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     user.password = hashedPassword;
//     // Якщо timestamps: true встановлено в схемі, то оновлення updatedAt буде автоматичним, тому цей рядок можна видалити:
//     // user.updatedAt = new Date();

//     await user.save();

//     try {
//       await this.sendResetEmail(email, newPassword);
//       console.log(`Password reset email sent to: ${email}`);
//     } catch (error) {
//       console.error(`Failed to send reset email to ${email}:`, error);
//       throw new Error('Failed to send reset email');
//     }

//     return { message: 'Новий пароль надіслано на пошту' };
//   }

//   private async sendResetEmail(to: string, newPassword: string): Promise<void> {
//     const senderEmail = this.configService.get<string>('BREVO_SENDER_EMAIL');
//     if (!senderEmail) {
//       throw new Error('Email sender configuration is missing');
//     }

//     const senderName = this.configService.get<string>('BREVO_SENDER_NAME') || 'Your Service';

//     const sender = {
//       email: senderEmail,
//       name: senderName,
//     };

//     const receivers = [{ email: to }];

//     try {
//       await this.brevoApi.sendTransacEmail({
//         sender,
//         to: receivers,
//         subject: 'Відновлення пароля',
//         htmlContent: `
//           <h3>Відновлення доступу</h3>
//           <p>Ваш новий тимчасовий пароль: <strong>${newPassword}</strong></p>
//           <p>Будь ласка, змініть його після входу в систему.</p>
//           <p>Якщо ви не запитували скидання паролю, проігноруйте цей лист.</p>
//         `,
//       });
//     } catch (error) {
//       console.error('Brevo API error:', error);
//       throw new Error('Помилка відправки через Brevo');
//     }
//   }
// }
