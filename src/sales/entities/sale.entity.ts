import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @ManyToOne(() => Product, (product) => product.sales, { cascade: false })
  @ApiProperty({ type: () => Product })
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 120.99 })
  price: number;

  @Column()
  @ApiProperty({ example: 5 })
  amount: number;

  @CreateDateColumn()
  @ApiProperty({ example: '2024-09-13T00:53:09.000Z' })
  sale_date: number;
}
