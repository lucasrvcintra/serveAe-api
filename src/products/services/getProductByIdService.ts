import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';

export class GetProductByIdService {
  constructor(private productRepository: ProductRepository) {}

  async findProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
