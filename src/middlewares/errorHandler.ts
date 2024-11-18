import { Request, Response } from 'express';

export interface CustomError extends Error {
  status?: number;
  message: string;
}

const errorHandler = (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor';
  res
    .status(statusCode)
    .json({ message: message || 'Mensagem personalizada não fornecida' });
};

export default errorHandler;
