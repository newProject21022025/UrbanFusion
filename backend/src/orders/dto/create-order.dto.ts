// src/orders/dto/create-order.dto.ts

import { Types } from 'mongoose';

export class CreateOrderDto {
  userId!: Types.ObjectId;
  userEmail!: string;
  deliveryAddress!: string;
  postOfficeDetails?: string;

  firstName!: string;
  lastName!: string;
  phone!: string;

  items!: {
    productId: Types.ObjectId;
    quantity: number;
    size: string;
    color: string;
    name: {
      en: string;
      uk: string;
    };
    description: {
      en: string;
      uk: string;
    };
    mainImage: {
      url: string;
      alt: {
        en: string;
        uk: string;
      };
    } | null;
    price: {
      amount: number;
      currency: string;
      discount: number;
    };
    category: {
      id: string;
      en: string;
      uk: string;
    };
    gender: 'male' | 'female';
  }[];

  orderNumber?: string;
}



