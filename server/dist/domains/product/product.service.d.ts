import { Repository } from 'typeorm';
import { Product } from 'src/models/product/product.entity';
import { Category } from 'src/models/category/category';
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    create(product: Product): Promise<Product>;
    findAll(search: string, page: number): Promise<{
        data: Product[];
        count: number;
        page: number;
        pageSize: number;
    }>;
    findOne(id: number): Promise<Product>;
    update(product: Product): Promise<Product>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
