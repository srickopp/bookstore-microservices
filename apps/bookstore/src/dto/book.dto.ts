import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    example: 'The Great Gatsby',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'The author of the book',
    example: 'F. Scott Fitzgerald',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  author: string;

  @ApiProperty({
    description: 'The price of the book',
    example: 10.99,
  })
  @IsNumber()
  price: number;
}
