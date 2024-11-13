import { Product } from '@prisma/client';
import { ProductRepository } from '../repositories/productRepository';
import { UpdateProductDto } from '../dto/updateProductDto';
import { Response } from 'express';
import { CustomError } from '../../middlewares/errorHandler';

export class UpdateProductService {
  constructor(private productRepository: ProductRepository) {}

  async updateProduct(
    id: string,
    productData: UpdateProductDto
  ): Promise<Product> {
    const { name, description, price, imageUrl, category } = productData;

    const verifyProduct = await this.productRepository.findById(id);
    if (!verifyProduct) {
      const error = new Error() as CustomError;
      error.status = 404;
      error.message = 'Produto não encontrado';
      throw error;
    }

    const product = await this.productRepository.update(id, {
      name,
      description,
      price,
      imageUrl,
      category,
    });

    return product;
  }
}
