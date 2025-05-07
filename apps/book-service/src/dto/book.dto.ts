import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  author: string;

  @IsNumber()
  price: number;
}
