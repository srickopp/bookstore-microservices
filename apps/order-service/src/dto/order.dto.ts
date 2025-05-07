import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @MinLength(3)
  userId: string;

  @IsString()
  @MinLength(3)
  bookId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  totalPrice: number;
}
