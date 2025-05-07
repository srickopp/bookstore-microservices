import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the user placing the order',
    example: 'user123',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  userId: string;

  @ApiProperty({
    description: 'The ID of the book being ordered',
    example: 'book123',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  bookId: string;

  @ApiProperty({
    description: 'The quantity of the book being ordered',
    example: 2,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'The total price of the order',
    example: 19.99,
  })
  @IsNumber()
  totalPrice: number;
}
