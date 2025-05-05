import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Clothes } from './schemas/clothes.schema';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import slugify from 'slugify'; 

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