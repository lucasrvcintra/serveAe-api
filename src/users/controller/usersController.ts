import { z } from 'zod';
import { Request, Response } from 'express';
import { makeCreateUserService } from '../services/factories/makeCreateUserService';
import { CreateUserDto, CreateUserSchema } from '../dto/createUserDto';
import { makeFindUserByEmailService } from '../services/factories/makeFindUserByEmailService';
import { makeFindUserByIdService } from '../services/factories/makeFindUserByIdService';

const createUserService = makeCreateUserService();
const findUserByEmailService = makeFindUserByEmailService();
const findUserByIdService = makeFindUserByIdService();

export default class UsersController {
  async createUser(request: CreateUserDto, response: Response) {
    try {
      const userData = CreateUserSchema.parse(request);
      const user = await createUserService.create(userData);
      return response
        .status(201)
        .json({ user, message: 'Usuário cadastrado com sucesso' });
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao criar usuário' });
      }
    }
  }

  async getUserByEmail(request: Request, response: Response) {
    try {
      const { email } = request.params;
      const user = await findUserByEmailService.findUserByEmail(email);
      return response.status(200).json(user);
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao buscar usuário' });
      }
    }
  }

  async getUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await findUserByIdService.findUserById(id);
      return response.status(200).json(user);
    } catch (error: any | z.ZodError) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((err) => err.message);
        response.status(400).json({ messages: errorMessages });
      } else {
        const status = error.status || 500;
        response
          .status(status)
          .json({ message: error.message || 'Erro ao buscar usuário' });
      }
    }
  }
}
