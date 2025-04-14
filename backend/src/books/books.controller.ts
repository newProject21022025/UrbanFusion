// books/books.controller.ts
import { Controller, Get, Delete, Param } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAll() {
    return await this.booksService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}