import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'clothes' })
export class Clothes extends Document {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: { en: String, uk: String }, required: true })
  name: {
    en: string;
    uk: string;
  };

  @Prop({ type: { en: String, uk: String }, required: true })
  description: {
    en: string;
    uk: string;
  };

  @Prop({
    type: {
      amount: Number,
      currency: String,
      discount: { type: Number, default: null }
    },
    required: true
  })
  price: {
    amount: number;
    currency: string;
    discount: number | null;
  };

  @Prop({ required: true, default: true })
  availability: boolean;

  @Prop({
    type: {
      id: String,
      en: String,
      uk: String
    },
    required: true
  })
  category: {
    id: string;
    en: string;
    uk: string;
  };

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({
    type: [{
      color: {
        code: String,
        en: String,
        uk: String
      },
      sizes: [{
        size: String,
        quantity: Number
      }]
    }],
    required: true
  })
  stock: Array<{
    color: {
      code: string;
      en: string;
      uk: string;
    };
    sizes: Array<{
      size: string;
      quantity: number;
    }>;
  }>;

  @Prop({
    type: [{
      en: String,
      uk: String
    }],
    required: true
  })
  careInstructions: Array<{
    en: string;
    uk: string;
  }>;

  @Prop({
    type: [{
      en: String,
      uk: String
    }],
    required: true
  })
  details: Array<{
    en: string;
    uk: string;
  }>;

  @Prop({
    type: [{
      id: String,
      userId: String,
      userName: String,
      rating: Number,
      comment: {
        en: String,
        uk: String
      },
      date: Date,
      likes: [String]
    }],
    default: []
  })
  reviews: Array<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: {
      en: string;
      uk: string;
    };
    date: Date;
    likes: string[];
  }>;
}

export const ClothesSchema = SchemaFactory.createForClass(Clothes);