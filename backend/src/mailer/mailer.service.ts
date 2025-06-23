// src/mailer/mailer.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Order } from '../orders/schemas/order.schema';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // або ваш поштовий провайдер
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  
  private formatOrderItems(items: Order['items']) {
    return items.map(item => `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
        ${item.mainImage?.url ? `<img src="${item.mainImage.url}" alt="${item.mainImage.alt?.uk || 'Product image'}" style="max-width: 200px;"/>` : ''}
        <h4>${item.article}</h4>
        <h4>${item.name.uk}</h4>
        <p>${item.description.uk}</p>
        <p>Кількість: ${item.quantity}</p>
        <p>Розмір: ${item.size}</p>
        <p>Колір: ${item.color}</p>
        <p>Ціна: ${item.price.amount} ${item.price.currency} ${item.price.discount ? `(знижка ${item.price.discount}%)` : ''}</p>
      </div>
    `).join('');
  }

  async sendOrderReceivedEmail(order: Order) {
    const itemsHtml = this.formatOrderItems(order.items);
    const totalAmount = order.items.reduce((sum, item) => {
      return sum + (item.price.amount * item.quantity * (1 - (item.price.discount || 0) / 100));
    }, 0);

    await this.transporter.sendMail({
      from: `"Urban Fusion" <${process.env.MAIL_USER}>`,
      to: order.userEmail,
      subject: 'Ваше замовлення прийнято',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Дякуємо за замовлення!</h2>
          <p>Ваше замовлення <strong>№${order.orderNumber}</strong> успішно отримано.</p>
          
          <h3 style="margin-top: 20px;">Деталі замовлення:</h3>
          <p><strong>Ім'я:</strong> ${order.firstName} ${order.lastName}</p>
          <p><strongТелефон:</strong> ${order.phone}</p>
          <p><strong>Адреса доставки:</strong> ${order.deliveryAddress}</p>
          ${order.postOfficeDetails ? `<p><strong>Деталі відділення:</strong> ${order.postOfficeDetails}</p>` : ''}
          
          <h3 style="margin-top: 20px;">Товари:</h3>
          ${itemsHtml}
          
          <h3 style="margin-top: 20px;">Загальна сума:</h3>
          <p><strong>${totalAmount.toFixed(2)} ${order.items[0]?.price.currency || 'UAH'}</strong></p>
          
          <p style="margin-top: 30px;">Очікуйте підтвердження замовлення.</p>
          <p>З повагою,<br/>Команда Urban Fusion</p>
        </div>
      `,
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

  async sendCallbackReceivedEmail(callbackData: {
    email: string;
    firstName: string;
    lastName: string;
    orderNumber: string;
  }) {
    await this.transporter.sendMail({
      from: `"Urban Fusion" <${process.env.MAIL_USER}>`,
      to: callbackData.email,
      subject: 'Ваше звернення прийнято',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Дякуємо за звернення!</h2>
          <p>Шановний(а) ${callbackData.firstName} ${callbackData.lastName},</p>
          <p>Ваше звернення щодо замовлення <strong>№${callbackData.orderNumber}</strong> успішно отримано.</p>
          <p>Наші фахівці розглянуть його у найближчий час та зв'яжуться з вами.</p>
          
          <p style="margin-top: 30px;">З повагою,<br/>Команда Urban Fusion</p>
        </div>
      `,
    });
  }
}

