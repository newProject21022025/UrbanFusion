// src/orders/dto/create-order.dto.ts

import {
  IsString,
  IsOptional,
  IsMongoId,
  IsArray,
  ValidateNested,
  IsNumber,
  IsEnum,  
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedTextDto {
  @IsString()
  en!: string;

  @IsString()
  uk!: string;
}

class MainImageDto {
  @IsString()
  url!: string;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  alt!: LocalizedTextDto;
}

class PriceDto {
  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

  @IsNumber()
  discount!: number;
}

class CategoryDto {
  @IsString()
  id!: string;

  @IsString()
  en!: string;

  @IsString()
  uk!: string;
}

class ItemDto {
  @IsMongoId()
  productId!: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  size!: string;

  @IsString()
  color!: string;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  name!: LocalizedTextDto;

  @ValidateNested()
  @Type(() => LocalizedTextDto)
  description!: LocalizedTextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => MainImageDto)
  mainImage!: MainImageDto | null;

  @ValidateNested()
  @Type(() => PriceDto)
  price!: PriceDto;

  @ValidateNested()
  @Type(() => CategoryDto)
  category!: CategoryDto;

  @IsEnum(['male', 'female'])
  gender!: 'male' | 'female';
}

export class CreateOrderDto {
  @IsMongoId()
  userId!: string;

  @IsString()
  userEmail!: string;

  @IsString()
  deliveryAddress!: string;

  @IsOptional()
  @IsString()
  postOfficeDetails?: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  phone!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items!: ItemDto[];

  @IsOptional()
  @IsString()
  orderNumber?: string;
}


// import { Types } from 'mongoose';

// export class CreateOrderDto {
//   userId!: Types.ObjectId;
//   userEmail!: string;
//   deliveryAddress!: string;
//   postOfficeDetails?: string;

//   firstName!: string;
//   lastName!: string;
//   phone!: string;

//   items!: {
//     productId: Types.ObjectId;
//     quantity: number;
//     size: string;
//     color: string;
//     name: {
//       en: string;
//       uk: string;
//     };
//     description: {
//       en: string;
//       uk: string;
//     };
//     mainImage: {
//       url: string;
//       alt: {
//         en: string;
//         uk: string;
//       };
//     } | null;
//     price: {
//       amount: number;
//       currency: string;
//       discount: number;
//     };
//     category: {
//       id: string;
//       en: string;
//       uk: string;
//     };
//     gender: 'male' | 'female';
//   }[];

//   orderNumber?: string;
// }



