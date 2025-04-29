import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsIn } from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

@Schema({ timestamps: true, collection: 'clothes' })
export class Clothes extends Document {
  @Prop({ required: true, unique: true })
  @IsString()
  slug: string;

  @Prop({ type: Object, required: true })
  @IsString()
  name: {
    en: string;
    uk: string;
  };

  @Prop({ type: Object, required: true })
  @IsString()
  description: {
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
  mainImage: {
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
  price: {
    amount: number;
    currency: string;
    discount: number;
  };

  @Prop({ default: true })
  availability: boolean;

  @Prop({
    type: {
      id: String,
      en: String,
      uk: String,
    },
    required: true,
  })
  category: {
    id: string;
    en: string;
    uk: string;
  };

  @Prop([String])
  tags: string[];

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
  stock: {
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
  careInstructions: {
    en: string;
    uk: string;
  }[];

  @Prop([
    {
      en: String,
      uk: String,
    },
  ])
  details: {
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
  reviews: {
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
  gender: Gender;
}

export const ClothesSchema = SchemaFactory.createForClass(Clothes);




// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// @Schema({ timestamps: true, collection: 'clothes' })
// export class Clothes extends Document {
//   @Prop({ auto: true })
//   _id: Types.ObjectId;

//   @Prop({ required: true, unique: true })
//   slug: string;

//   @Prop({ type: { en: String, uk: String }, required: true })
//   name: {
//     en: string;
//     uk: string;
//   };

//   @Prop({ type: { en: String, uk: String }, required: true })
//   description: {
//     en: string;
//     uk: string;
//   };

//   @Prop({
//     type: {
//       url: { type: String, required: true },
//       alt: {
//         en: { type: String, required: true },
//         uk: { type: String, required: true }
//       }
//     },
//     required: true
//   })
//   mainImage: {
//     url: string;
//     alt: {
//       type: {
//         en: { type: String, required: true },
//         uk: { type: String, required: true }
//       },
//       required: true
//     }
//   };

//   @Prop({
//     type: {
//       amount: { type: Number, required: true, min: 0 },
//       currency: { type: String, required: true },
//       discount: { type: Number, default: null, required: false, min: 0, max: 100 }
//     },
//     required: true
//   })
//   price: {
//     amount: number;
//     currency: string;
//     discount: number | null;
//   };

//   @Prop({ required: true, default: true })
//   availability: boolean;

//   @Prop({
//     type: {
//       id: { type: String, required: true },
//       en: { type: String, required: true },
//       uk: { type: String, required: true }
//     },
//     required: true
//   })
//   category: {
//     id: string;
//     en: string;
//     uk: string;
//   };

//   @Prop({ type: [String], required: true })
//   tags: string[];

//   @Prop({
//     type: [{
//       color: {
//         code: { type: String, required: true },
//         en: { type: String, required: true },
//         uk: { type: String, required: true }
//       },
//       sizes: [{
//         size: { type: String, required: true },
//         quantity: { type: Number, required: true, min: 0 }
//       }]
//     }],
//     required: true
//   })
//   stock: Array<{
//     color: {
//       code: string;
//       en: string;
//       uk: string;
//     };
//     sizes: Array<{
//       size: string;
//       quantity: number;
//     }>;
//   }>;

//   @Prop({
//     type: [{
//       en: { type: String, required: true },
//       uk: { type: String, required: true }
//     }],
//     required: true
//   })
//   careInstructions: Array<{
//     en: string;
//     uk: string;
//   }>;

//   @Prop({
//     type: [{
//       en: { type: String, required: true },
//       uk: { type: String, required: true }
//     }],
//     required: true
//   })
//   details: Array<{
//     en: string;
//     uk: string;
//   }>;

//   @Prop({
//     type: [{
//       id: { type: String, required: true },
//       userId: { type: String, required: true },
//       userName: { type: String, required: true },
//       rating: { type: Number, required: true, min: 1, max: 5 },
//       comment: {
//         en: { type: String, required: true },
//         uk: { type: String, required: true }
//       },
//       date: { type: Date, default: Date.now },
//       likes: { type: [String], default: [] }
//     }],
//     default: []
//   })
//   reviews: Array<{
//     id: string;
//     userId: string;
//     userName: string;
//     rating: number;
//     comment: {
//       en: string;
//       uk: string;
//     };
//     date: Date;
//     likes: string[];
//   }>;
// }

// export const ClothesSchema = SchemaFactory.createForClass(Clothes);