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
  @IsInt()
  @Min(1)
  @ApiProperty({
    description: 'Quantity of products in stock',
    example: 10,
    minimum: 1,
  })
  quantity: number;
}
