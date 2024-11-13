import { ProductPrismaRepository } from '../../repositories/productPrismaRepository';
import { UpdateProductService } from '../updateProductService';

export function makeUpdateProductService() {
  const productsRepository = new ProductPrismaRepository();
  const updateProductService = new UpdateProductService(productsRepository);

  return updateProductService;
}
