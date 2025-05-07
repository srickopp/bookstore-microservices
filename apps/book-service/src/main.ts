import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { BookServiceModule } from './book-service.module';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.BOOK_SERVICE_HOST || 'localhost',
        port: parseInt(process.env.BOOK_SERVICE_PORT) || 3002,
      },
    },
  );
  console.log('Book Service is running on port 3002');
  await app.listen();
}

bootstrap();
