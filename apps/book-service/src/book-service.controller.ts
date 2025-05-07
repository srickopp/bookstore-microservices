import { Controller } from '@nestjs/common';
import { BookService } from './book-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateBookDto } from './dto/book.dto';

@Controller()
export class BookServiceController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern({ cmd: 'create-book' })
  async createBook(createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @MessagePattern({ cmd: 'get-books' })
  async getAllBooks() {
    return this.bookService.findAll();
  }

  @MessagePattern({ cmd: 'get-books-by-title' })
  async getBookByTitle(title: string) {
    return this.bookService.findOneByTitle(title);
  }

  @MessagePattern({ cmd: 'get-book-by-id' })
  async getBookById(id: string) {
    return this.bookService.findById(id);
  }
}
