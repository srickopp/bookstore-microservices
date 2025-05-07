import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { OrderServiceModule } from './order-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3003,
      },
    },
  );
  console.log('Order Service is running on port 3003');
  await app.listen();
}

bootstrap();
