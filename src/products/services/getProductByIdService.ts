import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { CustomError } from '../../middlewares/errorHandler';

export class GetProductByIdService {
  constructor(private productRepository: ProductRepository) {}

  async findProductById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      const error = new Error() as CustomError;
      error.status = 404;
      error.message = 'Produto não encontrado';
      throw error;
    }

    return product;
  }
}
