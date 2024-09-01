import { Category } from 'src/categories/entities/category.entity';
import { StockProduct } from 'src/stock_products/entities/stock_product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({ name: 'products_categories' })
  categories: Category[];

  @OneToMany(() => StockProduct, (stockProduct) => stockProduct.product)
  stock_product: StockProduct[];
}
