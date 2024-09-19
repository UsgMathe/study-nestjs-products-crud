import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { SaleItemDto } from './sale-item.dto';

export class CreateSaleDto {
  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty({
    type: [SaleItemDto],
    example: [
      { stock_product_id: 1, quantity: 2, price: 10.99 },
      { stock_product_id: 2, quantity: 1, price: 12.5 },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  saleItems: SaleItemDto[];
}
