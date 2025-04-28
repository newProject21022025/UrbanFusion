import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
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
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsNumber()
  @IsOptional()
  discount?: number | null;
}

class CategoryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  en?: string;

  @IsString()
  @IsOptional()
  uk?: string;
}

class StockSizeDto {
  @IsString()
  @IsOptional()
  size?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}

class StockColorDto {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  en?: string;

  @IsString()
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
  @IsOptional()
  en?: string;

  @IsString()
  @IsOptional()
  uk?: string;
}

class DetailDto {
  @IsString()
  @IsOptional()
  en?: string;

  @IsString()
  @IsOptional()
  uk?: string;
}

export class UpdateClothesDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  slug?: string;

  @ValidateNested()
  @Type(() => NameDto)
  @IsOptional()
  name?: NameDto;

  @ValidateNested()
  @Type(() => DescriptionDto)
  @IsOptional()
  description?: DescriptionDto;

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
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

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
}