import { IsNumber, IsPositive, MaxLength, MinLength } from 'class-validator';

export class CreateStockProductDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
