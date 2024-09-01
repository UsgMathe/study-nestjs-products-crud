import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { StockProduct } from './entities/stock_product.entity';
import { StockProductsController } from './stock_products.controller';
import { StockProductsService } from './stock_products.service';

@Module({
  imports: [TypeOrmModule.forFeature([StockProduct, Product, Category])],
  controllers: [StockProductsController],
  providers: [StockProductsService, ProductsService, CategoriesService],
})
export class StockProductsModule {}
