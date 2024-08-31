import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockProductsService } from './stock_products.service';
import { CreateStockProductDto } from './dto/create-stock_product.dto';
import { UpdateStockProductDto } from './dto/update-stock_product.dto';

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
  update(@Param('id') id: string, @Body() updateStockProductDto: UpdateStockProductDto) {
    return this.stockProductsService.update(+id, updateStockProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockProductsService.remove(+id);
  }
}
