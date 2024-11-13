import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';

export class GetAllProductService {
  constructor(private productRepository: ProductRepository) {}

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
