import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order-service.service';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'create-order' })
  async createOrder(createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'get-orders' })
  async getAllOrders() {
    return this.orderService.findAll();
  }

  @MessagePattern({ cmd: 'get-order-by-user' })
  async getOrderByUser(userId: string) {
    return this.orderService.findByUser(userId);
  }

  @MessagePattern({ cmd: 'get-order-by-id' })
  async getOrderById(orderId: string) {
    return this.orderService.findById(orderId);
  }
}
