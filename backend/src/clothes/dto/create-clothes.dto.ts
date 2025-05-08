// src/clothes/dto/create-clothes.dto.ts

import { IsString, IsBoolean, IsIn, IsArray, IsObject, IsNumber, IsOptional } from 'class-validator';
import { Gender } from '../schemas/clothes.schema'; // Якщо це потрібно для імпорту enum

export class CreateClothesDto {

  @IsString()
  locale!: string; // ✅ Додано поле locale

  @IsObject()
  @IsString({ each: true })
  name!: {
    en: string;
    uk: string;
  };

  @IsObject()
  @IsString({ each: true })
  description!: {
    en: string;
    uk: string;
  };

  @IsObject()
  @IsString()
  mainImage!: {
    url: string;
    alt: {
      en: string;
      uk: string;
    };
  };

  @IsObject()
  price!: {
    amount: number;
    currency: string;
    discount: number;
  };

  @IsBoolean()
  @IsOptional() // Це поле має стандартне значення true
  availability!: boolean;

  @IsObject()
  category!: {
    en: string;
    uk: string;
  };

  @IsArray()
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

  @IsArray()
  @IsObject({ each: true })
  careInstructions!: {
    en: string;
    uk: string;
  }[];

  @IsArray()
  @IsObject({ each: true })
  details!: {
    en: string;
    uk: string;
  }[];

  @IsArray()
  @IsObject({ each: true })
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

  @IsIn([Gender.Male, Gender.Female])
  gender!: Gender;
}





// import { IsString, IsBoolean, IsIn, IsArray, IsObject, IsNumber, IsOptional } from 'class-validator';
// import { Gender } from '../schemas/clothes.schema'; // Якщо це потрібно для імпорту enum


// export class CreateClothesDto {

//   @IsObject()
//   @IsString({ each: true })
//   name!: {
//     en: string;
//     uk: string;
//   };

//   @IsObject()
//   @IsString({ each: true })
//   description!: {
//     en: string;
//     uk: string;
//   };

//   @IsObject()
//   @IsString()
//   mainImage!: {
//     url: string;
//     alt: {
//       en: string;
//       uk: string;
//     };
//   };

//   @IsObject()
//   price!: {
//     amount: number;
//     currency: string;
//     discount: number;
//   };

//   @IsBoolean()
//   @IsOptional() // Це поле має стандартне значення true
//   availability!: boolean;

//   @IsObject()
//   category!: {
//     en: string;
//     uk: string;
//   };

//   @IsArray()
//   stock!: {
//     color: {
//       code: string;
//       en: string;
//       uk: string;
//     };
//     sizes: {
//       size: string;
//       quantity: number;
//     }[];
//   }[];

//   @IsArray()
//   @IsObject({ each: true })
//   careInstructions!: {
//     en: string;
//     uk: string;
//   }[];

//   @IsArray()
//   @IsObject({ each: true })
//   details!: {
//     en: string;
//     uk: string;
//   }[];

//   @IsArray()
//   @IsObject({ each: true })
//   reviews!: {
//     id: string;
//     userId: string;
//     userName: string;
//     rating: number;
//     comment: {
//       en: string;
//       uk: string;
//     };
//     likes: string[];
//   }[];

//   @IsIn([Gender.Male, Gender.Female])
//   gender!: Gender;
  
// }
