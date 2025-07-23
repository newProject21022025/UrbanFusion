// visits/schemas/visit.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema({ 
  timestamps: true,
  collection: 'visits'  // Вказуємо назву колекції явно
})
export class Visit {
  @Prop({ default: () => new Date().toISOString() })
  timestamp!: string;

  @Prop({ default: 'невідомо' })
  ip!: string;

  @Prop({ default: 'невідомо' })
  city!: string;

  @Prop({ default: 'невідомо' })
  country!: string;

  @Prop({ default: 'невідомо' })
  userAgent!: string;

  @Prop({ default: 'невідомо' })
  url!: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
