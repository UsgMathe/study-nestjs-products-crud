import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';
import { StockProductsService } from './stock_products.service';

@Controller('stock-products')
export class StockProductsController {
  constructor(private readonly stockProductsService: StockProductsService) {}

  @Post()
  create(@Body() createStockProductDto: CreateStockProductDto) {
    return this.stockProductsService.create(createStockProductDto);
  }

  @Get()
  findAll() {
    return this.stockProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockProductsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockProductDto: UpdateStockProductDto,
  ) {
    return this.stockProductsService.update(+id, updateStockProductDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.stockProductsService.remove(+id);
  }
}
