import { ProductPrismaRepository } from '../../repositories/productPrismaRepository';
import { CreateProductService } from '../createProductService';

export function makeCreateProductService() {
  const productsRepository = new ProductPrismaRepository();
  const createProductService = new CreateProductService(productsRepository);

  return createProductService;
}
