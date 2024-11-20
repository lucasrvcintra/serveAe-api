import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Deve ter no mínimo 5 caracteres' })
    .max(30, { message: 'Deve ter no máximo 30 caracteres' })
    .regex(/^(?!.*<\/?[^>]+>)[^'\\]+$/, {
      message: 'Caracteres inválidos',
    }),
  email: z
    .string()
    .min(5, { message: 'Deve ter no mínimo 5 caracteres' })
    .email({ message: 'Formato inválido.' })
    .regex(/^(?!.*<\/?[^>]+>)[^'\\]+$/, {
      message: 'Caracteres inválidos',
    }),
  address: z.string().min(5, 'Endereço inválido'),
  phone: z
    .string()
    .min(9, { message: 'Deve ter no mínimo 9 caracteres' })
    .max(14, { message: 'Deve ter no máximo 14 caracteres' })
    .regex(/^\d{9,14}$/, {
      message: 'Formato inválido. Deve conter apenas números.',
    }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
