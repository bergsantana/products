import { Repository } from 'typeorm';
import { Product } from 'src/models/product/product.entity';
import { Category } from 'src/models/category/category';
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    create(product: Product): Promise<Product>;
    findAll(query: string, page: number): Promise<{
        data: Product[];
        count: number;
    }>;
    findOne(id: number): string;
    update(product: Product): Promise<Product>;
    remove(id: number): string;
}
