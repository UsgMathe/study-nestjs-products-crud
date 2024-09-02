import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { StockProductsModule } from './stock_products/stock_products.module';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { StockProduct } from './stock_products/entities/stock_product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/db.sql',
      synchronize: true,
      entities: [Product, Category, StockProduct],
    }),
    ProductsModule,
    CategoriesModule,
    StockProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
