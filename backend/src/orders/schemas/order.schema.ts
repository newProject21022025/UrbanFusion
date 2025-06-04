// src/orders/schemas/order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum OrderStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Shipped = 'shipped',
  Canceled = 'canceled',
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: String, required: true })
  userEmail!: string;

  @Prop({ type: String, required: true })
  deliveryAddress!: string;

  @Prop({ type: String })
  postOfficeDetails?: string;

  @Prop({ type: String, required: true })
  firstName!: string;

  @Prop({ type: String, required: true })
  lastName!: string;

  @Prop({ type: String, required: true })
  phone!: string;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Clothes' },
        quantity: Number,
        size: String,
        color: String,
        name: {
          en: String,
          uk: String,
        },
        description: {
          en: String,
          uk: String,
        },
        mainImage: {
          url: String,
          alt: {
            en: String,
            uk: String,
          },
        },
        price: {
          amount: Number,
          currency: String,
          discount: Number,
        },
        category: {
          id: String,
          en: String,
          uk: String,
        },
        gender: { type: String, enum: ['male', 'female'] },
      },
    ],
    required: true,
  })
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

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.Pending })
  status!: OrderStatus;
}  

export const OrderSchema = SchemaFactory.createForClass(Order);

//   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
//   userId!: Types.ObjectId;

//   @Prop({ required: true })
//   userEmail!: string;

//   @Prop({ required: true })
//   deliveryAddress!: string;

//   @Prop()
//   postOfficeDetails?: string;

//   // ✅ Нові поля
//   @Prop({ required: true })
//   firstName!: string;

//   @Prop({ required: true })
//   lastName!: string;

//   @Prop({ required: true })
//   phone!: string;

//   @Prop({
//     type: [
//       {
//         productId: { type: Types.ObjectId, ref: 'Clothes' },
//         quantity: Number,
//         size: String,
//         color: String,
//       },
//     ],
//     required: true,
//   })
//   items!: {
//     productId: Types.ObjectId;
//     quantity: number;
//     size: string;
//     color: string;
//   }[];

//   @Prop({ type: String, enum: OrderStatus, default: OrderStatus.Pending })
//   status!: OrderStatus;
// }

// export const OrderSchema = SchemaFactory.createForClass(Order);

