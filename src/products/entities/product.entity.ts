import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Microwave' })
  @Column()
  name: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2024-09-13T00:53:09.000Z' })
  created_at: Date;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable({ name: 'products_categories' })
  @ApiProperty({
    type: [Category],
    example: [
      {
        id: 1,
        name: 'electronics',
        description: 'All electronic products',
        created_at: '2024-09-13T00:52:09.000Z',
      },
    ],
  })
  categories: Category[];

  @OneToMany(() => StockProduct, (stockProduct) => stockProduct.product)
  stock_product: StockProduct[];
}
