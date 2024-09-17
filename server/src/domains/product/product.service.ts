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

  async findAll(query: string, page: number) {
    const take = 10;
    const skip = take * (page - 1);

    console.log(`query`, query, page);

    const [result, total] = await this.productRepository.findAndCount({
      where: {
        name: Like(`%${query}%`),
      },
      order: {
        name: 'DESC',
      },
      take: 10,
      skip: 0,
    });
    return {
      data: result,
      count: total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(product: Product) {
    return await this.productRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
