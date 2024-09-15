import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StockProduct {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column('int')
  @ApiProperty({ example: 10 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty({ example: 120.99 })
  price: number;

  @ManyToOne(() => Product, { cascade: true })
  @JoinColumn()
  @ApiProperty({ type: () => Product })
  product: Product;
}
