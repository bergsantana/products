import { IsDate, MinDate } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../category/category';

@Entity('PRODUCT')
export class Product {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'NAME', length: 50, unique: true })
  name: string;

  @Column({ name: 'DESCRIPTION', length: 200 })
  description: string;

  @Column({ name: 'PRICE', type: 'double' })
  price: number;

  @Column({ name: 'EXPIREDATE', type: 'date' })
  @IsDate({ message: 'Expiration date must be a valid date' })
  @MinDate(new Date(), {
    message: 'Expiration date cannot be lower than the current date',
  })
  expireDate: Date;

  @Column({ name: 'IMAGE' })
  image: string;

  @Column({ name: 'CATEGORYNAME' })
  categoryName: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'CATEGORYNAME', referencedColumnName: 'name' })
  category: Category;
}
