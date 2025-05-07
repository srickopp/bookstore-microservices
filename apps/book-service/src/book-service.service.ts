// apps/bookstore/src/book-service.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Book, BookDocument } from './schema/book.schema';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { CreateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existingBook = await this.bookModel.findOne({
      title: createBookDto.title,
    });

    if (existingBook) {
      throw new RpcException('Book already exists');
    }

    const createdBook = new this.bookModel({
      ...createBookDto,
      _id: new Types.ObjectId(),
    });
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOneByTitle(title: string): Promise<Book | null> {
    return this.bookModel.findOne({ title }).exec();
  }

  async findById(bookId: string): Promise<Book | null> {
    return this.bookModel.findById(new Types.ObjectId(bookId)).exec();
  }
}
