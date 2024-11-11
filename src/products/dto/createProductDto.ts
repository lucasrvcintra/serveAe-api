import { z } from 'zod';

export enum Category {
  PRATO_PRINCIPAL = 'PRATO_PRINCIPAL',
  ENTRADA = 'ENTRADA',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export const createProductDto = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  price: z.number().gt(0, 'O preço deve ser maior que zero'),
  category: z.nativeEnum(Category),
  description: z.string().min(1, 'Descrição é obrigatória'),
  imageUrl: z.string().url('URL da imagem deve ser válida'),
});

export type CreateProductDto = z.infer<typeof createProductDto>;
