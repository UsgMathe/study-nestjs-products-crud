import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ProductsController } from 'src/products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { StockProductsService } from 'src/stock_products/stock_products.service';
import { StockProduct } from 'src/stock_products/entities/stock_product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';

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
