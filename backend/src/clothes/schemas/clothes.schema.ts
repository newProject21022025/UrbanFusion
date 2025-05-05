import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsIn } from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

@Schema({ timestamps: true, collection: 'clothes' })
export class Clothes extends Document {

  @Prop({ type: String, unique: true, required: true })
  slug!: string;

  @Prop({ type: Object, required: true })
  @IsString()
  name!: {
    en: string;
    uk: string;
  };

  @Prop({ type: Object, required: true })
  @IsString()
  description!: {
    en: string;
    uk: string;
  };

  @Prop({
    type: {
      url: String,
      alt: {
        en: String,
        uk: String,
      },
    },
    required: true,
  })
  mainImage!: {
    url: string;
    alt: {
      en: string;
      uk: string;
    };
  };

  @Prop({
    type: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
      discount: { type: Number, default: 0, required: false },
    },
    required: true,
  })
  price!: {
    amount: number;
    currency: string;
    discount: number;
  };

  @Prop({ default: true })
  availability!: boolean;

  @Prop({
    type: {
      id: String,
      en: String,
      uk: String,
    },
    required: true,
  })
  category!: {

    en: string;
    uk: string;
  };


  @Prop({
    type: [
      {
        color: {
          code: String,
          en: String,
          uk: String,
        },
        sizes: [
          {
            size: String,
            quantity: Number,
          },
        ],
      },
    ],
  })
  stock!: {
    color: {
      code: string;
      en: string;
      uk: string;
    };
    sizes: {
      size: string;
      quantity: number;
    }[];
  }[];

  @Prop([
    {
      en: String,
      uk: String,
    },
  ])
  careInstructions!: {
    en: string;
    uk: string;
  }[];

  @Prop([
    {
      en: String,
      uk: String,
    },
  ])
  details!: {
    en: string;
    uk: string;
  }[];

  @Prop([
    {
      id: String,
      userId: String,
      userName: String,
      rating: Number,
      comment: {
        en: String,
        uk: String,
      },
      likes: [String],
    },
  ])
  reviews!: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: {
      en: string;
      uk: string;
    };
    likes: string[];
  }[];

  // 💡 Новое поле gender
  @Prop({ type: String, enum: Gender, required: true })
  @IsIn([Gender.Male, Gender.Female])
  gender!: Gender;
}



export const ClothesSchema = SchemaFactory.createForClass(Clothes);




