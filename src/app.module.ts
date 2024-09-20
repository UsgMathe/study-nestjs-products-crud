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
import { SalesModule } from './sales/sales.module';
import { Sale } from './sales/entities/sale.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/db.sql',
      synchronize: true,
      entities: [Product, Category, StockProduct, Sale, User],
    }),
    ProductsModule,
    CategoriesModule,
    StockProductsModule,
    SalesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
