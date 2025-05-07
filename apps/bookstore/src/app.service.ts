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

  /**
   * This function creates a new user in the system.
   *
   * @param createUserDto
   * @returns
   */
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

  /**
   * This function retrieves a user by their email address.
   *
   * @param email
   * @returns
   */
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

  /**
   * This function retrieves a user by their ID.
   *
   * @param userId
   * @returns
   */
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

  /**
   * This function retrieves all users in the system.
   *
   * @returns
   */
  async listUser() {
    try {
      const result = this.userServiceClient.send({ cmd: 'get-users' }, {});
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * This function creates a new book in the system.
   *
   * @param createBookDto
   * @returns
   */
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

  /**
   * This function retrieves a book by its title.
   *
   * @param title
   * @returns
   */
  async listBook() {
    try {
      const result = this.bookServiceClient.send({ cmd: 'get-books' }, {});
      return await lastValueFrom(result);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * This function retrieves a book by its ID.
   *
   * @param bookId
   * @returns
   */
  async listOrder() {
    try {
      // Fetch all orders
      const orders = await lastValueFrom(
        this.orderServiceClient.send({ cmd: 'get-orders' }, {}),
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
            { cmd: 'get-books-by-title' },
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

  /**
   * This function retrieves a book by its ID.
   *
   * @param bookId
   * @returns
   */
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

  /**
   * This function retrieves an order by its ID.
   *
   * @param orderId
   * @returns
   */
  async getOrderByUserId(userId: string) {
    try {
      // Fetch orders by userId
      const orders = await lastValueFrom(
        this.orderServiceClient.send({ cmd: 'get-order-by-user' }, userId),
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

  /**
   * This function retrieves an order by its ID.
   *
   * @param orderId
   * @returns
   */
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
