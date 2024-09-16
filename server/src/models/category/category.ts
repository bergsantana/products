import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('CATEGORY')
export class Category {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME', length: 50 })
  name: string;

  @OneToMany(() => Product, (product) => product.categoryName, {
    cascade: true,
  })
  products: Array<Product>;
}
