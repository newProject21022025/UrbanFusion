// src/clothes/clothes.service.ts


import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clothes } from './schemas/clothes.schema';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import moment from 'moment';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ClothesService {
  constructor(
    @InjectModel(Clothes.name) private readonly clothesModel: Model<Clothes>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createClothesDto: CreateClothesDto): Promise<Clothes> {
    const categoryPrefix = (createClothesDto.category.en || 'CAT').substring(0, 3).toUpperCase();
    const today = moment().format('YYYYMMDD');
    const regex = new RegExp(`^${categoryPrefix}-${today}`);
    const count = await this.clothesModel.countDocuments({ article: { $regex: regex } });
    const article = `${categoryPrefix}-${today}-${String(count + 1).padStart(3, '0')}`;

    const newClothes = new this.clothesModel({ ...createClothesDto, article });
    const saved = await newClothes.save();

    await this.cacheManager.del('all_clothes');
    return saved;
  }

  async findAll(): Promise<Clothes[]> {
    return this.clothesModel.find().exec();
  }

  async findOne(id: string): Promise<Clothes> {
    const item = await this.clothesModel.findById(id).exec();
    if (!item) throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    return item;
  }

  async update(id: string, dto: UpdateClothesDto): Promise<Clothes> {
    const updatedItem = await this.clothesModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true }).exec();
    if (!updatedItem) throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    await this.cacheManager.del('all_clothes');
    await this.cacheManager.del(`clothes_${id}`);
    return updatedItem;
  }

  async remove(id: string): Promise<Clothes> {
    const deletedItem = await this.clothesModel.findByIdAndDelete(id).exec();
    if (!deletedItem) throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    await this.cacheManager.del('all_clothes');
    await this.cacheManager.del(`clothes_${id}`);
    return deletedItem;
  }

  async addReview(id: string, dto: CreateReviewDto): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(id);
    if (!clothesItem) throw new NotFoundException(`Clothing item with ID '${id}' not found`);

    clothesItem.reviews.push({ ...dto, likes: [], dislikes: [] });
    await this.cacheManager.del(`reviews_${id}`);
    return clothesItem.save();
  }

  async getReviews(id: string): Promise<CreateReviewDto[]> {
    const clothesItem = await this.clothesModel.findById(id).exec();
    if (!clothesItem) throw new NotFoundException(`Clothing item with ID '${id}' not found`);
    return clothesItem.reviews;
  }

  async deleteReview(id: string, reviewId: string): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(id);
    if (!clothesItem) throw new NotFoundException(`Clothing item with ID '${id}' not found`);

    const index = clothesItem.reviews.findIndex((review: any) => review._id?.toString() === reviewId);
    if (index === -1) throw new NotFoundException(`Review with ID '${reviewId}' not found`);

    clothesItem.reviews.splice(index, 1);
    await this.cacheManager.del(`reviews_${id}`);
    return clothesItem.save();
  }

  async likeReview(clothesId: string, reviewId: string, userId: string): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(clothesId);
    if (!clothesItem) throw new NotFoundException(`Clothing item with ID '${clothesId}' not found`);

    const review = clothesItem.reviews.find(r => r._id?.toString() === reviewId);
    if (!review) throw new NotFoundException(`Review with ID '${reviewId}' not found`);

    review.dislikes = review.dislikes.filter(id => id !== userId);
    if (review.likes.includes(userId)) {
      review.likes = review.likes.filter(id => id !== userId);
    } else {
      review.likes.push(userId);
    }

    await this.cacheManager.del(`reviews_${clothesId}`);
    return clothesItem.save();
  }

  async dislikeReview(clothesId: string, reviewId: string, userId: string): Promise<Clothes> {
    const clothesItem = await this.clothesModel.findById(clothesId);
    if (!clothesItem) throw new NotFoundException(`Clothing item with ID '${clothesId}' not found`);

    const review = clothesItem.reviews.find(r => r._id?.toString() === reviewId);
    if (!review) throw new NotFoundException(`Review with ID '${reviewId}' not found`);

    review.likes = review.likes.filter(id => id !== userId);
    if (review.dislikes.includes(userId)) {
      review.dislikes = review.dislikes.filter(id => id !== userId);
    } else {
      review.dislikes.push(userId);
    }

    await this.cacheManager.del(`reviews_${clothesId}`);
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

  async findByArticle(article: string): Promise<Clothes> {
    const item = await this.clothesModel.findOne({ article }).exec();
    if (!item) throw new NotFoundException(`Item with article '${article}' not found`);
    return item;
  }
}


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Clothes } from './schemas/clothes.schema';
// import { CreateClothesDto } from './dto/create-clothes.dto';
// import { UpdateClothesDto } from './dto/update-clothes.dto';
// import { CreateReviewDto } from './dto/create-review.dto';
// import moment from 'moment';

// @Injectable()
// export class ClothesService {
//   constructor(
//     @InjectModel(Clothes.name) private readonly clothesModel: Model<Clothes>,
//   ) {}


//   async create(createClothesDto: CreateClothesDto): Promise<Clothes> {
//     // 1. Отримати префікс категорії англійською
//     const categoryPrefix = (createClothesDto.category.en || 'CAT')
//       .substring(0, 3)
//       .toUpperCase();
  
//     // 2. Поточна дата
//     const today = moment().format('YYYYMMDD');
  
//     // 3. Знайти кількість товарів, створених сьогодні з цим префіксом
//     const regex = new RegExp(`^${categoryPrefix}-${today}`);
//     const count = await this.clothesModel.countDocuments({ article: { $regex: regex } });
  
//     // 4. Згенерувати артикул
//     const article = `${categoryPrefix}-${today}-${String(count + 1).padStart(3, '0')}`;
  
//     // 5. Створити товар
//     const newClothes = new this.clothesModel({
//       ...createClothesDto,
//       article,
//     });
  
//     return await newClothes.save();
//   }

//   async findAll(): Promise<Clothes[]> {
//     return this.clothesModel.find().exec();
//   }

//   async findOne(id: string): Promise<Clothes> {
//     const item = await this.clothesModel.findById(id).exec();
//     if (!item) {
//       throw new NotFoundException(`Clothing item with ID '${id}' not found`);
//     }
//     return item;
//   }

//   async update(id: string, updateClothesDto: UpdateClothesDto): Promise<Clothes> {
//     const updatedItem = await this.clothesModel
//       .findByIdAndUpdate(id, updateClothesDto, { new: true, runValidators: true })
//       .exec();

//     if (!updatedItem) {
//       throw new NotFoundException(`Clothing item with ID '${id}' not found`);
//     }

//     return updatedItem;
//   }

//   async remove(id: string): Promise<Clothes> {
//     const deletedItem = await this.clothesModel.findByIdAndDelete(id).exec();
//     if (!deletedItem) {
//       throw new NotFoundException(`Clothing item with ID '${id}' not found`);
//     }
//     return deletedItem;
//   }

//   async addReview(id: string, dto: CreateReviewDto): Promise<Clothes> {
//     const clothesItem = await this.clothesModel.findById(id);

//     if (!clothesItem) {
//       throw new NotFoundException(`Clothing item with ID '${id}' not found`);
//     }

//     const review = {
//       ...dto,
//       likes: dto.likes ?? [],
//       dislikes: dto.dislikes ?? [],
//     };

//     clothesItem.reviews.push(review);
//     return clothesItem.save();
//   }

//   async getReviews(id: string): Promise<CreateReviewDto[]> {
//     const clothesItem = await this.clothesModel.findById(id).exec();

//     if (!clothesItem) {
//       throw new NotFoundException(`Clothing item with ID '${id}' not found`);
//     }

//     return clothesItem.reviews;
//   }

//   async deleteReview(id: string, reviewId: string): Promise<Clothes> {
//     const clothesItem = await this.clothesModel.findById(id);

//     if (!clothesItem) {
//       throw new NotFoundException(`Clothing item with ID '${id}' not found`);
//     }

//     const index = clothesItem.reviews.findIndex(
//       (review: any) => review._id?.toString() === reviewId,
//     );

//     if (index === -1) {
//       throw new NotFoundException(`Review with ID '${reviewId}' not found`);
//     }

//     clothesItem.reviews.splice(index, 1);
//     return clothesItem.save();
//   }

//   async likeReview(clothesId: string, reviewId: string, userId: string): Promise<Clothes> {
//     const clothesItem = await this.clothesModel.findById(clothesId);
//     if (!clothesItem) {
//       throw new NotFoundException(`Clothing item with ID '${clothesId}' not found`);
//     }

//     const review = clothesItem.reviews.find(r => r._id?.toString() === reviewId);
//     if (!review) {
//       throw new NotFoundException(`Review with ID '${reviewId}' not found`);
//     }

//     // Забираємо дизлайк, якщо є
//     review.dislikes = review.dislikes.filter(id => id !== userId);

//     if (review.likes.includes(userId)) {
//       // Якщо вже є лайк - видаляємо (знімаємо лайк)
//       review.likes = review.likes.filter(id => id !== userId);
//     } else {
//       // Додаємо лайк
//       review.likes.push(userId);
//     }

//     return clothesItem.save();
//   }

//   async dislikeReview(clothesId: string, reviewId: string, userId: string): Promise<Clothes> {
//     const clothesItem = await this.clothesModel.findById(clothesId);
//     if (!clothesItem) {
//       throw new NotFoundException(`Clothing item with ID '${clothesId}' not found`);
//     }

//     const review = clothesItem.reviews.find(r => r._id?.toString() === reviewId);
//     if (!review) {
//       throw new NotFoundException(`Review with ID '${reviewId}' not found`);
//     }

//     // Забираємо лайк, якщо є
//     review.likes = review.likes.filter(id => id !== userId);

//     if (review.dislikes.includes(userId)) {
//       // Якщо вже є дизлайк - видаляємо (знімаємо дизлайк)
//       review.dislikes = review.dislikes.filter(id => id !== userId);
//     } else {
//       // Додаємо дизлайк
//       review.dislikes.push(userId);
//     }

//     return clothesItem.save();
//   }

//   async findPaginated(page: number, limit: number) {
//     const skip = (page - 1) * limit;
  
//     const [items, total] = await Promise.all([
//       this.clothesModel.find().skip(skip).limit(limit).exec(),
//       this.clothesModel.countDocuments().exec(),
//     ]);
  
//     return {
//       items,
//       total,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//     };
//   }

//   async findByArticle(article: string): Promise<Clothes> {
//     const item = await this.clothesModel.findOne({ article }).exec();
//     if (!item) {
//       throw new NotFoundException(`Item with article '${article}' not found`);
//     }
//     return item;
//   }
  
  
// }


