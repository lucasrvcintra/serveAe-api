import { PrismaProductRepository } from '../../repositories/productPrismaRepository';
import { DeleteProductService } from '../deleteProductService';

export const makeDeleteProductService = () => {
  const productRepository = new PrismaProductRepository();
  const deleteProductService = new DeleteProductService(productRepository);

  return deleteProductService;
};
