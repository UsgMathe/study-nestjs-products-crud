import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { Sale } from './sales/entities/sale.entity';
import { SalesModule } from './sales/sales.module';
import { StockProduct } from './stock_products/entities/stock_product.entity';
import { StockProductsModule } from './stock_products/stock_products.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seeders/seed.module';
import { SeedService } from './seeders/seed.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { validateEnv } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnv,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/db.sql',
      synchronize: true,
      entities: [Product, Category, StockProduct, Sale, User],
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    ProductsModule,
    CategoriesModule,
    StockProductsModule,
    SalesModule,
    AuthModule,
    UsersModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    SeedService,
    UsersService,
    AuthService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    await this.seedService.createAdminUser();
  }
}
