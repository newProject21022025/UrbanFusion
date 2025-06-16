// src/clothes/dto/create-clothes.dto.ts

import {
  IsString,
  IsBoolean,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../schemas/clothes.schema';

class LocalizedStringDto {
  @IsString()
  en!: string;

  @IsString()
  uk!: string;
}

class ImageAltDto extends LocalizedStringDto {}

class MainImageDto {
  @IsString()
  url!: string;

  @ValidateNested()
  @Type(() => ImageAltDto)
  alt!: ImageAltDto;
}

class PriceDto {
  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

  @IsNumber()
  @IsOptional()
  discount?: number;
}

class CategoryDto extends LocalizedStringDto {}

class ColorDto extends LocalizedStringDto {
  @IsString()
  code!: string;
}

class SizeQuantityDto {
  @IsString()
  size!: string;

  @IsNumber()
  quantity!: number;
}

class StockDto {
  @ValidateNested()
  @Type(() => ColorDto)
  color!: ColorDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SizeQuantityDto)
  sizes!: SizeQuantityDto[];
}

class CareDetailsDto extends LocalizedStringDto {}

class ReviewDto {
  @IsString()
  id!: string;

  @IsString()
  userId!: string;

  @IsString()
  userName!: string;

  @IsNumber()
  rating!: number;

  @IsString()
  comment!: string; // рядок, не масив

  @IsArray()
  @IsString({ each: true })
  likes!: string[];

  @IsArray()
  @IsString({ each: true })
  dislikes!: string[];
}

export class CreateClothesDto {
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  name!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description!: LocalizedStringDto;

  @ValidateNested()
  @Type(() => MainImageDto)
  mainImage!: MainImageDto;

  @ValidateNested()
  @Type(() => PriceDto)
  price!: PriceDto;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;

  @ValidateNested()
  @Type(() => CategoryDto)
  category!: CategoryDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockDto)
  stock!: StockDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CareDetailsDto)
  careInstructions!: CareDetailsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CareDetailsDto)
  details!: CareDetailsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews!: ReviewDto[];

  @IsEnum(Gender)
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
//     comment: string[];
//     likes: string[];
//     dislikes: string[];
//   }[];

//   @IsIn([Gender.Male, Gender.Female])
//   gender!: Gender;
// }




