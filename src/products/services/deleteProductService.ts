import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';

export class DeleteProductService {
  constructor(private productRepository: ProductRepository) {}

  async deleteProduct(id: string): Promise<Product | null> {
    return this.productRepository.delete(id);
  }
}
