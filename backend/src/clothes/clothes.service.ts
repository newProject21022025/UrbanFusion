// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Clothes } from './schemas/clothes.schema';
// import { CreateClothesDto } from './dto/create-clothes.dto';
// import { UpdateClothesDto } from './dto/update-clothes.dto';

// @Injectable()
// export class ClothesService {
//   constructor(
//     @InjectModel(Clothes.name) private readonly clothesModel: Model<Clothes>,
//   ) {}

//   async create(createClothesDto: CreateClothesDto, locale: string): Promise<Clothes> {
//     const newClothes = new this.clothesModel({ ...createClothesDto, locale });
//     return await newClothes.save(); // Slug створиться автоматично в pre('save') хуку
//   }

//   async findAll(locale: string): Promise<Clothes[]> {
//     return this.clothesModel.find({ locale }).exec();
//   }

//   async findOne(id: string, locale: string): Promise<Clothes> {
//     const clothes = await this.clothesModel.findOne({ _id: id, locale }).exec();
//     if (!clothes) {
//       throw new NotFoundException(`Clothes with id ${id} not found`);
//     }
//     return clothes;
//   }

//   async update(id: string, updateClothesDto: UpdateClothesDto, locale: string): Promise<Clothes> {
//     const updated = await this.clothesModel.findOneAndUpdate(
//       { _id: id, locale },
//       updateClothesDto,
//       { new: true },
//     ).exec();

//     if (!updated) {
//       throw new NotFoundException(`Clothes with id ${id} not found`);
//     }

//     return updated;
//   }

//   async remove(id: string, locale: string): Promise<Clothes> {
//     const deleted = await this.clothesModel.findOneAndDelete({ _id: id, locale }).exec();

//     if (!deleted) {
//       throw new NotFoundException(`Clothes with id ${id} not found`);
//     }

//     return deleted;
//   }
// }



import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clothes } from './schemas/clothes.schema';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
// import slugify from 'slugify'; 

@Injectable()
export class ClothesService {
  constructor(
    @InjectModel(Clothes.name) private readonly clothesModel: Model<Clothes>,
  ) {}

  async create(createClothesDto: CreateClothesDto): Promise<Clothes> {
    const newClothes = new this.clothesModel(createClothesDto);
    return await newClothes.save(); // Slug створиться автоматично в pre('save') хуку
  }

  async findAll(): Promise<Clothes[]> {
    return this.clothesModel.find().exec();
  }

  async findOne(id: string): Promise<Clothes | null> {
    return this.clothesModel.findById(id).exec();
  }

  async update(
    id: string,
    updateClothesDto: UpdateClothesDto,
  ): Promise<Clothes | null> {
    return this.clothesModel
      .findByIdAndUpdate(id, updateClothesDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Clothes | null> {
    return this.clothesModel.findByIdAndDelete(id).exec();
  }
}