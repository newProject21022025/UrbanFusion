// src/clothes/dto/update-clothes.dto.ts

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
  Matches
} from 'class-validator';


class NameDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class DescriptionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class PriceDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount?: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount?: number | null;
}

class CategoryDto {  

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class StockSizeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  size?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;
}

class StockColorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class StockItemDto {
  @ValidateNested()
  @Type(() => StockColorDto)
  @IsOptional()
  color?: StockColorDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockSizeDto)
  @IsOptional()
  sizes?: StockSizeDto[];
}

class CareInstructionDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class DetailDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class ImageAltDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  en?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uk?: string;
}

class ImageDto {
  @IsUrl()
  @MaxLength(2048)
  @IsOptional()
  url?: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ImageAltDto)
  @IsOptional()
  alt?: ImageAltDto;
}

export class UpdateClothesDto {

  @ValidateNested()
  @Type(() => NameDto)
  @IsOptional()
  name?: NameDto;

  @ValidateNested()
  @Type(() => DescriptionDto)
  @IsOptional()
  description?: DescriptionDto;

  @ValidateNested()
  @Type(() => ImageDto)
  @IsOptional()
  mainImage?: ImageDto;

  @ValidateNested()
  @Type(() => PriceDto)
  @IsOptional()
  price?: PriceDto;

  @IsBoolean()
  @IsOptional()
  availability?: boolean;

  @ValidateNested()
  @Type(() => CategoryDto)
  @IsOptional()
  category?: CategoryDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockItemDto)
  @IsOptional()
  stock?: StockItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CareInstructionDto)
  @IsOptional()
  careInstructions?: CareInstructionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  @IsOptional()
  details?: DetailDto[];

  @IsString()
  @IsOptional()
  @Matches(/^(male|female)$/, { message: 'Gender must be either "male" or "female"' })
  gender?: 'male' | 'female';
}