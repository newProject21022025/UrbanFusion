// // src/clothes/clothes.controller.ts

// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Put,
//   Delete,
// } from '@nestjs/common';
// import { ClothesService } from './clothes.service';
// import { CreateClothesDto } from './dto/create-clothes.dto';
// import { UpdateClothesDto } from './dto/update-clothes.dto';

// @Controller(':locale/clothes')
// export class ClothesController {
//   constructor(private readonly clothesService: ClothesService) {}

//   @Post()
//   create(
//     @Param('locale') locale: string,
//     @Body() createClothesDto: CreateClothesDto,
//   ) {
//     return this.clothesService.create(createClothesDto, locale);
//   }

//   @Get()
//   findAll(@Param('locale') locale: string) {
//     return this.clothesService.findAll(locale);
//   }

//   @Get(':id')
//   findOne(@Param('locale') locale: string, @Param('id') id: string) {
//     return this.clothesService.findOne(id, locale);
//   }

//   @Put(':id')
//   update(
//     @Param('locale') locale: string,
//     @Param('id') id: string,
//     @Body() updateClothesDto: UpdateClothesDto,
//   ) {
//     return this.clothesService.update(id, updateClothesDto, locale);
//   }

//   @Delete(':id')
//   remove(@Param('locale') locale: string, @Param('id') id: string) {
//     return this.clothesService.remove(id, locale);
//   }
// }



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
  }