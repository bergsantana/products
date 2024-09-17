import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('CATEGORY')
export class Category {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME', length: 100, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.categoryName, {
    cascade: true,
  })
  products: Array<Product>;
}
