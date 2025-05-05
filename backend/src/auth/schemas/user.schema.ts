// src/auth/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  login!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  role!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

