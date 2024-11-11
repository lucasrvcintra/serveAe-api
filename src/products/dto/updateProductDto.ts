import { z } from 'zod';

enum Category {
  PRATO_PRINCIPAL = 'PRATO_PRINCIPAL',
  ENTRADA = 'ENTRADA',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export const UpdateProductSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres').optional(),
  price: z.number().gt(0, 'O preço deve ser maior que zero').optional(),
  category: z.nativeEnum(Category).optional(),
  description: z.string().min(1, 'Descrição é obrigatória').optional(),
  imageUrl: z.string().url('URL da imagem deve ser válida').optional(),
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
