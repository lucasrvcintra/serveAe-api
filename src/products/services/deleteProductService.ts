import { Response } from 'express';
import { ProductRepository } from '../repositories/productRepository';

export class DeleteProductService {
  constructor(private productRepository: ProductRepository) {}

  async deleteProduct(id: string, response: Response) {
    const verifyProduct = await this.productRepository.findById(id);
    if (!verifyProduct) {
      return response.status(404).json({ message: 'Produto não encontrado' });
    }
    await this.productRepository.delete(id);
  }
}
