// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // або ваш поштовий провайдер
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendOrderReceivedEmail(to: string) {
    await this.transporter.sendMail({
      from: `"Urban Fusion" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Ваше замовлення прийнято',
      html: `<h3>Дякуємо за замовлення!</h3><p>Ваше замовлення успішно отримано. Очікуйте підтвердження.</p>`,
    });
  }

  async sendOrderShippedEmail(to: string) {
    await this.transporter.sendMail({
      from: `"Urban Fusion" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Ваше замовлення відправлено',
      html: `<h3>Відправлено!</h3><p>Ваше замовлення вже в дорозі. Очікуйте доставку найближчим часом.</p>`,
    });
  }

  async sendOrderConfirmedEmail(to: string) {
    await this.transporter.sendMail({
      from: `"Urban Fusion" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Ваше замовлення підтверджено',
      html: `<h3>Замовлення підтверджено!</h3><p>Ми підтвердили ваше замовлення та готуємо його до відправлення.</p>`,
    });
  }
}

