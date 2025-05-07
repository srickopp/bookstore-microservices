import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrderServiceModule } from './order-service.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.ORDER_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.ORDER_SERVICE_PORT) || 3003,
      },
    },
  );
  console.log(
    `Order Service is running on port ${process.env.ORDER_SERVICE_PORT}`,
  );
  await app.listen();
}

bootstrap();
