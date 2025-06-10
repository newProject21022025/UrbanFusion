// src/callback/schemas/callback.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Callback extends Document {
  @Prop({ required: true })
  orderNumber!: string;

  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ required: true })
  phone!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ default: false })
  isProcessed!: boolean;
}

export const CallbackSchema = SchemaFactory.createForClass(Callback);