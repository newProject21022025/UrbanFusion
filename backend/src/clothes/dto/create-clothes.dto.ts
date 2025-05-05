// import { Type } from 'class-transformer';
// import {
//   IsArray,
//   IsBoolean,
//   IsNotEmpty,
//   IsNumber,
//   IsObject,
//   IsString,
//   IsUrl,
//   MaxLength,
//   Min,
//   ValidateNested,
//   Matches,
//   ArrayMinSize,
//   IsOptional,
// } from 'class-validator';

// class NameDto {
//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class DescriptionDto {
//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class PriceDto {
//   @IsNumber()
//   @Min(0)
//   amount?: number;

//   @IsString()
//   @IsNotEmpty()
//   currency?: string;

//   @IsNumber()
//   @Min(0)
//   @IsOptional()
//   discount?: number | null;
// }

// class CommentDto {
//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class ReviewDto {
//   @IsString()
//   @IsNotEmpty()
//   id?: string;

//   @IsString()
//   @IsNotEmpty()
//   userId?: string;

//   @IsString()
//   @IsNotEmpty()
//   userName?: string;

//   @IsNumber()
//   rating?: number;

//   @ValidateNested()
//   @Type(() => CommentDto)
//   comment?: CommentDto;

//   @IsArray()
//   @ArrayMinSize(1)
//   @IsString({ each: true })
//   likes?: string[];}


// class CategoryDto {
//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => ReviewDto)
//   reviews?: ReviewDto[];

//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class StockSizeDto {
//   @IsString()
//   @IsNotEmpty()
//   size?: string;

//   @IsNumber()
//   @Min(0)
//   quantity?: number;
// }

// class StockColorDto {
//   @IsString()
//   @IsNotEmpty()
//   code?: string;

//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class StockItemDto {
//   @ValidateNested()
//   @Type(() => StockColorDto)
//   color?: StockColorDto;

//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => StockSizeDto)
//   sizes?: StockSizeDto[];
// }

// class CareInstructionDto {
//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class DetailDto {
//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class ImageAltDto {
//   @IsString()
//   @IsNotEmpty()
//   en?: string;

//   @IsString()
//   @IsNotEmpty()
//   uk?: string;
// }

// class ImageDto {
//   @IsUrl()
//   @MaxLength(2048)
//   url?: string;

//   @IsObject()
//   @ValidateNested()
//   @Type(() => ImageAltDto)
//   alt?: ImageAltDto;
// }

// export class CreateClothesDto {


//   @ValidateNested()
//   @Type(() => NameDto)
//   name?: NameDto;

//   @ValidateNested()
//   @Type(() => DescriptionDto)
//   description?: DescriptionDto;

//   @ValidateNested()
//   @Type(() => ImageDto)
//   mainImage?: ImageDto;

//   @ValidateNested()
//   @Type(() => PriceDto)
//   price?: PriceDto;

//   @IsBoolean()
//   availability?: boolean;

//   @ValidateNested()
//   @Type(() => CategoryDto)
//   category?: CategoryDto;

//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => StockItemDto)
//   stock?: StockItemDto[];

//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => CareInstructionDto)
//   careInstructions?: CareInstructionDto[];

//   @IsArray()
//   @ArrayMinSize(1)
//   @ValidateNested({ each: true })
//   @Type(() => DetailDto)
//   details?: DetailDto[];

//   @IsString()
//   @IsNotEmpty()
//   @Matches(/^(male|female)$/, { message: 'Gender must be either "male" or "female"' })
//   gender?: 'male' | 'female';
// }


import { IsString, IsBoolean, IsIn, IsArray, IsObject, IsNumber, IsOptional } from 'class-validator';
import { Gender } from '../schemas/clothes.schema'; // Якщо це потрібно для імпорту enum


export class CreateClothesDto {

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
