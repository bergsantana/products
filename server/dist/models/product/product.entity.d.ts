import { Category } from '../category/category';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    expireDate: Date;
    image: string;
    categoryName: string;
    category: Category;
}
