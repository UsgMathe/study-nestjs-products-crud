import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'electronics' })
  name: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({ example: 'All electronic products' })
  description: string | null;

  @ApiProperty({ example: '2024-09-13T00:52:09.000Z' })
  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
