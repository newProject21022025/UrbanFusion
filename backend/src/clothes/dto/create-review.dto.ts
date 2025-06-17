// src/clothes/dto/create-review.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
  Max,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateReviewDto {
  // @IsUUID()
  // userId!: string;
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;

  @IsOptional()
  @IsString()
  id?: string; // може бути згенерований у сервісі

  @IsOptional()
  @IsArray()
  likes?: string[] = [];

  @IsOptional()
  @IsArray()
  dislikes?: string[] = [];
}
