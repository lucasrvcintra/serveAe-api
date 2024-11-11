import { PrismaProductRepository } from '../../repositories/productPrismaRepository';
import { UpdateProductService } from '../updateProductService';

export function makeUpdateProductService() {
  const productsRepository = new PrismaProductRepository();
  const updateProductService = new UpdateProductService(productsRepository);

  return updateProductService;
}
