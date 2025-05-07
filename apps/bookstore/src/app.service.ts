import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/user.dto';
import { CreateBookDto } from './dto/book.dto';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('BOOK_SERVICE') private bookServiceClient: ClientProxy,
    @Inject('ORDER_SERVICE') private orderServiceClient: ClientProxy,
  ) {}

  // Function to create a user
  async createUser(createUserDto: CreateUserDto) {
    try {
      const result = this.userServiceClient.send(
        { cmd: 'create-user' },
        createUserDto,
      );
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const result = this.userServiceClient.send(
        { cmd: 'get-user-by-email' },
        email,
      );
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserById(userId: string) {
    try {
      const result = this.userServiceClient.send(
        { cmd: 'get-user-by-id' },
        userId,
      );
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async listUser() {
    try {
      const result = this.userServiceClient.send({ cmd: 'get-all-users' }, {});
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Function to create a book
  async createBook(createBookDto: CreateBookDto) {
    try {
      const result = this.bookServiceClient.send(
        { cmd: 'create-book' },
        createBookDto,
      );
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Function to list books
  async listBook() {
    try {
      const result = this.bookServiceClient.send({ cmd: 'get-all-books' }, {});
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Function to list orders and fetch user and book data
  async listOrder() {
    try {
      // Fetch all orders
      const orders = await lastValueFrom(
        this.orderServiceClient.send({ cmd: 'get-all-orders' }, {}),
      );

      // For each order, get associated user and book
      for (let order of orders) {
        const user = await lastValueFrom(
          this.userServiceClient.send(
            { cmd: 'get-user-by-email' },
            order.userId,
          ),
        );
        const book = await lastValueFrom(
          this.bookServiceClient.send(
            { cmd: 'get-book-by-title' },
            order.bookId,
          ),
        );

        order.user = user;
        order.book = book;
      }

      return orders;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      // Validate user exists
      const user = await lastValueFrom(
        this.userServiceClient.send(
          { cmd: 'get-user-by-id' },
          createOrderDto.userId,
        ),
      );
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Validate book exists
      const book = await lastValueFrom(
        this.bookServiceClient.send(
          { cmd: 'get-book-by-id' },
          createOrderDto.bookId,
        ),
      );
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      // Calculate the total price
      const totalPrice = book.price * createOrderDto.quantity;

      // Add total price to the order data
      const orderData = {
        ...createOrderDto,
        totalPrice,
      };

      // Create the order
      const result = this.orderServiceClient.send(
        { cmd: 'create-order' },
        orderData,
      );
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOrderByUserId(userId: string) {
    try {
      // Fetch orders by userId
      const orders = await lastValueFrom(
        this.orderServiceClient.send({ cmd: 'get-order-by-userId' }, userId),
      );

      for (let order of orders) {
        const user = await lastValueFrom(
          this.userServiceClient.send({ cmd: 'get-user-by-id' }, order.userId),
        );
        const book = await lastValueFrom(
          this.bookServiceClient.send({ cmd: 'get-book-by-id' }, order.bookId),
        );

        order.user = user;
        order.book = book;
      }

      return orders;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getOrderById(orderId: string) {
    try {
      const result = this.orderServiceClient.send(
        { cmd: 'get-order-by-id' },
        orderId,
      );
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error handling utility function
  private handleError(error: any) {
    if (error?.response?.data) {
      if (error.response.data.message) {
        throw new InternalServerErrorException(error.response.data.message);
      }

      throw new InternalServerErrorException(
        JSON.stringify(error.response.data),
      );
    }

    throw new InternalServerErrorException(
      error?.message || 'An unexpected error occurred',
    );
  }
}
