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
import { PaginationQueryDto } from '../clothes/dto/pagination-query.dto';
import { Query } from '@nestjs/common';

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
      throw error;
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

  // Поставити лайк на відгук
  @Post(':id/reviews/:reviewId/like')
  async likeReview(
    @Param('id') id: string,
    @Param('reviewId') reviewId: string,
    @Body('userId') userId: string,
  ) {
    return this.clothesService.likeReview(id, reviewId, userId);
  }

  // Поставити дизлайк на відгук
  @Post(':id/reviews/:reviewId/dislike')
  async dislikeReview(
    @Param('id') id: string,
    @Param('reviewId') reviewId: string,
    @Body('userId') userId: string,
  ) {
    return this.clothesService.dislikeReview(id, reviewId, userId);
  }

  @Get()
  async findPaginated(@Query() query: PaginationQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    return this.clothesService.findPaginated(page, limit);
  }

  @Get('article/:article')
  findByArticle(@Param('article') article: string) {
    return this.clothesService.findByArticle(article);
  }
}


// // src/clothes/clothes.controller.ts

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
//   Query,
// } from '@nestjs/common';
// import { ClothesService } from './clothes.service';
// import { CreateClothesDto } from './dto/create-clothes.dto';
// import { UpdateClothesDto } from './dto/update-clothes.dto';
// import { CreateReviewDto } from './dto/create-review.dto';
// import { PaginationQueryDto } from '../clothes/dto/pagination-query.dto';

// @Controller('clothes')
// export class ClothesController {
//   constructor(private readonly clothesService: ClothesService) {}

//   @Post()
//   create(@Body() createClothesDto: CreateClothesDto) {
//     return this.clothesService.create(createClothesDto);
//   }

//   @Get('article/:article')
//   findByArticle(@Param('article') article: string) {
//     return this.clothesService.findByArticle(article);
//   }

//   @Get()
//   async findPaginated(@Query() query: PaginationQueryDto) {
//     const page = query.page ?? 1;
//     const limit = query.limit ?? 10;
//     return this.clothesService.findPaginated(page, limit);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.clothesService.findOne(id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateClothesDto: UpdateClothesDto) {
//     return this.clothesService.update(id, updateClothesDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.clothesService.remove(id);
//   }

//   @Post(':id/reviews')
//   async addReview(
//     @Param('id') id: string,
//     @Body() createReviewDto: CreateReviewDto,
//   ) {
//     try {
//       return await this.clothesService.addReview(id, createReviewDto);
//     } catch (error) {
//       console.error('❌ Error while creating review:', error);
//       throw error;
//     }
//   }

//   @Get(':id/reviews')
//   getReviews(@Param('id') id: string) {
//     return this.clothesService.getReviews(id);
//   }

//   @Delete(':id/reviews/:reviewId')
//   deleteReview(@Param('id') id: string, @Param('reviewId') reviewId: string) {
//     return this.clothesService.deleteReview(id, reviewId);
//   }

//   @Post(':id/reviews/:reviewId/like')
//   async likeReview(
//     @Param('id') id: string,
//     @Param('reviewId') reviewId: string,
//     @Body('userId') userId: string,
//   ) {
//     return this.clothesService.likeReview(id, reviewId, userId);
//   }

//   @Post(':id/reviews/:reviewId/dislike')
//   async dislikeReview(
//     @Param('id') id: string,
//     @Param('reviewId') reviewId: string,
//     @Body('userId') userId: string,
//   ) {
//     return this.clothesService.dislikeReview(id, reviewId, userId);
//   }
// }



