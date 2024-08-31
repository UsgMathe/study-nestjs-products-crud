import { BadRequestException } from '@nestjs/common';
import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class StockProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @BeforeInsert()
  @BeforeUpdate()
  validate() {
    if (this.quantity < 0) {
      throw new BadRequestException(
        'Quantity must be greater than or equal to 0',
      );
    }

    if (this.price <= 0) {
      throw new BadRequestException('Price must be greater than 0');
    }
  }
}
