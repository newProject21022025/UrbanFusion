// src/clothes/clothes.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  create(@Body() createClothesDto: CreateClothesDto) {
    return this.clothesService.create(createClothesDto);
  }

  @Get()
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClothesDto: UpdateClothesDto) {
    return this.clothesService.update(id, updateClothesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothesService.remove(id);
  }

  @Post(':id/reviews')
  async addReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    try {
      return await this.clothesService.addReview(id, createReviewDto);
    } catch (error) {
      console.error('❌ Error while creating review:', error);
      throw error; // Щоб NestJS вивів stack trace
    }
  }

  @Get(':id/reviews')
  getReviews(@Param('id') id: string) {
    return this.clothesService.getReviews(id);
  }

  @Delete(':id/reviews/:reviewId')
  deleteReview(@Param('id') id: string, @Param('reviewId') reviewId: string) {
    return this.clothesService.deleteReview(id, reviewId);
  }
}
