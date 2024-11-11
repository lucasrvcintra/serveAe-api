import { z } from 'zod';
import { CreateProductSchema } from './createProductDto';

export const UpdateProductSchema = CreateProductSchema.partial();

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
