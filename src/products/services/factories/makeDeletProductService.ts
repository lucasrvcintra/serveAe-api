import { ProductPrismaRepository } from '../../repositories/productPrismaRepository';
import { DeleteProductService } from '../deleteProductService';

export const makeDeleteProductService = () => {
  const productRepository = new ProductPrismaRepository();
  const deleteProductService = new DeleteProductService(productRepository);

  return deleteProductService;
};
