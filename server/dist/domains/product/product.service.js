"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../../models/product/product.entity");
const category_1 = require("../../models/category/category");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(product) {
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
    async findAll(search, page) {
        const take = 10;
        const skip = take * (page - 1);
        const query = this.productRepository.createQueryBuilder('product')
            .where('product.name LIKE :query', { query: `%${search}%` })
            .orWhere('product.description LIKE :query', { query: `%${search}%` })
            .skip(skip)
            .take(take);
        const [result, total] = await query.getManyAndCount();
        return {
            data: result,
            count: total,
            page,
            pageSize: 10
        };
    }
    async findOne(id) {
        const response = await this.productRepository.findOne({
            where: {
                id: id
            }
        });
        return response;
    }
    async update(product) {
        return await this.productRepository.save(product);
    }
    async remove(id) {
        return await this.productRepository.delete({
            id: id
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map