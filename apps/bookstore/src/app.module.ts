import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('USER_SERVICE_HOST'),
            port: parseInt(configService.get('USER_SERVICE_PORT'), 10),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'BOOK_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('BOOK_SERVICE_HOST'),
            port: parseInt(configService.get('BOOK_SERVICE_PORT'), 10),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'ORDER_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('ORDER_SERVICE_HOST'),
            port: parseInt(configService.get('ORDER_SERVICE_PORT'), 10),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
