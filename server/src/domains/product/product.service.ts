import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import { Product } from 'src/models/product/product.entity';
import { Category } from 'src/models/category/category';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(product: Product) {
    const procutToSave = this.productRepository.create({
      ...product,
      expireDate: new Date(product.expireDate),
    });

    const category = await this.categoryRepository.find({
      where: {
        name: procutToSave.categoryName,
      },
    });

    if (!category.length)
      await this.categoryRepository.save({
        name: procutToSave.categoryName,
      });

    return await this.productRepository.save(procutToSave);
  }

  async findAll(search: string, page: number) {
    const take = 10;
    const skip = take * (page - 1);

    const query =  this.productRepository.createQueryBuilder('product')
    .where('product.name LIKE :query', { query: `%${search}%`})
    .orWhere('product.description LIKE :query', {query: `%${search}%`})
    .skip(skip)
    .take(take)

    const [result, total] = await query.getManyAndCount()
    return {
      data: result,
      count: total,
      page,
      pageSize: 10
    };
  }

  async findOne(id: number) {
    const response =  await this.productRepository.findOne({
      where: {
        id: id
      }
    })
  
    return response
  }

  async update(product: Product) {
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    return await this.productRepository.delete({
      id: id
    });
  }
}
