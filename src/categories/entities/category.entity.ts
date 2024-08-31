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
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'products_categories' })
  products: Product[];
}
