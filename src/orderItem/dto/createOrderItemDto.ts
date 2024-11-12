import { z } from 'zod';

export const CreateOrderItemSchema = z.object({
  quantity: z.number().gt(0, 'Quantidade deve ser maior que zero'),
  productId: z.string().uuid(),
  orderId: z.string().uuid(),
});

export type CreateOrderItemDto = z.infer<typeof CreateOrderItemSchema>;
