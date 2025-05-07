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

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.appService.createUser(createUserDto);
  }

  @Get('users')
  async getAllUsers() {
    return this.appService.listUser();
  }

  @Get('user/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.appService.getUserByEmail(email);
  }

  @Post('create-book')
  async createBook(@Body() createBookDto: CreateBookDto) {
    return await this.appService.createBook(createBookDto);
  }

  @Get('books')
  async getAllBooks() {
    return this.appService.listBook();
  }

  @Post('create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.appService.createOrder(createOrderDto);
  }

  @Get('orders/:userId')
  async getOrdersByUser(@Param('userId') userId: string) {
    return await this.appService.getOrderByUserId(userId);
  }
}
