// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true }) firstName!: string;
  @Prop() lastName?: string;

  @Prop({ required: true, unique: true }) login!: string;
  @Prop({ required: true }) password!: string;

  @Prop() dateOfBirth?: Date;
  @Prop() phone?: string;
  @Prop() address?: string;

  @Prop({ type: [Object], default: [] }) orderHistory!: any[];
  @Prop({ type: [Object], default: [] }) feedback!: any[];

  @Prop() postOfficeDetails?: string;

  @Prop({ default: 'user' }) role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
