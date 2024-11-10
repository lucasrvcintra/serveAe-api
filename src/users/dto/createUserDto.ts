import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(3, 'Nome inválido'),
  email: z.string().email('Email inválido'),
  address: z.string().min(5, 'Endereço inválido'),
  phone: z.string().min(11, 'Telefone inválido'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
