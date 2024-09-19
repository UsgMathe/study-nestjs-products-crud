import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export class SaleItemDto {
  @IsNumber()
  @IsPositive()
  @IsInt()
  @ApiProperty({ description: 'ID of existing stock products', example: 1 })
  stock_product_id: number;

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
    example: 10.99,
    minimum: 0.1,
  })
  price: number;
}
