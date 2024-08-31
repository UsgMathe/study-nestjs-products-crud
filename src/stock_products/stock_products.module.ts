import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockProduct } from './entities/stock_product.entity';
import { StockProductsController } from './stock_products.controller';
import { StockProductsService } from './stock_products.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockProduct])],
  controllers: [StockProductsController],
  providers: [StockProductsService],
})
export class StockProductsModule {}
