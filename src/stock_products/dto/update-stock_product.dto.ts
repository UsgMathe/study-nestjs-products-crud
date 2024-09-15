import { PartialType } from '@nestjs/swagger';
import { CreateStockProductDto } from './create-stock_product.dto';

export class UpdateStockProductDto extends PartialType(CreateStockProductDto) {}
