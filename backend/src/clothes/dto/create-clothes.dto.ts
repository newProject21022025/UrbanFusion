import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
  Matches,
  ArrayMinSize,
  IsOptional,
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
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount: number | null;
}

class CategoryDto {
  // @IsString()
  // @IsNotEmpty()
  // id: string;

  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class StockSizeDto {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  @Min(0)
  quantity: number;
}

class StockColorDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class StockItemDto {
  @ValidateNested()
  @Type(() => StockColorDto)
  color: StockColorDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StockSizeDto)
  sizes: StockSizeDto[];
}

class CareInstructionDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class DetailDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class ImageAltDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  uk: string;
}

class ImageDto {
  @IsUrl()
  @MaxLength(2048)
  url: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ImageAltDto)
  alt: ImageAltDto;
}

export class CreateClothesDto {
  // @IsString()
  // @IsNotEmpty()
  // @Matches(/^[a-z0-9-]+$/, { message: 'Slug can only contain lowercase letters, numbers and hyphens' })
  // slug: string;

  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @ValidateNested()
  @Type(() => DescriptionDto)
  description: DescriptionDto;

  @ValidateNested()
  @Type(() => ImageDto)
  mainImage: ImageDto;

  @ValidateNested()
  @Type(() => PriceDto)
  price: PriceDto;

  @IsBoolean()
  availability: boolean;

  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  // @IsArray()
  // @IsString({ each: true })
  // @ArrayMinSize(1)
  // tags: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StockItemDto)
  stock: StockItemDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CareInstructionDto)
  careInstructions: CareInstructionDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => DetailDto)
  details: DetailDto[];

  @IsString()
  @IsNotEmpty()
  @Matches(/^(male|female)$/, { message: 'Gender must be either "male" or "female"' })
  gender: 'male' | 'female';
}
