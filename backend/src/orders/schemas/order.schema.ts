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
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  userEmail!: string;

  @Prop({ required: true })
  deliveryAddress!: string;

  @Prop({ type: String })
  postOfficeDetails?: string;

  @Prop({
    type: [
      {
        productId: { type: Types.ObjectId, ref: 'Clothes' },
        quantity: Number,
        size: String,
        color: String,
      },
    ],
    required: true,
  })
  items!: {
    productId: Types.ObjectId;
    quantity: number;
    size: string;
    color: string;
  }[];

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.Pending })
  status!: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
