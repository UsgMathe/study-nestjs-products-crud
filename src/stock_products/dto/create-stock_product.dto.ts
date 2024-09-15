import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class CreateStockProductDto {
  @IsNumber()
  @ApiProperty({
    description: 'ID of an existing product',
    example: 1,
  })
  product_id: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @ApiProperty({
    description: 'Quantity of products in stock',
    example: 10,
    minimum: 1,
  })
  quantity: number;

  @IsNumber()
  @IsPositive()
  @Min(0.1)
  @ApiProperty({
    description: 'Product unit price',
    example: 10,
    minimum: 0.1,
  })
  price: number;
}
