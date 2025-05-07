import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderServiceController } from './order-service.controller';
import { ConfigModule } from '@nestjs/config';
import { Order, OrderSchema } from './schema/order.schema';
import { OrderService } from './order-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [OrderService],
  controllers: [OrderServiceController],
})
export class OrderServiceModule {}
