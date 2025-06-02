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
}

// // src/mailer/mailer.service.ts
// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Order } from 'src/orders/schemas/order.schema';
// import { Clothes } from 'src/clothes/schemas/clothes.schema';

// @Injectable()
// export class MailerService {
//   constructor(
//     @InjectModel('Order') private readonly orderModel: Model<Order>,
//     @InjectModel('Clothes') private readonly clothesModel: Model<Clothes>,
//   ) {}

//   private transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   async sendOrderShippedEmail(orderId: string) {
//     const order = await this.orderModel.findById(orderId).lean();
//     if (!order) throw new Error('Order not found');

//     if (!order.items || !Array.isArray(order.items)) {
//       throw new Error('Order items missing or invalid');
//     }

//     const products = await Promise.all(
//       order.items.map(async (item) => {
//         const product = await this.clothesModel.findById(item.productId).lean() as {
//           name?: { en: string; uk: string };
//           price?: { amount: number; currency: string; discount: number };
//           mainImage?: { url: string; alt: { en: string; uk: string } };
//         };

//         return {
//           name: product?.name?.uk || product?.name?.en || 'Невідомо',
//           price: product?.price?.amount || 0,
//           currency: product?.price?.currency || 'грн',
//           image: product?.mainImage?.url || '',
//           quantity: item.quantity,
//           size: item.size,
//           color: item.color,
//         };
//       }),
//     );

//     const itemsHtml = products
//       .map(
//         (item) => `
//         <div style="border:1px solid #ccc; margin-bottom:10px; padding:10px;">
//           <img src="${item.image}" alt="${item.name}" width="100" style="object-fit:cover;" />
//           <h4>${item.name}</h4>
//           <p>Ціна: ${item.price} ${item.currency}</p>
//           <p>Кількість: ${item.quantity}</p>
//           <p>Розмір: ${item.size}, Колір: ${item.color}</p>
//         </div>
//       `,
//       )
//       .join('');

//     await this.transporter.sendMail({
//       from: `"Urban Fusion" <${process.env.MAIL_USER}>`,
//       to: order.userEmail,
//       subject: 'Ваше замовлення відправлено',
//       html: `
//         <h3>Ваше замовлення в дорозі!</h3>
//         <p>Нижче деталі замовлення:</p>
//         ${itemsHtml}
//         <p>Дякуємо, що обрали нас!</p>
//       `,
//     });
//   }
// }
