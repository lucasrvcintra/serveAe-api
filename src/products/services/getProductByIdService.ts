import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';

export class GetProductByIdService {
  constructor(private productRepository: ProductRepository) {}

  async findProductById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    return product;
  }
}
