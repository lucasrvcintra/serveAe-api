import e from 'express';
import { z } from 'zod';

export const CreateOrderSchema = z.object({
  userId: z.string().uuid(),
  products: z
    .array(
      z.object({
        productId: z.string().uuid(),
        quantity: z
          .number()
          .int()
          .positive('A quantidade deve ser maior que zero'),
      })
    )
    .nonempty('A lista de produtos não pode estar vazia'),
});

export type CreateOrderDto = z.infer<typeof CreateOrderSchema>;
