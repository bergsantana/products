import { ProductService } from './product.service';
import { Product } from 'src/models/product/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(product: Product): Promise<Product>;
    findAll(query: {
        search: string;
        page: number;
    }): Promise<{
        data: Product[];
        count: number;
    }>;
    findOne(id: string): string;
    update(product: Product): Promise<Product>;
    remove(id: string): string;
}
