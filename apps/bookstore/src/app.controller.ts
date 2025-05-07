import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/user.dto';
import { CreateBookDto } from './dto/book.dto';
import { CreateOrderDto } from './dto/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Bookstore')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.appService.createUser(createUserDto);
  }

  @Get('users')
  async getAllUsers() {
    return this.appService.listUser();
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    return this.appService.getUserById(id);
  }

  @Post('books')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.appService.createBook(createBookDto);
  }

  @Get('books')
  async getAllBooks() {
    return this.appService.listBook();
  }

  @Post('orders')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.appService.createOrder(createOrderDto);
  }

  @Get('orders/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return await this.appService.getOrderByUserId(userId);
  }
}
