// books/books.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async findAll() {
    const books = await this.bookModel.find().lean().exec();
    return books.map(book => ({
      ...book,
      _id: book._id.toString(),
    }));
  }

  async remove(id: string) {
    return this.bookModel.findByIdAndDelete(id).exec();
  }
}