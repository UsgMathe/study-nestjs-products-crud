import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { StockProduct } from 'src/stock_products/entities/stock_product.entity';
import { StockProductsService } from 'src/stock_products/stock_products.service';
import { Sale } from './entities/sale.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Product, StockProduct, Category])],
  controllers: [SalesController],
  providers: [
    SalesService,
    ProductsService,
    StockProductsService,
    CategoriesService,
  ],
})
export class SalesModule {}
