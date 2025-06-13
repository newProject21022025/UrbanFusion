// src/clothes/clothes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clothes } from './schemas/clothes.schema';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ClothesService {
  constructor(
    @InjectModel(Clothes.name) private readonly clothesModel: Model<Clothes>,
  ) {}

  async create(createClothesDto: CreateClothesDto): Promise<Clothes> {
    const newClothes = new this.clothesModel(createClothesDto);
    return await newClothes.save();
  }

  async findAll(): Promise<Clothes[]> {
    return this.clothesModel.find().exec();
  }

  async findOne(id: string): Promise<Clothes> {
    const item = await this.clothesModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    }
    return item;
  }

  async update(id: string, updateClothesDto: UpdateClothesDto): Promise<Clothes> {
    const updatedItem = await this.clothesModel
      .findByIdAndUpdate(id, updateClothesDto, { new: true, runValidators: true })
      .exec();

    if (!updatedItem) {
      throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    }

    return updatedItem;
  }

  async remove(id: string): Promise<Clothes> {
    const deletedItem = await this.clothesModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    }
    return deletedItem;
  }

  async addReview(id: string, dto: CreateReviewDto): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(id);

    if (!clothesItem) {
      throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    }

    const review = {
      ...dto,
      likes: dto.likes ?? [],
      dislikes: dto.dislikes ?? [],
    };

    clothesItem.reviews.push(review);
    return clothesItem.save();
  }

  async getReviews(id: string): Promise<CreateReviewDto[]> {
    const clothesItem = await this.clothesModel.findById(id).exec();

    if (!clothesItem) {
      throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    }

    return clothesItem.reviews;
  }

  async deleteReview(id: string, reviewId: string): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(id);

    if (!clothesItem) {
      throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    }

    const index = clothesItem.reviews.findIndex(
      (review: any) => review._id?.toString() === reviewId,
    );

    if (index === -1) {
      throw new NotFoundException(`Review with ID '${reviewId}' not found`);
    }

    clothesItem.reviews.splice(index, 1);
    return clothesItem.save();
  }

  async likeReview(clothesId: string, reviewId: string, userId: string): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(clothesId);
    if (!clothesItem) {
      throw new NotFoundException(`Clothing item with ID '${clothesId}' not found`);
    }

    const review = clothesItem.reviews.find(r => r._id?.toString() === reviewId);
    if (!review) {
      throw new NotFoundException(`Review with ID '${reviewId}' not found`);
    }

    // Забираємо дизлайк, якщо є
    review.dislikes = review.dislikes.filter(id => id !== userId);

    if (review.likes.includes(userId)) {
      // Якщо вже є лайк - видаляємо (знімаємо лайк)
      review.likes = review.likes.filter(id => id !== userId);
    } else {
      // Додаємо лайк
      review.likes.push(userId);
    }

    return clothesItem.save();
  }

  async dislikeReview(clothesId: string, reviewId: string, userId: string): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(clothesId);
    if (!clothesItem) {
      throw new NotFoundException(`Clothing item with ID '${clothesId}' not found`);
    }

    const review = clothesItem.reviews.find(r => r._id?.toString() === reviewId);
    if (!review) {
      throw new NotFoundException(`Review with ID '${reviewId}' not found`);
    }

    // Забираємо лайк, якщо є
    review.likes = review.likes.filter(id => id !== userId);

    if (review.dislikes.includes(userId)) {
      // Якщо вже є дизлайк - видаляємо (знімаємо дизлайк)
      review.dislikes = review.dislikes.filter(id => id !== userId);
    } else {
      // Додаємо дизлайк
      review.dislikes.push(userId);
    }

    return clothesItem.save();
  }

  async findPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
  
    const [items, total] = await Promise.all([
      this.clothesModel.find().skip(skip).limit(limit).exec(),
      this.clothesModel.countDocuments().exec(),
    ]);
  
    return {
      items,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}


