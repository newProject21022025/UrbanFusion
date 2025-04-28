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