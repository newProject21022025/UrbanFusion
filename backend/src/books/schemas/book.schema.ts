// books/schemas/book.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: Object, required: true })
  title: {
    en: string;
    uk: string;
  };

  @Prop({ type: Object, required: true })
  description: {
    en: string;
    uk: string;
  };

  @Prop({ required: true })
  image: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);