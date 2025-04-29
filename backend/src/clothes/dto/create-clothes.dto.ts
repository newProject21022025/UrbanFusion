import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

class NameDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class DescriptionDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class PriceDto {
  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsNumber()
  discount: number | null;
}

class CategoryDto {
  @IsString()
  id: string;

  @IsString()
  en: string;

  @IsString()
  uk: string;
}

class StockSizeDto {
  @IsString()
  size: string;

  @IsNumber()
  quantity: number;
}

class StockColorDto {
  @IsString()
  code: string;

  @IsString()
  en: string;

  @IsString()
  uk: string;
}

class StockItemDto {
  @ValidateNested()
  @Type(() => StockColorDto)
  color: StockColorDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockSizeDto)
  sizes: StockSizeDto[];
}

class CareInstructionDto {
  @IsString()
  en: string;

  @IsString()
  uk: string;
}

class DetailDto {
  @IsString()
  en: string;

  @IsString()
  uk: string;
}

class ImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ImageAltDto)
  alt: ImageAltDto;
}

class ImageAltDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

export class CreateClothesDto {

  @ValidateNested()
  @Type(() => ImageDto)
  @IsNotEmpty()
  mainImage: ImageDto;

  // @IsString()
  // @IsNotEmpty()
  // _id: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @ValidateNested()
  @Type(() => DescriptionDto)
  description: DescriptionDto;

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @IsBoolean()
  availability: boolean;

  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockItemDto)
  stock: StockItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CareInstructionDto)
  careInstructions: CareInstructionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  details: DetailDto[];
}