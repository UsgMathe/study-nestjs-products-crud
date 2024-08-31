import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { StockProduct } from './entities/stock_product.entity';
import { StockProductsController } from './stock_products.controller';
import { StockProductsService } from './stock_products.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockProduct, Product])],
  controllers: [StockProductsController],
  providers: [StockProductsService, ProductsService],
})
export class StockProductsModule {}
