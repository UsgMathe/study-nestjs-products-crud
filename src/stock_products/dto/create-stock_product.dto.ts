import { IsNumber, IsPositive } from 'class-validator';

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
